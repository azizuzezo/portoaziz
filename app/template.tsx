"use client";

import { motion } from "framer-motion";

/**
 * Page transition. A template remounts on every navigation, so each page simply fades in.
 * Only opacity is animated, so fixed and sticky elements inside keep working.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
