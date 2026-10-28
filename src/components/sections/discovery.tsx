import { DiscoveryForm } from "@/components/discovery-form";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Discovery() {
  return (
    <section id="discovery" className="scroll-mt-24 bg-[#f7f6f2] py-20 sm:py-24">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <SectionHeading
          kicker="Discovery"
          title="A 30-minute working session, not a demo."
          description="Bring the pipeline pain: flake rate, merge queue delay, suite runtime, ownership gaps. We will leave you with an architecture sketch and a clear yes/no on fit."
        />
        <Frame className="relative p-5 sm:p-8">
          <DiscoveryForm />
        </Frame>
        </Reveal>
      </Container>
    </section>
  );
}
