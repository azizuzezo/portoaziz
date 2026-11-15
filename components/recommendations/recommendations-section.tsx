"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { person, recommendations } from "@/lib/content/profile";
import { Reveal, SplitWords } from "@/components/motion/motion";
import { cn } from "@/lib/utils";

const n = recommendations.length;
// Where a card sits by its distance from the front of the deck.
const SLOT = [
  { y: 0, rotate: 0, scale: 1, opacity: 1 },
  { y: 26, rotate: 2.5, scale: 0.95, opacity: 1 },
  { y: 50, rotate: -2.5, scale: 0.9, opacity: 0.9 },
];

/**
 * Recommendations as a deck of letters. The front one is read in full; drag it aside or use
 * the arrows and it tucks to the back while the next comes forward. Quoted in full from LinkedIn.
 */
export function RecommendationsSection() {
  const [front, setFront] = useState(0);
  const go = (d: number) => setFront((v) => (v + d + n) % n);

  return (
    <section id="recommendations" aria-roledescription="carousel" aria-label="Recommendations" className="anchor relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute top-1/4 left-1/2 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="shell relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 className="display text-[clamp(2.4rem,4.5vw,4rem)] text-balance">
            <SplitWords text="What my colleagues say" stagger={0.04} />
          </h2>
          <Reveal delay={0.1}>
            <a
              href={`${person.linkedin}/details/recommendations/`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm text-muted underline decoration-line underline-offset-4 hover:text-ink hover:decoration-accent"
            >
              Quoted in full from LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous recommendation"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface transition-transform hover:-translate-x-0.5"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next recommendation"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform hover:translate-x-0.5"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
            <p className="ml-2 text-sm text-muted tabular-nums" aria-live="polite">
              <span className="display text-3xl text-ink">{String(front + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
            </p>
          </div>
          <p className="mt-4 hidden text-sm text-muted lg:block">Or drag the letter aside.</p>
        </div>

        <div className="grid pb-14 lg:col-span-8">
          {recommendations.map((r, k) => {
            const pos = (k - front + n) % n;
            const isFront = pos === 0;
            return (
              <motion.figure
                key={r.name}
                aria-hidden={!isFront}
                animate={SLOT[Math.min(pos, SLOT.length - 1)]}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 110) go(1);
                }}
                style={{ zIndex: n - pos, transformOrigin: "50% 100%" }}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col rounded-[2rem] border border-line bg-surface p-7 shadow-[0_30px_70px_-40px_rgb(0_0_0/0.45)] sm:p-10 dark:bg-[#1b2230]",
                  isFront && "cursor-grab active:cursor-grabbing"
                )}
              >
                <span aria-hidden className="display block h-10 text-7xl leading-none text-accent">
                  &ldquo;
                </span>
                <blockquote className="mt-2 mb-8 text-xl leading-snug font-medium tracking-tight sm:text-2xl">{r.quote}</blockquote>
                <figcaption className="mt-auto flex items-center gap-4 border-t border-line pt-6">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40">
                    <Image quality={90} src={r.photo} alt="" fill sizes="56px" className="object-cover" draggable={false} />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
