"use client";

import { useState } from "react";
import { person } from "@/lib/content/profile";
import { Button } from "@/components/ui/button";
import { Magnetic, Reveal, SplitWords } from "@/components/motion/motion";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <section id="contact" className="anchor relative isolate overflow-hidden bg-ink text-paper">
      <div aria-hidden className="absolute -right-40 -bottom-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-accent/25 blur-3xl motion-safe:animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="shell py-16 md:py-24">
        <Reveal>
        <p className="text-sm font-semibold text-paper/75">
          <span>07</span>
          <span className="mx-2" aria-hidden>
            /
          </span>
          Contact
        </p>
        <h2 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
          <SplitWords text="If your customers keep raising the same problem, I'd like to help fix it at the source." stagger={0.03} />
        </h2>
        <p className="mt-6 max-w-xl text-lg text-paper/75">{person.lookingFor}. Email is the quickest way to reach me.</p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Magnetic strength={0.12}>
              <a
                href={`mailto:${person.email}`}
                className="inline-block py-1 text-2xl font-semibold break-all underline decoration-paper/30 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-4xl"
              >
                {person.email}
              </a>
            </Magnetic>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="min-h-11 rounded-full border border-paper/40 px-5 text-sm font-medium transition-colors duration-150 hover:border-paper hover:bg-paper hover:text-ink"
              >
                Copy email address
              </button>
              <span role="status" aria-live="polite" className="text-sm text-paper/75">
                {status === "copied" && "Copied to clipboard."}
                {status === "failed" && "Couldn't copy. Select the address above instead."}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Button href={person.linkedin} external>
                Message me on LinkedIn
              </Button>
            </Magnetic>
            <Button
              href={person.cvUrl}
              external
              variant="secondary"
              className="border-paper/40 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-ink"
            >
              Download CV (PDF)
            </Button>
          </div>
        </div>

        <footer className="mt-20 flex flex-col gap-2 border-t border-paper/20 pt-6 text-xs text-paper/60 sm:flex-row sm:justify-between">
          <p>
            {person.name}, {person.location}
          </p>
          <p>Designed and built by Aziz with AI-assisted development.</p>
        </footer>
      </div>
    </section>
  );
}
