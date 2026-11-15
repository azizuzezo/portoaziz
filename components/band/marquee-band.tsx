"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Fragment, useRef } from "react";
import { skillGroups, tools } from "@/lib/content/profile";
import { cn } from "@/lib/utils";

const solid = [
  "Customer experience",
  "Complaint handling",
  "Internal tools",
  "AI-assisted development",
  "Ticketing & SLA",
  "Workflow automation",
  "Public speaking",
  "KPI dashboards",
];
const hollow = tools.map((t) => t.name);

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * One row that drifts on its own and speeds up with scroll velocity; scrolling up reverses it.
 * Purpose: the band reacts to the reader, so it reads as part of the page, not a ticker.
 */
function VelocityRow({
  items,
  base,
  outline,
}: {
  items: string[];
  base: number;
  outline?: boolean;
}) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const dir = useRef(1);
  const pct = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  const reduced = useRef<boolean | null>(null);

  useAnimationFrame((_, delta) => {
    reduced.current ??= window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    x.set(x.get() + dir.current * base * (delta / 1000) * (1 + Math.abs(f)));
  });

  const run = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key !== "a" || undefined}>
      {items.map((w) => (
        <Fragment key={w}>
          <span className={cn("px-5 whitespace-nowrap sm:px-8", outline && "text-on-board/55")}>{w}</span>
          <span className={cn("h-3 w-3 shrink-0 rounded-full border-[3px] sm:h-4 sm:w-4", outline ? "border-on-board/40" : "border-board-led")} />
        </Fragment>
      ))}
    </div>
  );

  return (
    <motion.div style={{ x: pct }} className="flex w-max">
      {run("a")}
      {run("b")}
    </motion.div>
  );
}

// Styled as a station information board: amber LED text on black, a header strip
// with the line colours, and rows that run faster when you scroll faster.
export function MarqueeBand() {
  return (
    <section aria-label="Skills and tools" className="relative z-10">
      <ul className="sr-only">
        {skillGroups.flatMap((g) => g.items).map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="bg-board text-board-led">
        <div aria-hidden className="relative overflow-hidden py-8 sm:py-12">
          <div className="space-y-3 font-semibold tracking-tight sm:space-y-5">
            <div className="text-[clamp(2.2rem,5.5vw,4.75rem)] leading-none dark:drop-shadow-[0_0_18px_rgb(160_190_255/0.35)]">
              <VelocityRow items={solid} base={-1.6} />
            </div>
            <div className="text-[clamp(1.4rem,3vw,2.6rem)] leading-none">
              <VelocityRow items={hollow} base={1.4} outline />
            </div>
          </div>
          {/* LED pixel grid only on the dark board, where it reads as a real display. */}
          <div className="led pointer-events-none absolute inset-0 hidden dark:block" />
        </div>
      </div>
    </section>
  );
}
