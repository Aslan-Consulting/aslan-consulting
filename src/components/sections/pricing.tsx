import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";

const tiers = [
  {
    name: "Framework Setup",
    price: "$5K–$10K",
    cadence: "upfront, typically 3–5 weeks",
    summary:
      "A one-time architecture engagement. We replace scattered suites with a Playwright system of record and wire it into CI.",
    includes: [
      "Current-state audit of tests, pipelines, and flake sources",
      "Target architecture and ownership map",
      "Foundation: fixtures, auth, traces, reporting",
      "CI sharding, gates, and artifact policy",
      "Handoff runbook for your staff engineers",
    ],
    note: "Range depends on repo count, browser matrix, and how forked the current helpers are.",
    featured: false,
  },
  {
    name: "Platform Ownership",
    price: "$2.5K–$3.5K",
    cadence: "per month, after setup",
    summary:
      "Ongoing ownership of the platform. We keep Playwright current, hold the flake SLO, and keep new tests inside the architecture.",
    includes: [
      "Flake SLO ownership and quarantine with expiry",
      "Playwright and browser-matrix upgrades",
      "Pipeline health and merge-queue hygiene",
      "Office hours with squads shipping against the platform",
      "Monthly written status — numbers, not narrative",
    ],
    note: "Month-to-month after the first 30 days. This is maintenance of a system, not a body shop.",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 border-b border-zinc-200/80 py-20 sm:py-24 dark:border-zinc-800/80">
      <Container>
        <SectionHeading
          kicker="Pricing"
          title="Setup retainers and monthly ownership. Stated as numbers."
          description="Directors should be able to take this to finance without a 'let's hop on a call to discuss packages' fog. Scope is still scoped — the bands are real."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {tiers.map((tier) => (
            <Frame
              key={tier.name}
              className={`flex flex-col p-6 sm:p-8 ${
                tier.featured
                  ? "ring-1 ring-cyan-400/25 dark:shadow-[0_0_40px_-12px_rgba(6,182,212,0.25)]"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium tracking-[0.12em] text-cyan-700 uppercase dark:text-cyan-400">
                    {tier.featured ? "Ongoing" : "Engagement"}
                  </p>
                </div>
                {tier.featured ? (
                  <span className="rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300">
                    Most orgs keep this
                  </span>
                ) : null}
              </div>
              <p className="mt-6 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                {tier.price}
                {tier.featured ? <span className="text-lg font-medium text-zinc-500 dark:text-zinc-400">/mo</span> : null}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{tier.cadence}</p>
              <p className="mt-5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{tier.summary}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-zinc-500">{tier.note}</p>
            </Frame>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Combined engagements (setup plus the first quarter of ownership) are
          the usual starting point. SDET pods are scoped separately against
          the same platform — we will not staff a pod onto a framework we
          would not operate.
        </p>
        <ButtonLink href="#discovery" className="mt-6">
          Book a discovery call
        </ButtonLink>
      </Container>
    </section>
  );
}
