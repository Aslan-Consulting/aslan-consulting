import type { ReactNode } from "react";

type FrameProps = {
  children: ReactNode;
  className?: string;
};

export function Frame({ children, className = "" }: FrameProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-200/80 bg-white/70 shadow-lg shadow-zinc-950/5 backdrop-blur transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:shadow-black/20 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80 ${className}`}
    >
      {children}
    </div>
  );
}
