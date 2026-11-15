import type { Metadata } from "next";
import { Pull } from "@/components/motion/pull";
import { CreativeBackdrop } from "@/components/chrome/header-backdrops";
import { PageHeader } from "@/components/chrome/page-header";
import { CreativeSection } from "@/components/creative/creative-section";

export const metadata: Metadata = {
  title: "Creative",
  description: "Social media design, logos, a KMT card design entry, train photography and a short film, plus photos from the job.",
};

export default function CreativePage() {
  return (
    <>
      <PageHeader
        label="Creative"
        backdrop={<CreativeBackdrop />}
        title="Made around the job"
        intro={<p>Designs, photos, logos and a short film. Most of it came from the Customer Service On Train creative team at KAI Commuter.</p>}
      />
      <Pull>
        <CreativeSection />
      </Pull>
    </>
  );
}
