import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";

const points = [
  [16, 86],
  [70, 78],
  [124, 70],
  [178, 74],
  [232, 58],
  [286, 62],
  [340, 44],
  [394, 36],
] as const;

const line = points.map(([x, y]) => `${x},${y}`).join(" ");

export function CaseVisual() {
  return (
    <section id="example" className="scroll-mt-24 bg-cream py-8 sm:py-10">
      <Container>
        <Reveal className="mx-auto max-w-3xl">
          {/* TODO: Replace with real anonymized case data when provided. */}
          <Frame className="p-5 sm:p-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-pine uppercase">
              Example illustration, not a client result.
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-pine">
              Flake trend
            </h2>
            <svg
              viewBox="0 0 420 140"
              role="img"
              aria-label="Example illustration of a downward flake trend. Not a client result."
              className="mt-6 h-auto w-full"
            >
              <line x1="16" y1="16" x2="16" y2="112" stroke="#083020" strokeOpacity="0.35" strokeWidth="1" />
              <line x1="16" y1="112" x2="404" y2="112" stroke="#083020" strokeOpacity="0.35" strokeWidth="1" />
              <polyline
                fill="none"
                stroke="#083020"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={line}
              />
              {points.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="#083020" />
              ))}
            </svg>
            <p className="mt-3 text-sm text-pine">Example illustration, not a client result.</p>
          </Frame>
        </Reveal>
      </Container>
    </section>
  );
}
