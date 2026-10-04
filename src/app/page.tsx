import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { Discovery } from "@/components/sections/discovery";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <Services />
      <About />
      <Approach />
      <Pricing />
      <Discovery />
    </main>
  );
}
