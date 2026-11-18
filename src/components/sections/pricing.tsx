import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
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
    <section id="pricing" className="scroll-mt-24 bg-cream py-8 sm:py-10">
      <Container>
        <Reveal>
        <SectionHeading
          kicker="Pricing"
          title="Setup retainers and monthly ownership. Stated as numbers."
          description="Directors should be able to take this to finance without a 'let's hop on a call to discuss packages' fog. Scope is still scoped — the bands are real."
        />
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`flex flex-col rounded-xl p-5 shadow-[0_8px_24px_rgb(8_48_32/0.08)] ${
                tier.featured
                  ? "border border-gold bg-pine text-cream"
                  : "border border-pine/25 bg-card text-pine"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {tier.name}
                  </h3>
                  <p
                    className={`mt-1 text-xs font-semibold tracking-[0.12em] uppercase ${
                      tier.featured ? "text-gold" : "text-pine"
                    }`}
                  >
                    {tier.featured ? "Ongoing" : "Engagement"}
                  </p>
                </div>
                {tier.featured ? (
                  <span className="rounded-full bg-cream px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-pine">
                    Most orgs keep this
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {tier.price}
                {tier.featured ? <span className="text-lg font-medium">/mo</span> : null}
              </p>
              <p className="mt-1 text-sm">{tier.cadence}</p>
              <p className="mt-4 text-sm leading-relaxed">{tier.summary}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed">{tier.note}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-pine">
          Combined engagements (setup plus the first quarter of ownership) are
          the usual starting point. SDET pods are scoped separately against
          the same platform — we will not staff a pod onto a framework we
          would not operate.
        </p>
        <ButtonLink href="#discovery" className="mt-6">
          Book a discovery call
        </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
