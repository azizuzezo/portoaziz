import { Pull } from "@/components/motion/pull";
import { MarqueeBand } from "@/components/band/marquee-band";
import { ContactSection } from "@/components/contact/contact-section";
import { Hero } from "@/components/hero/hero";
import { RecommendationsSection } from "@/components/recommendations/recommendations-section";
import { ServicesSection } from "@/components/services/services-section";

// Home only carries what no other page has: the introduction, what Aziz does, who vouches for him,
// and a way on to Contact. Work, About, Creative and Contact each live on their own page.
export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <ServicesSection />
      <Pull>
        <RecommendationsSection />
      </Pull>
      <Pull>
        <ContactSection />
      </Pull>
    </>
  );
}
