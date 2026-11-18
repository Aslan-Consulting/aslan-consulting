# TASK-003 baseline report

Captured 18 Nov 2026, before any remodel code, from branch `task-003-remodel` at commit `0c37e40` (identical to `origin/main`).

Files in this folder:

| File | What it is |
| --- | --- |
| `desktop-1440-full.png` | Full-page screenshot, 1440 x 8706 px |
| `mobile-390-full.png` | Full-page screenshot, 390 x 11783 px |
| `measurements.json` | Page height and per-section position, height and background at both viewports |
| `desktop-1440-content.json`, `mobile-390-content.json` | Rendered copy of every section and every link with its destination |
| `forms.json` | Flake calculator, waitlist form and discovery form behaviour |

## 1. Capture method (use the same for every later comparison)

1. Build and serve the commit locally: `npm run build`, then `npm run start -- --port 3100`.
2. Screenshots and heights: `node docs/task-003/capture.mjs http://localhost:3100/ <output-folder>`
3. Form and calculator behaviour: `node docs/task-003/forms-check.mjs http://localhost:3100/ <output-folder>`

What the scripts fix in place:

- Browser: installed Google Chrome, headless, driven over the DevTools Protocol. Baseline version: Chrome 157.0.8103.51. Node 24.4.1.
- Zoom 100%: device scale factor 1, page scale 1.
- Viewports: 1440 x 900 (desktop) and 390 x 844 (mobile emulation, device scale factor 1, no user-agent change).
- Scrollbars hidden, so the layout width is exactly 1440 and 390.
- `prefers-reduced-motion: reduce` is forced, so reveal and count-up animations are in their final state.
- The page is scrolled top to bottom once, returned to the top, then left for 1.5 s and until fonts are ready.
- Height is `document.documentElement.scrollHeight`.
- Screenshot is `Page.captureScreenshot` with `captureBeyondViewport`, clipped to the full document.
- FAQ items are closed in the screenshots and heights (their default state).

Repeatability: two consecutive runs produced byte-identical screenshots at both viewports.

If Chrome has updated by the time of a comparison, re-capture this baseline from commit `0c37e40` with the new Chrome first, so both sides use the same browser version.

The forms check must only be run against a local server. A valid discovery submit appends one line to `data/leads.jsonl` (gitignored); the file was restored to its previous contents after the baseline runs.

## 2. Homepage height

| Viewport | Total height | In screens |
| --- | --- | --- |
| Desktop 1440 x 900 | 8706 px | 9.7 screens |
| Mobile 390 x 844 | 11783 px | 14.0 screens |

## 3. Section order and heights

| # | Section | Anchor id | Background | Desktop height | Mobile height |
| --- | --- | --- | --- | --- | --- |
| - | Header (sticky) | - | cream, 85% opaque | 73 | 73 |
| 1 | Hero | - | cream `#f7f6f2` | 754 | 1048 |
| 2 | Services | `services` | white | 1459 | 2478 |
| 3 | About | `about` | white | 265 | 257 |
| 4 | Example chart | `example` | cream | 577 | 411 |
| 5 | Flake calculator | `flake-cost` | white | 724 | 894 |
| 6 | How it works | `how-it-works` | cream | 1008 | 1055 |
| 7 | Pricing | `pricing` | white | 1060 | 1793 |
| 8 | FAQ | `faq` | cream | 587 | 587 |
| 9 | Waitlist | `waitlist` | white | 336 | 547 |
| 10 | Discovery | `discovery` | cream | 1019 | 1492 |
| 11 | Prompt Book | `prompt-book` | white | 551 | 561 |
| - | Footer | - | white | 295 | 587 |

## 4. Exact copy, section by section

Kickers are written in sentence case in the code and displayed in uppercase by CSS.

### Header

- Logo: mark image `/testing-explained-mark.png` plus the text "Testing Explained", linking to `/`.
- Navigation: Services, How it works, Pricing, Book a call.
- Button: Book a call.
- Hidden skip link: Skip to content.

### 1. Hero

- Kicker: Testing Explained
- Headline: A testing system your team can own, built to ship faster with fewer flakes.
- Sub-headline: We design a single Playwright architecture your product org actually owns, then staff distributed SDET pods against it.
- Buttons: Book a discovery call; View services.
- Stats:
  - <2% / Test flakiness / Treated as an SLO, not a Slack thread.
  - 3× / Delivery velocity / Earlier, cheaper signal in the PR loop.
  - 40% / Fewer merge conflicts / Smaller, greener diffs from a shared platform.

### 2. Services

- Kicker: Services
- Headline: Architecture first. Capacity second.
- Description: Most QA spend goes into more tests on an unstable base. We invert that: a centralized framework, then pods that ship against it.

Service 1. Tag: Playwright. Title: Playwright test architecture.
Lead: One system of record for fixtures, auth, traces, and reporting — not a suite per squad.

- Layered page objects and test IDs that survive product redesigns
- Shared auth, seed, and environment contracts instead of copy-paste helpers
- Parallelization mapped to CI budget, with traces you can actually debug
- A documented ownership model so the framework does not fork in Q3

Service 2. Tag: CI / CD. Title: CI/CD pipeline integration.
Lead: PR gates that encode risk, not theater. Green means shippable.

- Sharding, artifact retention, and retry policy with a stated cause
- Selectors for smoke vs. deep suites so merge queues stay honest
- Failure taxonomy wired into Slack/Jira without becoming noise
- Earlier signal in the loop — the mechanism behind 3× delivery velocity

Service 3. Tag: Reliability. Title: Test flakiness eradication.
Lead: Flake is an SLO. We put a budget, an owner, and a quarantine path on it.

- Root-cause classes: race, environment, selector, data, third-party
- Deterministic waits and network stubs where the product is not the test
- Quarantine with expiry — no eternal skipped specs
- Dashboards that make <2% flake a managed number, not a wish

Service 4. Tag: SDET pods. Title: Distributed SDET pods.
Lead: Embedded engineers, your backlog, our platform. Capacity without a hiring freeze.

- Pods staffed against the shared architecture, not a private toolbox
- Coverage mapped to risk: money paths, auth, migrations, release trains
- Knowledge transfer written into the engagement, not left as folklore
- A quality function that behaves like platform engineering

Service 5. Tag: Platform. Title: Framework ownership.
Lead: We keep the platform current after the standing-up is done.

- Playwright and browser-matrix upgrades on a cadence
- Pipeline health, flake tax, and office hours with your squads
- Guardrails so new tests land in the architecture, not beside it
- The monthly retainer is ownership, not a ticket dump

### 3. About

- Kicker: About
- Text: Led by a lead SDET with 10 years in test automation, focused on Playwright.

### 4. Example chart

- Label above the chart: Example illustration, not a client result.
- Heading: Flake trend
- Line chart (no numbers shown). Accessible label: Example illustration of a downward flake trend. Not a client result.
- Label below the chart: Example illustration, not a client result.

### 5. Flake calculator

- Kicker: Estimate
- Headline: What is flakiness costing you?
- Description: tests × (flake rate ÷ 100) × minutes lost × runs per month ÷ 60 = wasted hours per month.
- Fields: Tests in the suite; Flake rate; Minutes lost per flaky run; Runs per month.
- Formula line at rest: 0 × (0 ÷ 100) × 0 × 0 ÷ 60 = 0 hours
- Result at rest: 0 hours / month
- Note: Estimate only, based on the numbers you enter.

### 6. How it works

- Kicker: How it works
- Headline: How a director should buy quality work.
- Description: Short discovery. Written architecture. Then either a standing platform, embedded pods, or both. No retainers that exist to 'stay in the mix.'
- Step 01, Audit the real constraint: We read the pipeline, the flake report, and the merge queue — not a slide about 'quality culture.' You get a written diagnosis of architecture debt vs. staffing debt.
- Step 02, Stand up the platform: Fixtures, auth, reporting, and CI contracts land as a shared system. Squads stop inventing private helpers. This is the setup retainer.
- Step 03, Staff pods against it: Distributed SDET capacity runs on the platform we just made non-optional. Ownership stays with Testing Explained or transfers with a runbook — your call.
- Desktop-only side diagram titled "Platform path", repeating the three step numbers and titles.

### 7. Pricing

- Kicker: Pricing
- Headline: Setup retainers and monthly ownership. Stated as numbers.
- Description: Directors should be able to take this to finance without a 'let's hop on a call to discuss packages' fog. Scope is still scoped — the bands are real.

Framework Setup. Label: Engagement. Price: $5K–$10K. Under the price: upfront, typically 3–5 weeks.
Summary: A one-time architecture engagement. We replace scattered suites with a Playwright system of record and wire it into CI.

- Current-state audit of tests, pipelines, and flake sources
- Target architecture and ownership map
- Foundation: fixtures, auth, traces, reporting
- CI sharding, gates, and artifact policy
- Handoff runbook for your staff engineers

Note: Range depends on repo count, browser matrix, and how forked the current helpers are.

Platform Ownership. Label: Ongoing. Badge: Most orgs keep this. Price: $2.5K–$3.5K/mo. Under the price: per month, after setup.
Summary: Ongoing ownership of the platform. We keep Playwright current, hold the flake SLO, and keep new tests inside the architecture.

- Flake SLO ownership and quarantine with expiry
- Playwright and browser-matrix upgrades
- Pipeline health and merge-queue hygiene
- Office hours with squads shipping against the platform
- Monthly written status — numbers, not narrative

Note: Month-to-month after the first 30 days. This is maintenance of a system, not a body shop.

Closing paragraph: Combined engagements (setup plus the first quarter of ownership) are the usual starting point. SDET pods are scoped separately against the same platform — we will not staff a pod onto a framework we would not operate.

Button: Book a discovery call.

### 8. FAQ

- Kicker: FAQ
- Headline: Questions directors ask before the call.
- Why not just hire in-house? Setup ends with a handoff runbook so your staff engineers own the platform. Pods are additional capacity against that same system, scoped separately, when you need it.
- Does this work if we use Cypress? The platform we stand up is Playwright. If Cypress is what you run today, that is where the audit starts.
- How fast do we see results? Framework Setup is a one-time engagement, typically 3–5 weeks, at $5K–$10K. The site does not promise a result date beyond that window.
- What happens after setup? Platform Ownership is $2.5K–$3.5K per month after setup, month-to-month after the first 30 days. SDET pods are scoped separately against the same platform.
- How are SDET pods priced? Priced after the audit.

### 9. Waitlist

- Kicker: Consulting
- Headline: Join the consulting waitlist
- Description: Capacity for new framework engagements is limited. Leave a work email and we will write when a window opens.
- Field placeholder: Work email (screen-reader label: Email)
- Button: Join waitlist (while sending: Sending…)
- Success message: You're on the list. We'll email you when a consulting window opens.

### 10. Discovery

- Kicker: Discovery
- Headline: A 30-minute working session, not a demo.
- Description: Bring the pipeline pain: flake rate, merge queue delay, suite runtime, ownership gaps. We will leave you with an architecture sketch and a clear yes/no on fit.
- Fields: Name; Work email; Company; Role; Engineering org size; Current stack; Current constraint; Preferred window.
- Role options: Select role; VP Engineering; Engineering Director; Head of QA / QA Lead; Director of Quality; CTO; Staff / Principal Engineer; Other.
- Engineering org size options: Select size; 1–10; 11–25; 26–50; 51–100; 100+.
- Current stack options: Playwright; Cypress; Selenium; WebdriverIO; Jest / Vitest; Other.
- Current constraint placeholder: Where the suite, pipeline, or ownership model is failing — be specific.
- Preferred window options: Select a window; This week, mornings (US Eastern); This week, afternoons (US Eastern); Next week; Two weeks out; Async — send a calendar hold.
- Button: Request a discovery call (while sending: Sending…)
- Note beside the button: Used to prepare the call. No newsletter, no sequence.
- Success panel: Received / We have the brief. / then either "Opening the calendar so you can pick a 30-minute window. Come ready to talk about the pipeline, not a pitch deck." with the link "Continue to calendar" and " if you were not redirected.", or "A partner will reply to the work email you provided with 30-minute options. Come ready to talk about the pipeline, not a pitch deck." with "Calendar booking is not configured on this environment. We will follow up by email."

### 11. Prompt Book

- Kicker: Book
- Headline: The AI Tester's Prompt Book
- Body: Stop trusting the first AI answer. 100 prompts that actually test software — each with a real example and the checks to run on what the AI gives you back. By Testing Explained.
- Button: Get it on Amazon — Kindle $4.99
- Line under the button: Also in paperback — $11.99

### Footer

- Logo (same mark and text as the header).
- Testing Explained is a brand of Aslan Consulting LLC
- © 2026 Aslan Consulting LLC. All rights reserved.
- Icon links: Instagram; LinkedIn (placeholder).
- Quick links: Services; How it works; Pricing; Book a call.
- Legal: Privacy Policy; Terms of Service.

## 5. Every link and CTA destination

| Where | Text | Destination | New tab |
| --- | --- | --- | --- |
| Header | Skip to content | `#main` | no |
| Header | Logo "Testing Explained" | `/` | no |
| Header nav | Services | `/#services` | no |
| Header nav | How it works | `/#how-it-works` | no |
| Header nav | Pricing | `/#pricing` | no |
| Header nav | Book a call | `/#discovery` | no |
| Header button | Book a call | `/#discovery` | no |
| Hero | Book a discovery call | `#discovery` | no |
| Hero | View services | `#services` | no |
| Pricing | Book a discovery call | `#discovery` | no |
| Prompt Book | Get it on Amazon — Kindle $4.99 | `https://www.amazon.com/dp/B0HRQCQQ9G` | yes |
| Prompt Book | Also in paperback — $11.99 | `https://www.amazon.com/dp/B0HRSRB17J` | yes |
| Footer | Instagram icon | `https://www.instagram.com/testingexplained` | yes |
| Footer | LinkedIn icon (coming soon) | `#` (placeholder) | no |
| Footer quick links | Services | `/#services` | no |
| Footer quick links | How it works | `/#how-it-works` | no |
| Footer quick links | Pricing | `/#pricing` | no |
| Footer quick links | Book a call | `/#discovery` | no |
| Footer legal | Privacy Policy | `/privacy` | no |
| Footer legal | Terms of Service | `/terms` | no |

The mobile menu (below 768 px) shows the same four navigation links. Anchor ids `about`, `example`, `flake-cost`, `faq`, `waitlist` and `prompt-book` exist but nothing links to them.

## 6. Flake calculator examples

Formula: tests × (flake rate ÷ 100) × minutes lost × runs per month ÷ 60. Flake rate is capped at 100. Empty or negative input counts as 0. Results show at most one decimal place with thousands separators.

| Tests | Flake rate | Minutes lost | Runs per month | Formula line shown | Result shown |
| --- | --- | --- | --- | --- | --- |
| 500 | 5 | 10 | 200 | 500 × (5 ÷ 100) × 10 × 200 ÷ 60 = 833.3 hours | 833.3 hours / month |
| 1200 | 3 | 15 | 600 | 1200 × (3 ÷ 100) × 15 × 600 ÷ 60 = 5,400 hours | 5,400 hours / month |
| 80 | 12.5 | 4 | 90 | 80 × (12.5 ÷ 100) × 4 × 90 ÷ 60 = 60 hours | 60 hours / month |
| 300 | 150 | 10 | 100 | 300 × (100 ÷ 100) × 10 × 100 ÷ 60 = 5,000 hours | 5,000 hours / month |
| 250 | 0 | 10 | 100 | 250 × (0 ÷ 100) × 10 × 100 ÷ 60 = 0 hours | 0 hours / month |
| -50 | 5 | 10 | 100 | 0 × (5 ÷ 100) × 10 × 100 ÷ 60 = 0 hours | 0 hours / month |
| (all empty) | | | | 0 × (0 ÷ 100) × 0 × 0 ÷ 60 = 0 hours | 0 hours / month |

The first five rows are produced by `forms-check.mjs` and saved in `forms.json`. The last two were entered by hand in the browser during the audit.

## 7. Waitlist form behaviour

The form posts JSON `{ email, website }` to `POST /api/waitlist`. `website` is a hidden honeypot field. Browser validation is off; the form validates in code.

| Case | What the user sees | API call |
| --- | --- | --- |
| Empty | Red message "Enter your email." under the field | none |
| Invalid (`not-an-email`) | "Enter a valid email." | none |
| Valid, local server | Button shows "Sending…" and the field is disabled, then "We could not send that signup. Try again in a moment." The form stays. | 502 `{"ok":false,"message":"We could not send that signup. Try again in a moment."}` |
| Valid, production or preview | Form is replaced by "You're on the list. We'll email you when a consulting window opens." | 200 `{"ok":true}`, and MJ receives "Consulting waitlist — <email>" |
| Duplicate (same email again) | Same as the first time. There is no duplicate check and nothing is stored in the browser. | Same response as the first time |

Notes on the valid case:

- The local server has no Resend settings, so it fails closed with the 502 above. That is expected.
- The production and preview success path was not re-run today, because each run emails MJ. It was last proven on 14 Nov (production) and 16 Nov (preview): HTTP 200 and `[waitlist] email sent` in the logs.
- The success message itself was confirmed today on the local page by answering the request with a stand-in `{"ok":true}` response.

API responses checked directly on the local server:

| Request | Response |
| --- | --- |
| Body is not JSON | 400 `{"ok":false,"message":"The request body was not valid JSON."}` |
| Empty email | 400 `{"ok":false,"message":"Enter your email."}` |
| Invalid email | 400 `{"ok":false,"message":"Enter a valid email."}` |
| Honeypot filled | 200 `{"ok":true}`, no email attempted |
| GET | 405 |

## 8. Discovery form behaviour

The form posts JSON to `POST /api/discovery`. Browser validation is off; errors appear under a field after it loses focus, and under every field after a submit attempt.

| Case | What the user sees | API call |
| --- | --- | --- |
| Empty | Eight messages: "Enter your name." / "Enter a valid email." / "Enter your company." / "Select the closest role." / "Select an engineering org size." / "Select at least one current stack." / "Enter the current constraint." / "Choose a preferred window." | none |
| Invalid (everything filled, email `not-an-email`) | Only "Enter a valid email." | none |
| Valid, local server | The browser goes straight to the booking link `https://example.com/discovery?name=Baseline+Check&email=baseline-check%40example.com` (the local test booking address). The "Received / We have the brief." panel is on screen only for the instant before the redirect. | 200 `{"ok":true,"bookingUrl":"…"}`; one line appended to `data/leads.jsonl` |
| Duplicate (same details again) | Same as the first time. No duplicate check. | Same 200 response; a second line is appended |

API responses checked directly on the local server:

| Request | Response |
| --- | --- |
| Body is not JSON | 400 `{"ok":false,"message":"The request body was not valid JSON."}` |
| Empty object | 400 with all eight field errors and `"message":"Check the highlighted fields."` |
| Honeypot filled | 200 `{"ok":true}`, nothing stored |

Not exercised today: the deployed discovery path. Per the code, when the lead file cannot be written (as on Vercel) the route emails MJ through Resend instead, and it returns `ok: true` whether or not that email succeeds. Whether a booking address is configured in production was not checked.

## 9. Things in the baseline worth knowing before the remodel

- On mobile (390 px) the header "Book a call" button wraps onto two lines.
- The footer LinkedIn icon is a placeholder that links to `#`.
- The footer legal text reads "Testing Explained is a brand of Aslan Consulting LLC", not "Aslan Consulting LLC d/b/a Testing Explained".
- The "Flake trend" chart is labelled twice as an example illustration, not a client result.
