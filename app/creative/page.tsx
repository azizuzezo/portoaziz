import type { Metadata } from "next";
import { Pull } from "@/components/motion/pull";
import { PageHeader } from "@/components/chrome/page-header";
import { CreativeSection } from "@/components/creative/creative-section";
import { GallerySection } from "@/components/gallery/gallery-section";

export const metadata: Metadata = {
  title: "Creative",
  description: "Social media design, logos, a KMT card design entry, train photography and a short film, plus photos from the job.",
};

export default function CreativePage() {
  return (
    <>
      <PageHeader
        label="Creative"
        title="Design, photos and a short film, made around the job"
        intro={<p>Most of this came from the Customer Service On Train creative team at KAI Commuter.</p>}
      />
      <Pull>
        <CreativeSection />
      </Pull>
      <Pull>
        <GallerySection />
      </Pull>
    </>
  );
}
