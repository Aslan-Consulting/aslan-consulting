"use client";

import { FocusEvent, FormEvent, useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { isDiscoveryApiResponse } from "@/lib/api";
import { buildBookingUrl } from "@/lib/booking";
import { roles, stacks, teamSizes, timeWindows } from "@/lib/site";
import {
  validateDiscovery,
  type DiscoveryPayload,
  type FieldErrors,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";
type VisibleField = Exclude<keyof DiscoveryPayload, "website">;

const initial: DiscoveryPayload = {
  name: "",
  email: "",
  company: "",
  role: "",
  teamSize: "",
  stack: [],
  challenge: "",
  preferredTime: "",
  website: "",
};

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-400" role="alert">
      {message}
    </p>
  );
}

export function DiscoveryForm() {
  const formId = useId();
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState<Partial<Record<VisibleField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [calendarUrl, setCalendarUrl] = useState<string | undefined>();

  const ids = useMemo(
    () => ({
      name: `${formId}-name`,
      email: `${formId}-email`,
      company: `${formId}-company`,
      role: `${formId}-role`,
      teamSize: `${formId}-teamSize`,
      stack: `${formId}-stack`,
      challenge: `${formId}-challenge`,
      preferredTime: `${formId}-preferredTime`,
    }),
    [formId],
  );

  const validation = validateDiscovery(values);
  const errors: FieldErrors = validation.ok ? {} : validation.errors;

  function shown(field: VisibleField): string | undefined {
    if (!(attempted || touched[field])) return undefined;
    return errors[field];
  }

  function markTouched(field: VisibleField) {
    setTouched((current) => (current[field] ? current : { ...current, [field]: true }));
  }

  function onStackBlur(event: FocusEvent<HTMLFieldSetElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    markTouched("stack");
  }

  function toggleStack(item: string) {
    setValues((current) => ({
      ...current,
      stack: current.stack.includes(item)
        ? current.stack.filter((entry) => entry !== item)
        : [...current.stack, item],
    }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setServerMessage("");
    setCalendarUrl(undefined);

    const result = validateDiscovery(values);
    if (!result.ok) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });

      let payload: unknown;
      try {
        payload = await response.json();
      } catch {
        setServerMessage("Something went wrong. Retry in a moment.");
        setStatus("error");
        return;
      }

      if (!isDiscoveryApiResponse(payload) || !payload.ok) {
        const failed = isDiscoveryApiResponse(payload) && !payload.ok ? payload : undefined;
        setServerMessage(failed?.message ?? "Something went wrong. Retry in a moment.");
        setStatus("error");
        return;
      }

      const bookingUrl = result.value.website
        ? undefined
        : (payload.bookingUrl ?? buildBookingUrl(result.value.name, result.value.email));

      setValues(initial);
      setTouched({});
      setAttempted(false);
      setCalendarUrl(bookingUrl);
      setStatus("success");

      if (bookingUrl) {
        window.location.assign(bookingUrl);
      }
    } catch {
      setServerMessage("Network error. Check the connection and retry.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-950/50"
        role="status"
      >
        <p className="text-xs font-medium tracking-[0.14em] text-cyan-600 uppercase dark:text-cyan-400">
          Received
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          We have the brief.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {calendarUrl
            ? "Opening the calendar so you can pick a 30-minute window. Come ready to talk about the pipeline, not a pitch deck."
            : "A partner will reply to the work email you provided with 30-minute options. Come ready to talk about the pipeline, not a pitch deck."}
        </p>
        {calendarUrl ? (
          <p className="mt-4 text-sm">
            <a
              href={calendarUrl}
              className="font-medium text-cyan-600 underline-offset-4 hover:underline dark:text-cyan-400"
            >
              Continue to calendar
            </a>
            <span className="text-zinc-500"> if you were not redirected.</span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Calendar booking is not configured on this environment. We will follow up by email.
          </p>
        )}
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-600";

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Name
          </label>
          <input
            id={ids.name}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
            onBlur={() => markTouched("name")}
            className={inputClass}
            aria-invalid={Boolean(shown("name"))}
            aria-describedby={shown("name") ? `${ids.name}-error` : undefined}
          />
          <FieldError id={`${ids.name}-error`} message={shown("name")} />
        </div>
        <div>
          <label htmlFor={ids.email} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Work email
          </label>
          <input
            id={ids.email}
            name="email"
            type="text"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
            onBlur={() => markTouched("email")}
            className={inputClass}
            aria-invalid={Boolean(shown("email"))}
            aria-describedby={shown("email") ? `${ids.email}-error` : undefined}
          />
          <FieldError id={`${ids.email}-error`} message={shown("email")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.company} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Company
          </label>
          <input
            id={ids.company}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))}
            onBlur={() => markTouched("company")}
            className={inputClass}
            aria-invalid={Boolean(shown("company"))}
            aria-describedby={shown("company") ? `${ids.company}-error` : undefined}
          />
          <FieldError id={`${ids.company}-error`} message={shown("company")} />
        </div>
        <div>
          <label htmlFor={ids.role} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Role
          </label>
          <select
            id={ids.role}
            name="role"
            value={values.role}
            onChange={(event) => setValues((current) => ({ ...current, role: event.target.value }))}
            onBlur={() => markTouched("role")}
            className={inputClass}
            aria-invalid={Boolean(shown("role"))}
            aria-describedby={shown("role") ? `${ids.role}-error` : undefined}
          >
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <FieldError id={`${ids.role}-error`} message={shown("role")} />
        </div>
      </div>

      <div>
        <label htmlFor={ids.teamSize} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Engineering org size
        </label>
        <select
          id={ids.teamSize}
          name="teamSize"
          value={values.teamSize}
          onChange={(event) => setValues((current) => ({ ...current, teamSize: event.target.value }))}
          onBlur={() => markTouched("teamSize")}
          className={inputClass}
          aria-invalid={Boolean(shown("teamSize"))}
          aria-describedby={shown("teamSize") ? `${ids.teamSize}-error` : undefined}
        >
          <option value="">Select size</option>
          {teamSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <FieldError id={`${ids.teamSize}-error`} message={shown("teamSize")} />
      </div>

      <fieldset
        onBlur={onStackBlur}
        aria-describedby={shown("stack") ? `${ids.stack}-error` : undefined}
      >
        <legend className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Current stack</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {stacks.map((item) => {
            const checked = values.stack.includes(item);
            return (
              <label
                key={item}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
                  checked
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-800 dark:text-cyan-300"
                    : "border-zinc-200 text-zinc-500 hover:text-zinc-900 dark:border-zinc-800 dark:hover:text-zinc-50"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleStack(item)}
                />
                <span
                  aria-hidden
                  className={`pointer-events-none h-3.5 w-3.5 rounded-md border ${
                    checked
                      ? "border-cyan-400 bg-cyan-400"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                />
                {item}
              </label>
            );
          })}
        </div>
        <FieldError id={`${ids.stack}-error`} message={shown("stack")} />
      </fieldset>

      <div>
        <label htmlFor={ids.challenge} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Current constraint
        </label>
        <textarea
          id={ids.challenge}
          name="challenge"
          rows={5}
          value={values.challenge}
          onChange={(event) => setValues((current) => ({ ...current, challenge: event.target.value }))}
          onBlur={() => markTouched("challenge")}
          className={`${inputClass} resize-y`}
          placeholder="Where the suite, pipeline, or ownership model is failing — be specific."
          aria-invalid={Boolean(shown("challenge"))}
          aria-describedby={shown("challenge") ? `${ids.challenge}-error` : undefined}
        />
        <FieldError id={`${ids.challenge}-error`} message={shown("challenge")} />
      </div>

      <div>
        <label htmlFor={ids.preferredTime} className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Preferred window
        </label>
        <select
          id={ids.preferredTime}
          name="preferredTime"
          value={values.preferredTime}
          onChange={(event) =>
            setValues((current) => ({ ...current, preferredTime: event.target.value }))
          }
          onBlur={() => markTouched("preferredTime")}
          className={inputClass}
          aria-invalid={Boolean(shown("preferredTime"))}
          aria-describedby={shown("preferredTime") ? `${ids.preferredTime}-error` : undefined}
        >
          <option value="">Select a window</option>
          {timeWindows.map((window) => (
            <option key={window} value={window}>
              {window}
            </option>
          ))}
        </select>
        <FieldError id={`${ids.preferredTime}-error`} message={shown("preferredTime")} />
      </div>

      <div hidden className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))}
        />
      </div>

      {serverMessage ? (
        <p className="text-sm text-red-400" role="alert">
          {serverMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Request a discovery call"}
        </Button>
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          Used to prepare the call. No newsletter, no sequence.
        </p>
      </div>
    </form>
  );
}
