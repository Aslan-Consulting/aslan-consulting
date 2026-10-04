"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { nav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/50 bg-zinc-50/55 backdrop-blur-xl dark:border-zinc-800/40 dark:bg-zinc-950/50">
      <Container className="flex h-[6.5rem] items-center justify-between gap-6">
        <a
          href="/"
          className="flex h-full shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950"
        >
          <BrandLogo className="h-[5.5rem] w-auto" priority />
          <span className="sr-only">Aslan Consulting</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:hover:text-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden md:block">
            <ButtonLink href="/#discovery">Book a Strategy Call</ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-900 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-zinc-800 dark:text-zinc-50"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-zinc-200/70 bg-zinc-50/90 backdrop-blur-xl md:hidden dark:border-zinc-800/70 dark:bg-zinc-950/90"
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-2 text-base text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:text-zinc-50"
              >
                {item.label}
              </a>
            ))}
            <ButtonLink href="/#discovery" className="mt-2" onClick={() => setOpen(false)}>
              Book a Strategy Call
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
