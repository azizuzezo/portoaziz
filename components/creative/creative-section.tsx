import Image from "next/image";
import { graphicDesignWork, kmtCard, photographyNote, shortMovie, socialMediaWork } from "@/lib/content/profile";
import { PhotoViewer } from "@/components/creative/photo-viewer";
import { PostFan } from "@/components/creative/post-fan";
import { KmtCard3D } from "@/components/graphic-design/kmt-card-3d";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/motion";


function Sub({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      {children && <div className="mt-2 text-muted">{children}</div>}
    </div>
  );
}

// The page header (app/creative) introduces this; the section is the body of that page.
export function CreativeSection() {
  return (
    <section aria-label="Creative work" className="bg-sunken/75 pt-14 pb-24 md:pt-16 md:pb-32">
      <div className="shell">
        {/* Instagram: real numbers, dated, with the source account linked. */}
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="max-w-2xl lg:col-span-4">
            <Sub title={socialMediaWork.handle}>
              <p>{socialMediaWork.description}</p>
            </Sub>
            <dl className="mt-6 grid grid-cols-2 border-t border-line">
              {socialMediaWork.metrics.map((m, i) => (
                <div key={m.label} className={`flex flex-col-reverse justify-end py-4 ${i ? "border-l border-line pl-4" : "pr-4"}`}>
                  <dt className="mt-1 text-sm text-muted">{m.label}</dt>
                  <dd className="text-3xl font-semibold text-accent sm:text-4xl">{m.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-muted">{socialMediaWork.asOf}</p>
            <Button href={socialMediaWork.url} external variant="secondary" className="mt-6">
              Open {socialMediaWork.handle} on Instagram
            </Button>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <PostFan />
          </div>
        </Reveal>

        <Reveal className="mt-20 grid grid-cols-1 items-center gap-10 border-t border-line pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <KmtCard3D />
          </div>
          <div className="md:col-span-5">
            <Sub title={kmtCard.title}>
              <p>{kmtCard.description}</p>
            </Sub>
            <p className="mt-3 text-xs text-muted">Click the card to flip it. Drag to turn it.</p>
            <ul className="mt-8 grid grid-cols-3 gap-3">
              {graphicDesignWork.map((g) => (
                <li key={g.title}>
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-line bg-white transition-transform duration-200 hover:-translate-y-1">
                    <Image src={g.image} alt={g.title} fill sizes="140px" className="object-contain p-3" />
                  </div>
                  <p className="mt-1.5 text-xs font-medium">{g.title}</p>
                  <p className="text-xs text-muted">{g.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-20 border-t border-line pt-10">
          <Sub title="Photography">
            <p>{photographyNote}</p>
          </Sub>
          <div className="mt-8">
            <PhotoViewer />
          </div>
        </Reveal>

        <Reveal className="mt-20 grid grid-cols-1 items-center gap-8 border-t border-line pt-10 md:grid-cols-12">
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl md:col-span-4">
            <Image src={shortMovie.poster} alt={`"${shortMovie.title}" poster`} fill sizes="320px" className="object-cover" />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-xs text-muted">{shortMovie.subtitle}</p>
            <h3 className="mt-2 text-4xl font-semibold">&ldquo;{shortMovie.title}&rdquo;</h3>
            <p className="mt-3 max-w-lg text-muted">{shortMovie.description}</p>
            <dl className="mt-6 grid max-w-lg gap-3 sm:grid-cols-3">
              {shortMovie.credits.map((c) => (
                <div key={c.role}>
                  <dt className="text-xs text-muted">{c.role}</dt>
                  <dd className="text-sm">{c.name}</dd>
                </div>
              ))}
            </dl>
            <Button href={shortMovie.link} external className="mt-8">
              Watch &ldquo;{shortMovie.title}&rdquo; on Instagram
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
