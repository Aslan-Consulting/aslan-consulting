import { NextResponse } from "next/server";
import type { DiscoveryApiResponse } from "@/lib/api";
import { buildBookingUrl } from "@/lib/booking";
import { storeLead } from "@/lib/leads";
import { notifyLeadByEmail } from "@/lib/notify";
import { validateDiscovery } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    const payload: DiscoveryApiResponse = {
      ok: false,
      message: "The request body was not valid JSON.",
    };
    return NextResponse.json(payload, { status: 400 });
  }

  const result = validateDiscovery(body);

  if (!result.ok) {
    const payload: DiscoveryApiResponse = {
      ok: false,
      errors: result.errors,
      message: "Check the highlighted fields.",
    };
    return NextResponse.json(payload, { status: 400 });
  }

  if (result.value.website) {
    const payload: DiscoveryApiResponse = { ok: true };
    return NextResponse.json(payload);
  }

  try {
    const persisted = await storeLead(result.value);
    if (!persisted) {
      await notifyLeadByEmail(result.value);
    }
  } catch (error) {
    console.error("[discovery] persist/notify failed", error);
  }

  const bookingUrl = buildBookingUrl(result.value.name, result.value.email);
  const payload: DiscoveryApiResponse = bookingUrl
    ? { ok: true, bookingUrl }
    : { ok: true };

  return NextResponse.json(payload);
}
