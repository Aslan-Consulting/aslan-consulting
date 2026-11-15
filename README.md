# Testing Explained

Marketing site for Testing Explained — a boutique QA and SDET brand (Aslan Consulting LLC) focused on centralized test framework architecture and distributed engineering pods.

Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Environment

Copy `.env.example` to `.env.local` and adjust:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin for Open Graph URLs. Falls back to `http://localhost:3000`. |
| `NEXT_PUBLIC_CAL_BOOKING_URL` | Cal.com or Calendly event URL. After a successful discovery submit, the browser is sent here with `name` and `email` query params. |
| `NEXT_PUBLIC_CALENDLY_URL` / `CALENDLY_URL` | Optional aliases. The first non-empty value wins. |
| `RESEND_API_KEY` | Resend API key. Required with the two addresses below to send mail. |
| `DISCOVERY_NOTIFY_EMAIL` | Inbox for discovery fallback and consulting waitlist signups. Use `majdaslan4@gmail.com`. |
| `DISCOVERY_FROM_EMAIL` | Verified Resend from address, e.g. `Aslan Consulting <noreply@aslan.consulting>`. |

Example redirect:

```
https://cal.com/aslan-consulting/discovery?name=Jordan+Hale&email=jordan%40acme.com
```

Calendly uses the same `name` and `email` keys. If no booking URL is set, the form still succeeds and shows a follow-up message instead of redirecting.

## Discovery API

`POST /api/discovery`

Validates name, work email, company, role, org size, stack, constraint, and preferred window (shared schema with the client). Honeypot field: `website`. Accepted leads are appended to `data/leads.jsonl`.

Success:

```json
{ "ok": true, "bookingUrl": "https://cal.com/...?name=...&email=..." }
```

`bookingUrl` is omitted when calendar env is unset, or when the honeypot is filled.

Error (`400`):

```json
{ "ok": false, "message": "Check the highlighted fields.", "errors": { "email": "Enter a valid email." } }
```

`data/leads.jsonl` is gitignored. File-write failures (typical on Vercel) are logged and do not fail the request. If `RESEND_API_KEY`, `DISCOVERY_NOTIFY_EMAIL`, and `DISCOVERY_FROM_EMAIL` are set, the handler emails the lead instead. Otherwise the submit still returns `{ ok: true }` and the lead is in server logs.

## Waitlist API

`POST /api/waitlist`

Homepage consulting waitlist. Validates a single email (same pattern as discovery) and emails it to `DISCOVERY_NOTIFY_EMAIL` through Resend. There is no course list and no mail to the subscriber.

Success:

```json
{ "ok": true }
```

The same `{ ok: true }` is returned when the honeypot field `website` is filled, and no email is sent.

Error (`400` validation, `502` when Resend is unset or the send fails):

```json
{ "ok": false, "message": "Enter a valid email." }
```

The form stays on the error and does not show the confirmation until the notify call succeeds.

## Open Graph

`/og-image.png` is a 1200×630 image (dark zinc canvas, cyan metrics — no emerald). Served by `src/app/og-image.png/route.tsx` (`next/og` ImageResponse) and copied to `public/og-image.png` for crawlers. Metadata in `src/app/layout.tsx` points at that URL via `metadataBase`.

## Project layout

```
src/app/                 layout, homepage, icon, OG image, discovery and waitlist API routes
src/components/layout/   header, footer
src/components/sections/ hero, services, approach, pricing, discovery
src/components/theme/    provider + toggle
src/components/ui/       container, frame, button, headings
src/lib/                 validation, API types, booking URL, lead storage, SEO
```
