"use client";

import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * Motion tokens, shared so nothing uses one duration for everything:
 * enter 0.55s with a soft decelerating curve, hover/press 0.15-0.2s.
 * MotionConfig reducedMotion="user" drops transforms for people who ask for less motion.
 */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades content up as it scrolls in. Purpose: paces a long page into readable chapters. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "figure";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
    >
      {children}
    </Comp>
  );
}

/** Thin bar under the navbar. Purpose: shows how far through a long page the reader is. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

/**
 * 3D tilt toward the pointer with a soft light reflection.
 * Purpose: gives screenshots depth and signals they can be opened. Pointer devices only.
 */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glare = useTransform(
    [sx, sy] as never,
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(255 255 255 / 0.22), transparent 55%)`
  );
  const [hover, setHover] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    setHover(false);
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: hover ? -6 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative rounded-lg transition-shadow duration-200",
          hover && "shadow-[0_24px_48px_-24px_rgb(17_18_20/0.35)]"
        )}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glare, opacity: hover ? 1 : 0 }}
        />
      </motion.div>
    </div>
  );
}

/** Counts a number up once it is on screen. Purpose: draws the eye to the four headline facts. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const target = match ? Number(match[1]) : 0;
  const animatable = !!match && target < 1000; // years like 2022 stay static
  const [shown, setShown] = useState(animatable ? 0 : target);

  useEffect(() => {
    if (!inView || !animatable) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.2,
      ease: EASE_OUT,
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, animatable, target]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {shown}
        {match[2]}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
