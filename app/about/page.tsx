import type { Metadata } from "next";
import { Pull } from "@/components/motion/pull";
import { highlights, summary } from "@/lib/content/profile";
import { ScrollText } from "@/components/motion/scroll-text";
import { AboutHero } from "@/components/about/about-hero";
import { GallerySection } from "@/components/gallery/gallery-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { SkillsSection } from "@/components/skills/skills-section";

export const metadata: Metadata = {
  title: "About",
  description: "Nine years handling customer experience across transport, hospitality, retail and fintech, and the tools built along the way.",
};

// The portrait lives on Home (the ID card), so About opens straight on the story and the numbers.
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      {/* The four headline figures, as cards under the opener. */}
      <section aria-label="In numbers" className="shell pb-8">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="flex flex-col-reverse justify-end rounded-2xl bg-paper/90 p-5 ring-1 ring-line">
              <dt className="mt-2 text-sm leading-snug text-muted">{h.label}</dt>
              <dd className="display text-4xl sm:text-5xl">{h.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      {/* The short version: lights up word by word as it scrolls past. */}
      <Pull>
      <section aria-label="The short version" className="shell grid grid-cols-1 gap-6 py-24 md:grid-cols-12 md:py-32">
        <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] md:col-span-4">The short version</h2>
        <ScrollText
          text={summary.body}
          className="text-[clamp(1.5rem,2.8vw,2.5rem)] leading-snug font-semibold tracking-tight md:col-span-8"
        />
      </section>
      </Pull>
      <Pull>
        <ExperienceSection />
      </Pull>
      {/* Photos from those jobs sit with the career they belong to, not with the creative work. */}
      <Pull>
        <GallerySection />
      </Pull>
      <Pull>
        <SkillsSection />
      </Pull>
    </>
  );
}
