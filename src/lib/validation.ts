import { roles, stacks, teamSizes, timeWindows } from "./site";

export type DiscoveryPayload = {
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  stack: string[];
  challenge: string;
  preferredTime: string;
  website: string;
};

export type FieldErrors = Partial<Record<keyof DiscoveryPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim());
}

export function validateDiscovery(
  input: unknown,
): { ok: true; value: DiscoveryPayload } | { ok: false; errors: FieldErrors } {
  if (typeof input !== "object" || input === null) {
    return {
      ok: false,
      errors: { name: "Submit a complete form." },
    };
  }

  const data = input as Record<string, unknown>;
  const errors: FieldErrors = {};

  const name = asString(data.name);
  const email = asString(data.email).toLowerCase();
  const company = asString(data.company);
  const role = asString(data.role);
  const teamSize = asString(data.teamSize);
  const stack = asStringArray(data.stack);
  const challenge = asString(data.challenge);
  const preferredTime = asString(data.preferredTime);
  const website = asString(data.website);

  if (name.length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid work email.";
  if (company.length < 2) errors.company = "Enter your company name.";
  if (!roles.includes(role as (typeof roles)[number])) {
    errors.role = "Select the closest role.";
  }
  if (!teamSizes.includes(teamSize as (typeof teamSizes)[number])) {
    errors.teamSize = "Select an engineering org size.";
  }
  if (stack.length === 0 || stack.some((item) => !stacks.includes(item as (typeof stacks)[number]))) {
    errors.stack = "Select at least one current stack.";
  }
  if (challenge.length < 24) {
    errors.challenge = "Give us at least a sentence on the constraint.";
  }
  if (challenge.length > 2000) {
    errors.challenge = "Keep this under 2,000 characters.";
  }
  if (!timeWindows.includes(preferredTime as (typeof timeWindows)[number])) {
    errors.preferredTime = "Choose a preferred window.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      company,
      role,
      teamSize,
      stack,
      challenge,
      preferredTime,
      website,
    },
  };
}
