"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { roleRotator } from "@/lib/content/profile";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function RoleRotator() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % roleRotator.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="relative flex h-8 w-full items-center justify-center overflow-hidden text-center sm:h-9 sm:justify-start sm:text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={roleRotator[index]}
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -22, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute whitespace-nowrap bg-gradient-to-r from-aurora-gold to-aurora-orange bg-clip-text font-display text-lg font-semibold tracking-tight text-transparent sm:text-xl"
        >
          {roleRotator[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
