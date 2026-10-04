export const site = {
  name: "Aslan Consulting LLC",
  legalName: "Aslan Consulting, LLC",
  shortName: "Aslan",
  tagline: "Centralized test architecture. Distributed engineering pods.",
  description:
    "Boutique QA and SDET firm for engineering directors. We design centralized Playwright architectures and staff distributed pods so product orgs ship with a flake SLO, not a hope.",
  email: "majdaslan4@gmail.com",
} as const;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#pricing", label: "Pricing" },
] as const;

export const footerQuickLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#discovery", label: "Contact" },
] as const;

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export const metrics = [
  {
    value: "<2%",
    label: "Test flakiness",
    detail: "Treated as an SLO, not a Slack thread.",
  },
  {
    value: "3×",
    label: "Delivery velocity",
    detail: "Earlier, cheaper signal in the PR loop.",
  },
  {
    value: "40%",
    label: "Fewer merge conflicts",
    detail: "Smaller, greener diffs from a shared platform.",
  },
] as const;

export const roles = [
  "VP Engineering",
  "Engineering Director",
  "Head of QA / QA Lead",
  "Director of Quality",
  "CTO",
  "Staff / Principal Engineer",
  "Other",
] as const;

export const teamSizes = [
  "1–10",
  "11–25",
  "26–50",
  "51–100",
  "100+",
] as const;

export const stacks = [
  "Playwright",
  "Cypress",
  "Selenium",
  "WebdriverIO",
  "Jest / Vitest",
  "Other",
] as const;

export const timeWindows = [
  "This week, mornings (US Eastern)",
  "This week, afternoons (US Eastern)",
  "Next week",
  "Two weeks out",
  "Async — send a calendar hold",
] as const;
