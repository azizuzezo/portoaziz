import Image from "next/image";
import {
  graphicDesignWork,
  kmtCard,
  photographyNote,
  photographyWork,
  shortMovie,
  socialDesignPosts,
  socialMediaWork,
} from "@/lib/content/profile";
import { KmtCard3D } from "@/components/graphic-design/kmt-card-3d";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Zoom } from "@/components/motion/lightbox";
import { Reveal } from "@/components/motion/motion";

const postItems = socialDesignPosts.map((p) => ({ src: p.image, alt: p.caption, w: 1080, h: 1080 }));
const photoItems = photographyWork.map((p) => ({ src: p.image, alt: p.caption, w: 1200, h: 1500 }));

function Sub({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      {children && <div className="mt-2 text-muted">{children}</div>}
    </div>
  );
}

// A sunken band marks this as a side chapter: creative work done alongside service roles.
export function CreativeSection() {
  return (
    <section id="creative" className="anchor bg-sunken py-16 md:py-24">
      <div className="shell">
        <SectionHeading
          index="05"
          label="Creative"
          title="Design, photos and a short film, made around the job"
          intro={<p>Most of this came from the Customer Service On Train creative team at KAI Commuter.</p>}
        />

        {/* Instagram: real numbers, dated, with the source account linked. */}
        <Reveal className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
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
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:col-span-7">
            {socialDesignPosts.map((post, i) => (
              <li key={post.image}>
                <Zoom items={postItems} index={i} className="overflow-hidden rounded-lg">
                  <span className="relative block aspect-square bg-paper">
                    <Image src={post.image} alt={post.caption} fill sizes="(min-width: 768px) 15vw, 45vw" className="object-cover transition-transform duration-500 ease-out group-hover/zoom:scale-105" />
                  </span>
                </Zoom>
                <p className="mt-1.5 text-xs leading-snug text-muted">{post.caption}</p>
              </li>
            ))}
          </ul>
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
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {photographyWork.map((p, i) => (
              <li key={p.image}>
                <Zoom items={photoItems} index={i} className="overflow-hidden rounded-lg">
                  <span className="relative block aspect-[4/5] bg-paper">
                    <Image src={p.image} alt={p.caption} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-500 ease-out group-hover/zoom:scale-105" />
                  </span>
                </Zoom>
                <p className="mt-1.5 text-xs text-muted">{p.caption}</p>
              </li>
            ))}
          </ul>
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
