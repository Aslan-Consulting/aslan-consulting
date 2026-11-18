import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const KINDLE_URL = "https://www.amazon.com/dp/B0HRQCQQ9G";
const PAPERBACK_URL = "https://www.amazon.com/dp/B0HRSRB17J";

export function PromptBook() {
  return (
    <section id="prompt-book" className="scroll-mt-24 bg-cream py-3 md:py-10">
      <Container>
        <Reveal>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-xl border border-gold bg-pine px-5 py-5 text-center text-cream shadow-[0_8px_24px_rgb(8_48_32/0.08)] md:px-8 md:py-10">
            <div aria-hidden className="book-dots pointer-events-none absolute inset-0" />
            <div className="relative">
              <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.14em] text-gold uppercase">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                Book
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                The AI Tester&apos;s Prompt Book
              </h2>
              <p className="mt-3 text-base leading-relaxed text-cream">
                Stop trusting the first AI answer. 100 prompts that actually test software — each with a
                real example and the checks to run on what the AI gives you back. By Testing Explained.
              </p>
              <div className="mt-4 flex flex-col items-center gap-3 md:mt-6">
                <ButtonLink
                  href={KINDLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="on-dark"
                  className="w-full justify-center sm:w-auto"
                >
                  Get it on Amazon — Kindle $4.99
                </ButtonLink>
                <a
                  href={PAPERBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-cream underline decoration-gold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-pine"
                >
                  Also in paperback — $11.99
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
