"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "aslan-theme";

type ThemeContextValue = {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStoredTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "dark";
}

function resolveTheme(theme: Theme) {
  return theme === "dark" || (theme === "system" && getSystemDark()) ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const dark = resolveTheme(theme) === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

function readClientTheme(): { theme: Theme; resolved: "light" | "dark" } {
  if (typeof window === "undefined") {
    return { theme: "dark", resolved: "dark" };
  }
  const theme = readStoredTheme();
  return { theme, resolved: resolveTheme(theme) };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [{ theme, resolved }, setState] = useState(readClientTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme() !== "system") return;
      applyTheme("system");
      setState({ theme: "system", resolved: getSystemDark() ? "dark" : "light" });
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    setState({ theme: next, resolved: resolveTheme(next) });
  }, []);

  const value = useMemo(
    () => ({ theme, resolved, setTheme }),
    [theme, resolved, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
