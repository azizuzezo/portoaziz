import Image from "next/image";
import { person, recommendations, type Recommendation } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/motion";

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

      <Reveal as="figure" className="mt-12 rounded-2xl bg-sunken p-6 sm:p-10 md:ml-[25%]">
        <blockquote className="text-xl leading-snug font-medium sm:text-2xl">&ldquo;{first.quote}&rdquo;</blockquote>
        <Person r={first} />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-12 border-t border-line pt-10 md:grid-cols-2 md:gap-10">
        {others.map((r, i) => (
          <Reveal as="figure" key={r.name} delay={i * 0.08} className={cn(i === 1 && "md:border-l md:border-line md:pl-10")}>
            <blockquote className="text-lg leading-relaxed text-ink-soft">&ldquo;{r.quote}&rdquo;</blockquote>
            <Person r={r} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
