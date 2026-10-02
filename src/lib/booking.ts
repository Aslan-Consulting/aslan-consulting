function readBookingBaseUrl(): string | undefined {
  const candidates = [
    process.env.NEXT_PUBLIC_CAL_BOOKING_URL,
    process.env.NEXT_PUBLIC_CALENDLY_URL,
    process.env.CALENDLY_URL,
  ];

  for (const candidate of candidates) {
    const trimmed = candidate?.trim();
    if (trimmed) return trimmed;
  }

  return undefined;
}

export function buildBookingUrl(name: string, email: string): string | undefined {
  const base = readBookingBaseUrl();
  if (!base) return undefined;

  try {
    const url = new URL(base);
    url.searchParams.set("name", name);
    url.searchParams.set("email", email);
    return url.toString();
  } catch {
    return undefined;
  }
}
