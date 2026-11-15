"use client";

import { CareerStrip } from "@/components/chrome/header-backdrops";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Fragment } from "react";
import { earlierRoles, person, skillGroups, summary } from "@/lib/content/profile";

const WORDS = skillGroups.flatMap((g) => g.items.map((w) => w.toLowerCase()));
const SINCE = earlierRoles.period.slice(0, 4);

/**
 * About opener. A dark wall of the skills from the CV that a flashlight on the pointer lights up; under it the name set huge with the portrait showing through the letters,
 * drifting slightly with the pointer. The photo is never covered: it only fills the type.
 */
function Wall({ lit = false }: { lit?: boolean }) {
  return (
    <>
      {WORDS.map((w, i) => (
        <Fragment key={w}>
          <span className="whitespace-nowrap">
            <span className={lit ? (i % 5 === 1 ? "text-accent" : i % 5 === 3 ? "text-l-green" : "") : ""}>{w}</span>
            {i < WORDS.length - 1 && <span className="ml-[0.4em] opacity-50">·</span>}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

export function AboutHero() {
  // Flashlight: the wall is dark; a soft circle of light follows the pointer and lights the
  // words under it. The light fades in and out instead of popping.
  const lx = useMotionValue(-999);
  const ly = useMotionValue(-999);
  const fx = useSpring(lx, { stiffness: 300, damping: 30 });
  const fy = useSpring(ly, { stiffness: 300, damping: 30 });
  const fr = useSpring(0, { stiffness: 200, damping: 24 });
  const lightMask = useMotionTemplate`radial-gradient(circle ${fr}px at ${fx}px ${fy}px, #000 35%, transparent 100%)`;
  const onWall = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    lx.set(e.clientX - r.left);
    ly.set(e.clientY - r.top);
    fr.set(240);
  };
  const offWall = () => fr.set(0);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  // The portrait is 1672x941; the face is ~11% of its width with the eyes at ~22% of its
  // height. At 220% of the word width the face spans two middle letters, and y 17% lands the
  // eyes on the word's centre line. The pointer nudges the photo a few percent.
  const bgPos = useTransform([sx, sy] as never, ([x, y]: number[]) => `0% 0%, ${50 + (x - 0.5) * 4}% ${12 + (y - 0.5) * 3}%`);

  return (
    <header
      className="relative isolate overflow-hidden"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
    >
      <div aria-hidden className="pointer-events-none absolute top-[30%] left-[30%] -z-10 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[130px] motion-safe:animate-[drift-a_24s_ease-in-out_infinite]" />
      <div aria-hidden className="pointer-events-none absolute right-[-10%] bottom-[-10%] -z-10 h-[28rem] w-[36rem] rounded-full bg-l-green/15 blur-[130px] motion-safe:animate-[drift-b_30s_ease-in-out_infinite]" />
      <div className="shell pt-28 pb-16 md:pt-32">
        {/* Skill wall */}
        <p className="sr-only">Skills: {WORDS.join(", ")}</p>
        <div onPointerMove={onWall} onPointerLeave={offWall} aria-hidden className="relative text-[clamp(1rem,1.9vw,1.75rem)] leading-[1.35] font-semibold tracking-tight">
          {/* dark base */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="text-ink/[0.13]">
            <Wall />
          </motion.div>
          {/* the same words, lit, only inside the light */}
          <motion.div
            style={{ WebkitMaskImage: lightMask, maskImage: lightMask }}
            className="pointer-events-none absolute inset-0 text-ink"
          >
            <Wall lit />
          </motion.div>
        </div>

        {/* Name, with the portrait inside the letters */}
        <motion.h1
          initial={{ clipPath: "inset(0 100% 0 0)", y: 20 }}
          animate={{ clipPath: "inset(0 0% 0 0)", y: 0 }}
          transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.35 }}
          className="mt-8 text-center text-[clamp(4.25rem,15.5vw,14.5rem)] leading-[0.8] font-bold tracking-[-0.06em] whitespace-nowrap select-none"
        >
          <span className="sr-only">About {person.name}</span>
          <motion.span
            aria-hidden
            style={{
              // Face across the middle letters; the outer edges tint to the brand blue and green.
              backgroundImage: `linear-gradient(90deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 55%, transparent) 18%, color-mix(in srgb, var(--accent) 0%, transparent) 34%, rgb(18 128 74 / 0) 66%, rgb(18 128 74 / 0.55) 82%, #12804a 100%), url(${person.photoUrl})`,
              backgroundSize: "100% 100%, 220% auto",
              backgroundPosition: bgPos,
            }}
            initial={{ filter: "brightness(1.6) saturate(0.4)" }}
            animate={{ filter: "brightness(1) saturate(1)" }}
            transition={{ duration: 1.6, delay: 0.6 }}
            className="inline-block bg-no-repeat bg-clip-text pb-[0.08em] text-transparent [-webkit-background-clip:text]"
          >
            abdulaziz
          </motion.span>
        </motion.h1>

        <div className="mt-10">
          <CareerStrip />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12">
          <p className="text-xl leading-snug font-medium tracking-tight sm:text-2xl md:col-span-7">{summary.lead}</p>
          <dl className="flex gap-12 text-sm md:col-span-4 md:col-start-9 md:justify-end">
            <div>
              <dt className="text-muted">Based in</dt>
              <dd className="mt-1 text-base font-semibold">Bogor, Indonesia</dd>
            </div>
            <div>
              <dt className="text-muted">Handling customer experience since</dt>
              <dd className="mt-1 text-base font-semibold">{SINCE}</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  );
}
