import type { SkillCategory } from "@/lib/content/profile";

export const categoryColor: Record<SkillCategory, string> = {
  "Customer Experience": "#0e7490",
  Communication: "#6d28d9",
  "Fintech Support": "#b45309",
  Hospitality: "#be123c",
  "Creative & Design": "#c2410c",
  "Leadership & Teamwork": "#0369a1",
  "Digital & AI": "#047857",
};

export const categoryClass: Record<SkillCategory, string> = {
  "Customer Experience": "border-aurora-cyan/30 bg-aurora-cyan/5 text-aurora-cyan",
  Communication: "border-aurora-violet/30 bg-aurora-violet/5 text-aurora-violet",
  "Fintech Support": "border-aurora-gold/30 bg-aurora-gold/5 text-aurora-gold",
  Hospitality: "border-aurora-rose/30 bg-aurora-rose/5 text-aurora-rose",
  "Creative & Design": "border-aurora-orange/30 bg-aurora-orange/5 text-aurora-orange",
  "Leadership & Teamwork": "border-aurora-sky/30 bg-aurora-sky/5 text-aurora-sky",
  "Digital & AI": "border-aurora-emerald/30 bg-aurora-emerald/5 text-aurora-emerald",
};
