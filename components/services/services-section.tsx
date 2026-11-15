"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Fragment, useRef } from "react";
import { services, type Service } from "@/lib/content/profile";
import { Reveal, SplitWords, scrollToY } from "@/components/motion/motion";
import { DotArt } from "@/components/services/dot-art";
import { cn } from "@/lib/utils";

// Surfaces cycle paper, board, sunken so each panel visibly replaces the one below it;
// the route-line colour (navy, steel, green) marks dots, chips and the stop.
const SURFACES = [
  { panel: "bg-paper", ink: "text-ink", soft: "text-muted", rule: "bg-ink/15" },
  { panel: "bg-board", ink: "text-on-board", soft: "text-on-board/70", rule: "bg-on-board/20" },
  { panel: "bg-sunken", ink: "text-ink", soft: "text-muted", rule: "bg-ink/15" },
];
const LINES: Record<Service["tone"], { chip: string; dot: string; swatch: string }> = {
  navy: { chip: "bg-l-navy text-paper", dot: "var(--l-navy)", swatch: "bg-l-navy" },
  steel: { chip: "bg-l-steel text-paper", dot: "var(--l-steel)", swatch: "bg-l-steel" },
  green: { chip: "bg-l-green text-paper", dot: "var(--l-green)", swatch: "bg-l-green" },
};
const toneOf = (s: Service, i: number) => ({ ...SURFACES[i % SURFACES.length], ...LINES[s.tone] });

function Index() {
  return (
    <div className="relative overflow-hidden bg-sunken/75 py-24 md:py-36">
      <div className="shell relative grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <h2 className="display text-[clamp(3.25rem,7vw,6rem)]">
            <SplitWords text="What I do" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              From the first complaint to the tool that stops it coming back, these are the parts of service I own.
            </p>
          </Reveal>
        </div>
        <ol className="md:col-span-7 md:col-start-6">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 0.05}>
              <a
                href={`#service-${s.id}`}
                onClick={(e) => {
                  // Measure the plain marker ourselves; generic anchor handling misjudges the sticky stack.
                  const el = document.getElementById(`service-${s.id}`);
                  if (!el) return;
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToY(el.getBoundingClientRect().top + window.scrollY);
                }}
                className="group flex min-h-16 items-center gap-5 border-t border-ink/10 py-3 transition-[padding] duration-300 last:border-b hover:pl-3 sm:gap-7"
              >
                <span className="w-6 text-sm font-semibold text-muted">0{i + 1}</span>
                <span
                  aria-hidden
                  className={cn(
                    "h-4 w-4 shrink-0 rounded-full ring-4 ring-paper transition-transform duration-300 group-hover:scale-150",
                    LINES[s.tone].swatch
                  )}
                />
                <span className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                  {s.title}
                </span>
                {/* Only on hover: tells the reader the row jumps down to its panel. */}
                <span aria-hidden className="ml-auto -translate-x-2 text-xl opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  ↓
                </span>
              </a>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Panel({ s, i, n, progress }: { s: Service; i: number; n: number; progress: MotionValue<number> }) {
  const t = toneOf(s, i);
  const span = 1 / (n - 1);
  // When the next panel slides over this one, it sinks back a little.
  const scale = useTransform(progress, [i * span, (i + 1) * span], [1, 0.92]);
  const radius = useTransform(progress, [i * span, (i + 1) * span], [0, 32]);
  const wordX = useTransform(progress, [(i - 1) * span, (i + 1) * span], ["-6%", "6%"]);

  return (
    <div className="sticky top-0 h-[100svh] overflow-hidden">
      <motion.article
        style={i < n - 1 ? { scale, borderRadius: radius } : undefined}
        className={cn("relative h-full origin-top overflow-hidden", t.panel, t.ink)}
        aria-labelledby={`service-${s.id}-title`}
      >
        {/* The service's line runs across the foot of the panel, with this panel's stop on it. */}
        <motion.div aria-hidden style={{ x: wordX }} className="pointer-events-none absolute right-[-20%] bottom-10 left-[-20%] flex items-center md:bottom-14">
          <span className="relative h-3 flex-1 rounded-full" style={{ background: t.dot }}>
            <span
              className="absolute top-1/2 left-[calc(20%+8rem)] h-9 w-9 -translate-y-1/2 rounded-full border-[6px] bg-paper"
              style={{ borderColor: t.dot }}
            />
          </span>
        </motion.div>

        <div className="shell relative grid h-full grid-cols-1 grid-rows-[auto_1fr_auto] gap-6 pt-28 pb-20 md:grid-cols-12 md:pt-32 md:pb-28">
          <div className="md:col-span-6">
            <p className={cn("text-sm font-semibold tabular-nums", t.soft)}>
              0{i + 1} / 0{n}
            </p>
            <h3 id={`service-${s.id}-title`} className="display mt-3 text-[clamp(2.75rem,6vw,5.5rem)] text-balance">
              <SplitWords text={s.title} stagger={0.06} />
            </h3>
          </div>

          <div className="relative min-h-0 md:col-span-6 md:row-span-2 md:row-start-1 md:col-start-7">
            <DotArt art={s.art} color={t.dot} className="absolute inset-0 h-full w-full" />
          </div>

          <div className="relative md:col-span-6 md:row-start-3">
            <div className={cn("h-px w-full max-w-xl", t.rule)} />
            <p className={cn("mt-6 max-w-xl text-lg leading-relaxed sm:text-xl", t.soft)}>{s.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className={cn("mr-1 text-xs font-semibold", t.soft)}>Day to day</span>
              {s.chips.map((c) => (
                <span key={c} className={cn("rounded-full px-3.5 py-1.5 text-sm font-semibold", t.chip)}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Where you are in the six panels. */}
        <ol aria-hidden className="absolute top-1/2 right-4 hidden -translate-y-1/2 flex-col items-end gap-4 sm:flex md:right-8">
          {services.map((x, k) => (
            <li key={x.id} className={cn("h-px bg-current transition-all", k === i ? "w-10 opacity-100" : "w-4 opacity-40")} />
          ))}
        </ol>
      </motion.article>
    </div>
  );
}

export function ServicesSection() {
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start start", "end end"] });
  return (
    <section id="services" className="anchor" aria-label="What I do">
      <Index />
      <div ref={stack} className="relative">
        {services.map((s, i) => (
          <Fragment key={s.id}>
            {/* Jump target for the index above. A sticky panel's own box moves while it is stuck,
                so links land on this plain marker, which sits where the panel arrives. */}
            <span id={`service-${s.id}`} aria-hidden className="block h-0 scroll-mt-0" />
            <Panel s={s} i={i} n={services.length} progress={scrollYProgress} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
