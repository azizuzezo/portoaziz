"use client";

import { motion } from "framer-motion";
import { Download, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { person, stats } from "@/lib/content/profile";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/ui/stat-counter";
import { RoleRotator } from "@/components/hero/role-rotator";

const socialLinks = [
  { href: `mailto:${person.email}`, label: "Email", icon: Mail, external: false },
  { href: person.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: person.cvUrl, label: "Resume", icon: Download, external: true },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="section-shell relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-32 lg:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, black 10%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent)",
        }}
      />

      <div className="relative flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-mist"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-emerald opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-emerald" />
          </span>
          Open to Customer Experience roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-7 font-display text-6xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.5rem]"
        >
          <span
            className="block sm:inline"
            style={{ WebkitTextStroke: "2px var(--color-ink)", color: "transparent" }}
          >
            Abdul
          </span>{" "}
          <span className="block text-ink sm:inline">Aziz</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="relative -mt-2 w-full max-w-xs overflow-hidden rounded-[2rem] shadow-xl sm:max-w-sm lg:max-w-md"
          style={{ aspectRatio: "4 / 5" }}
        >
          {person.hasPhoto ? (
            <Image
              src={person.photoUrl}
              alt={person.name}
              fill
              sizes="(min-width: 1024px) 480px, 70vw"
              quality={90}
              style={{ objectPosition: "50% 12%" }}
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface">
              <span className="font-display text-7xl font-semibold text-gradient-aurora">
                {person.initials}
              </span>
            </div>
          )}
        </motion.div>

        <div className="relative mt-8 grid w-full gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col items-center gap-3 lg:items-start lg:text-left"
          >
            <RoleRotator />
            <p className="max-w-xs text-sm leading-relaxed text-mist">
              Nine years turning frustrated passengers, guests, and customers into
              people who leave satisfied.
            </p>
            <Button href="#contact" size="sm" className="mt-1">
              Hire Me
            </Button>
          </motion.div>

          <div className="hidden lg:block" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-row flex-wrap items-center justify-center gap-2.5 lg:flex-col lg:items-end"
          >
            {socialLinks.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                data-cursor-hover
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-ink transition-transform hover:scale-105"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass-panel relative z-10 mt-14 grid w-full grid-cols-2 divide-y divide-ink/8 rounded-3xl px-6 py-2 sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:py-0"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-1 px-4 py-6"
          >
            <span className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              <StatCounter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-center text-xs text-mist sm:text-sm">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
