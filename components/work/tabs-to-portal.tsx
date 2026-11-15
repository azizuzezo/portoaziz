"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// The places a single case used to live, as named in the case study's "The problem".
const TABS = [
  { label: "Skorcard ticket desk", x: -34, y: -30, r: -7 },
  { label: "Skorlife ticket desk", x: 30, y: -34, r: 6 },
  { label: "Bank escalations", x: -38, y: 6, r: 4 },
  { label: "Fee waiver requests", x: 36, y: 2, r: -5 },
  { label: "Card delivery sheet", x: -26, y: 36, r: -3 },
  { label: "Monthly roster", x: 28, y: 34, r: 8 },
];

/**
 * Before / after for the CS Tools Portal. "Before" scatters the six separate tabs an agent
 * juggled over a dimmed screenshot; "After" pulls them into the middle and reveals the portal.
 * It starts on Before and switches itself once in view; the toggle lets a reader replay it.
 */
export function TabsToPortal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px" });
  const [after, setAfter] = useState(false);
  const touched = useRef(false);
  useEffect(() => {
    if (!inView || touched.current) return;
    const id = setTimeout(() => setAfter(true), 1600);
    return () => clearTimeout(id);
  }, [inView]);
  const pick = (v: boolean) => {
    touched.current = true;
    setAfter(v);
  };

  return (
    <div ref={ref}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-lg font-semibold tracking-tight sm:text-xl">
          {after ? "After: one portal, one sign-in." : "Before: one case, six places to check."}
        </p>
        <div role="group" aria-label="Before or after the portal" className="relative isolate flex rounded-full border border-line bg-surface p-1">
          {[
            { v: false, t: "Before" },
            { v: true, t: "After" },
          ].map((o) => (
            <button
              key={o.t}
              type="button"
              aria-pressed={after === o.v}
              onClick={() => pick(o.v)}
              className={cn(
                "relative min-h-10 rounded-full px-5 text-sm font-semibold transition-colors",
                after === o.v ? "text-accent-ink" : "text-ink/70 hover:text-ink"
              )}
            >
              {after === o.v && (
                <motion.span layoutId="ba-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              {o.t}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <motion.div
          animate={{ opacity: after ? 1 : 0.25, filter: after ? "blur(0px)" : "blur(6px)", scale: after ? 1 : 0.97 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          inert={!after}
        >
          {children}
        </motion.div>

        <ul aria-hidden={after} className="pointer-events-none absolute inset-0">
          {TABS.map((t, i) => (
            <motion.li
              key={t.label}
              className="absolute top-1/2 left-1/2"
              animate={
                after
                  ? { x: "-50%", y: "-50%", rotate: 0, scale: 0.4, opacity: 0 }
                  : { x: `calc(-50% + ${t.x}vw)`, y: `calc(-50% + ${t.y * 0.5}vw)`, rotate: t.r, scale: 1, opacity: 1 }
              }
              transition={{ type: "spring", stiffness: 140, damping: 18, delay: after ? i * 0.05 : 0.1 + i * 0.06 }}
            >
              <span className="block w-44 overflow-hidden rounded-xl border border-line bg-surface shadow-[0_18px_40px_-18px_rgb(0_0_0/0.4)] sm:w-56">
                <span className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="h-2 w-2 rounded-full bg-ink/15" />
                  <span className="ml-1 truncate text-xs font-semibold">{t.label}</span>
                </span>
                <span className="block space-y-1.5 p-3">
                  <span className="block h-1.5 w-4/5 rounded-full bg-ink/10" />
                  <span className="block h-1.5 w-3/5 rounded-full bg-ink/10" />
                  <span className="block h-1.5 w-2/3 rounded-full bg-ink/10" />
                </span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
