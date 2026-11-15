import type { Metadata } from "next";
import { Pull } from "@/components/motion/pull";
import { PageHeader } from "@/components/chrome/page-header";
import { CaseStudy } from "@/components/work/work-section";
import { ProjectList } from "@/components/work/project-list";

export const metadata: Metadata = {
  title: "Work",
  description: "Internal tools for the Skor support team and the products Aziz runs himself, with screenshots from the live products.",
};

// Read top to bottom: the flagship case (01) first, then every other tool and product in full.
export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Work"
        title="Tools for a support team, and products I run"
        intro={
          <p>
            All built end to end with AI-assisted development. Screenshots were taken from the live products in
            November 2026; customer details are blurred.
          </p>
        }
      />
      <Pull>
        <CaseStudy />
      </Pull>
      <Pull>
        <ProjectList />
      </Pull>
    </>
  );
}
