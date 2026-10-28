import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { metrics } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 bg-[#f7f6f2]">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <Container className="relative py-16 text-center sm:py-24 lg:py-28">
        <p className="animate-rise text-xs font-medium tracking-[0.16em] text-green-700 uppercase">
          Testing Explained
        </p>
        <h1 className="animate-rise delay-1 mx-auto mt-5 max-w-4xl text-[2.35rem] font-semibold leading-[1.12] tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.35rem]">
          Software testing, explained simply.
        </h1>
        <p className="animate-rise delay-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          We design a single Playwright architecture your product org actually owns, then staff distributed SDET pods against it.
        </p>
        <div className="animate-rise delay-3 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="#discovery">Book a discovery call</ButtonLink>
          <ButtonLink href="#services" variant="secondary">
            View services
          </ButtonLink>
        </div>
        <div className="animate-rise delay-4 mx-auto mt-14 grid max-w-5xl gap-4 text-left sm:grid-cols-3">
          {metrics.map((metric) => (
            <Frame key={metric.label} className="p-5 sm:p-6">
              <p className="text-3xl font-semibold tracking-tight text-green-600 sm:text-4xl">{metric.value}</p>
              <p className="mt-2 text-sm font-medium text-zinc-900">{metric.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">{metric.detail}</p>
            </Frame>
          ))}
        </div>
      </Container>
    </section>
  );
}
