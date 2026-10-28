import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Shared = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variants: Record<NonNullable<Shared["variant"]>, string> = {
  primary:
    "bg-green-600 text-white shadow-lg shadow-green-900/15 hover:bg-green-500 focus-visible:ring-green-500",
  secondary:
    "border border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 focus-visible:ring-green-500",
  ghost: "text-zinc-500 hover:text-zinc-900 focus-visible:ring-green-500",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium tracking-tight transition-[color,background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2] disabled:pointer-events-none disabled:opacity-50";

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
