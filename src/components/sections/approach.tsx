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
    body: "Distributed SDET capacity runs on the platform we just made non-optional. Ownership stays with Testing Explained or transfers with a runbook — your call.",
  },
];

export function Approach() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-zinc-200/80 bg-[#f7f6f2] py-20 sm:py-24">
      <Container>
        <SectionHeading
          kicker="How it works"
          title="How a director should buy quality work."
          description="Short discovery. Written architecture. Then either a standing platform, embedded pods, or both. No retainers that exist to 'stay in the mix.'"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.index}
              className="rounded-xl border border-zinc-200/80 bg-white p-6"
            >
              <p className="text-xs font-medium tracking-[0.14em] text-green-700 uppercase">
                {step.index}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
