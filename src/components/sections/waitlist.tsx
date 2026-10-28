"use client";

import { FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const STORAGE_KEY = "testing-explained-waitlist-email";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function Waitlist() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!isEmail(value)) {
      setError("Enter a valid email.");
      setJoined(false);
      return;
    }

    // TODO: Connect a real email provider or backend for the QA course waitlist.
    window.localStorage.setItem(STORAGE_KEY, value);
    setError("");
    setJoined(true);
  }

  return (
    <section id="waitlist" className="scroll-mt-24 border-b border-zinc-200/80 bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <SectionHeading
          kicker="Course"
          title="Get the QA course waitlist"
          description="Join the waitlist for the Agentic AI for QA course - The Lead's Playbook. No spam, one email when it opens."
        />
        <Frame className="p-6 sm:p-8">
          {joined ? (
            <p className="text-base font-medium text-zinc-900" role="status">
              You&apos;re on the list.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">
                <label htmlFor={id} className="sr-only">
                  Email
                </label>
                <input
                  id={id}
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Work email"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${id}-error` : undefined}
                />
                {error ? (
                  <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
                    {error}
                  </p>
                ) : null}
              </div>
              <Button type="submit" className="shrink-0">
                Join waitlist
              </Button>
            </form>
          )}
        </Frame>
        </Reveal>
      </Container>
    </section>
  );
}
