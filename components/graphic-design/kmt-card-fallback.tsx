"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { kmtCard } from "@/lib/content/profile";

export function KmtCardFallback() {
  const ref = useRef<HTMLButtonElement>(null);
  const [style, setStyle] = useState({ transform: "rotateX(0deg) rotateY(0deg)" });
  const [showBack, setShowBack] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <button
        type="button"
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setStyle({ transform: "rotateX(0deg) rotateY(0deg)" })}
        onClick={() => setShowBack((v) => !v)}
        aria-label="Flip card to see the other side"
        className="relative aspect-[16/10] w-full max-w-md cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 ease-out"
        style={style}
      >
        <Image
          src={kmtCard.frontTexture}
          alt={kmtCard.title}
          fill
          sizes="420px"
          className={`object-cover transition-opacity duration-300 ${showBack ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={kmtCard.backTexture}
          alt={`${kmtCard.title} — back`}
          fill
          sizes="420px"
          className={`object-cover transition-opacity duration-300 ${showBack ? "opacity-100" : "opacity-0"}`}
        />
      </button>
    </div>
  );
}
