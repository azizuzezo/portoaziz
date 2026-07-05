"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { aiProjects, type AiProject } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { LaptopMockup } from "@/components/ui/device-mockup";
import { useTilt } from "@/lib/hooks/use-tilt";

function AiProjectCard({ project }: { project: AiProject }) {
  const { ref, style, glareStyle, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className="glass-panel group relative flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-300 ease-out hover:border-ink/20"
    >
      <div className="relative flex items-center justify-center overflow-hidden border-b border-ink/8 bg-black/20 px-6 pb-4 pt-10">
        <LaptopMockup
          src={project.screenshot}
          alt={`${project.name} screenshot`}
          tilt={{ x: 6, y: -14 }}
          className="w-full max-w-[280px] transition-transform duration-500 group-hover:scale-[1.04]"
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={glareStyle}
      />
    </a>
  );
}

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
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: (i % 3) * 0.1, ease: "easeOut" }}
          >
            <AiProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
