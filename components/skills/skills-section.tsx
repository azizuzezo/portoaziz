import Image from "next/image";
import { certifications, education, languages } from "@/lib/content/profile";
import { Reveal, SplitWords } from "@/components/motion/motion";
import { ChipPlayground } from "@/components/skills/chip-playground";

const linkClass =
  "underline decoration-line underline-offset-4 transition-colors hover:decoration-accent";

export function SkillsSection() {
  return (
    <section id="skills" className="anchor">
      <div className="relative overflow-hidden bg-board/80 py-24 text-on-board md:py-32">
        <div className="shell relative">
          <h2 className="display text-[clamp(3rem,7vw,6rem)]">
            <SplitWords text="What I work with" />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-on-board/60">
              Every skill and tool I use day to day. Pick a group to bring it forward.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <ChipPlayground />
          </Reveal>
        </div>
      </div>

      <div id="credentials" className="shell grid py-20 md:py-28 grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <h3 className="border-b border-line pb-3 text-sm font-semibold">Certifications</h3>
          <ul className="mt-2">
            {certifications.map((c) => (
              <li key={c.title} className="border-b border-line text-[15px] last:border-0">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className={`flex min-h-12 items-center py-2 ${linkClass} hover:text-accent`}>
                    {c.title}
                    <span className="sr-only"> (certificate, opens in a new tab)</span>
                  </a>
                ) : (
                  c.title
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="border-b border-line pb-3 text-sm font-semibold">Education</h3>
          <div className="mt-4 flex items-start gap-3">
            <span className="relative mt-0.5 h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-line bg-white">
              <Image src={education.logo} alt="" fill sizes="40px" className="object-contain p-1" />
            </span>
            <div>
              <p className="text-[15px] font-medium">{education.school}</p>
              <p className="text-sm text-muted">{education.degree}</p>
              <p className="text-xs text-muted">{education.period}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{education.note}</p>
        </div>

        <div className="md:col-span-3">
          <h3 className="border-b border-line pb-3 text-sm font-semibold">Languages</h3>
          <dl className="mt-2">
            {languages.map((l) => (
              <div key={l.name} className="border-b border-line py-3 last:border-0">
                <dt className="text-[15px]">{l.name}</dt>
                <dd className="text-sm text-muted">{l.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
