"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { person } from "@/lib/content/profile";
import { SplitWords } from "@/components/motion/motion";

// What the lens reveals: the same story told from the customer's side. Facts from the CV.
const HIDDEN = "Every complaint I handled showed me what to build, so the next customer waits less.";
const BIG = 150; // over the headline, while moving
const DOT = 9; // anywhere else in the hero, or when the pointer rests
const REST_MS = 900;

export type Lens = {
  cx: MotionValue<number>;
  cy: MotionValue<number>;
  r: MotionValue<number>;
  /** The headline reports whether the pointer is over it. */
  setOver: (v: boolean) => void;
};

/**
 * Pointer lens for the whole hero. Returns the shared values plus handlers for the section.
 * Mouse only; touch and reduced-motion visitors get no lens.
 */
export function useLens() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(
      window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const cx = useSpring(mx, { stiffness: 260, damping: 28 });
  const cy = useSpring(my, { stiffness: 260, damping: 28 });
  const r = useSpring(0, { stiffness: 220, damping: 24 });

  const over = useRef(false);
  const edge = useRef(Infinity); // distance from the pointer to the hero's bottom edge
  const rest = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Big only while moving over the headline; a small dot otherwise; shrinks when the pointer rests.
  // Near the bottom of the hero it tapers, so it never gets cut off by the next section.
  const wake = () => {
    r.set(Math.max(0, Math.min(over.current ? BIG : DOT, edge.current - 4)));
    if (rest.current) clearTimeout(rest.current);
    rest.current = setTimeout(() => r.set(DOT), REST_MS);
  };
  useEffect(() => () => {
    if (rest.current) clearTimeout(rest.current);
  }, []);

  const handlers = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (!enabled || e.pointerType !== "mouse") return;
      mx.jump(e.clientX);
      my.jump(e.clientY);
      cx.jump(e.clientX);
      cy.jump(e.clientY);
      edge.current = (e.currentTarget as HTMLElement).getBoundingClientRect().bottom - e.clientY;
      wake();
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!enabled || e.pointerType !== "mouse") return;
      mx.set(e.clientX);
      my.set(e.clientY);
      edge.current = (e.currentTarget as HTMLElement).getBoundingClientRect().bottom - e.clientY;
      wake();
    },
    onPointerLeave: () => {
      if (rest.current) clearTimeout(rest.current);
      r.set(0);
    },
  };
  const setOver = (v: boolean) => {
    over.current = v;
    if (r.get() > 0) wake();
  };
  return { lens: { cx, cy, r, setOver }, enabled, handlers };
}

/** A clip-path circle that follows the lens, in the element's own coordinates. */
function useLocalClip(lens: Lens, ref: React.RefObject<HTMLElement | null>) {
  const lx = useTransform(lens.cx, (v) => v - (ref.current?.getBoundingClientRect().left ?? 0));
  const ly = useTransform(lens.cy, (v) => v - (ref.current?.getBoundingClientRect().top ?? 0));
  return useMotionTemplate`circle(${lens.r}px at ${lx}px ${ly}px)`;
}

/** The blue disc itself, behind the hero content, anywhere in the section. */
export function LensBlob({ lens }: { lens: Lens }) {
  const ref = useRef<HTMLDivElement>(null);
  const clip = useLocalClip(lens, ref);
  return <motion.div ref={ref} aria-hidden style={{ clipPath: clip }} className="pointer-events-none absolute inset-0 -z-[5] bg-accent" />;
}

/**
 * Text that stays readable when the lens is over it: a copy in the lens's ink colour is laid
 * on top and clipped to the disc, so the words switch colour instead of sinking into the blue.
 */
export function LensInvert({ lens, enabled, children }: { lens: Lens; enabled: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const clip = useLocalClip(lens, ref);
  return (
    <div ref={ref} className="relative">
      {children}
      {enabled && (
        <motion.div aria-hidden style={{ clipPath: clip }} className="pointer-events-none absolute inset-0 text-accent-ink [&_*]:!text-accent-ink">
          {children}
        </motion.div>
      )}
    </div>
  );
}

/** The headline; where the lens passes over it, the hidden line shows instead. */
export function LensHeadline({ className, lens, enabled }: { className: string; lens: Lens; enabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const clip = useLocalClip(lens, ref);
  return (
    <div ref={ref} className="relative" onPointerEnter={() => lens.setOver(true)} onPointerLeave={() => lens.setOver(false)}>
      <h1 className={className}>
        <span className="sr-only">{person.name}: </span>
        <SplitWords text="Nine years handling customer experience." immediate delay={0.15} stagger={0.06} />{" "}
        <SplitWords text="Now I build tools that help support teams work faster." immediate delay={0.45} stagger={0.05} className="text-accent" />
      </h1>
      {enabled && (
        <motion.p
          aria-hidden
          style={{ clipPath: clip }}
          className={`${className} pointer-events-none absolute inset-0 bg-accent text-accent-ink`}
        >
          {HIDDEN}
        </motion.p>
      )}
      <p className="sr-only">{HIDDEN}</p>
    </div>
  );
}
