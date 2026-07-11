"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import { about, person, stats } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";

const industryAccent: Record<string, string> = {
  Transportation: "from-aurora-cyan/60 to-transparent",
  Hospitality: "from-aurora-rose/60 to-transparent",
  Fintech: "from-aurora-violet/60 to-transparent",
};

export function AboutJourney() {
  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow="About"
        title="A career built on serving people well"
        description="From railway platforms to residential lobbies to fintech help desks — the throughline is always the same: solve it, calmly and completely."
      />

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2.75rem] bg-gradient-to-br from-aurora-gold/70 to-aurora-orange/70 opacity-90" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.25rem] shadow-xl">
              {person.hasPhoto ? (
                <Image
                  src={person.photoUrl}
                  alt={person.name}
                  fill
                  sizes="(min-width: 1024px) 380px, 320px"
                  style={{ objectPosition: "50% 15%" }}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface">
                  <span className="font-display text-6xl font-semibold text-gradient-aurora">
                    {person.initials}
                  </span>
                </div>
              )}
            </div>

            <div className="glass-panel-strong absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-2xl px-5 py-3">
              {stats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-xl font-bold text-ink">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-[0.65rem] uppercase tracking-wide text-mist">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -right-3 top-6 flex flex-col gap-2">
              <a
                href={`mailto:${person.email}`}
                data-cursor-hover
                aria-label="Email"
                className="glass-panel-strong flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform hover:scale-110 hover:text-aurora-orange"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label="LinkedIn"
                className="glass-panel-strong flex h-10 w-10 items-center justify-center rounded-full text-ink transition-transform hover:scale-110 hover:text-aurora-orange"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <div className="mt-4 space-y-5 lg:mt-2">
            {about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-sm leading-relaxed text-mist sm:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col gap-6">
          <div className="absolute bottom-4 left-4 top-4 hidden w-px bg-gradient-to-b from-aurora-violet/40 via-aurora-cyan/40 to-aurora-rose/40 sm:block" />
          {about.arc.map((stage, i) => (
            <motion.div
              key={stage.industry}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-panel group relative rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-ink/15 sm:ml-10"
            >
              <div
                className={`absolute -left-10 top-6 hidden h-3 w-3 rounded-full bg-gradient-to-br sm:block ${
                  industryAccent[stage.industry] ?? "from-ink/40 to-transparent"
                }`}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-aurora-cyan">
                {stage.years}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                {stage.industry}
              </h3>
              <p className="mt-2 text-sm text-mist">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
