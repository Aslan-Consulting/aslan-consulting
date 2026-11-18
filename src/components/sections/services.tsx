import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
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
      "Earlier signal in the loop — problems surface while the fix is still small",
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
      "Dashboards that make flake rate a managed number, not a wish",
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
    <section id="services" className="scroll-mt-24 bg-cream py-3 md:py-10">
      <Container>
        <Reveal>
        <SectionHeading
          kicker="Services"
          title="Architecture first. Capacity second."
          description="Most QA spend goes into more tests on an unstable base. We invert that: a centralized framework, then pods that ship against it."
        />
        <div className="mt-4 grid grid-cols-1 gap-2 md:mt-6 md:gap-3 lg:grid-cols-6">
          {services.map((service, index) => {
            const featured = index < 2;
            return (
              <Frame
                key={service.index}
                className={`flex flex-col px-5 py-3 md:p-5 ${featured ? "lg:col-span-3" : "lg:col-span-2"}`}
              >
                <p className="inline-flex w-fit rounded-full bg-pine px-2.5 py-0.5 text-[0.7rem] font-medium tracking-wide text-cream">
                  {service.tag}
                </p>
                <h3
                  className={`mt-2 font-semibold tracking-tight text-pine md:mt-3 ${
                    featured ? "text-2xl" : "text-lg"
                  }`}
                >
                  {service.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-pine sm:text-base md:mt-2">{service.lead}</p>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-pine md:mt-3">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </Frame>
            );
          })}
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
