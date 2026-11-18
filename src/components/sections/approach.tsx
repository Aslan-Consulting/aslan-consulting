"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
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

function ProcessDiagram({ active }: { active: number }) {
  return (
    <div className="rounded-xl border border-pine/25 bg-card p-5 shadow-[0_8px_24px_rgb(8_48_32/0.08)]" aria-hidden>
      <p className="text-xs font-semibold tracking-[0.14em] text-pine uppercase">Platform path</p>
      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => {
          const built = index <= active;
          const current = index === active;
          return (
            <li key={step.index} className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  current
                    ? "bg-pine text-cream"
                    : built
                      ? "bg-pine/10 text-pine"
                      : "border border-pine/30 bg-card text-pine"
                }`}
              >
                {step.index}
              </span>
              <span className="text-sm font-medium text-pine">
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Approach() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-cream py-8 sm:py-10">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="How it works"
            title="How a director should buy quality work."
            description="Short discovery. Written architecture. Then either a standing platform, embedded pods, or both. No retainers that exist to 'stay in the mix.'"
          />
          <div className="mt-6 rounded-2xl border border-pine/20 bg-card p-3 sm:p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
              <ol className="relative grid flex-1 gap-4 lg:grid-cols-3 lg:gap-6">
                <span aria-hidden className="absolute top-5 bottom-5 left-[1.125rem] w-px bg-gold lg:hidden" />
                {steps.map((step, index) => (
                  <li
                    key={step.index}
                    tabIndex={0}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="relative rounded-xl border border-pine/25 bg-card p-4 shadow-[0_8px_24px_rgb(8_48_32/0.08)] outline-none focus-visible:ring-2 focus-visible:ring-pine"
                  >
                    {index < steps.length - 1 ? (
                      <span aria-hidden className="absolute top-[1.35rem] -right-6 z-20 hidden w-6 items-center lg:flex">
                        <span className="h-px flex-1 bg-gold" />
                        <span className="-ml-px h-1.5 w-1.5 rotate-45 border-t-2 border-r-2 border-gold" />
                      </span>
                    ) : null}
                    <span
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                        index === active ? "bg-pine text-cream" : "border border-pine/30 bg-card text-pine"
                      }`}
                    >
                      {step.index}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-pine">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-pine">{step.body}</p>
                  </li>
                ))}
              </ol>
              <div className="lg:w-60 lg:shrink-0">
                <ProcessDiagram active={active} />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
