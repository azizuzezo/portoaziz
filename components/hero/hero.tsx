"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { person, summary } from "@/lib/content/profile";
import { Magnetic } from "@/components/motion/motion";
import { LensBlob, LensHeadline, useLens } from "@/components/hero/lens-headline";
import { FlapBoard } from "@/components/hero/flap-board";
import { RailColor } from "@/components/chrome/rail-backdrop";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { lens, enabled, handlers } = useLens();

  return (
    <section ref={ref} {...handlers} className="relative isolate flex min-h-[100svh] overflow-hidden">
      {enabled && <LensBlob lens={lens} />}
      {/* Coloured rail in the same fixed frame as the site-wide pale map, so the lines sit exactly
          on top of it; it fades away as the hero scrolls out. */}
      <motion.div style={{ opacity }} className="pointer-events-none fixed inset-0 -z-10 hidden lg:block">
        <RailColor className="h-full w-full opacity-50 [mask-image:linear-gradient(90deg,transparent_58%,#000_78%)] dark:opacity-60" />
      </motion.div>
      {/* Dark mode only: a soft light behind the card so it doesn't float in a flat black. */}
      <div aria-hidden className="pointer-events-none absolute top-1/4 right-[-8%] -z-10 hidden h-[38rem] w-[38rem] rounded-full bg-accent/15 blur-[120px] dark:block" />

      <motion.div style={{ y, opacity }} className="shell flex flex-1 flex-col pt-24 pb-6 sm:pt-28">
        <div className="grid flex-1 grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-8 lg:gap-10">
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-lg font-semibold tracking-tight text-muted sm:text-2xl"
            >
              <span lang="zh-Hans">你好</span>, I&apos;m {person.name}{" "}
              <span lang="zh-Hans" className="font-medium">
                {person.chineseName}
              </span>
            </motion.p>

            <div className="mt-4">
              <LensHeadline lens={lens} enabled={enabled} className="display text-[clamp(2.1rem,4.4vw,4.25rem)] text-balance" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
              className="mt-6 flex flex-col gap-6"
            >
              <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">{summary.body}</p>
              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <Link
                    href="/work"
                    className="inline-flex min-h-14 items-center rounded-full bg-accent px-7 text-base font-semibold text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    See the work
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-14 items-center rounded-full border border-ink/15 bg-paper px-7 text-base font-semibold transition-colors duration-200 hover:border-ink"
                  >
                    Write to me
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 11, delay: 0.4 }}
            className="md:col-span-5"
          >
            <FlapBoard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-6 flex items-end justify-between text-sm text-muted"
        >
          <p className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-paper" />
            {person.location.replace(", Jawa Barat", "")}
          </p>
          <a href="#services" className="flex items-center gap-3 transition-colors hover:text-ink">
            Next stop: what I do
            <span className="relative block h-px w-12 overflow-hidden bg-ink/15">
              <span className="scroll-cue-x absolute inset-0 bg-accent" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
