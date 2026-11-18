import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Shared = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "on-dark";
};

const variants: Record<NonNullable<Shared["variant"]>, string> = {
  primary:
    "bg-pine text-cream hover:bg-pine focus-visible:ring-pine focus-visible:ring-offset-cream",
  secondary:
    "border border-pine bg-transparent text-pine hover:bg-pine/5 focus-visible:ring-pine focus-visible:ring-offset-cream",
  ghost: "text-pine hover:text-pine focus-visible:ring-pine focus-visible:ring-offset-cream",
  "on-dark":
    "bg-cream text-pine hover:bg-cream focus-visible:ring-gold focus-visible:ring-offset-pine",
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: Shared & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  ...props
}: Shared & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
