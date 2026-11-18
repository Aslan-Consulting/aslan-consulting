import type { ReactNode } from "react";

type FrameProps = {
  children: ReactNode;
  className?: string;
};

export function Frame({ children, className = "" }: FrameProps) {
  return (
    <div
      className={`rounded-xl border border-pine/25 bg-cream shadow-[0_8px_24px_rgb(8_48_32/0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
