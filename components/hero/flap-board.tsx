"use client";

import { useEffect, useRef, useState } from "react";
import { earlierRoles, person } from "@/lib/content/profile";
import { PhotoFlaps } from "@/components/hero/photo-flaps";

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·&-";
const WIDTH = 20;
// Rows the board cycles through under the name. All facts from the CV.
const LINES = [
  "CUSTOMER EXPERIENCE",
  "AI APPLICATION DEV",
  `SERVING SINCE ${earlierRoles.period.slice(0, 4)}`,
  "BOGOR · INDONESIA",
];
const pad = (s: string) => s.toUpperCase().padEnd(WIDTH, " ").slice(0, WIDTH);

/** One split-flap cell: spins through letters until it lands on its target. */
function Cell({ ch, delay }: { ch: string; delay: number }) {
  const [shown, setShown] = useState(ch);
  const [flip, setFlip] = useState(0);
  const cur = useRef(ch);

  useEffect(() => {
    if (cur.current === ch) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cur.current = ch;
      setShown(ch);
      return;
    }
    let i = CHARS.indexOf(cur.current);
    const target = CHARS.indexOf(ch);
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i = (i + 1) % CHARS.length;
      cur.current = CHARS[i];
      setShown(CHARS[i]);
      setFlip((f) => f + 1);
      if (i !== target) timer = setTimeout(step, 38);
    };
    timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [ch, delay]);

  return (
    <span className="relative flex h-[clamp(1.4rem,2.4vw,2.25rem)] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[3px] bg-white/[0.07] text-[clamp(10px,1.15vw,16px)] font-semibold text-white">
      <span key={flip} className="motion-safe:animate-[flap_90ms_ease-out]">
        {shown === " " ? " " : shown}
      </span>
      {/* the hinge line across the middle of a real flap */}
      <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-black/35" />
    </span>
  );
}

function Row({ text }: { text: string }) {
  const t = pad(text);
  return (
    <div className="flex gap-[2px]" aria-hidden>
      {t.split("").map((c, i) => (
        <Cell key={i} ch={c} delay={i * 45} />
      ))}
    </div>
  );
}

/**
 * Hero portrait: a large plain photo (nothing printed on it) above a station departure board.
 * The board's letters spin into the name, and the second row cycles through role, city and
 * how long Aziz has served customers.
 */
export function FlapBoard() {
  const [k, setK] = useState(0);
  const [name, setName] = useState(" ");
  useEffect(() => {
    const a = setTimeout(() => setName("ABDUL AZIZ SETIAWAN"), 500);
    const id = setInterval(() => setK((v) => (v + 1) % LINES.length), 3800);
    return () => {
      clearTimeout(a);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[20rem] md:max-w-[28rem]">
      <PhotoFlaps />

      <div className="relative z-10 mx-3 -mt-10 rounded-2xl bg-ink p-3 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.6)] sm:mx-5 sm:p-4">
        <p className="sr-only">
          {person.name}, {LINES.join(", ")}
        </p>
        <div className="mb-2.5 flex items-center justify-between text-[10px] font-semibold tracking-[0.16em] text-white/55">
          <span />
          <span lang="zh-Hans" className="text-xs tracking-normal text-white/70">
            {person.chineseName}
          </span>
        </div>
        <div className="space-y-[3px] overflow-hidden">
          <Row text={name} />
          <Row text={LINES[k]} />
        </div>
      </div>
    </div>
  );
}
