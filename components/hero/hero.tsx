import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { highlights, person, summary } from "@/lib/content/profile";
import { Button } from "@/components/ui/button";
import { CountUp, Magnetic, Reveal, Spotlight, SplitWords, Tilt } from "@/components/motion/motion";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Backdrop: dot grid plus one soft accent glow, both behind the text and beside the photo. */}
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -top-40 -left-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl motion-safe:animate-[pulse_8s_ease-in-out_infinite]"
      />

      <div className="shell pt-10 pb-16 sm:pt-16 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] leading-[1.02] font-semibold tracking-tight">
              <SplitWords text="Abdul Aziz" stagger={0.08} />
              <br />
              <SplitWords text="Setiawan" delay={0.16} className="text-accent" />
            </h1>
            <Reveal delay={0.25}>
              <p className="mt-3 text-lg font-medium text-ink sm:text-xl">{person.title}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{summary.lead}</p>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{summary.body}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button href="#work">See the work</Button>
                </Magnetic>
                <Magnetic>
                  <Button href={person.cvUrl} external variant="secondary">
                    Download CV (PDF)
                  </Button>
                </Magnetic>
                <Button href={`mailto:${person.email}`} variant="quiet">
                  {person.email}
                </Button>
              </div>
              <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                <span className="relative flex h-2.5 w-2.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 motion-safe:animate-[ping-soft_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="font-medium text-ink">{person.lookingFor}</span>
                <span aria-hidden>·</span>
                {person.location}
              </p>
            </Reveal>
          </div>

          <Reveal className="md:col-span-5" delay={0.1}>
            <Tilt max={6}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sunken ring-1 ring-line">
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
            <Reveal key={h.label} delay={i * 0.06} className="h-full">
              <Spotlight className="flex h-full flex-col-reverse justify-end rounded-xl border border-line bg-surface/80 p-5 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1">
                <dt className="mt-1 text-sm leading-snug text-muted">{h.label}</dt>
                <dd className="text-3xl font-semibold text-accent sm:text-4xl">
                  <CountUp value={h.value} />
                </dd>
              </Spotlight>
            </Reveal>
          ))}
        </dl>

        <a
          href="#work"
          className="group mx-auto mt-12 hidden w-fit flex-col items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-ink md:flex"
        >
          Scroll to the work
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:text-accent">
            <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" aria-hidden />
          </span>
        </a>
      </div>
    </section>
  );
}
