"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const start = i / n;
  const opacity = useTransform(p, [start, start + 1.5 / n], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {w}{" "}
    </motion.span>
  );
}

/**
 * A paragraph that lights up word by word as it scrolls through the screen, so a reader's eye is
 * walked along the sentence. Reduced motion is handled by MotionConfig (values snap).
 */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("text-balance", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />
        ))}
      </span>
    </p>
  );
}
