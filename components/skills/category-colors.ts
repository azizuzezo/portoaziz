import type { SkillCategory } from "@/lib/content/profile";

export const categoryColor: Record<SkillCategory, string> = {
  "Customer Experience": "#4fd8e0",
  Communication: "#8b7cf6",
  "Fintech Support": "#f5c04a",
  Hospitality: "#f68b9d",
  "Creative & Design": "#ff8a4c",
  "Leadership & Teamwork": "#7dd3fc",
  "Digital & AI": "#34d1a0",
};

export const categoryClass: Record<SkillCategory, string> = {
  "Customer Experience": "border-aurora-cyan/40 text-aurora-cyan",
  Communication: "border-aurora-violet/40 text-aurora-violet",
  "Fintech Support": "border-aurora-gold/40 text-aurora-gold",
  Hospitality: "border-aurora-rose/40 text-aurora-rose",
  "Creative & Design": "border-orange-400/40 text-orange-300",
  "Leadership & Teamwork": "border-sky-400/40 text-sky-300",
  "Digital & AI": "border-aurora-emerald/40 text-aurora-emerald",
};
