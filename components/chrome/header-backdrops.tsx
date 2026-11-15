"use client";

import Image from "next/image";
import { experience, featuredCase, photographyWork, projects, shortMovie, socialDesignPosts } from "@/lib/content/profile";

/*
 * Header backdrops that show what the page holds, instead of decoration:
 * Work = the real product screenshots drifting past, Creative = the designs and photos as a
 * floating collage, About = the career as a moving timeline strip. Each fades out toward the
 * title side so the heading always sits on clean ground.
 */

const shots = [featuredCase.image, ...projects.map((p) => p.image)];

function ShotRow({ items, reverse, duration }: { items: typeof shots; reverse?: boolean; duration: number }) {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 gap-4 pr-4" aria-hidden={hidden || undefined}>
      {items.map((im) => (
        <div key={im.src} className="relative h-36 w-60 shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/10 lg:h-44 lg:w-72">
          <Image quality={90} src={im.src} alt="" fill sizes="288px" className="object-cover object-top" />
        </div>
      ))}
    </div>
  );
  return (
    <div
      className="marquee-track flex w-max"
      style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      {row()}
      {row(true)}
    </div>
  );
}

/** Work: two tilted rows of live-product screenshots sliding in opposite directions. */
export function WorkBackdrop() {
  const half = Math.ceil(shots.length / 2);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-1/2 right-[-12%] hidden w-[75%] -translate-y-1/2 -rotate-6 space-y-4 opacity-90 [mask-image:linear-gradient(90deg,transparent_0%,#000_45%)] md:block">
        <ShotRow items={shots.slice(0, half)} duration={60} />
        <ShotRow items={shots.slice(half)} duration={70} reverse />
        <ShotRow items={[...shots.slice(3), ...shots.slice(0, 3)].slice(0, half)} duration={80} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}

// Three columns of the actual pieces: designs are square, photos are portrait.
const sq = (src: string) => ({ src, ratio: "1 / 1" });
const tall = (src: string) => ({ src, ratio: "4 / 5" });
const P = socialDesignPosts.map((p) => sq(p.image));
const F = photographyWork.map((p) => tall(p.image));
const COLUMNS = [
  { items: [P[0], F[0], P[3], P[5], F[3]], duration: 46, reverse: false },
  { items: [F[1], P[1], sq(shortMovie.poster), P[6], P[2]], duration: 58, reverse: true },
  { items: [P[4], P[7], F[2], P[1], F[0]], duration: 50, reverse: false },
];

function Column({ c }: { c: (typeof COLUMNS)[number] }) {
  const run = () => (
    <div className="flex flex-col gap-4 pb-4">
      {c.items.map((it, i) => (
        <div key={`${it.src}-${i}`} className="relative w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_-20px_rgb(0_0_0/0.45)] ring-1 ring-black/10" style={{ aspectRatio: it.ratio }}>
          <Image quality={90} src={it.src} alt="" fill sizes="220px" className="object-cover" />
        </div>
      ))}
    </div>
  );
  return (
    <div className="h-full flex-1 overflow-hidden">
      <div className="marquee-y" style={{ animationDuration: `${c.duration}s`, animationDirection: c.reverse ? "reverse" : "normal" }}>
        {run()}
        {run()}
      </div>
    </div>
  );
}

/**
 * Creative: a gallery wall. Three columns of the real designs and photos roll slowly, the middle
 * one the other way, fading out at the top and bottom and toward the title.
 */
export function CreativeBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-y-0 right-[max(1rem,calc((100vw-82rem)/2+3rem))] hidden w-[44%] max-w-[40rem] gap-4 [mask-image:linear-gradient(180deg,transparent,#000_18%,#000_78%,transparent)] md:flex">
        {COLUMNS.map((c, i) => (
          <Column key={i} c={c} />
        ))}
      </div>
    </div>
  );
}

// One stop per employer, oldest first: the year the role started and the company.
const stops = [...experience]
  .reverse()
  .map((e) => ({ year: e.period.split("–")[0].trim().split(" ")[1], name: e.company.replace(/\s*\(.*\)$/, "").replace(/^PT /, "") }))
  .filter((s, i, a) => a.findIndex((x) => x.name === s.name) === i);

/** About: the career as a strip that keeps moving, year then employer, like a line diagram. */
export function CareerStrip() {
  const run = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {stops.map((s) => (
        <span key={s.name} className="flex items-center whitespace-nowrap">
          <span className="mx-5 h-2.5 w-2.5 rounded-full border-2 border-accent" />
          <span className="text-sm font-semibold text-accent tabular-nums">{s.year}</span>
          <span className="ml-2 text-sm font-medium">{s.name}</span>
          <span className="ml-5 h-px w-16 bg-ink/15" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee relative overflow-hidden border-y border-line py-3">
      <p className="sr-only">Career, oldest first: {stops.map((s) => `${s.year} ${s.name}`).join(", ")}</p>
      <div className="marquee-track flex w-max" style={{ animationDuration: "38s" }}>
        {run(true)}
        {run(true)}
      </div>
    </div>
  );
}
