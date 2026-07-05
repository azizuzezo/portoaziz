import Image from "next/image";
import { skills, tools } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillsGalaxy } from "@/components/skills/skills-galaxy";

export function SkillsSection() {
  const categoryCount = new Set(skills.map((s) => s.category)).size;

  return (
    <section id="skills" className="section-shell">
      <SectionHeading
        eyebrow="Skills"
        title="A floating universe of capabilities"
        description="Drag to orbit. Every node is a skill sharpened across transportation, hospitality, and fintech."
        align="center"
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="glass-panel overflow-hidden rounded-3xl lg:col-span-2">
          <SkillsGalaxy />
        </div>

        <div className="flex flex-col gap-5">
          <div className="glass-panel flex flex-1 flex-col justify-center rounded-3xl p-6">
            <span className="font-display text-4xl font-bold text-gradient-aurora">
              {skills.length}+
            </span>
            <p className="mt-1 text-sm text-mist">
              skills tracked across {categoryCount} categories
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <p className="text-sm font-medium text-fog">Tools in the kit</p>
            <div className="mt-3 flex -space-x-2">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white"
                  title={tool.name}
                >
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    fill
                    sizes="36px"
                    className="object-contain p-0.5"
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-mist/70">{tools.length} apps, from design to ops</p>
          </div>
        </div>
      </div>
    </section>
  );
}
