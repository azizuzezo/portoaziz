"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Image as Img } from "@/lib/content/profile";
import { Zoom } from "@/components/motion/lightbox";
import { cn } from "@/lib/utils";

const DWELL = 3600; // ms per section

/**
 * Several sections of one live site in a browser frame, shown in turn as if scrolling through it.
 * Advances only while on screen and not hovered; the bars underneath show which section is up
 * and jump to it. Clicking the screenshot opens all of them in the full-size viewer.
 */
export function ShotGallery({
  images,
  alt,
  label,
  sizes,
  className,
}: {
  images: Img[];
  alt: string;
  label?: string;
  sizes: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const many = images.length > 1;

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  useEffect(() => {
    if (!many || !inView || paused || reduced) return;
    const id = setTimeout(() => setI((v) => (v + 1) % images.length), DWELL);
    return () => clearTimeout(id);
  }, [i, many, inView, paused, reduced, images.length]);

  const items = images.map((im, k) => ({ ...im, alt: `${alt} (${k + 1} of ${images.length})`, caption: label }));
  const running = many && inView && !paused && !reduced;

  return (
    <div
      ref={ref}
      className={cn("min-w-0", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <Zoom items={items} index={i} className="rounded-xl">
        <span className="block overflow-hidden rounded-xl border border-line bg-surface">
          {label && (
            <span className="flex items-center gap-2 border-b border-line px-3 py-2">
              <span className="flex gap-1" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="h-2 w-2 rounded-full bg-ink/15" />
                <span className="h-2 w-2 rounded-full bg-ink/15" />
              </span>
              <span className="truncate text-[11px] text-muted">{label}</span>
            </span>
          )}
          <span className="relative block overflow-hidden bg-sunken" style={{ aspectRatio: `${images[0].w} / ${images[0].h}` }}>
            <AnimatePresence initial={false}>
              <motion.span
                key={images[i].src}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 28, scale: 1.02 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -28 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image quality={90} src={images[i].src} alt={items[i].alt} fill sizes={sizes} className="object-cover object-top" />
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
      </Zoom>

      {many && (
        <div className="mt-3 flex gap-1.5">
          {images.map((im, k) => (
            <button
              key={im.src}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show section ${k + 1} of ${images.length}`}
              aria-current={k === i ? "true" : undefined}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-ink/10 transition-colors group-hover:bg-ink/20">
                <motion.span
                  key={`${k}-${i}-${running}`}
                  className="absolute inset-0 origin-left rounded-full bg-accent"
                  initial={{ scaleX: k < i ? 1 : 0 }}
                  animate={{ scaleX: k < i ? 1 : k === i ? (running ? 1 : 0.5) : 0 }}
                  transition={{ duration: k === i && running ? DWELL / 1000 : 0.3, ease: "linear" }}
                />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
