import type { FieldErrors } from "./validation";

export type DiscoverySuccessResponse = {
  ok: true;
  bookingUrl?: string;
};

export type DiscoveryErrorResponse = {
  ok: false;
  message: string;
  errors?: FieldErrors;
};

export type DiscoveryApiResponse = DiscoverySuccessResponse | DiscoveryErrorResponse;

export function isDiscoveryApiResponse(value: unknown): value is DiscoveryApiResponse {
  if (typeof value !== "object" || value === null) return false;
  if (!("ok" in value)) return false;

  const candidate = value as { ok: unknown; bookingUrl?: unknown; message?: unknown; errors?: unknown };
  if (candidate.ok === true) {
    return candidate.bookingUrl === undefined || typeof candidate.bookingUrl === "string";
  }
  if (candidate.ok === false) {
    return typeof candidate.message === "string";
  }
  return false;
}
