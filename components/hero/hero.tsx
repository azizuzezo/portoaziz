"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Linkedin, Mail, MapPin } from "lucide-react";
import { person, stats } from "@/lib/content/profile";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/ui/stat-counter";
import { LaptopMockup, PhoneMockup } from "@/components/ui/device-mockup";
import { MonogramAvatar } from "@/components/hero/monogram-avatar";
import { RoleRotator } from "@/components/hero/role-rotator";

export function Hero() {
  return (
    <section
      id="hero"
      className="section-shell relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, white 14%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 60% 55% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 40%, black, transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="glass-panel mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-mist"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-emerald opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-emerald" />
        </span>
        Open to Customer Experience roles
      </motion.div>

      <MonogramAvatar />

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="mt-8 font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl md:text-7xl"
      >
        {person.name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-5"
      >
        <RoleRotator />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="mt-3 flex items-center justify-center gap-1.5 text-xs text-mist/80"
      >
        <MapPin className="h-3.5 w-3.5" />
        {person.location}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-4"
      >
        <Button href="#experience">
          Explore the Journey
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="glass-panel mt-14 grid w-full max-w-3xl grid-cols-2 divide-y divide-ink/8 rounded-3xl px-6 py-2 sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:py-0"
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative mt-24 w-full max-w-3xl px-6 sm:mt-28"
      >
        <LaptopMockup
          src="/images/mockups/site-desktop.jpg"
          alt="This portfolio site on desktop"
          className="w-full"
        />
        <PhoneMockup
          src="/images/mockups/site-mobile.jpg"
          alt="This portfolio site on mobile"
          className="absolute -bottom-10 -right-2 w-24 sm:-right-4 sm:w-32 md:-right-8 md:w-36"
        />
      </motion.div>
    </section>
  );
}
