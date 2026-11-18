import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";

const KINDLE_URL = "https://www.amazon.com/dp/B0HRQCQQ9G";
const PAPERBACK_URL = "https://www.amazon.com/dp/B0HRSRB17J";

export function PromptBook() {
  return (
    <section id="prompt-book" className="scroll-mt-24 bg-cream py-8 sm:py-10">
      <Container>
        <Reveal>
          <Frame className="mx-auto max-w-2xl border-gold p-5 sm:p-8">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-pine uppercase">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
              Book
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-pine sm:text-4xl">
              The AI Tester&apos;s Prompt Book
            </h2>
            <p className="mt-3 text-base leading-relaxed text-pine">
              Stop trusting the first AI answer. 100 prompts that actually test software — each with a
              real example and the checks to run on what the AI gives you back. By Testing Explained.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <ButtonLink
                href={KINDLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center sm:w-auto"
              >
                Get it on Amazon — Kindle $4.99
              </ButtonLink>
              <a
                href={PAPERBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-pine underline decoration-gold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine"
              >
                Also in paperback — $11.99
              </a>
            </div>
          </Frame>
        </Reveal>
      </Container>
    </section>
  );
}
