import type { ReactNode } from "react";

type FrameProps = {
  children: ReactNode;
  className?: string;
};

export function Frame({ children, className = "" }: FrameProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-200/80 bg-white shadow-lg shadow-zinc-950/5 transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-zinc-300 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
