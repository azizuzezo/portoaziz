"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { person } from "@/lib/content/profile";

const COLS = 9;
const ROWS = 9;
const IMG_RATIO = 1672 / 941; // the portrait file is landscape; it is fitted by height
const FOCUS_X = 0.51; // same horizontal focus the photo had as a plain image
// Served through the Next image optimiser so the tiles don't pull the 1.5 MB original.
const SRC = `/_next/image?url=${encodeURIComponent(person.photoUrl)}&w=1080&q=90`;

/**
 * The portrait as a flap board, the same hardware as the name board under it. Every tile is a
 * small flap carrying its piece of the photo: on load they turn over in a diagonal wave to
 * assemble the picture, and the tiles under the pointer turn over and return. Both faces of a
 * tile carry the photo (the back with a blue wash) and a plain image sits underneath, so the
 * portrait is on screen from the first paint and never disappears, with or without scripts.
 */
export function PhotoFlaps() {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const img = new window.Image();
    img.onload = () => setReady(true);
    img.src = SRC;
    return () => ro.disconnect();
  }, []);

  // Pointer: flip the tiles within reach, each returning on its own timer.
  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers = new Map<Element, ReturnType<typeof setTimeout>>();
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const tw = r.width / COLS, th = r.height / ROWS;
      const c0 = Math.floor((e.clientX - r.left) / tw), r0 = Math.floor((e.clientY - r.top) / th);
      for (const [dc, dr] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const c = c0 + dc, rw = r0 + dr;
        if (c < 0 || rw < 0 || c >= COLS || rw >= ROWS) continue;
        const tile = el.children[rw * COLS + c];
        if (!tile) continue;
        tile.classList.add("is-flipped");
        clearTimeout(timers.get(tile));
        timers.set(tile, setTimeout(() => tile.classList.remove("is-flipped"), 500 + (dc || dr ? 120 : 0)));
      }
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      timers.forEach(clearTimeout);
    };
  }, []);

  const iw = size.h * IMG_RATIO;
  const offX = -(iw - size.w) * FOCUS_X;
  const tw = size.w / COLS, th = size.h / ROWS;

  return (
    <div
      ref={box}
      role="img"
      aria-label={`Portrait of ${person.name}`}
      className="photo-flaps relative isolate grid aspect-[4/3] max-h-[32svh] w-full overflow-hidden rounded-[1.75rem] bg-[#ececec] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)] md:aspect-[4/4] md:max-h-[58svh]"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const c = i % COLS, r = Math.floor(i / COLS);
        const piece = { backgroundSize: `auto ${size.h}px`, backgroundPosition: `${offX - c * tw}px ${-r * th}px` };
        return (
          <span
            key={i}
            className={ready && size.w ? "flap is-in" : "flap"}
            style={{ transitionDelay: ready ? `${(c + r) * 45}ms` : "0ms" }}
          >
            {ready && size.w > 0 && (
              <>
                <span className="flap-front" style={{ backgroundImage: `url(${SRC})`, ...piece }} />
                <span className="flap-back" style={{ backgroundImage: `url(${SRC})`, ...piece }} />
              </>
            )}
          </span>
        );
      })}
      {/* The portrait itself, always there under the tiles. */}
      <Image quality={90} src={person.photoUrl} alt="" fill priority sizes="(min-width: 768px) 28rem, 20rem" className="-z-10 object-cover" style={{ objectPosition: `${FOCUS_X * 100}% 50%` }} />
    </div>
  );
}
