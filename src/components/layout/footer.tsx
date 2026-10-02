import { Container } from "@/components/ui/container";
import { Mark } from "@/components/ui/mark";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-50">
            <Mark className="h-6 w-6 text-zinc-900 dark:text-zinc-50" />
            <p className="text-base font-semibold tracking-tight">{site.name}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Boutique QA architecture for product companies that have outgrown
            scattered suites and under-specified quality ownership.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:hover:text-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
      <div className="border-t border-zinc-200/80 dark:border-zinc-800/80">
        <Container className="flex flex-col gap-2 py-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-500">
          <p>© {new Date().getFullYear()} Aslan Consulting LLC. All rights reserved.</p>
          <p>A privately held limited liability company.</p>
        </Container>
      </div>
    </footer>
  );
}
