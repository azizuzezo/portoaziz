"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import { recommendations } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";

export function RecommendationsSection() {
  return (
    <section id="recommendations" className="section-shell">
      <SectionHeading
        eyebrow="Recommendations"
        title="What colleagues say"
        description="A few words from people I've worked alongside, straight from LinkedIn."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="glass-panel flex flex-col rounded-3xl p-6"
          >
            <Quote className="h-6 w-6 text-aurora-cyan/60" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">{rec.quote}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/15">
                <Image src={rec.photo} alt={rec.name} fill sizes="44px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-fog">{rec.name}</p>
                <p className="text-xs text-mist">{rec.title}</p>
                <p className="mt-0.5 text-[11px] text-mist/60">
                  {rec.relationship} &middot; {rec.date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
