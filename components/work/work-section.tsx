"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { featuredCase } from "@/lib/content/profile";
import { TabsToPortal } from "@/components/work/tabs-to-portal";
import { ShotGallery } from "@/components/ui/shot-gallery";
import { CountUp, Reveal, Spotlight, SplitWords } from "@/components/motion/motion";

/**
 * The flagship case, told in depth. The screenshot rises and straightens as it scrolls in,
 * like a print being laid flat on the table.
 */
export function CaseStudy() {
  const c = featuredCase;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <section id="case" className="anchor relative overflow-hidden py-24 md:py-36">
      <div className="shell">
        <h2 className="display max-w-5xl text-[clamp(2.5rem,6.5vw,5.5rem)] text-balance">
          <SplitWords text={`${c.name}: one screen for the whole shift`} stagger={0.04} />
        </h2>

        <div ref={ref} className="relative mt-12 [perspective:1600px] md:mt-16">
          <motion.div style={{ rotateX, scale, y }} className="origin-bottom">
            <TabsToPortal>
              <ShotGallery
                images={[c.image, ...c.gallery]}
                alt={c.imageAlt}
                label={c.urlLabel}
                sizes="(min-width: 1312px) 1216px, 100vw"
              />
              <p className="mt-2 text-xs text-muted">{c.imageNote}</p>
            </TabsToPortal>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <Spotlight className="flex h-full flex-col justify-between rounded-3xl bg-accent p-7 text-accent-ink">
              <p className="display text-7xl">
                <CountUp value={c.result.value} />
              </p>
              <p className="mt-6 max-w-[14rem] text-[15px] text-accent-ink/80">{c.result.label}</p>
            </Spotlight>
          </Reveal>
          {c.sections.map((s, i) => (
            <Reveal key={s.heading} delay={0.08 * (i + 1)} className="md:col-span-3">
              <Spotlight className="h-full rounded-3xl border border-line bg-surface p-7 transition-transform duration-300 hover:-translate-y-1.5">
                <p className="text-xs font-semibold text-accent">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{s.heading}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 md:ml-[25%]">
          <figure>
            <blockquote className="text-2xl leading-snug font-medium tracking-tight text-ink sm:text-3xl">
              &ldquo;{c.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              <span className="font-semibold text-ink">{c.quote.name}</span>, {c.quote.role}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
