"use client";

import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { socialDesignPosts } from "@/lib/content/profile";
import { Zoom } from "@/components/motion/lightbox";

const items = socialDesignPosts.map((p) => ({ src: p.image, alt: p.caption, w: 1080, h: 1080 }));
const N = socialDesignPosts.length;
const DWELL = 3200;

/**
 * Coverflow of the Instagram designs: one large card in front, the rest turned away on either
 * side. Drag or use the arrows to move; click a side card to bring it forward, click the front
 * card to open it. It advances on its own while on screen and not hovered.
 */
export function PostFan() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const go = (d: number) => setI((v) => (v + d + N) % N);
  const stage = useRef<HTMLDivElement>(null);

  // Mouse wheel / trackpad over the cards flips through them (throttled), and the page waits.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let last = 0;
    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 6) return;
      e.preventDefault();
      const now = performance.now();
      if (now - last < 380) return;
      last = now;
      setI((v) => (v + (d > 0 ? 1 : -1) + N) % N);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    if (!inView || hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => go(1), DWELL);
    return () => clearTimeout(id);
  }, [i, inView, hold]);

  return (
    <div
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
      onPointerLeave={() => setHold(false)}
      aria-roledescription="carousel"
      aria-label="Instagram designs"
    >
      <motion.div
        ref={stage}
        data-lenis-prevent
        className="relative h-[19rem] cursor-grab touch-pan-y overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [perspective:1200px] active:cursor-grabbing sm:h-[24rem]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) go(1);
          else if (info.offset.x > 50) go(-1);
        }}
      >
        {socialDesignPosts.map((post, k) => {
          // Shortest signed distance around the loop, so the deck wraps.
          let o = k - i;
          if (o > N / 2) o -= N;
          if (o < -N / 2) o += N;
          const a = Math.abs(o);
          const front = o === 0;
          return (
            <motion.div
              key={post.image}
              className="absolute top-1/2 left-1/2 w-56 sm:w-72"
              style={{ zIndex: 100 - a, x: "-50%", y: "-50%", transformStyle: "preserve-3d" }}
              animate={{
                translateX: `${o * 46}%`,
                rotateY: Math.max(-55, Math.min(55, -o * 38)),
                scale: front ? 1 : 1 - Math.min(a, 3) * 0.1,
                opacity: a > 3 ? 0 : 1,
                filter: front ? "brightness(1)" : `brightness(${1 - Math.min(a, 3) * 0.12})`,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            >
              {front ? (
                <Zoom items={items} index={k} className="rounded-2xl">
                  <span className="relative block aspect-square overflow-hidden rounded-2xl bg-paper shadow-[0_30px_60px_-25px_rgb(0_0_0/0.55)] ring-1 ring-black/10">
                    <Image src={post.image} alt={post.caption} fill sizes="(min-width: 640px) 288px, 224px" className="object-cover" draggable={false} />
                  </span>
                </Zoom>
              ) : (
                <button
                  type="button"
                  onClick={() => setI(k)}
                  tabIndex={a > 1 ? -1 : 0}
                  aria-label={`Show ${post.caption}`}
                  className="block w-full rounded-2xl"
                >
                  <span className="relative block aspect-square overflow-hidden rounded-2xl bg-paper shadow-[0_20px_40px_-20px_rgb(0_0_0/0.5)] ring-1 ring-black/10">
                    <Image src={post.image} alt="" fill sizes="(min-width: 640px) 288px, 224px" className="object-cover" draggable={false} />
                  </span>
                </button>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="min-w-0 text-sm">
          <span className="font-semibold tabular-nums">
            {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <span className="ml-3 text-muted">{socialDesignPosts[i].caption}</span>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous design"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper transition-colors hover:border-accent"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next design"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-ink"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
