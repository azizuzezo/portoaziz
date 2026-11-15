import Image from "next/image";
import { earlierRoles, experience } from "@/lib/content/profile";
import { Reveal, ScrollLine, SplitWords } from "@/components/motion/motion";
import { Zoom } from "@/components/motion/lightbox";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// "Jun 2026 – Present" -> months since; the CV's "Present" is read as today's date.
const parse = (t: string) => {
  if (t.trim() === "Present") {
    const d = new Date();
    return d.getFullYear() * 12 + d.getMonth();
  }
  const [m, y] = t.trim().split(" ");
  return Number(y) * 12 + MONTHS.indexOf(m);
};
function durationOf(period: string) {
  const [a, b] = period.split("–");
  const n = parse(b) - parse(a) + 1;
  const y = Math.floor(n / 12), m = n % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo`].filter(Boolean).join(" ");
}
function yearsOf(period: string) {
  const [a, b] = period.split("–").map((t) => t.trim());
  const ya = a.split(" ")[1];
  const yb = b === "Present" ? "" : b.split(" ")[1];
  return yb && yb !== ya ? `${ya} – ${yb}` : ya;
}

// The ledger: period on the left, the work on the right; the line fills as you read down it.
export function ExperienceSection() {
  return (
    <section id="experience" className="anchor shell py-24 md:py-32">
      <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)]">
        <SplitWords text="Every stop so far" />
      </h2>
      <p className="mt-4 text-lg text-muted">Newest first.</p>
      <div className="relative mt-10 pl-8 md:pl-10">
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
              <p className="text-2xl font-semibold tracking-tight">
                {yearsOf(e.period)}
                {e.period.includes("Present") && <span className="ml-2 text-accent">Now</span>}
              </p>
              <p className="mt-1 text-sm text-muted">
                {e.period} · {durationOf(e.period)}
              </p>
              <p className="text-xs text-muted">{e.place}</p>
            </div>

            <div className="md:col-span-9">
              <div className="flex items-start gap-4">
                {e.logo && (
                  <span className="relative mt-1 hidden h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-line bg-white sm:block">
                    <Image src={e.logo} alt="" fill sizes="40px" className="object-contain p-1" />
                  </span>
                )}
                <div className="min-w-0">
                  <h4 className="text-2xl font-semibold tracking-tight transition-colors group-hover/role:text-accent sm:text-3xl">{e.role}</h4>
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
            <h4 className="text-2xl font-semibold tracking-tight sm:text-3xl">Earlier roles</h4>
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
