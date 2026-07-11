"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { person, stats } from "@/lib/content/profile";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/ui/stat-counter";
import { RoleRotator } from "@/components/hero/role-rotator";

export function Hero() {
  const firstName = person.name.split(" ")[0];

  return (
    <section
      id="hero"
      className="section-shell relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-32 lg:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] lg:block"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, black 12%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 65% at 30% 45%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 65% at 30% 45%, black, transparent)",
        }}
      />

      <div className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
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

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 text-base font-medium text-mist"
          >
            Hello, I&apos;m {firstName}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-2 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]"
          >
            Customer
            <br />
            Experience
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-2 flex justify-center lg:justify-start"
          >
            <RoleRotator />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-mist sm:text-lg lg:mx-0"
          >
            Nine years turning frustrated passengers, guests, and customers into
            people who leave satisfied — across transportation, hospitality, and
            fintech.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-4 flex items-center justify-center gap-1.5 text-xs text-mist/80 lg:justify-start"
          >
            <MapPin className="h-3.5 w-3.5" />
            {person.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Button href="#contact">
              Hire Me
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button href={person.cvUrl} external variant="outline">
              <Download className="h-4 w-4" />
              Download CV
            </Button>
            <Button href={`mailto:${person.email}`} variant="ghost" size="sm">
              <Mail className="h-4 w-4" />
            </Button>
            <Button href={person.linkedin} external variant="ghost" size="sm">
              <Linkedin className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:ml-auto lg:mr-6">
            <div className="absolute -inset-6 -z-20 rounded-[63%_37%_54%_46%/45%_41%_59%_55%] bg-gradient-to-br from-aurora-gold to-aurora-orange opacity-90 sm:-inset-8" />
            <div className="absolute -inset-12 -z-30 rounded-[40%_60%_60%_40%/50%_40%_60%_50%] bg-aurora-gold/25 blur-3xl" />

            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
              {person.hasPhoto ? (
                <Image
                  src={person.photoUrl}
                  alt={person.name}
                  fill
                  sizes="(min-width: 1024px) 420px, 320px"
                  style={{ objectPosition: "50% 18%" }}
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
            </div>

            <span
              aria-hidden
              className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rotate-90 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-mist/70 lg:block"
            >
              Portfolio
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass-panel relative z-10 mt-16 grid w-full grid-cols-2 divide-y divide-ink/8 rounded-3xl px-6 py-2 sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:py-0"
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
