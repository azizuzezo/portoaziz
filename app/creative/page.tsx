import type { Metadata } from "next";
import { Pull } from "@/components/motion/pull";
import { CreativeBackdrop } from "@/components/chrome/header-backdrops";
import { PageHeader } from "@/components/chrome/page-header";
import { CreativeSection } from "@/components/creative/creative-section";

export const metadata: Metadata = {
  title: "Creative",
  description: "Social media designs, logos, a KMT card design competition entry, train photography and a short film.",
};

export default function CreativePage() {
  return (
    <>
      <PageHeader
        label="Creative"
        backdrop={<CreativeBackdrop />}
        title="Made alongside the job"
        intro={<p>Designs, photos, logos and a short film. Most of it was made with the Customer Service On Train creative team at KAI Commuter.</p>}
      />
      <Pull>
        <CreativeSection />
      </Pull>
    </>
  );
}
