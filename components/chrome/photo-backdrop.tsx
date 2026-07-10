"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

// Peak visibility of the photos. The user asked for ~30-40%.
const PEAK_OPACITY = 0.4;

// Dedicated low-weight copies (~1100px, q58) so the compositor never
// handles the full-resolution gallery files.
const photos = [
  "/images/backdrop/photo-01.jpg",
  "/images/backdrop/photo-03.jpg",
  "/images/backdrop/team-photo.jpg",
  "/images/backdrop/photo-05.jpg",
  "/images/backdrop/night-briefing.jpg",
  "/images/backdrop/depot-portrait.jpg",
  "/images/backdrop/orgaren-trade-expo.jpg",
];

function BackdropPhoto({
  src,
  index,
  total,
  progress,
  priority,
}: {
  src: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  priority: boolean;
}) {
  const center = total > 1 ? index / (total - 1) : 0.5;
  // Overlap neighbouring photos so there's always something on screen.
  const half = (1 / Math.max(total - 1, 1)) * 0.85;

  const opacity = useTransform(
    progress,
    [center - half, center, center + half],
    [0, PEAK_OPACITY, 0],
    { clamp: true }
  );
  // Fully skip compositing for photos outside their scroll window.
  const visibility = useTransform(opacity, (v) => (v <= 0.001 ? "hidden" : "visible"));
  const y = useTransform(progress, [center - half, center + half], ["4%", "-4%"]);
  const scale = useTransform(progress, [center - half, center + half], [1.08, 1.01]);

  return (
    <motion.div style={{ opacity, visibility }} className="absolute inset-0">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          priority={priority}
          sizes="100vw"
          quality={60}
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

export function PhotoBackdrop() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 opacity-20">
          <Image src={photos[0]} alt="" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-void/30 to-void/80" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {photos.map((src, i) => (
        <BackdropPhoto
          key={src}
          src={src}
          index={i}
          total={photos.length}
          progress={scrollYProgress}
          priority={i === 0}
        />
      ))}
      {/* Light scrim to keep text readable while letting the photos read at ~35-40%. */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/45 via-void/15 to-void/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 45%, transparent 45%, color-mix(in oklab, var(--color-void) 35%, transparent) 100%)",
        }}
      />
    </div>
  );
}
