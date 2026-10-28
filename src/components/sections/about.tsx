import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-zinc-200/80 bg-white py-16 sm:py-20"
    >
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.16em] text-green-700 uppercase">About</p>
          <p className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Led by a lead SDET with 10 years in test automation, focused on Playwright.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
