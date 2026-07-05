"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useLowPower } from "@/lib/hooks/use-low-power";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { KmtCardFallback } from "@/components/graphic-design/kmt-card-fallback";

const KmtCardScene = dynamic(() => import("@/components/graphic-design/kmt-card-scene"), {
  ssr: false,
  loading: () => <KmtCardFallback />,
});

export function KmtCard3D() {
  const reducedMotion = useReducedMotion();
  const lowPower = useLowPower();

  if (reducedMotion || lowPower) {
    return <KmtCardFallback />;
  }

  return (
    <div className="h-[320px] w-full sm:h-[380px]">
      <Suspense fallback={<KmtCardFallback />}>
        <KmtCardScene />
      </Suspense>
    </div>
  );
}
