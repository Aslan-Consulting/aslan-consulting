import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const credentials = ["Lead SDET", "10 years in test automation", "Playwright focus"] as const;

const tests = [
  { name: "Shared auth holds across the suite", state: "Pass" },
  { name: "Smoke gate on the pull request", state: "Pass" },
  { name: "Deep check on the flake path", state: "Fail" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div aria-hidden className="hero-blueprint pointer-events-none absolute inset-0" />
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
      <Container className="relative py-8 sm:py-10 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(17rem,0.78fr)] lg:gap-12">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-pine uppercase">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
              Testing Explained
            </p>
            <h1 className="mt-3 max-w-xl text-[2.15rem] font-bold leading-[0.98] tracking-[-0.045em] text-pine sm:text-5xl lg:text-[3.35rem]">
              A testing system your team can own, built to ship faster with fewer flakes.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-pine sm:text-lg">
              We design a single Playwright architecture your product org actually owns, then staff distributed SDET pods against it.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
              <ButtonLink href="#discovery">Book a discovery call</ButtonLink>
              <ButtonLink href="#services" variant="secondary">
                View services
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal>
            <figure className="rounded-2xl border border-gold/40 bg-pine p-5 text-cream shadow-[0_16px_40px_rgb(8_48_32/0.18)] sm:p-6">
              <figcaption className="text-xs font-medium leading-relaxed text-cream">
                Example illustration, not a client result.
              </figcaption>
              <ul className="mt-4 space-y-3 border-t border-gold/40 pt-4">
                {tests.map((test) => (
                  <li key={test.name} className="flex items-baseline justify-between gap-4">
                    <span className="text-sm leading-snug text-cream">{test.name}</span>
                    <span
                      className={`shrink-0 text-xs font-semibold tracking-[0.12em] uppercase ${
                        test.state === "Pass" ? "text-gold" : "text-cream"
                      }`}
                    >
                      {test.state}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-gold/40 pt-3 text-sm leading-relaxed text-cream">
                Smoke passed. A deep check failed.
              </p>
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <ul className="mt-8 flex flex-col gap-3 border-t border-pine/15 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
            {credentials.map((fact) => (
              <li key={fact} className="flex items-center gap-2 text-sm font-semibold tracking-tight text-pine sm:text-base">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                {fact}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
