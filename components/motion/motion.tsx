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

/**
 * Card whose border and surface light up under the pointer.
 * Purpose: makes grids of cards feel alive and shows which one you are on.
 * Sets --mx/--my on the element; the glow itself is CSS (.spotlight in globals.css).
 */
export function Spotlight({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "figure" | "article";
}) {
  const Comp = as as "div";
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Comp onPointerMove={onMove} className={cn("spotlight", className)}>
      {children}
    </Comp>
  );
}

/** Pulls its child a few pixels toward the pointer. Purpose: invites a click on key actions. */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/** Reveals a heading word by word. Purpose: gives each section opener a clear entrance. */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              shown: { y: "0%", opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}

/** Endless horizontal strip that pauses on hover. Purpose: shows a long list of tools in little space. */
export function Marquee({
  children,
  reverse,
  className,
  duration = 40,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={cn("marquee group/marquee relative overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max gap-3 group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0 gap-3">{children}</div>
        <div className="flex shrink-0 gap-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Vertical line that fills as its container scrolls through the viewport.
 * Purpose: turns the experience list into a timeline you move along.
 */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <div ref={ref} aria-hidden className={cn("absolute top-0 bottom-0 w-px bg-line", className)}>
      <motion.div className="absolute inset-0 origin-top bg-accent" style={{ scaleY }} />
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
