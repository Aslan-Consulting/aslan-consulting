"use client";

import { FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { isWaitlistApiResponse } from "@/lib/api";
import { validateWaitlist } from "@/lib/validation";

type Status = "idle" | "submitting" | "success";

export function Waitlist() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateWaitlist({ email, website });
    if (!result.ok) {
      setError(result.message);
      setStatus("idle");
      return;
    }

    setError("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: result.email, website: result.website }),
      });

      let payload: unknown;
      try {
        payload = await response.json();
      } catch {
        setError("Something went wrong. Retry in a moment.");
        setStatus("idle");
        return;
      }

      if (!isWaitlistApiResponse(payload) || !payload.ok) {
        const message =
          isWaitlistApiResponse(payload) && !payload.ok
            ? payload.message
            : "Something went wrong. Retry in a moment.";
        setError(message);
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setError("Network error. Check the connection and retry.");
      setStatus("idle");
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-24 border-b border-zinc-200/80 bg-white py-20 sm:py-24">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <SectionHeading
            kicker="Consulting"
            title="Join the consulting waitlist"
            description="Capacity for new framework engagements is limited. Leave a work email and we will write when a window opens. No course and no newsletter."
          />
          <Frame className="p-6 sm:p-8">
            {status === "success" ? (
              <p className="text-base font-medium text-zinc-900" role="status">
                You&apos;re on the list. We&apos;ll email you when a consulting window opens.
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
                    inputMode="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Work email"
                    disabled={status === "submitting"}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:opacity-60"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                  />
                  {error ? (
                    <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  ) : null}
                </div>
                <div hidden className="hidden" aria-hidden="true">
                  <label htmlFor={`${id}-website`}>Website</label>
                  <input
                    id={`${id}-website`}
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </div>
                <Button type="submit" className="shrink-0" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : "Join waitlist"}
                </Button>
              </form>
            )}
          </Frame>
        </Reveal>
      </Container>
    </section>
  );
}
