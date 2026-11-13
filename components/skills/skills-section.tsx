import Image from "next/image";
import {
  certifications,
  education,
  languages,
  skillGroups,
  tools,
} from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee, Reveal, Spotlight } from "@/components/motion/motion";

function ToolChip({ t }: { t: (typeof tools)[number] }) {
  return (
    <span className="flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-5 pl-1.5 text-sm whitespace-nowrap transition-[transform,border-color] duration-150 hover:-translate-y-0.5 hover:border-accent">
      {t.logo ? (
        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white">
          <Image src={t.logo} alt="" fill sizes="36px" className="object-contain p-1" />
        </span>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
          {t.name.charAt(0)}
        </span>
      )}
      {t.name}
    </span>
  );
}

const linkClass =
  "underline decoration-line underline-offset-4 transition-colors hover:decoration-accent";

export function SkillsSection() {
  return (
    <section id="skills" className="anchor shell py-16 md:py-24">
      <SectionHeading index="04" label="Skills" title="What I bring to a CRM or systems team" />

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.08} className="h-full">
            <Spotlight className="h-full rounded-2xl border border-line bg-surface p-6">
              <p className="text-xs font-semibold text-accent">0{i + 1}</p>
              <h3 className="mt-2 text-lg font-semibold">{g.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-sunken px-3 py-1.5 text-sm text-ink-soft transition-colors duration-150 hover:bg-accent hover:text-accent-ink"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <h3 className="border-b border-line pb-3 text-sm font-semibold">Tools</h3>
        <ul className="sr-only">
          {tools.map((t) => (
            <li key={t.name}>{t.name}</li>
          ))}
        </ul>
        <div aria-hidden className="mt-5 space-y-3">
          <Marquee duration={45}>
            {tools.map((t) => (
              <ToolChip key={t.name} t={t} />
            ))}
          </Marquee>
          <Marquee duration={50} reverse>
            {[...tools].reverse().map((t) => (
              <ToolChip key={t.name} t={t} />
            ))}
          </Marquee>
        </div>
      </Reveal>

      <div id="credentials" className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
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
