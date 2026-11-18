import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";

const credentials = ["Lead SDET", "10 years in test automation", "Playwright focus"] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Container className="relative py-12 text-center sm:py-16">
        <Reveal>
          <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.14em] text-pine uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
            Testing Explained
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-[2.6rem] font-bold leading-[0.98] tracking-[-0.045em] text-pine sm:text-6xl lg:text-[4.25rem]">
            A testing system your team can own, built to ship faster with fewer flakes.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pine sm:text-lg">
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
          <ul className="mx-auto mt-8 grid max-w-5xl gap-3 text-left sm:grid-cols-3">
            {credentials.map((fact) => (
              <li key={fact}>
                <Frame className="p-4 sm:p-5">
                  <p className="text-lg font-semibold tracking-tight text-pine">{fact}</p>
                </Frame>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
