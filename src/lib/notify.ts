import type { DiscoveryPayload } from "./validation";

function readEmailConfig(): { apiKey: string; to: string; from: string } | undefined {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.DISCOVERY_NOTIFY_EMAIL?.trim();
  const from = process.env.DISCOVERY_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) return undefined;
  return { apiKey, to, from };
}

type OutboundEmail = {
  subject: string;
  text: string;
  replyTo?: string;
};

async function sendWithResend(message: OutboundEmail, logLabel: string): Promise<boolean> {
  const config = readEmailConfig();
  if (!config) {
    console.info(`[${logLabel}] email notify skipped (not configured)`);
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: message.subject,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
    });

    if (!response.ok) {
      console.error(`[${logLabel}] email notify failed`, response.status, await response.text());
      return false;
    }

    const sent = (await response.json()) as { id?: string };
    console.info(`[${logLabel}] email sent`, sent.id ?? "accepted");
    return true;
  } catch (error) {
    console.error(`[${logLabel}] email notify failed`, error);
    return false;
  }
}

export async function notifyLeadByEmail(payload: DiscoveryPayload): Promise<boolean> {
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company}`,
    `Role: ${payload.role}`,
    `Org size: ${payload.teamSize}`,
    `Stack: ${payload.stack.join(", ")}`,
    `Window: ${payload.preferredTime}`,
    "",
    payload.challenge,
  ].join("\n");

  return sendWithResend(
    {
      subject: `Discovery lead — ${payload.company}`,
      text,
    },
    "discovery",
  );
}

export async function notifyWaitlistByEmail(email: string): Promise<boolean> {
  return sendWithResend(
    {
      subject: `Consulting waitlist — ${email}`,
      replyTo: email,
      text: ["New consulting waitlist signup.", "", `Email: ${email}`].join("\n"),
    },
    "waitlist",
  );
}
