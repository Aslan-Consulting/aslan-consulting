import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { BuiltOn } from "@/components/sections/built-on";
import { CaseVisual } from "@/components/sections/case-visual";
import { Discovery } from "@/components/sections/discovery";
import { Faq } from "@/components/sections/faq";
import { FlakeCalculator } from "@/components/sections/flake-calculator";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { PromptBook } from "@/components/sections/prompt-book";
import { Services } from "@/components/sections/services";
import { Waitlist } from "@/components/sections/waitlist";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <About />
      <SectionDivider />
      <CaseVisual />
      <SectionDivider />
      <FlakeCalculator />
      <SectionDivider />
      <Approach />
      <SectionDivider />
      <BuiltOn />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <Faq />
      <SectionDivider />
      <Waitlist />
      <SectionDivider />
      <Discovery />
      <SectionDivider />
      <PromptBook />
      <SectionDivider />
    </main>
  );
}
