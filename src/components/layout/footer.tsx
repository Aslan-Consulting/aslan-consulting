import { Container } from "@/components/ui/container";
import { footerQuickLinks, legalLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="max-w-sm">
          <p className="text-[0.95rem] font-bold tracking-[0.2em] text-zinc-900 dark:text-zinc-50">
            ASLAN
          </p>
          <p className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">{site.legalName}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {site.tagline}
          </p>
          <p className="mt-6 text-xs text-zinc-500">
            © 2026 {site.legalName}. All rights reserved.
          </p>
        </div>

        <nav aria-label="Quick links" className="flex flex-col gap-2.5 text-sm">
          <p className="text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase">Quick links</p>
          {footerQuickLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="w-fit text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-zinc-400 dark:hover:text-zinc-50"
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
              className="w-fit text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
