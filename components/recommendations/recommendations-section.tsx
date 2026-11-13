import Image from "next/image";
import { person, recommendations, type Recommendation } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Quote } from "lucide-react";
import { Reveal, Spotlight } from "@/components/motion/motion";

function Person({ r }: { r: Recommendation }) {
  return (
    <figcaption className="mt-6 flex items-center gap-3">
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-sunken">
        <Image src={r.photo} alt="" fill sizes="44px" className="object-cover" />
      </span>
      <span className="text-sm">
        <span className="block font-medium">{r.name}</span>
        <span className="block text-muted">{r.title}</span>
        <span className="block text-xs text-muted">
          {r.relationship}, {r.date}
        </span>
      </span>
    </figcaption>
  );
}

export function RecommendationsSection() {
  const [first, ...others] = recommendations;
  return (
    <section id="recommendations" className="anchor shell py-16 md:py-24">
      <SectionHeading
        index="03"
        label="Recommendations"
        title="What people I've worked with say"
        intro={
          <p>
            Quoted in full from{" "}
            <a
              href={`${person.linkedin}/details/recommendations/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              my LinkedIn profile
            </a>
            .
          </p>
        }
      />

      <Reveal className="mt-12 md:ml-[25%]">
        <Spotlight as="figure" className="rounded-2xl border border-line bg-sunken p-6 sm:p-10">
          <Quote className="h-8 w-8 text-accent" aria-hidden />
          <blockquote className="mt-4 text-xl leading-snug font-medium sm:text-2xl">&ldquo;{first.quote}&rdquo;</blockquote>
          <Person r={first} />
        </Spotlight>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {others.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08} className="h-full">
            <Spotlight
              as="figure"
              className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-8"
            >
              <div>
                <Quote className="h-6 w-6 text-accent/60" aria-hidden />
                <blockquote className="mt-3 text-lg leading-relaxed text-ink-soft">&ldquo;{r.quote}&rdquo;</blockquote>
              </div>
              <Person r={r} />
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
