import { Navbar } from "@/components/chrome/navbar";
import { ContactSection } from "@/components/contact/contact-section";
import { CreativeSection } from "@/components/creative/creative-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { GallerySection } from "@/components/gallery/gallery-section";
import { Hero } from "@/components/hero/hero";
import { RecommendationsSection } from "@/components/recommendations/recommendations-section";
import { SkillsSection } from "@/components/skills/skills-section";
import { WorkSection } from "@/components/work/work-section";
import { LightboxProvider } from "@/components/motion/lightbox";
import { MotionProvider, ScrollProgress } from "@/components/motion/motion";

// Order follows what a hiring manager for a CRM or systems role checks first:
// what Aziz built, where Aziz worked, who vouches for the work, then the rest.
export default function Home() {
  return (
    <MotionProvider>
      <LightboxProvider>
      <ScrollProgress />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to the work
      </a>
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <ExperienceSection />
        <RecommendationsSection />
        <SkillsSection />
        <CreativeSection />
        <GallerySection />
      </main>
      <ContactSection />
      </LightboxProvider>
    </MotionProvider>
  );
}
