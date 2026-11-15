"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { photographyWork } from "@/lib/content/profile";
import { Zoom } from "@/components/motion/lightbox";
import { cn } from "@/lib/utils";

const items = photographyWork.map((p) => ({ src: p.image, alt: p.caption, w: 1200, h: 1500 }));

/**
 * Photography as a contact sheet: one large frame and the roll beside it. On wide screens the
 * roll is a 2x2 block exactly as tall as the large frame, so both edges line up.
 */
export function PhotoViewer() {
  const [i, setI] = useState(0);
  const p = photographyWork[i];
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch">
        <div className="md:col-span-2">
          <Zoom items={items} index={i} className="rounded-2xl">
            <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ink">
              <AnimatePresence initial={false}>
                <motion.span
                  key={p.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image quality={90} src={p.image} alt={p.caption} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
                </motion.span>
              </AnimatePresence>
            </span>
          </Zoom>
        </div>
        <ul className="grid grid-cols-4 gap-3 md:grid-cols-2 md:grid-rows-2">
          {photographyWork.map((ph, k) => (
            <li key={ph.image} className="min-h-0">
              <button
                type="button"
                onClick={() => setI(k)}
                aria-label={`Show photo: ${ph.caption}`}
                aria-current={k === i ? "true" : undefined}
                className={cn(
                  "relative block aspect-square h-full w-full overflow-hidden rounded-xl ring-offset-2 ring-offset-sunken transition-all duration-300 md:aspect-auto",
                  k === i ? "ring-2 ring-accent" : "opacity-60 hover:opacity-100"
                )}
              >
                <Image quality={90} src={ph.image} alt="" fill sizes="(min-width: 768px) 16vw, 22vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-sm font-medium">{p.caption}</p>
    </div>
  );
}
