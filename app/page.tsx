import { AboutJourney } from "@/components/about/about-journey";
import { AchievementGrid } from "@/components/achievements/achievement-grid";
import { AiProjectsSection } from "@/components/ai-projects/ai-projects-section";
import { CertificationsSection } from "@/components/certifications/certifications-section";
import { SectionNav } from "@/components/chrome/section-nav";
import { ContactSection } from "@/components/contact/contact-section";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { GallerySection } from "@/components/gallery/gallery-section";
import { GraphicDesignSection } from "@/components/graphic-design/graphic-design-section";
import { Hero } from "@/components/hero/hero";
import { PhotographySection } from "@/components/photography/photography-section";
import { RecommendationsSection } from "@/components/recommendations/recommendations-section";
import { ShortMovieSection } from "@/components/short-movie/short-movie-section";
import { SkillsSection } from "@/components/skills/skills-section";

export default function Home() {
  return (
    <main className="relative">
      <SectionNav />
      <Hero />
      <AboutJourney />
      <ExperienceTimeline />
      <SkillsSection />
      <AchievementGrid />
      <GraphicDesignSection />
      <PhotographySection />
      <GallerySection />
      <ShortMovieSection />
      <AiProjectsSection />
      <RecommendationsSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}
