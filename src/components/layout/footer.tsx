import { BrandLogo } from "@/components/ui/brand-logo";
import { Container } from "@/components/ui/container";
import { footerQuickLinks, legalLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="max-w-sm">
          <BrandLogo markClassName="h-12 w-12" />
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">{site.legalLine}</p>
          <p className="mt-3 text-xs text-zinc-500">© 2026 {site.legalName}. All rights reserved.</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Testing Explained on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition-colors hover:border-green-500 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
              </svg>
            </a>
            {/* TODO: Replace with Testing Explained LinkedIn Page URL when the page is created. */}
            <a
              href="#"
              aria-label="Testing Explained on LinkedIn (coming soon)"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition-colors hover:border-green-500 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M6.5 9.5H4V20h2.5V9.5ZM5.25 4A1.5 1.5 0 1 0 5.25 7a1.5 1.5 0 0 0 0-3ZM20 20h-2.5v-5.6c0-1.9-.7-3.2-2.4-3.2-1.3 0-2 .9-2.3 1.7-.1.3-.1.7-.1 1.1V20H10.2s.05-8.7 0-9.6H12.7v1.4c.3-.6 1.5-1.6 3.6-1.6 2.6 0 4.7 1.7 4.7 5.4V20Z" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="Quick links" className="flex flex-col gap-2.5 text-sm">
          <p className="text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase">Quick links</p>
          {footerQuickLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="w-fit text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <nav aria-label="Legal" className="flex flex-col gap-2.5 text-sm">
          <p className="text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase">Legal</p>
          {legalLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="w-fit text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
