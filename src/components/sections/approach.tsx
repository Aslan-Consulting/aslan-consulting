import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    index: "01",
    title: "Audit the real constraint",
    body: "We read the pipeline, the flake report, and the merge queue — not a slide about 'quality culture.' You get a written diagnosis of architecture debt vs. staffing debt.",
  },
  {
    index: "02",
    title: "Stand up the platform",
    body: "Fixtures, auth, reporting, and CI contracts land as a shared system. Squads stop inventing private helpers. This is the setup retainer.",
  },
  {
    index: "03",
    title: "Staff pods against it",
    body: "Distributed SDET capacity runs on the platform we just made non-optional. Ownership stays with Aslan or transfers with a runbook — your call.",
  },
];

export function Approach() {
  return (
    <section className="border-b border-zinc-200/80 py-20 sm:py-24 dark:border-zinc-800/80">
      <Container>
        <SectionHeading
          kicker="Engagement"
          title="How a director should buy quality work."
          description="Short discovery. Written architecture. Then either a standing platform, embedded pods, or both. No retainers that exist to 'stay in the mix.'"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.index}
              className="rounded-xl border border-zinc-200/80 bg-white/50 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/40"
            >
              <p className="text-xs font-medium tracking-[0.14em] text-cyan-600 uppercase dark:text-cyan-400">
                {step.index}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
