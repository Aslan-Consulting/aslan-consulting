import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";

const KINDLE_URL = "https://www.amazon.com/dp/B0HRQCQQ9G";
const PAPERBACK_URL = "https://www.amazon.com/dp/B0HRSRB17J";

export function PromptBook() {
  return (
    <section id="prompt-book" className="scroll-mt-24 border-t border-zinc-200/80 bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <Frame className="mx-auto max-w-2xl p-6 sm:p-10">
            <p className="text-xs font-medium tracking-[0.16em] text-green-700 uppercase">Book</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              The AI Tester&apos;s Prompt Book
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              Stop trusting the first AI answer. 100 prompts that actually test software — each with a
              real example and the checks to run on what the AI gives you back. By Testing Explained.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
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
                className="text-sm font-medium text-green-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
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
