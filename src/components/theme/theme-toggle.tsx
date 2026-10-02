"use client";

import { useTheme, type Theme } from "./theme-provider";

const options: { value: Theme; label: string; icon: string }[] = [
  { value: "system", label: "System", icon: "sys" },
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
];

function Icon({ name }: { name: string }) {
  if (name === "sun") {
    return (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="2.4" stroke="currentColor" />
        <path
          d="M8 2.2v1.2M8 12.6v1.2M2.2 8h1.2M12.6 8h1.2M3.9 3.9l.85.85M11.25 11.25l.85.85M12.1 3.9l-.85.85M4.75 11.25l-.85.85"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "moon") {
    return (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
        <path
          d="M9.6 3.2A4.6 4.6 0 1 0 12.8 9.4 3.6 3.6 0 0 1 9.6 3.2Z"
          stroke="currentColor"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <rect x="2.5" y="3.5" width="11" height="8" rx="1.5" stroke="currentColor" />
      <path d="M6 13.5h4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100/80 p-0.5 dark:border-zinc-800 dark:bg-zinc-900/80"
    >
      {options.map((option) => {
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => setTheme(option.value)}
            className={`rounded-lg p-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              active
                ? "bg-zinc-900 text-zinc-50 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
            }`}
          >
            <Icon name={option.icon} />
          </button>
        );
      })}
    </div>
  );
}
