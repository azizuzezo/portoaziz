"use client";

import { LayoutGroup, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { skillGroups, tools } from "@/lib/content/profile";
import { cn } from "@/lib/utils";

type Group = "service" | "systems" | "comms" | "tools";
type Chip = { id: string; label: string; group: Group; logo?: string };

const GROUPS: { id: Group | "all"; label: string; dot: string }[] = [
  { id: "all", label: "All", dot: "bg-ink" },
  { id: "service", label: "Service", dot: "bg-l-navy" },
  { id: "systems", label: "Systems", dot: "bg-l-green" },
  { id: "comms", label: "Communication", dot: "bg-l-steel" },
  { id: "tools", label: "Tools", dot: "bg-ink/30" },
];

// Group colours reuse the three route lines; tools stay white so their own logos carry the colour.
const CHIP_STYLE: Record<Group, string> = {
  service: "bg-l-navy text-paper",
  systems: "bg-l-green text-paper",
  comms: "bg-l-steel text-paper",
  tools: "bg-white text-[#2c3a55] ring-1 ring-black/10",
};

const chips: Chip[] = [
  ...skillGroups[0].items.map((label) => ({ id: `s-${label}`, label, group: "service" as const })),
  ...skillGroups[1].items.map((label) => ({ id: `y-${label}`, label, group: "systems" as const })),
  ...skillGroups[2].items.map((label) => ({ id: `c-${label}`, label, group: "comms" as const })),
  ...tools.map((t) => ({ id: `t-${t.name}`, label: t.name, group: "tools" as const, logo: t.logo })),
];

function ChipFace({ c }: { c: Chip }) {
  return (
    <>
      {c.logo && (
        <span className="relative -ml-1.5 h-7 w-7 shrink-0 overflow-hidden rounded-full bg-white">
          <Image src={c.logo} alt="" fill sizes="28px" draggable={false} className="object-contain p-0.5" />
        </span>
      )}
      {c.label}
    </>
  );
}

const chipClass =
  "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap shadow-[0_8px_20px_-8px_rgb(0_0_0/0.5)] select-none sm:px-5 sm:text-base";

/** One chip: bobs gently on its own phase, and leans toward the pointer when it's near. */
function FloatingChip({ c, i, on, still }: { c: Chip; i: number; on: boolean; still: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 14 });
  const y = useSpring(my, { stiffness: 180, damping: 14 });

  useEffect(() => {
    if (still) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      const pull = d < 160 ? (1 - d / 160) * 0.35 : 0;
      mx.set(dx * pull);
      my.set(dy * pull);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, still]);

  return (
    <motion.li
      ref={ref}
      layout
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{ opacity: on ? 1 : 0.22, scale: on ? 1 : 0.92, filter: on ? "grayscale(0)" : "grayscale(1)" }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: (i % 10) * 0.03 }}
    >
      <motion.span
        className={cn(chipClass, CHIP_STYLE[c.group], "inline-flex")}
        animate={still ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 3.2 + (i % 5) * 0.4, repeat: Infinity, ease: "easeInOut", delay: (i % 7) * 0.35 }}
        whileHover={{ scale: 1.08, rotate: i % 2 ? 2 : -2 }}
      >
        <ChipFace c={c} />
      </motion.span>
    </motion.li>
  );
}

/**
 * Skills as a floating cloud of chips. Each one bobs on its own rhythm and leans toward the
 * cursor; picking a group pulls those chips to the front (the rest dim), and Shuffle
 * re-deals the cloud with a layout animation. Nothing falls, nothing piles up.
 */
export function ChipPlayground() {
  const [filter, setFilter] = useState<Group | "all">("all");
  const [order, setOrder] = useState(chips);
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  const count = useMemo(() => chips.filter((c) => filter === "all" || c.group === filter).length, [filter]);

  // Chosen group first, so its chips gather at the front of the cloud.
  const shown = useMemo(
    () => (filter === "all" ? order : [...order.filter((c) => c.group === filter), ...order.filter((c) => c.group !== filter)]),
    [order, filter]
  );
  const shuffle = () => setOrder((o) => [...o].sort(() => Math.random() - 0.5));

  return (
    <div>
      <div className="relative z-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-muted">
          <span className="text-2xl font-semibold text-ink tabular-nums">{count}</span>{" "}
          {filter === "all" ? "skills and tools" : "in this group"} · move your cursor through them
        </p>
        <div role="tablist" aria-label="Filter skills" className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-on-board/10 bg-paper p-1 [scrollbar-width:none]">
          {GROUPS.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={filter === g.id}
              onClick={() => setFilter(g.id)}
              className={cn(
                "relative isolate flex min-h-9 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm font-medium text-ink/70 transition-colors hover:text-ink",
                filter === g.id && "text-accent-ink hover:text-accent-ink"
              )}
            >
              {filter === g.id && (
                <motion.span layoutId="chip-tab" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              {g.id !== "all" && <span aria-hidden className={cn("h-2 w-2 rounded-full", g.dot)} />}
              {g.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={shuffle}
          className="min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-transform active:scale-95"
        >
          Shuffle
        </button>
      </div>

      <LayoutGroup>
        <ul aria-label="Skills and tools" className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-x-3 gap-y-4">
          {shown.map((c, i) => (
            <FloatingChip key={c.id} c={c} i={i} on={filter === "all" || c.group === filter} still={still} />
          ))}
        </ul>
      </LayoutGroup>
    </div>
  );
}
