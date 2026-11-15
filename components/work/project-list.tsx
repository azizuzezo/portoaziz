import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/content/profile";
import { ShotGallery } from "@/components/ui/shot-gallery";
import { Reveal } from "@/components/motion/motion";
import { cn } from "@/lib/utils";

function ProjectRow({ p, n, flip }: { p: Project; n: number; flip: boolean }) {
  const skor = p.group === "skor";
  const signIn = p.urlLabel?.includes("sign-in required");
  return (
    <Reveal as="article" className="grid grid-cols-1 items-start gap-8 border-t border-line py-14 md:grid-cols-12 md:gap-12 md:py-20">
      <div className={cn("min-w-0 md:col-span-7", flip && "md:order-2")}>
        <ShotGallery
          images={[p.image, ...(p.gallery ?? [])]}
          alt={p.imageAlt}
          label={p.urlLabel?.replace(" (sign-in required)", "") ?? "Internal tool"}
          sizes="(min-width: 768px) 56vw, 100vw"
        />
        {p.imageNote && <p className="mt-2 text-xs text-muted">{p.imageNote}</p>}
      </div>
      <div className="md:col-span-5 md:pt-4">
        {/* Index number in the group's line colour: blue for Skor tools, green for my products. */}
        <p className={cn("display text-5xl", skor ? "text-l-navy" : "text-l-green")}>{String(n).padStart(2, "0")}</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{p.name}</h3>
        <p className="mt-2 text-lg font-medium text-ink-soft">{p.tagline}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.description}</p>
        {p.points && (
          <ul className="mt-4 space-y-1.5 text-sm text-muted">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-2">
                <span className="mt-[9px] h-px w-3 shrink-0 bg-ink/40" aria-hidden />
                {pt}
              </li>
            ))}
          </ul>
        )}
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-4 text-sm">
          <div>
            <dt className="text-muted">Status</dt>
            <dd className="font-medium">{p.status}</dd>
          </div>
          <div>
            <dt className="text-muted">Built for</dt>
            <dd className="font-medium">{skor ? "Skor Technologies" : "My own product"}</dd>
          </div>
        </dl>
        {p.url && !signIn && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-ink/15 px-5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            {p.urlLabel === "Google Play" ? "Get it on Google Play" : `Visit ${p.urlLabel}`}
            {/* Only external links carry the arrow. */}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </Reveal>
  );
}

/**
 * Every project, one after another down the page, each with its screenshots cycling.
 * Two groups: tools built inside Skor (after the portal case study) and products Aziz runs.
 */
export function ProjectList() {
  const skor = projects.filter((p) => p.group === "skor");
  const own = projects.filter((p) => p.group === "own");
  return (
    <section aria-label="All projects" className="shell pb-24 md:pb-32">
      <div id="skor" className="anchor pt-20">
        <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)]">Built next, on the same sign-in</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          After the portal, the support team asked for chat and a place to run the customer chatbots.
        </p>
        <div className="mt-6">
          {skor.map((p, i) => (
            <ProjectRow key={p.id} p={p} n={i + 2} flip={i % 2 === 1} />
          ))}
        </div>
      </div>

      <div id="products" className="anchor mt-16">
        <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)]">Products I run</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">Built and run outside work, each for a problem I saw up close.</p>
        <div className="mt-6">
          {own.map((p, i) => (
            <ProjectRow key={p.id} p={p} n={skor.length + i + 2} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
