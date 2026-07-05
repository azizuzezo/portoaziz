"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { gallery } from "@/lib/content/profile";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

// Peak visibility of the photos. The user asked for ~30-40%.
const PEAK_OPACITY = 0.4;

// A curated, varied subset so the cross-fade windows stay wide enough to read.
const photos = [
  "/images/gallery/photo-01.jpg",
  "/images/gallery/photo-03.jpg",
  "/images/experience/kawisata/team-photo.jpg",
  "/images/gallery/photo-05.jpg",
  "/images/experience/kawisata/night-briefing.jpg",
  "/images/experience/kawisata/depot-portrait.jpg",
  "/images/gallery/orgaren-trade-expo.jpg",
].filter((src) => gallery.some((g) => g.image === src) || src.includes("/experience/"));

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
  const y = useTransform(progress, [center - half, center + half], ["6%", "-6%"]);
  const scale = useTransform(progress, [center - half, center + half], [1.16, 1.02]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 will-change-[opacity]">
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          priority={priority}
          sizes="100vw"
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
