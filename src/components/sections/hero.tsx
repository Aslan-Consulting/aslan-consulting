import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { metrics } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <Container className="relative py-16 sm:py-24 lg:py-28">
        <p className="animate-rise text-xs font-medium tracking-[0.16em] text-cyan-600 uppercase dark:text-cyan-400">
          Aslan Consulting LLC · QA / SDET
        </p>
        <h1 className="animate-rise delay-1 mt-5 max-w-4xl text-[2.35rem] font-semibold leading-[1.12] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.35rem] dark:text-zinc-50">
          Centralize the test platform.{" "}
          <span className="text-zinc-500 dark:text-zinc-400">Distribute the engineers.</span>
        </h1>
        <p className="animate-rise delay-2 mt-6 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg dark:text-zinc-400">
          We design a single Playwright architecture your product org actually
          owns, then staff distributed SDET pods against it. Engineering
          directors get a flake SLO, a merge-ready pipeline, and delivery that
          no longer depends on heroic QA.
        </p>
        <div className="animate-rise delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#discovery">Book a discovery call</ButtonLink>
          <ButtonLink href="#services" variant="secondary">
            View services
          </ButtonLink>
        </div>
        <div className="animate-rise delay-4 mt-14 grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <Frame key={metric.label} className="p-5 sm:p-6">
              <p className="text-3xl font-semibold tracking-tight text-cyan-600 sm:text-4xl dark:text-cyan-400 dark:drop-shadow-[0_0_18px_rgba(6,182,212,0.28)]">
                {metric.value}
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">{metric.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{metric.detail}</p>
            </Frame>
          ))}
        </div>
      </Container>
    </section>
  );
}
