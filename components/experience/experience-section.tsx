import Image from "next/image";
import { earlierRoles, experience } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, ScrollLine } from "@/components/motion/motion";
import { Zoom } from "@/components/motion/lightbox";

// A ledger, not cards: period on the left, the work on the right, hairlines between.
export function ExperienceSection() {
  return (
    <section id="experience" className="anchor shell py-16 md:py-24">
      <SectionHeading
        index="02"
        label="Experience"
        title="Nine years on the front line, in four industries"
        intro={<p>Newest first. Every role was customer-facing; the later ones added the systems behind the service.</p>}
      />

      <div className="relative mt-12 pl-8 md:pl-10">
        <ScrollLine className="left-[7px]" />
        <ol>
        {experience.map((e) => (
          <Reveal as="li" key={e.id} className="group/role relative grid grid-cols-1 gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8">
            <span
              aria-hidden
              className="absolute top-9 -left-8 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-accent bg-paper transition-transform duration-200 group-hover/role:scale-125 md:-left-10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <div className="md:col-span-3">
              <p className="text-sm font-semibold text-accent">{e.period}</p>
              <p className="mt-1 text-xs text-muted">{e.place}</p>
            </div>

            <div className="md:col-span-9">
              <div className="flex items-start gap-4">
                {e.logo && (
                  <span className="relative mt-1 hidden h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-line bg-white sm:block">
                    <Image src={e.logo} alt="" fill sizes="40px" className="object-contain p-1" />
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover/role:text-accent sm:text-2xl">{e.role}</h3>
                  <p className="mt-0.5 text-ink-soft">{e.company}</p>
                </div>
              </div>

              <ul className="mt-4 max-w-3xl space-y-2 text-[15px] leading-relaxed text-muted">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[11px] h-px w-3 shrink-0 bg-ink/40" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>

              {e.milestone && (
                <p className="mt-5 max-w-3xl rounded-xl bg-accent-soft px-4 py-3 text-[15px] leading-relaxed text-ink">
                  <span className="font-semibold">Highlight: </span>
                  {e.milestone}
                </p>
              )}

              {e.images && (
                <ul className="mt-5 flex gap-2 overflow-x-auto pb-1">
                  {e.images.map((img, i) => (
                    <li key={img.src} className="shrink-0">
                      <Zoom
                        items={e.images!.map((x) => ({ src: x.src, alt: x.alt, w: 1600, h: 1200 }))}
                        index={i}
                        className="overflow-hidden rounded-lg"
                      >
                        <span className="relative block h-20 w-[6.75rem] bg-sunken sm:h-28 sm:w-40">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="160px"
                            className="object-cover transition-transform duration-300 group-hover/zoom:scale-105"
                          />
                        </span>
                      </Zoom>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}

        <Reveal as="li" className="group/role relative grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:gap-8">
            <span
              aria-hidden
              className="absolute top-9 -left-8 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-accent bg-paper transition-transform duration-200 group-hover/role:scale-125 md:-left-10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-accent">{earlierRoles.period}</p>
          </div>
          <div className="md:col-span-9">
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">Earlier roles</h3>
            <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {earlierRoles.roles.map((r) => (
                <div key={r.company}>
                  <dt className="text-[15px] font-medium">
                    {r.role}, <span className="font-normal text-ink-soft">{r.company}</span>
                  </dt>
                  <dd className="mt-0.5 text-sm text-muted">{r.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </ol>
      </div>
    </section>
  );
}
