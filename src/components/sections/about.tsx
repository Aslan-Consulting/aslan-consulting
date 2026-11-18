import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-cream py-8 sm:py-10"
    >
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.14em] text-pine uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
            About
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-pine sm:text-3xl">
            Led by a lead SDET with 10 years in test automation, focused on Playwright.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
