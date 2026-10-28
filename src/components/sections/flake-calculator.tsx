"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Field = "tests" | "flakeRate" | "minutes" | "runs";

const fields: { key: Field; label: string; suffix: string }[] = [
  { key: "tests", label: "Tests in the suite", suffix: "tests" },
  { key: "flakeRate", label: "Flake rate", suffix: "%" },
  { key: "minutes", label: "Minutes lost per flaky run", suffix: "min" },
  { key: "runs", label: "Runs per month", suffix: "runs" },
];

const empty = { tests: "", flakeRate: "", minutes: "", runs: "" };

function toNumber(value: string) {
  if (value.trim() === "") return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function FlakeCalculator() {
  const [input, setInput] = useState(empty);

  const numbers = useMemo(
    () => ({
      tests: toNumber(input.tests),
      flakeRate: Math.min(100, toNumber(input.flakeRate)),
      minutes: toNumber(input.minutes),
      runs: toNumber(input.runs),
    }),
    [input],
  );

  const hours =
    (numbers.tests * (numbers.flakeRate / 100) * numbers.minutes * numbers.runs) / 60;

  const shown = Number.isFinite(hours) ? hours.toLocaleString(undefined, { maximumFractionDigits: 1 }) : "0";

  return (
    <section id="flake-cost" className="scroll-mt-24 border-b border-zinc-200/80 bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Estimate"
            title="What is flakiness costing you?"
            description="tests × (flake rate ÷ 100) × minutes lost × runs per month ÷ 60 = wasted hours per month."
          />
          <Frame className="mt-10 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <label key={field.key} className="block text-sm font-medium text-zinc-800">
                  {field.label}
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={field.key === "flakeRate" ? 100 : undefined}
                    step="any"
                    value={input[field.key]}
                    onChange={(event) =>
                      setInput((current) => ({ ...current, [field.key]: event.target.value }))
                    }
                    className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm font-normal text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  />
                </label>
              ))}
            </div>
            <p className="mt-6 font-mono text-sm leading-relaxed text-zinc-700">
              {numbers.tests} × ({numbers.flakeRate} ÷ 100) × {numbers.minutes} × {numbers.runs} ÷ 60 = {shown} hours
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums">
              {shown} <span className="text-lg font-medium text-zinc-500">hours / month</span>
            </p>
            <p className="mt-2 text-sm text-zinc-500">Estimate only, based on the numbers you enter.</p>
          </Frame>
        </Reveal>
      </Container>
    </section>
  );
}
