"use client";

import { useRef, useState } from "react";

export function useTilt(max = 10) {
  const ref = useRef<HTMLElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - py) * max * 2;
    const rotateY = (px - 0.5) * max * 2;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
    setGlareStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, color-mix(in oklab, white 14%, transparent), transparent 60%)`,
    });
  };

  const onMouseLeave = () => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)" });
    setGlareStyle({ opacity: 0 });
  };

  return { ref, style, glareStyle, onMouseMove, onMouseLeave };
}
