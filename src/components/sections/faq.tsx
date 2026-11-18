import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  {
    question: "Why not just hire in-house?",
    // TODO: Review. The site describes a handoff runbook and separately scoped pods, not a direct hiring comparison.
    answer:
      "Setup ends with a handoff runbook so your staff engineers own the platform. Pods are additional capacity against that same system, scoped separately, when you need it.",
  },
  {
    question: "Does this work if we use Cypress?",
    // TODO: Review. Cypress is a discovery-form option. The site does not describe a Cypress migration offer.
    answer:
      "The platform we stand up is Playwright. If Cypress is what you run today, that is where the audit starts.",
  },
  {
    question: "How fast do we see results?",
    answer:
      "Framework Setup is a one-time engagement, typically 3–5 weeks, at $5K–$10K. The site does not promise a result date beyond that window.",
  },
  {
    question: "What happens after setup?",
    answer:
      "Platform Ownership is $2.5K–$3.5K per month after setup, month-to-month after the first 30 days. SDET pods are scoped separately against the same platform.",
  },
  {
    question: "How are SDET pods priced?",
    answer: "Priced after the audit.",
  },
] as const;

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-cream py-8 sm:py-10">
      <Container>
        <Reveal>
          <SectionHeading kicker="FAQ" title="Questions directors ask before the call." />
          <div className="mt-6 divide-y divide-pine/20 rounded-xl border border-pine/25 bg-card shadow-[0_8px_24px_rgb(8_48_32/0.08)]">
            {faqs.map((item) => (
              <details key={item.question} className="group px-5 py-3 sm:px-6">
                <summary className="cursor-pointer list-none rounded-lg text-base font-medium text-pine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-card [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span aria-hidden className="text-pine group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-pine">{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
