"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// Sun and moon are the conventional, instantly read symbols for a theme switch.
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage blocked: the theme still switches for this visit
    }
    setDark(next);
  };

  const label = dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-ink/8"
    >
      {/* Before hydration we don't know the theme; render both and let CSS pick. */}
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
      <Moon className="block h-[18px] w-[18px] dark:hidden" aria-hidden />
    </button>
  );
}
