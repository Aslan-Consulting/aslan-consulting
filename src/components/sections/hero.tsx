"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { metrics } from "@/lib/site";

const targets = [2, 3, 40] as const;

function formatCount(index: number, value: number, done: boolean) {
  if (done) return metrics[index].value;
  if (index === 0) return `<${value}%`;
  if (index === 1) return `${value}×`;
  return `${value}%`;
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return reduce;
}

function MetricStats() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const [values, setValues] = useState<number[]>([2, 3, 40]);
  const [done, setDone] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) {
      setValues([2, 3, 40]);
      setDone(true);
      return;
    }

    let frame = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      setDone(false);
      setValues([0, 0, 0]);
      const start = performance.now();
      const duration = 900;

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setValues(targets.map((target) => Math.round(target * eased)));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
          return;
        }
        setValues([...targets]);
        setDone(true);
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        run();
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <div ref={ref} className="mx-auto mt-14 grid max-w-5xl gap-4 text-left sm:grid-cols-3">
      {metrics.map((metric, index) => (
        <Frame key={metric.label} className="p-5 sm:p-6">
          <p className="text-3xl font-semibold tracking-tight text-green-600 tabular-nums sm:text-4xl">
            {formatCount(index, values[index] ?? targets[index], done)}
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-900">{metric.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">{metric.detail}</p>
        </Frame>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 bg-[#f7f6f2]">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <Container className="relative py-16 text-center sm:py-24 lg:py-28">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.16em] text-green-700 uppercase">
            Testing Explained
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-[2.35rem] font-semibold leading-[1.12] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.15rem]">
            A testing system your team can own, built to ship faster with fewer flakes.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            We design a single Playwright architecture your product org actually owns, then staff distributed SDET pods against it.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="#discovery">Book a discovery call</ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              View services
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal>
          <MetricStats />
        </Reveal>
      </Container>
    </section>
  );
}
