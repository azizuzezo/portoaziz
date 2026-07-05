"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { achievements } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function AchievementGrid() {
  return (
    <section id="achievements" className="section-shell">
      <SectionHeading
        eyebrow="Achievements"
        title="Impact, in numbers and moments"
        description="A snapshot of what nine years of showing up for customers actually adds up to."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense lg:auto-rows-[minmax(180px,auto)]">
        {achievements.map((achievement, i) => {
          const featured = i === 0;
          return (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className={cn(
                "glass-panel group relative flex flex-col justify-center overflow-hidden rounded-3xl p-6 transition-colors hover:border-ink/15",
                featured && "lg:col-span-2 lg:row-span-2 lg:p-10"
              )}
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-aurora-violet/[0.06] blur-2xl transition-opacity group-hover:opacity-80" />
              {featured && (
                <Award className="absolute -bottom-4 -right-4 h-32 w-32 text-aurora-gold/[0.07]" />
              )}

              <span
                className={cn(
                  "font-display font-bold text-gradient-aurora",
                  featured ? "text-5xl lg:text-6xl" : "text-3xl"
                )}
              >
                {achievement.stat}
              </span>
              {achievement.statLabel && (
                <span className="ml-2 inline-block text-xs uppercase tracking-wide text-mist">
                  {achievement.statLabel}
                </span>
              )}
              <h3
                className={cn(
                  "mt-4 font-display font-semibold text-ink",
                  featured ? "text-2xl" : "text-lg"
                )}
              >
                {achievement.title}
              </h3>
              <p className={cn("mt-2 text-mist", featured ? "max-w-md text-base" : "text-sm")}>
                {achievement.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
