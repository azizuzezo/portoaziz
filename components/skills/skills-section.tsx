import Image from "next/image";
import { certifications, education, languages } from "@/lib/content/profile";
import { Reveal, SplitWords } from "@/components/motion/motion";
import { ChipPlayground } from "@/components/skills/chip-playground";

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
              The skills and tools I use every day. Pick a group to highlight it.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <ChipPlayground />
          </Reveal>
        </div>
      </div>

      <div id="credentials" className="shell grid grid-cols-1 gap-5 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="rounded-[2rem] bg-surface p-7 ring-1 ring-line md:col-span-7 md:p-10">
          <h3 className="display text-3xl">Certifications</h3>
          <ul className="mt-6">
            {certifications.map((c, i) => (
              <li key={c.title} className="border-t border-line">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-center gap-4 py-2 transition-[padding] duration-300 hover:pl-2 hover:text-accent"
                >
                  <span className="w-6 text-sm text-muted tabular-nums">0{i + 1}</span>
                  <span className="flex-1 text-[15px] font-medium">{c.title}</span>
                  <span aria-hidden className="text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                    ↗
                  </span>
                  <span className="sr-only"> (certificate, opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-5 md:col-span-5">
          <Reveal delay={0.08} className="rounded-[2rem] bg-accent p-7 text-accent-ink md:p-10">
            <h3 className="display text-3xl">Education</h3>
            <div className="mt-6 flex items-center gap-4">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white">
                <Image quality={90} src={education.logo} alt="" fill sizes="56px" className="object-contain p-1.5" />
              </span>
              <div>
                <p className="text-lg font-semibold">{education.school}</p>
                <p className="text-sm opacity-80">
                  {education.degree} · {education.period}
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed opacity-85">{education.note}</p>
          </Reveal>
          <Reveal delay={0.16} className="rounded-[2rem] bg-surface p-7 ring-1 ring-line md:p-10">
            <h3 className="display text-3xl">Languages</h3>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              {languages.map((l) => (
                <div key={l.name}>
                  <dt className="font-semibold">{l.name}</dt>
                  <dd className="text-sm text-muted">{l.level}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
