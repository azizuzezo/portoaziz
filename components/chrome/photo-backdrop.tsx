"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

// Peak visibility of the photos, per the user's ~30-40% ask.
const PEAK_OPACITY = 0.35;

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

// Sections that should carry a backdrop photo, in page order. Hero and
// contact are left bare so the ends of the page stay clean.
const SECTIONS = [
  "about",
  "experience",
  "skills",
  "achievements",
  "graphic-design",
  "photography",
  "gallery",
  "short-movie",
  "ai-projects",
  "recommendations",
  "credentials",
];

export function PhotoBackdrop() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(-1);
  const ratios = useRef<Record<string, number>>({});

  useEffect(() => {
    if (reducedMotion) return;

    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (els.length === 0) return;

    // A single observer, coarse thresholds: fires only a handful of times
    // per full-page scroll instead of on every scroll pixel.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const id of SECTIONS) {
          const r = ratios.current[id] ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        setActive(bestId ? SECTIONS.indexOf(bestId) % photos.length : -1);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 opacity-[0.12]">
          <Image src={photos[0]} alt="" fill sizes="100vw" className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-void/30 to-void/85" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {photos.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: i === active ? PEAK_OPACITY : 0,
            transitionDuration: "1400ms",
            visibility: i === active ? "visible" : "hidden",
          }}
        >
          {/* key forces the Ken Burns animation to restart each time this photo becomes active */}
          <div
            key={i === active ? "on" : "off"}
            className={i === active ? "absolute inset-0 animate-backdrop-zoom" : "absolute inset-0"}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={55}
              className="object-cover"
            />
          </div>
        </div>
      ))}
      {/* Light scrim to keep text readable while letting the photos read at ~30-40%. */}
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
