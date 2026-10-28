export function getMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  try {
    return new URL(raw);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const ogCopy = {
  title: "Testing Explained - Software testing, explained simply",
  description:
    "Testing Explained helps engineering teams own their Playwright test architecture, kill flaky tests, and ship faster. One testing lesson every day on Instagram.",
} as const;
