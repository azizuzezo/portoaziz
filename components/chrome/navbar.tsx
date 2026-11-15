"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { person } from "@/lib/content/profile";
import { cn } from "@/lib/utils";

// Every href here is a real page in app/.
export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/creative", label: "Creative" },
  { href: "/contact", label: "Contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [farDown, setFarDown] = useState(false);
  // True while the bar sits over a section painted in the accent colour (marked data-nav="dark").
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setFarDown(window.scrollY > 1200);
      let dark = false;
      for (const el of document.querySelectorAll('[data-nav="dark"]')) {
        const r = el.getBoundingClientRect();
        if (r.top <= 56 && r.bottom >= 40) dark = true;
      }
      setOnDark(dark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6"
      >
        {/* The pill narrows once you start reading, so it covers less of the page.
            It is the one blurred surface on the site, so text under it stays legible. */}
        <motion.div
          initial={false}
          style={{ maxWidth: 1280 }}
          animate={{ maxWidth: scrolled ? 960 : 1280 }}
          transition={{ duration: 0.6, ease: EASE }}
          className={cn("glass-nav mx-auto rounded-[1.75rem]", onDark && "is-dark")}
        >
          <nav className="flex h-14 items-center justify-between gap-3 pr-2 pl-2 sm:h-16 sm:pr-3" aria-label="Main">
            <Link href="/" className="group flex min-h-11 min-w-0 items-center gap-2.5 rounded-full pr-3 font-semibold tracking-tight">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/70 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
                <Image src="/images/profile/aziz-avatar.webp" alt="" width={192} height={192} unoptimized priority className="h-full w-full object-cover" />
              </span>
              <span className="truncate text-sm sm:text-base">{person.name}</span>
            </Link>

            <ul className="isolate hidden items-center lg:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "relative flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-ink/80 transition-colors duration-150 hover:text-ink",
                      isActive(link.href) && "text-accent-ink hover:text-accent-ink"
                    )}
                  >
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-0 top-1.5 bottom-1.5 -z-10 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-1">
              <a
                href={person.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden min-h-10 items-center rounded-full border border-ink/15 px-4 text-sm font-semibold transition-colors duration-150 hover:border-ink sm:flex"
              >
                CV
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-ink/8 lg:hidden"
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
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden lg:hidden"
              >
                <ul className="px-4 pt-2 pb-5">
                  {[{ href: "/", label: "Home" }, ...navLinks].map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center justify-between border-b border-ink/10 text-2xl font-semibold tracking-tight",
                          pathname === link.href && "text-accent"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                  <li className="pt-4">
                    <a
                      href={person.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center justify-center rounded-full bg-accent text-base font-semibold text-accent-ink"
                    >
                      Download CV (PDF)
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {farDown && (
          <motion.a
            href="#top"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink shadow-lg transition-transform hover:-translate-y-1 sm:right-6 sm:bottom-6"
          >
            <ArrowUp className="h-5 w-5" aria-hidden />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
