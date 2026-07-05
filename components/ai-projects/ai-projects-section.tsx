"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { aiProjects } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";

export function AiProjectsSection() {
  return (
    <section id="ai-projects" className="section-shell">
      <SectionHeading
        eyebrow="AI Projects"
        title="Built with AI-assisted development"
        description="Live products shipped end-to-end using AI-assisted ('vibe coding') tools — no formal engineering background required."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aiProjects.map((project, i) => (
          <motion.a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="glass-panel group flex flex-col overflow-hidden rounded-3xl transition-colors hover:border-ink/20"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-ink/8 bg-slate-100">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 bg-white/70 px-3 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-aurora-rose/50" />
                <span className="h-2 w-2 rounded-full bg-aurora-gold/50" />
                <span className="h-2 w-2 rounded-full bg-aurora-emerald/50" />
              </div>
              <Image
                src={project.screenshot}
                alt={`${project.name} screenshot`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top pt-8 transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{project.name}</h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-mist transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-aurora-violet">
                {project.tagline}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{project.description}</p>
              <p className="mt-4 truncate text-xs text-mist/70">
                {project.url.replace("https://", "")}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
