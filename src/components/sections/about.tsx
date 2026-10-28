import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const outcomes = [
  { value: "< 2%", label: "Test Flakiness" },
  { value: "3×", label: "Release Velocity" },
  { value: "40%", label: "Merge Conflict Reduction" },
] as const;

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-zinc-200/80 bg-white py-20 sm:py-24"
    >
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
        <SectionHeading
          kicker="About"
          title="Embedded leadership. Architecture first."
          description="Led by Majd Aslan, a Senior Full Stack SDET and QA Lead with 9 years of hands-on experience embedding into engineering pods. We don't just write test scripts; we architect resilient CI/CD pipelines and test automation frameworks — Playwright, Java, Cypress — that eliminate bottlenecks."
        />
        <aside
          aria-label="Engagement outcomes"
          className="rounded-xl border border-zinc-200/80 bg-[#f7f6f2] px-6 py-2"
        >
          <p className="pt-5 text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase">
            Outcomes we hold
          </p>
          <ul className="mt-2 divide-y divide-zinc-200/80">
            {outcomes.map((outcome) => (
              <li key={outcome.label} className="flex items-baseline justify-between gap-6 py-5">
                <span className="text-sm font-medium text-zinc-800">
                  {outcome.label}
                </span>
                <span className="text-2xl font-semibold tracking-tight text-green-600 tabular-nums">
                  {outcome.value}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </section>
  );
}
