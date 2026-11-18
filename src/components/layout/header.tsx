"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { nav } from "@/lib/site";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-pine";

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
    <header className="sticky top-0 z-40 border-b border-gold bg-pine text-cream">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className={`flex h-full shrink-0 items-center rounded-lg ${focus}`} aria-label="Testing Explained">
          <BrandLogo priority />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium text-cream transition-colors hover:text-gold ${focus}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/#discovery" variant="on-dark" className="px-3 py-2 sm:px-5 sm:py-2.5">
            Book a call
          </ButtonLink>
          <button
            type="button"
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold text-cream lg:hidden ${focus}`}
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
        <div id="mobile-nav" className="border-t border-gold bg-pine lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-2 py-2 text-base text-cream ${focus}`}
              >
                {item.label}
              </a>
            ))}
            <ButtonLink href="/#discovery" variant="on-dark" className="mt-2" onClick={() => setOpen(false)}>
              Book a call
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
