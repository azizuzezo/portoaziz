"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GridBackdrop } from "@/components/motion/grid-backdrop";
import { cn } from "@/lib/utils";

/**
 * Wraps a section so it is "pulled up" over the one before it as it scrolls in: it rises,
 * grows from 94% to full width, and its rounded top corners flatten out. Scroll-scrubbed, so
 * it follows the reader's speed. MotionConfig's reducedMotion turns the transforms off.
 */
export function Pull({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 0]);
  return (
    <motion.div
      ref={ref}
      style={{ y, scale, borderTopLeftRadius: radius, borderTopRightRadius: radius }}
      className={cn(
        "relative z-[1] origin-top overflow-hidden bg-paper shadow-[0_-30px_60px_-40px_rgb(0_0_0/0.35)]",
        className
      )}
    >
      {/* every pulled section carries the living grid behind its content */}
      <GridBackdrop />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
