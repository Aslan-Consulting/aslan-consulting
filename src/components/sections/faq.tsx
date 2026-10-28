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
    <section id="faq" className="scroll-mt-24 border-b border-zinc-200/80 bg-[#f7f6f2] py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading kicker="FAQ" title="Questions directors ask before the call." />
          <div className="mt-10 divide-y divide-zinc-200 rounded-xl border border-zinc-200/80 bg-white">
            {faqs.map((item) => (
              <details key={item.question} className="group px-5 py-4 sm:px-6">
                <summary className="cursor-pointer list-none text-base font-medium text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span aria-hidden className="text-zinc-400 group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
