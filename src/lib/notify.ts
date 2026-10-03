import type { DiscoveryPayload } from "./validation";

function readEmailConfig(): { apiKey: string; to: string; from: string } | undefined {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.DISCOVERY_NOTIFY_EMAIL?.trim();
  const from = process.env.DISCOVERY_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) return undefined;
  return { apiKey, to, from };
}

export async function notifyLeadByEmail(payload: DiscoveryPayload): Promise<boolean> {
  const config = readEmailConfig();
  if (!config) {
    console.info("[discovery] email notify skipped (not configured)");
    return false;
  }

  const body = [
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
        subject: `Discovery lead — ${payload.company}`,
        text: body,
      }),
    });

    if (!response.ok) {
      console.error("[discovery] email notify failed", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("[discovery] email notify failed", error);
    return false;
  }
}
