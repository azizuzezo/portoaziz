"use client";

import { useRef, useState } from "react";

export function useTilt(max = 10) {
  const ref = useRef<HTMLElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const frame = useRef<number | null>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    // Coarse pointers (touch) don't hover — skip the work entirely.
    if (typeof matchMedia !== "undefined" && !matchMedia("(pointer: fine)").matches) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    // rAF-throttle: coalesce rapid mousemove events into one update per frame.
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      const rotateX = (0.5 - py) * max * 2;
      const rotateY = (px - 0.5) * max * 2;

      setStyle({
        transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      });
      setGlareStyle({
        opacity: 1,
        background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, color-mix(in oklab, white 14%, transparent), transparent 60%)`,
      });
    });
  };

  const onMouseLeave = () => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)" });
    setGlareStyle({ opacity: 0 });
  };

  return { ref, style, glareStyle, onMouseMove, onMouseLeave };
}
