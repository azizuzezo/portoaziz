import Image from "next/image";
import { highlights, person, summary } from "@/lib/content/profile";
import { Button } from "@/components/ui/button";
import { CountUp, Reveal, Tilt } from "@/components/motion/motion";

export function Hero() {
  return (
    <section className="shell pt-10 pb-16 sm:pt-16 md:pb-24">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-7">
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-semibold tracking-tight">
            Abdul Aziz
            <br />
            Setiawan
          </h1>
          <p className="mt-3 text-lg font-medium text-accent sm:text-xl">{person.title}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{summary.lead}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{summary.body}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#work">See the work</Button>
            <Button href={person.cvUrl} external variant="secondary">
              Download CV (PDF)
            </Button>
            <Button href={`mailto:${person.email}`} variant="quiet">
              {person.email}
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            <span className="font-medium text-ink">{person.lookingFor}</span>
            <span aria-hidden> · </span>
            {person.location}
          </p>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.1}>
          <Tilt max={4}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sunken">
              <Image
                src={person.photoUrl}
                alt={`Portrait of ${person.name}`}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "51% 30%" }}
              />
            </div>
          </Tilt>
        </Reveal>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4">
        {highlights.map((h, i) => (
          <Reveal
            key={h.label}
            delay={i * 0.06}
            className="flex h-full flex-col-reverse justify-end rounded-xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-accent"
          >
            <dt className="mt-1 text-sm leading-snug text-muted">{h.label}</dt>
            <dd className="text-3xl font-semibold text-accent sm:text-4xl">
              <CountUp value={h.value} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
