// TASK-003 behaviour check: the flake calculator, the waitlist form and the
// discovery form, driven with real (trusted) clicks and typing in headless Chrome.
//
// Usage:   node docs/task-003/forms-check.mjs <url> <output-folder>
// Example: node docs/task-003/forms-check.mjs http://localhost:3100/ docs/task-003/baseline
//
// Run it against a LOCAL server only. A valid discovery submit stores a lead
// (locally: one line in data/leads.jsonl), and on a deployed site a valid waitlist
// or discovery submit emails MJ.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { evaluate, launchChrome, open, setViewport, sleep } from "./chrome.mjs";

const [url, outDir] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("Usage: node forms-check.mjs <url> <output-folder>");
  process.exit(1);
}

const EMAIL = "baseline-check@example.com";

const chrome = await launchChrome();
const { page } = chrome;

// Page-side expressions that find an element.
const css = (selector) => `document.querySelector(${JSON.stringify(selector)})`;
const calculatorInput = (index) => `document.querySelectorAll("#flake-cost input")[${index}]`;
const discoveryField = (name) => css(`#discovery [name=${name}]`);

// Real mouse click in the middle of the element, then a short pause for the page to react.
async function click(element, pause = 150) {
  const point = await evaluate(
    page,
    `(() => {
      const el = ${element};
      el.scrollIntoView({ block: "center" });
      const box = el.getBoundingClientRect();
      return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    })()`,
  );
  for (const type of ["mousePressed", "mouseReleased"]) {
    await page.send("Input.dispatchMouseEvent", { type, ...point, button: "left", clickCount: 1 });
  }
  await sleep(pause);
}

// Click into a field, select what is there, and type over it.
async function type(element, text) {
  await click(element);
  await evaluate(page, `${element}.select()`);
  await page.send("Input.insertText", { text });
  await sleep(100);
}

// Pick an option in a <select> and tell React about it.
async function choose(element, value) {
  await evaluate(
    page,
    `(() => {
      const el = ${element};
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value").set.call(el, ${JSON.stringify(value)});
      el.dispatchEvent(new Event("change", { bubbles: true }));
    })()`,
  );
}

// What the user can see in a section (messages, button label) plus the API calls
// made since the last read.
function read(sectionId) {
  return evaluate(
    page,
    `(() => {
      const section = document.getElementById(${JSON.stringify(sectionId)});
      const button = section.querySelector("button[type=submit]");
      return {
        messages: [...section.querySelectorAll("[role=alert], [role=status]")].map((el) => ({
          role: el.getAttribute("role"),
          text: el.innerText.trim().replace(/\\n+/g, " | "),
        })),
        formVisible: Boolean(section.querySelector("form")),
        button: button ? button.innerText : null,
        apiCalls: window.__calls.splice(0),
      };
    })()`,
  );
}

try {
  await setViewport(page, { width: 1440, height: 900, mobile: false });
  await open(page, url);
  await sleep(1000);

  // Record every API call the page makes.
  await evaluate(
    page,
    `(() => {
      window.__calls = [];
      const realFetch = window.fetch;
      window.fetch = async (input, init) => {
        const response = await realFetch(input, init);
        window.__calls.push({
          url: String(input),
          method: init?.method ?? "GET",
          sent: init?.body ?? null,
          status: response.status,
          received: await response.clone().text(),
        });
        return response;
      };
    })()`,
  );

  const report = { url, checkedAt: new Date().toISOString(), browser: chrome.browser };

  // ---- Flake calculator: tests, flake rate, minutes lost, runs per month ----
  const examples = [
    ["500", "5", "10", "200"],
    ["1200", "3", "15", "600"],
    ["80", "12.5", "4", "90"],
    ["300", "150", "10", "100"],
    ["250", "0", "10", "100"],
  ];
  report.calculator = [];
  for (const values of examples) {
    for (let i = 0; i < values.length; i++) {
      await type(calculatorInput(i), values[i]);
    }
    report.calculator.push(
      await evaluate(
        page,
        `(() => {
          const section = document.getElementById("flake-cost");
          const lines = section.innerText.split("\\n").map((line) => line.trim()).filter(Boolean);
          return {
            entered: [...section.querySelectorAll("input")].map((input) => input.value),
            formula: lines.find((line) => line.includes("÷ 60 =") && !line.startsWith("tests")),
            result: lines.find((line) => line.endsWith("hours / month")),
          };
        })()`,
      ),
    );
  }

  // ---- Waitlist form ----
  const waitlistEmail = css("#waitlist input[name=email]");
  const waitlistSubmit = css("#waitlist button[type=submit]");
  report.waitlist = {};

  await click(waitlistSubmit);
  report.waitlist.empty = await read("waitlist");

  await type(waitlistEmail, "not-an-email");
  await click(waitlistSubmit);
  report.waitlist.invalid = await read("waitlist");

  await type(waitlistEmail, EMAIL);
  await click(waitlistSubmit);
  await sleep(3000);
  report.waitlist.valid = await read("waitlist");

  if (report.waitlist.valid.formVisible) {
    await click(waitlistSubmit);
    await sleep(3000);
    report.waitlist.duplicate = await read("waitlist");
  } else {
    report.waitlist.duplicate = "Form replaced by the success message; reload to submit again.";
  }

  // ---- Discovery form ----
  const discoverySubmit = css("#discovery button[type=submit]");
  report.discovery = {};

  await click(discoverySubmit);
  report.discovery.empty = await read("discovery");

  await type(discoveryField("name"), "Baseline Check");
  await type(discoveryField("email"), "not-an-email");
  await type(discoveryField("company"), "Baseline Co");
  await choose(discoveryField("role"), "Other");
  await choose(discoveryField("teamSize"), "1–10");
  await click(css("#discovery fieldset label")); // first stack option: Playwright
  await type(discoveryField("challenge"), "TASK-003 baseline check. Not a real lead.");
  await choose(discoveryField("preferredTime"), "Next week");
  await click(discoverySubmit);
  report.discovery.invalid = await read("discovery");
  report.discovery.stackTicked = await evaluate(
    page,
    `[...document.querySelectorAll("#discovery input[type=checkbox]")].map((box) => box.checked)`,
  );

  // Valid submit. The page may leave for the calendar straight away, so do not
  // pause after the click and poll quickly until the form is gone.
  await type(discoveryField("email"), EMAIL);
  await click(discoverySubmit, 0);
  const valid = { messages: [], apiCalls: [] };
  for (let i = 0; i < 300; i++) {
    try {
      const state = await read("discovery");
      valid.apiCalls.push(...state.apiCalls);
      if (!state.formVisible) {
        valid.messages = state.messages;
        break;
      }
    } catch {
      break; // the page navigated away
    }
    await sleep(10);
  }
  await sleep(3000);
  const history = await page.send("Page.getNavigationHistory");
  valid.pageUrlAfterwards = history.entries[history.currentIndex].url;
  report.discovery.valid = valid;

  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "forms.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await chrome.close();
}
