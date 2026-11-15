"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/*
 * Site-wide route map (the original design): thin lines, round stations, one small train per
 * line. Used only in the Home hero, beside the board.
 */
const LINES = [
  { color: "var(--l-navy)", d: "M -40 720 H 400 L 620 500 H 1080 L 1280 300 H 1480", dur: 16 },
  { color: "var(--l-steel)", d: "M 800 -40 V 220 L 980 400 V 940", dur: 11 },
  { color: "var(--l-green)", d: "M -40 170 H 300 L 520 390 H 880 L 1080 590 H 1480", dur: 18 },
  { color: "var(--l-steel)", d: "M 1200 -40 V 150 L 1020 330 H 660 L 460 530 V 940", dur: 14 },
  { color: "var(--l-navy)", d: "M 1480 780 H 1200 L 1040 620 H 720", dur: 10 },
];
const STATIONS: [number, number][] = [
  [400, 720], [620, 500], [1080, 500], [1280, 300],
  [800, 220], [980, 400], [980, 700],
  [300, 170], [520, 390], [880, 390], [1080, 590],
  [1200, 150], [1020, 330], [660, 330], [460, 530],
  [1200, 780], [1040, 620],
];

function Map({ pale, trains }: { pale: boolean; trains: boolean }) {
  return (
    <svg aria-hidden className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
      {LINES.map((l, i) => (
        <motion.path
          key={l.d}
          d={l.d}
          style={{ stroke: pale ? "var(--route-pale)" : l.color }}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.2 + i * 0.15, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
      {STATIONS.map(([x, y], i) => (
        <motion.circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={9}
          className="fill-paper"
          style={{ stroke: pale ? "var(--route-pale)" : "var(--ink)", transformOrigin: `${x}px ${y}px` }}
          strokeWidth={4}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 1.2 + i * 0.04 }}
        />
      ))}
      {trains &&
        LINES.map((l, i) => (
          <g key={`t-${l.d}`}>
            <rect x={-14} y={-7} width={28} height={14} rx={7} className="fill-ink" />
            <rect x={2} y={-3} width={8} height={6} rx={2} style={{ fill: l.color }} />
            <animateMotion dur={`${l.dur}s`} begin={`${2 + i * 0.6}s`} repeatCount="indefinite" rotate="auto" path={l.d} />
          </g>
        ))}
    </svg>
  );
}

/**
 * Site-wide backdrop: two very soft lights (brand blue, signal green) drifting slowly behind
 * every page. No lines behind text, so body copy always reads cleanly; the rails themselves
 * appear only in the Home hero, beside the board.
 */
export function RailBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 h-[70vmax] w-[70vmax] rounded-full bg-accent/[0.07] blur-[120px] motion-safe:animate-[drift-a_28s_ease-in-out_infinite] dark:bg-accent/[0.12]" />
      <div className="absolute -right-1/4 -bottom-1/4 h-[60vmax] w-[60vmax] rounded-full bg-l-green/[0.06] blur-[120px] motion-safe:animate-[drift-b_34s_ease-in-out_infinite] dark:bg-l-green/[0.08]" />
    </div>
  );
}

/** Home hero only: the coloured map with running trains, masked to the right beside the card. */
export function RailColor({ className }: { className?: string }) {
  const [trains, setTrains] = useState(false);
  useEffect(() => setTrains(!window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return (
    <div aria-hidden className={className}>
      <Map pale={false} trains={trains} />
    </div>
  );
}

/**
 * Running-rail backdrop for page headers: the pale map across the full width (light enough to
 * sit behind a title), the coloured map with moving trains on the right, and a fade at the
 * bottom into the page. Place inside a `relative isolate overflow-hidden` header.
 */
export function RailHeader() {
  const [trains, setTrains] = useState(false);
  useEffect(() => setTrains(!window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0">
        <Map pale trains={false} />
      </div>
      <div className="absolute inset-0 hidden opacity-50 [mask-image:linear-gradient(90deg,transparent_55%,#000_78%)] lg:block dark:opacity-60">
        <Map pale={false} trains={trains} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
