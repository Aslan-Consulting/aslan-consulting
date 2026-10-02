import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { SectionHeading } from "@/components/ui/section-heading";

const services = [
  {
    index: "01",
    tag: "Playwright",
    title: "Playwright test architecture",
    lead: "One system of record for fixtures, auth, traces, and reporting — not a suite per squad.",
    outcomes: [
      "Layered page objects and test IDs that survive product redesigns",
      "Shared auth, seed, and environment contracts instead of copy-paste helpers",
      "Parallelization mapped to CI budget, with traces you can actually debug",
      "A documented ownership model so the framework does not fork in Q3",
    ],
  },
  {
    index: "02",
    tag: "CI / CD",
    title: "CI/CD pipeline integration",
    lead: "PR gates that encode risk, not theater. Green means shippable.",
    outcomes: [
      "Sharding, artifact retention, and retry policy with a stated cause",
      "Selectors for smoke vs. deep suites so merge queues stay honest",
      "Failure taxonomy wired into Slack/Jira without becoming noise",
      "Earlier signal in the loop — the mechanism behind 3× delivery velocity",
    ],
  },
  {
    index: "03",
    tag: "Reliability",
    title: "Test flakiness eradication",
    lead: "Flake is an SLO. We put a budget, an owner, and a quarantine path on it.",
    outcomes: [
      "Root-cause classes: race, environment, selector, data, third-party",
      "Deterministic waits and network stubs where the product is not the test",
      "Quarantine with expiry — no eternal skipped specs",
      "Dashboards that make <2% flake a managed number, not a wish",
    ],
  },
  {
    index: "04",
    tag: "SDET pods",
    title: "Distributed SDET pods",
    lead: "Embedded engineers, your backlog, our platform. Capacity without a hiring freeze.",
    outcomes: [
      "Pods staffed against the shared architecture, not a private toolbox",
      "Coverage mapped to risk: money paths, auth, migrations, release trains",
      "Knowledge transfer written into the engagement, not left as folklore",
      "A quality function that behaves like platform engineering",
    ],
  },
  {
    index: "05",
    tag: "Platform",
    title: "Framework ownership",
    lead: "We keep the platform current after the standing-up is done.",
    outcomes: [
      "Playwright and browser-matrix upgrades on a cadence",
      "Pipeline health, flake tax, and office hours with your squads",
      "Guardrails so new tests land in the architecture, not beside it",
      "The monthly retainer is ownership, not a ticket dump",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-b border-zinc-200/80 py-20 sm:py-24 dark:border-zinc-800/80">
      <Container>
        <SectionHeading
          kicker="Services"
          title="Architecture first. Capacity second."
          description="Most QA spend goes into more tests on an unstable base. We invert that: a centralized framework, then pods that ship against it."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {services.map((service) => (
            <Frame key={service.index} className="flex flex-col p-6 sm:p-8">
              <p className="inline-flex w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[0.7rem] font-medium tracking-wide text-cyan-700 dark:text-cyan-400">
                {service.tag}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400">
                {service.lead}
              </p>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </Frame>
          ))}
        </div>
      </Container>
    </section>
  );
}
