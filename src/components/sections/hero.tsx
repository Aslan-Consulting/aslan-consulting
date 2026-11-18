import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";

const credentials = ["Lead SDET", "10 years in test automation", "Playwright focus"] as const;

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
          <ul className="mx-auto mt-14 grid max-w-5xl gap-4 text-left sm:grid-cols-3">
            {credentials.map((fact) => (
              <li key={fact}>
                <Frame className="p-5 sm:p-6">
                  <p className="text-lg font-semibold tracking-tight text-zinc-900">{fact}</p>
                </Frame>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
