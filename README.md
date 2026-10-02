# Aslan Consulting LLC

Marketing site for Aslan Consulting LLC — a boutique QA and SDET firm focused on centralized test framework architecture and distributed engineering pods.

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

Error (`400` / `500`):

```json
{ "ok": false, "message": "Check the highlighted fields.", "errors": { "email": "Enter a valid work email." } }
```

`data/leads.jsonl` is gitignored. On serverless hosts the filesystem is ephemeral — wire the handler to email or a CRM before production traffic.

## Open Graph

`/og-image.png` is a 1200×630 image (dark zinc canvas, cyan metrics — no emerald). Served by `src/app/og-image.png/route.tsx` (`next/og` ImageResponse) and copied to `public/og-image.png` for crawlers. Metadata in `src/app/layout.tsx` points at that URL via `metadataBase`.

## Project layout

```
src/app/                 layout, homepage, icon, OG image, API route
src/components/layout/   header, footer
src/components/sections/ hero, services, approach, pricing, discovery
src/components/theme/    provider + toggle
src/components/ui/       container, frame, button, headings
src/lib/                 validation, API types, booking URL, lead storage, SEO
```
