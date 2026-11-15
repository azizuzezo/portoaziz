"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { person, recommendations } from "@/lib/content/profile";
import { Reveal } from "@/components/motion/motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const DWELL = 10; // seconds per quote

/**
 * One recommendation at a time, quoted in full. Advances on its own, pauses while hovered
 * or focused, and the bar under the counter shows time to the next one.
 */
export function RecommendationsSection() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const n = recommendations.length;
  const go = useCallback(
    (d: number) => {
      setDir(d);
      setI((v) => (v + d + n) % n);
    },
    [n]
  );

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => go(1), DWELL * 1000);
    return () => clearTimeout(id);
  }, [i, paused, go]);

  const r = recommendations[i];

  return (
    <section
      id="recommendations"
      aria-roledescription="carousel"
      aria-label="Recommendations"
      className="anchor relative overflow-hidden bg-sunken/75 py-24 md:py-32"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden className="pointer-events-none absolute -top-10 right-[-5%] h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="shell relative">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What people I&apos;ve worked with say</h2>
          <a
            href={`${person.linkedin}/details/recommendations/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-accent"
          >
            Quoted in full from LinkedIn
          </a>
        </Reveal>

        <div className="relative mt-10 min-h-[22rem] sm:min-h-[18rem]" aria-live="polite">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={i}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: EASE }}
            >
              <blockquote className="max-w-5xl text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl md:text-[2.4rem] md:leading-[1.2]">
                <span className="text-accent">&ldquo;</span>
                {r.quote}
                <span className="text-accent">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-paper ring-2 ring-accent/40">
                  <Image src={r.photo} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="block text-sm text-muted">{r.title}</span>
                  <span className="block text-xs text-muted">
                    {r.relationship}, {r.date}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between gap-6 border-t border-ink/10 pt-6">
          <div className="w-full max-w-xs">
            <p className="flex items-baseline gap-1.5">
              <span className="display text-5xl tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-semibold text-muted">/ {String(n).padStart(2, "0")}</span>
            </p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                key={`${i}-${paused}`}
                className="h-full origin-left rounded-full bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? 0 : 1 }}
                transition={{ duration: paused ? 0 : DWELL, ease: "linear" }}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous recommendation"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/15 bg-paper transition-transform hover:-translate-x-0.5"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next recommendation"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper transition-transform hover:translate-x-0.5"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
