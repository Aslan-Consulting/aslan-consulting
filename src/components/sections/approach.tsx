"use client";

import { useEffect, useRef, useState } from "react";
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
    <div className="rounded-xl border border-pine/25 bg-cream p-5 shadow-[0_8px_24px_rgb(8_48_32/0.08)]" aria-hidden>
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
                      : "border border-pine/30 bg-cream text-pine"
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
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    if (reduce || mobile) return;

    const nodes = itemRefs.current.filter((node): node is HTMLLIElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) setActive(index);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0.25, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-cream py-8 sm:py-10">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="How it works"
            title="How a director should buy quality work."
            description="Short discovery. Written architecture. Then either a standing platform, embedded pods, or both. No retainers that exist to 'stay in the mix.'"
          />
          <div className="mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-6">
            <ol className="grid gap-3">
              {steps.map((step, index) => (
                <li
                  key={step.index}
                  data-index={index}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className="rounded-xl border border-pine/25 bg-cream p-5 shadow-[0_8px_24px_rgb(8_48_32/0.08)]"
                >
                  <p className="text-xs font-semibold tracking-[0.14em] text-pine uppercase">{step.index}</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-pine">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pine">{step.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 hidden lg:sticky lg:top-28 lg:mt-0 lg:block">
              <ProcessDiagram active={active} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
