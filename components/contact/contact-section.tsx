"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic, Reveal } from "@/components/motion/motion";

/**
 * Home's closing block. It only points on to the Contact page; the address itself lives there,
 * so nothing is repeated. The big line slides in from the right as it rises.
 */
export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);

  return (
    <section ref={ref} aria-labelledby="talk-title" className="relative isolate overflow-hidden bg-board/80 text-on-board">
      <div className="shell pt-28 pb-24 md:pt-36">
        <motion.h2 id="talk-title" style={{ x }} className="display text-[clamp(4rem,14vw,13rem)] whitespace-nowrap">
          Let&apos;s talk<span className="text-accent">.</span>
        </motion.h2>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="max-w-xl text-xl leading-relaxed text-on-board/80 sm:text-2xl">
              If your customers keep running into the same problem, I&apos;d love to help you fix it at the source.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex min-h-16 items-center rounded-full bg-accent px-9 text-lg font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                Contact
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
