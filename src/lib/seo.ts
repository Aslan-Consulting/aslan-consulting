export function getMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  try {
    return new URL(raw);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const ogCopy = {
  title: "Aslan Consulting LLC — Test Architecture & SDET Pods",
  description:
    "Centralize the test platform. Distribute the engineers. Enterprise Playwright architecture, flake SLOs, and CI/CD optimization.",
} as const;
