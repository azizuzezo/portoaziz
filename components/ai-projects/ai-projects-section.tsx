"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
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
            className="glass-panel group flex flex-col rounded-3xl p-6 transition-colors hover:border-ink/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="glass-panel-strong flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-aurora-violet">
                <Sparkles className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-mist transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{project.name}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-aurora-violet">
              {project.tagline}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{project.description}</p>
            <p className="mt-4 truncate text-xs text-mist/70">
              {project.url.replace("https://", "")}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
