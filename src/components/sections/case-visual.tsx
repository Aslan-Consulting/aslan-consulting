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
    <section id="example" className="scroll-mt-24 border-b border-zinc-200/80 bg-[#f7f6f2] py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-3xl">
          {/* TODO: Replace with real anonymized case data when provided. */}
          <Frame className="p-6 sm:p-8">
            <p className="text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase">
              Example illustration, not a client result.
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900">
              Flake trend
            </h2>
            <svg
              viewBox="0 0 420 140"
              role="img"
              aria-label="Example illustration of a downward flake trend. Not a client result."
              className="mt-6 h-auto w-full"
            >
              <line x1="16" y1="16" x2="16" y2="112" stroke="#d4d4d8" strokeWidth="1" />
              <line x1="16" y1="112" x2="404" y2="112" stroke="#d4d4d8" strokeWidth="1" />
              <polyline
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={line}
              />
              {points.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="#16a34a" />
              ))}
            </svg>
            <p className="mt-4 text-sm text-zinc-500">Example illustration, not a client result.</p>
          </Frame>
        </Reveal>
      </Container>
    </section>
  );
}
