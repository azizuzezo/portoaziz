"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type DocWithVT = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

/**
 * Light / dark switch. The new theme spreads out as a circle from the button (View Transitions),
 * so the change reads as one deliberate move instead of a flash. Browsers without view
 * transitions, and people who ask for less motion, get a short colour fade instead.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const apply = (next: boolean) => {
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage blocked: the theme still switches for this visit
    }
    setDark(next);
  };

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    const doc = document as DocWithVT;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduced) {
      document.documentElement.classList.add("theme-fade");
      apply(next);
      setTimeout(() => document.documentElement.classList.remove("theme-fade"), 450);
      return;
    }
    const r = btn.current?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : window.innerWidth - 40;
    const y = r ? r.top + r.height / 2 : 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = doc.startViewTransition(() => apply(next));
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  const label = dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      ref={btn}
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full text-ink transition-colors hover:bg-ink/8"
    >
      {dark === null ? (
        // Before hydration we don't know the theme; render both and let CSS pick.
        <>
          <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
          <Moon className="block h-[18px] w-[18px] dark:hidden" aria-hidden />
        </>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={dark ? "sun" : "moon"}
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            {dark ? <Sun className="h-[18px] w-[18px]" aria-hidden /> : <Moon className="h-[18px] w-[18px]" aria-hidden />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
