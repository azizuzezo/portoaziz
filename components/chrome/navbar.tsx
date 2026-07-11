"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { person } from "@/lib/content/profile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "graphic-design", label: "Portfolio" },
  { id: "credentials", label: "Credentials" },
];

export function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const allIds = [...links.map((l) => l.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-ink/8 bg-void/90 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-6">
        <a
          href="#hero"
          data-cursor-hover
          className="flex items-center gap-2.5 font-display text-sm font-semibold text-ink"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-aurora-violet to-aurora-cyan text-xs font-bold text-white">
            {person.initials}
          </span>
          <span className="hidden sm:inline">{person.name}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-cursor-hover
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium text-mist transition-colors hover:text-ink",
                active === link.id && "text-ink"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href="#contact" size="sm">
            Contact
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="glass-panel flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-ink/8 bg-void/95 backdrop-blur-sm lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium text-mist transition-colors hover:bg-ink/5 hover:text-ink",
                    active === link.id && "text-ink"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <Button href="#contact" onClick={() => setOpen(false)} className="mt-2">
                Contact
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
