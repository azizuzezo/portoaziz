"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { shortMovie } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function ShortMovieSection() {
  return (
    <section id="short-movie" className="section-shell">
      <SectionHeading eyebrow="Short Movie Project" title={`"${shortMovie.title}"`} />

      <div className="glass-panel grid gap-8 overflow-hidden rounded-3xl p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/10"
        >
          <Image
            src={shortMovie.poster}
            alt={`${shortMovie.title} poster`}
            fill
            sizes="(min-width: 1024px) 400px, 80vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-sm font-medium text-aurora-cyan">{shortMovie.subtitle}</p>
          <p className="mt-4 text-base leading-relaxed text-mist">{shortMovie.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {shortMovie.credits.map((credit) => (
              <div key={credit.role}>
                <dt className="text-xs uppercase tracking-wide text-mist/60">{credit.role}</dt>
                <dd className="mt-0.5 text-fog">{credit.name}</dd>
              </div>
            ))}
          </dl>

          <Button href={shortMovie.link} external className="mt-8">
            <Play className="h-4 w-4" />
            Watch the short film
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
