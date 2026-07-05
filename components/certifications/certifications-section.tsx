"use client";

import { motion } from "framer-motion";
import { ExternalLink, GraduationCap, Languages, ShieldCheck, Users, Wrench } from "lucide-react";
import {
  certifications,
  education,
  languages,
  organizationalExperience,
  tools,
} from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

export function CertificationsSection() {
  return (
    <section id="credentials" className="section-shell">
      <SectionHeading
        eyebrow="Credentials"
        title="Education, certifications & languages"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-6 lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="glass-panel-strong flex h-10 w-10 items-center justify-center rounded-xl text-aurora-cyan">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-ink">Certifications</h3>
          </div>
          <ul className="space-y-3">
            {certifications.map((cert) => (
              <li key={cert.title} className="flex items-start gap-3 text-sm text-mist">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aurora-cyan" />
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="inline-flex items-start gap-1.5 hover:text-fog"
                  >
                    {cert.title}
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" />
                  </a>
                ) : (
                  cert.title
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="glass-panel-strong flex h-10 w-10 items-center justify-center rounded-xl text-aurora-rose">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">Education</h3>
            </div>
            <p className="text-sm font-medium text-fog">{education.school}</p>
            <p className="mt-1 text-sm text-mist">{education.degree}</p>
            <p className="mt-1 text-xs text-mist/70">{education.period}</p>
            <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4">
              {education.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-xs text-mist">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-aurora-rose" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel rounded-3xl p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="glass-panel-strong flex h-10 w-10 items-center justify-center rounded-xl text-aurora-emerald">
                <Languages className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">Languages</h3>
            </div>
            <ul className="space-y-2">
              {languages.map((lang) => (
                <li key={lang.name} className="flex items-center justify-between text-sm">
                  <span className="text-fog">{lang.name}</span>
                  <span className="text-xs text-mist">{lang.level}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel rounded-3xl p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="glass-panel-strong flex h-10 w-10 items-center justify-center rounded-xl text-aurora-violet">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Organizational Experience
            </h3>
          </div>
          <ul className="space-y-5">
            {organizationalExperience.map((org) => (
              <li key={org.role}>
                <p className="text-sm font-medium text-fog">{org.role}</p>
                <p className="text-xs text-mist">{org.org}</p>
                <p className="mt-0.5 text-xs text-mist/60">{org.period}</p>
                <ul className="mt-2 space-y-1.5">
                  {org.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-xs text-mist">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-aurora-violet" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel rounded-3xl p-6 lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="glass-panel-strong flex h-10 w-10 items-center justify-center rounded-xl text-aurora-gold">
              <Wrench className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-ink">Tools</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
