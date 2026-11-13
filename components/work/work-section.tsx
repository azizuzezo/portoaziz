import { ArrowUpRight } from "lucide-react";
import { featuredCase, projects, type Project } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shot } from "@/components/ui/shot";
import { cn } from "@/lib/utils";
import { CountUp, Reveal } from "@/components/motion/motion";

// The arrow marks links that leave the site and open a new tab; nothing else gets one.
function OutLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-11 items-center gap-1 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
      <ArrowUpRight
        className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        aria-hidden
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function CaseMeta({ parts }: { parts: string[] }) {
  return (
    <p className="text-xs text-muted">
      {parts.map((p, i) => (
        <span key={p}>
          {i > 0 && <span aria-hidden> · </span>}
          {i === 0 ? <span className="text-accent">{p}</span> : p}
        </span>
      ))}
    </p>
  );
}

function FeaturedCase() {
  const c = featuredCase;
  return (
    <Reveal as="article" className="mt-14">
      <CaseMeta parts={["Case 01", c.org, c.status]} />
      <h3 id="case-01" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {c.name}
      </h3>

      <Shot
        image={c.image}
        alt={c.imageAlt}
        label={c.urlLabel}
        sizes="(min-width: 1216px) 1152px, 100vw"
        className="mt-6"
      />

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <div className="rounded-xl bg-accent-soft p-6 md:col-span-3">
          <p className="text-6xl font-semibold text-accent">
            <CountUp value={c.result.value} />
          </p>
          <p className="mt-2 max-w-[14rem] text-sm text-ink-soft">{c.result.label}</p>
        </div>
        {c.sections.map((s) => (
          <div key={s.heading} className="md:col-span-3">
            <h4 className="text-sm font-semibold">{s.heading}</h4>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
          </div>
        ))}
      </div>

      <figure className="mt-10 rounded-xl border border-line bg-sunken p-6 sm:p-8 md:ml-[25%]">
        <blockquote className="text-xl leading-snug text-ink sm:text-2xl">
          &ldquo;{c.quote.text}&rdquo;
        </blockquote>
        <figcaption className="mt-4 text-sm text-muted">
          {c.quote.name}, {c.quote.role}.{" "}
          <a href="#recommendations" className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
            Read the full recommendation
          </a>
        </figcaption>
      </figure>
    </Reveal>
  );
}

function SkorTool({ p, n }: { p: Project; n: number }) {
  return (
    <Reveal as="article" className="flex min-w-0 flex-col">
      <Shot
        image={p.image}
        alt={p.imageAlt}
        label={p.urlLabel ?? "Internal, no public URL"}
        sizes="(min-width: 768px) 33vw, 100vw"
      />
      {p.imageNote && <p className="mt-2 text-[11px] text-muted">{p.imageNote}</p>}
      <div className="mt-5">
        <CaseMeta parts={[`Case 0${n}`, p.status]} />
        <h4 className="mt-2 text-xl font-semibold">{p.name}</h4>
        <p className="mt-1 text-sm font-medium text-ink-soft">{p.tagline}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>
      </div>
    </Reveal>
  );
}

function ProductRow({ p, flip }: { p: Project; flip: boolean }) {
  return (
    <Reveal as="article" className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10">
      <div className={cn("md:col-span-7", flip && "md:order-2")}>
        <Shot image={p.image} alt={p.imageAlt} label={p.urlLabel} sizes="(min-width: 768px) 58vw, 100vw" />
      </div>
      <div className="md:col-span-5">
        <CaseMeta parts={[p.status]} />
        <h4 className="mt-2 text-3xl font-semibold tracking-tight">{p.name}</h4>
        <p className="mt-2 text-base font-medium text-ink-soft">{p.tagline}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.description}</p>
        {p.points && (
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-2">
                <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" aria-hidden />
                {pt}
              </li>
            ))}
          </ul>
        )}
        {p.url && (
          <div className="mt-4">
            <OutLink href={p.url}>{p.urlLabel === "Google Play" ? "Get it on Google Play" : `Visit ${p.urlLabel}`}</OutLink>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function ProductCard({ p }: { p: Project }) {
  return (
    <Reveal as="article" className="flex min-w-0 flex-col">
      <Shot image={p.image} alt={p.imageAlt} label={p.urlLabel} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <h4 className="mt-5 text-xl font-semibold">{p.name}</h4>
      <p className="mt-1 text-sm font-medium text-ink-soft">{p.tagline}</p>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.description}</p>
      {p.url && (
        <div className="mt-2">
          <OutLink href={p.url}>Visit {p.urlLabel}</OutLink>
        </div>
      )}
    </Reveal>
  );
}

export function WorkSection() {
  const skor = projects.filter((p) => p.group === "skor");
  const own = projects.filter((p) => p.group === "own");
  // The first two (Teman Kereta, Patungan Yuk!) get full rows to vary the rhythm; the rest share a grid.
  const lead = own.slice(0, 2);
  const rest = own.slice(2);

  return (
    <section id="work" className="anchor shell py-16 md:py-24">
      <SectionHeading
        index="01"
        label="Work"
        title="Tools for the team I work in, and products I run myself"
        intro={
          <p>
            All built end to end with AI-assisted development. Screenshots were taken from the live
            products in November 2026.
          </p>
        }
      />

      <FeaturedCase />

      <div className="mt-20 border-t border-line pt-10">
        <h3 className="text-2xl font-semibold tracking-tight">Built next, on the same sign-in</h3>
        <p className="mt-2 max-w-2xl text-muted">
          After the portal, the team asked for chat and a place to run the customer chatbots.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {skor.map((p, i) => (
            <SkorTool key={p.id} p={p} n={i + 2} />
          ))}
        </div>
      </div>

      <div className="mt-20 border-t border-line pt-10">
        <h3 className="text-2xl font-semibold tracking-tight">My own products</h3>
        <p className="mt-2 max-w-2xl text-muted">
          Built and run outside work, each for a problem I saw up close.
        </p>
        <div className="mt-10 space-y-16">
          {lead.map((p, i) => (
            <ProductRow key={p.id} p={p} flip={i % 2 === 1} />
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
