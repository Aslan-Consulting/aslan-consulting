// TASK-003 capture script: full-page screenshots + measurements of the homepage.
//
// Usage:   node docs/task-003/capture.mjs <url> <output-folder>
// Example: node docs/task-003/capture.mjs http://localhost:3100/ docs/task-003/baseline
//
// Method (keep identical for the baseline and every later comparison):
//   - Browser: installed Google Chrome, headless, driven over the DevTools Protocol.
//   - Zoom 100%: device scale factor 1, page scale 1.
//   - Viewports: 1440x900 (desktop) and 390x844 (mobile emulation).
//   - Scrollbars hidden, so the layout width is exactly 1440 / 390.
//   - prefers-reduced-motion is forced to "reduce" so no animation is caught mid-flight.
//   - The page is scrolled top to bottom once before measuring, then back to the top.
//   - Height = document.documentElement.scrollHeight.
//   - Screenshot = Page.captureScreenshot with captureBeyondViewport, clipped to
//     the full document (width x scrollHeight).

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { evaluate, launchChrome, open, setViewport } from "./chrome.mjs";

const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
];

const [url, outDir] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("Usage: node capture.mjs <url> <output-folder>");
  process.exit(1);
}

// Runs in the page: scroll through once, then measure the document and each section.
const MEASURE = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";
  for (let y = 0; y < root.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await sleep(100);
  }
  window.scrollTo(0, root.scrollHeight);
  await sleep(300);
  window.scrollTo(0, 0);
  await sleep(1500);
  await document.fonts.ready;

  const blocks = [
    document.querySelector("body > header, header"),
    ...document.querySelectorAll("main > section"),
    document.querySelector("footer"),
  ].filter(Boolean);

  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    pageScale: window.visualViewport.scale,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    scrollWidth: root.scrollWidth,
    scrollHeight: root.scrollHeight,
    bodyFont: getComputedStyle(document.body).fontFamily,
    sections: blocks.map((el) => {
      const box = el.getBoundingClientRect();
      const heading = el.querySelector("h1, h2");
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        heading: heading ? heading.textContent.trim() : null,
        top: Math.round(box.top + window.scrollY),
        height: Math.round(box.height),
        background: getComputedStyle(el).backgroundColor,
      };
    }),
  };
})()`;

// Runs in the page after the screenshot: rendered copy and every link.
const CONTENT = `(() => {
  document.querySelectorAll("details").forEach((d) => (d.open = true));
  const blocks = [
    document.querySelector("body > header, header"),
    ...document.querySelectorAll("main > section"),
    document.querySelector("footer"),
  ].filter(Boolean);
  return {
    title: document.title,
    copy: blocks.map((el) => ({
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      text: el.innerText,
    })),
    links: [...document.querySelectorAll("a[href]")].map((a) => ({
      area: a.closest("footer") ? "footer" : a.closest("main") ? (a.closest("section")?.id || "hero") : "header",
      text: (a.innerText || a.getAttribute("aria-label") || "").trim(),
      ariaLabel: a.getAttribute("aria-label"),
      href: a.getAttribute("href"),
      target: a.getAttribute("target"),
    })),
  };
})()`;

const chrome = await launchChrome();

try {
  const { page } = chrome;
  await mkdir(outDir, { recursive: true });
  const report = { url, capturedAt: new Date().toISOString(), browser: chrome.browser, viewports: [] };

  for (const viewport of VIEWPORTS) {
    await setViewport(page, viewport);
    await open(page, url);

    const measured = await evaluate(page, MEASURE);
    const shot = await page.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: viewport.width, height: measured.scrollHeight, scale: 1 },
    });
    const file = `${viewport.name}-full.png`;
    await writeFile(path.join(outDir, file), Buffer.from(shot.data, "base64"));

    const content = await evaluate(page, CONTENT);
    report.viewports.push({ ...viewport, screenshot: file, ...measured });
    await writeFile(path.join(outDir, `${viewport.name}-content.json`), JSON.stringify(content, null, 2));

    console.log(`${viewport.name}: ${viewport.width} x ${measured.scrollHeight}px -> ${file}`);
  }

  await writeFile(path.join(outDir, "measurements.json"), JSON.stringify(report, null, 2));
} finally {
  await chrome.close();
}
