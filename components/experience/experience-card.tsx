"use client";

import { motion } from "framer-motion";
import {
  Award,
  Building2,
  ChevronDown,
  ClipboardList,
  CreditCard,
  Rocket,
  ShoppingBag,
  TrainFront,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ExperienceEntry, Industry } from "@/lib/content/profile";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const industryIcon: Record<Industry, React.ComponentType<{ className?: string }>> = {
  retail: ShoppingBag,
  administration: ClipboardList,
  transportation: TrainFront,
  hospitality: Building2,
  fintech: CreditCard,
  venture: Rocket,
};

const industryLabel: Record<Industry, string> = {
  retail: "Retail",
  administration: "Administration",
  transportation: "Transportation",
  hospitality: "Hospitality",
  fintech: "Fintech",
  venture: "Venture",
};

const MAX_VISIBLE_IMAGES = 3;

export function ExperienceCard({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = industryIcon[entry.industry];
  const extraImages = (entry.images?.length ?? 0) - MAX_VISIBLE_IMAGES;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      className={cn(
        "glass-panel relative rounded-2xl p-5 transition-colors hover:border-ink/15 sm:p-6",
        entry.milestone && "border-aurora-gold/35"
      )}
    >
      <div className="flex flex-wrap items-start gap-4">
        <div
          className={cn(
            "relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl",
            entry.logo
              ? "border border-ink/10 bg-white shadow-md"
              : "glass-panel-strong text-aurora-cyan"
          )}
        >
          {entry.logo ? (
            <Image
              src={entry.logo}
              alt={entry.company}
              fill
              sizes="44px"
              className="object-contain p-1.5"
            />
          ) : (
            <Icon className="h-5 w-5" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
              {entry.role}
              <span className="font-normal text-mist"> · {entry.company}</span>
            </h3>
            <span className="whitespace-nowrap text-xs text-mist">
              {entry.period}
              <span className="text-mist/60"> · {entry.duration}</span>
            </span>
          </div>

          <p className="mt-1.5 text-sm text-fog">{entry.summary}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge className="py-0.5 text-[11px]">{industryLabel[entry.industry]}</Badge>
            {entry.milestone && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-aurora-gold/30 bg-aurora-gold/5 px-2.5 py-0.5 text-[11px] text-aurora-gold">
                <Award className="h-3 w-3" />
                {entry.milestone}
              </span>
            )}
          </div>

          {entry.images && entry.images.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              {entry.images.slice(0, MAX_VISIBLE_IMAGES).map((src) => (
                <div
                  key={src}
                  className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-ink/10"
                >
                  <Image
                    src={src}
                    alt={`${entry.company} — ${entry.role}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ))}
              {extraImages > 0 && (
                <span className="text-xs text-mist">+{extraImages} more</span>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-cursor-hover
            className="mt-3 flex items-center gap-1.5 text-xs font-medium text-aurora-cyan transition-colors hover:text-ink"
            aria-expanded={open}
          >
            {open ? "Hide details" : "Details"}
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
          </button>

          <motion.ul
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {entry.bullets.map((bullet) => (
              <li key={bullet} className="mt-2 flex gap-2 text-sm text-mist">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-aurora-cyan" />
                {bullet}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}
