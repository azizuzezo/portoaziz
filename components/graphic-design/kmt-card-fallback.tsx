"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { kmtCard } from "@/lib/content/profile";

export function KmtCardFallback() {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ transform: "rotateX(0deg) rotateY(0deg)" });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setStyle({ transform: `rotateX(${x * -14}deg) rotateY(${y * 14}deg)` });
  };

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setStyle({ transform: "rotateX(0deg) rotateY(0deg)" })}
        className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 ease-out"
        style={style}
      >
        <Image
          src={kmtCard.frontTexture}
          alt={kmtCard.title}
          fill
          sizes="420px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
