export function getMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  try {
    return new URL(raw);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const ogCopy = {
  title: "Testing Explained | A testing system your team can own",
  description:
    "Testing Explained builds the Playwright test architecture your team can own, so you ship faster with fewer flakes.",
} as const;
