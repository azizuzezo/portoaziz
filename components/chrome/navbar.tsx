"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { person } from "@/lib/content/profile";
import { ThemeToggle } from "@/components/chrome/theme-toggle";
import { cn } from "@/lib/utils";

// Every id here exists as a section on the page.
const links = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "recommendations", label: "Recommendations" },
  { id: "skills", label: "Skills" },
  { id: "creative", label: "Creative" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // Hides while reading downward, returns on any scroll up. Purpose: more room for screenshots.
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [farDown, setFarDown] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setFarDown(y > 900);
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 400);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/80 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300",
        scrolled ? "border-line shadow-[0_8px_24px_-18px_rgb(17_18_20/0.35)]" : "border-transparent",
        hidden && !open && "-translate-y-full"
      )}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4" aria-label="Main">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 text-base font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-xs font-bold text-paper" aria-hidden>
            {person.initials}
          </span>
          {person.name}
        </a>

        <ul className="isolate hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "relative flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink",
                  active === link.id && "text-accent-ink hover:text-accent-ink"
                )}
              >
                {/* Sliding pill. Purpose: shows which section you are reading. */}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 top-1.5 bottom-1.5 -z-10 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={person.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-paper sm:flex"
          >
            CV (PDF)
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-ink/8 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-line bg-paper lg:hidden"
        >
          <ul className="shell flex flex-col py-2">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line text-base last:border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={person.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center text-base text-accent"
              >
                Download CV (PDF)
              </a>
            </li>
          </ul>
        </motion.div>
      )}
      </AnimatePresence>
    </header>

    <AnimatePresence>
      {farDown && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-ink shadow-[0_12px_24px_-10px_var(--accent)] transition-transform hover:-translate-y-1 sm:right-6 sm:bottom-6"
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
    </>
  );
}
