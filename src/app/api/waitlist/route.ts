import { NextResponse } from "next/server";
import type { WaitlistApiResponse } from "@/lib/api";
import { notifyWaitlistByEmail } from "@/lib/notify";
import { validateWaitlist } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    const payload: WaitlistApiResponse = {
      ok: false,
      message: "The request body was not valid JSON.",
    };
    return NextResponse.json(payload, { status: 400 });
  }

  const result = validateWaitlist(body);
  if (!result.ok) {
    const payload: WaitlistApiResponse = {
      ok: false,
      message: result.message,
    };
    return NextResponse.json(payload, { status: 400 });
  }

  if (result.website) {
    const payload: WaitlistApiResponse = { ok: true };
    return NextResponse.json(payload);
  }

  console.info("[waitlist] signup", { email: result.email });

  const sent = await notifyWaitlistByEmail(result.email);
  if (!sent) {
    const payload: WaitlistApiResponse = {
      ok: false,
      message: "We could not send that signup. Try again in a moment.",
    };
    return NextResponse.json(payload, { status: 502 });
  }

  return NextResponse.json({ ok: true } satisfies WaitlistApiResponse);
}
