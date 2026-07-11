"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { useLowPower } from "@/lib/hooks/use-low-power";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { SkillsGalaxyFallback } from "@/components/skills/skills-galaxy-fallback";

const SkillsGalaxyScene = dynamic(() => import("@/components/skills/skills-galaxy-scene"), {
  ssr: false,
  loading: () => <SkillsGalaxyFallback />,
});

export function SkillsGalaxy() {
  const reducedMotion = useReducedMotion();
  const lowPower = useLowPower();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Toggle (not latch) visibility so the WebGL render loop actually
    // stops once the user scrolls away, instead of running forever.
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reducedMotion || lowPower) {
    return <SkillsGalaxyFallback />;
  }

  return (
    <div ref={containerRef} className="h-[420px] w-full sm:h-[520px]">
      {inView ? (
        <Suspense fallback={<SkillsGalaxyFallback />}>
          <SkillsGalaxyScene />
        </Suspense>
      ) : (
        <SkillsGalaxyFallback />
      )}
    </div>
  );
}
