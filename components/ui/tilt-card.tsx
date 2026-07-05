"use client";

import { useTilt } from "@/lib/hooks/use-tilt";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  max = 10,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const { ref, style, glareStyle, onMouseMove, onMouseLeave } = useTilt(max);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("relative transition-transform duration-300 ease-out will-change-transform", className)}
      style={style}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={glareStyle}
      />
    </div>
  );
}
