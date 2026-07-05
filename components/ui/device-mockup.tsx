"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type MockupProps = {
  src: string;
  alt: string;
  className?: string;
  tilt?: { x: number; y: number; z?: number };
  /** How the screenshot fills the screen: crop to fill (cover) or show the whole image (contain). */
  fit?: "cover" | "contain";
  /** Screen aspect ratio, width/height. Defaults to a 16:10 laptop panel. */
  screenRatio?: number;
};

export function LaptopMockup({
  src,
  alt,
  className,
  tilt = { x: 8, y: -20 },
  fit = "cover",
  screenRatio = 16 / 10,
}: MockupProps) {
  return (
    <div className={cn("relative", className)} style={{ perspective: "1600px" }}>
      <div
        className="relative mx-auto transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(${tilt.z ?? 0}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative rounded-[14px] border-[10px] border-neutral-800 bg-neutral-900 shadow-2xl">
          <div className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-neutral-600" />
          <div
            className="relative w-full overflow-hidden rounded-[3px] bg-black"
            style={{ aspectRatio: `${screenRatio}` }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="640px"
              className={fit === "contain" ? "object-contain" : "object-cover object-top"}
            />
          </div>
        </div>
        <div
          className="relative mx-auto h-3 rounded-b-xl bg-gradient-to-b from-neutral-800 to-neutral-700"
          style={{ width: "106%", left: "-3%" }}
        />
        <div className="mx-auto h-1.5 w-[36%] rounded-b-2xl bg-neutral-700/70" />
      </div>
      <div className="absolute inset-x-10 -bottom-4 h-10 rounded-full bg-black/60 blur-2xl" />
    </div>
  );
}

export function PhoneMockup({ src, alt, className, tilt = { x: 4, y: 16, z: -2 } }: MockupProps) {
  return (
    <div className={cn("relative", className)} style={{ perspective: "1200px" }}>
      <div
        className="relative w-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(${tilt.z ?? 0}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative rounded-[1.8rem] border-[6px] border-neutral-800 bg-neutral-900 shadow-2xl">
          <div className="absolute left-1/2 top-2 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-neutral-700" />
          <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.3rem] bg-black">
            <Image src={src} alt={alt} fill sizes="220px" className="object-cover object-top" />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-6 -bottom-3 h-8 rounded-full bg-black/60 blur-xl" />
    </div>
  );
}
