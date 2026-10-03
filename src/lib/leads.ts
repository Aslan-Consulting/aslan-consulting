import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { DiscoveryPayload } from "./validation";

export type StoredLead = Omit<DiscoveryPayload, "website"> & {
  receivedAt: string;
};

export async function storeLead(payload: DiscoveryPayload): Promise<boolean> {
  const record: StoredLead = {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    role: payload.role,
    teamSize: payload.teamSize,
    stack: payload.stack,
    challenge: payload.challenge,
    preferredTime: payload.preferredTime,
    receivedAt: new Date().toISOString(),
  };

  console.info("[discovery] new lead", {
    company: record.company,
    role: record.role,
    email: record.email,
    receivedAt: record.receivedAt,
  });

  try {
    const dir = path.join(process.cwd(), "data");
    const file = path.join(dir, "leads.jsonl");
    await mkdir(dir, { recursive: true });
    await appendFile(file, `${JSON.stringify(record)}\n`, "utf8");
    return true;
  } catch (error) {
    console.error("[discovery] failed to persist lead", error);
    return false;
  }
}
