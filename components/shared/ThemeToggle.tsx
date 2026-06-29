"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { THEME_STORAGE_KEY } from "@/lib/theme";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "icon-label";
}

function getStoredTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light") return "light";
    if (stored === "dark") return "dark";
  } catch {}
  return "light";
}

function applyTheme(theme: "dark" | "light") {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const [theme, setThemeState] = useState<"dark" | "light">(() =>
    typeof window === "undefined" ? "light" : getStoredTheme(),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    // Placeholder maintains layout space without content flash
    return <div className="w-9 h-9" aria-hidden="true" />;
  }

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setThemeState(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md",
        "transition-colors duration-200",
        "text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)]",
        "hover:bg-[color:var(--ww-surface)]",
        className,
      )}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      {variant === "icon-label" && (
        <span className="text-sm font-medium">{isDark ? "Light" : "Dark"}</span>
      )}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
