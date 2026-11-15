"use client";

import dynamic from "next/dynamic";
import { Component, Suspense, type ReactNode } from "react";
import { useLowPower } from "@/lib/hooks/use-low-power";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { KmtCardFallback } from "@/components/graphic-design/kmt-card-fallback";

const KmtCardScene = dynamic(() => import("@/components/graphic-design/kmt-card-scene"), {
  ssr: false,
  loading: () => <KmtCardFallback />,
});

/**
 * If the WebGL scene throws (a texture that fails to load, a lost GPU context), show the 2D card
 * instead of taking the whole page down.
 */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("KMT 3D card fell back to 2D:", error);
  }
  render() {
    return this.state.failed ? <KmtCardFallback /> : this.props.children;
  }
}

export function KmtCard3D() {
  const reducedMotion = useReducedMotion();
  const lowPower = useLowPower();

  if (reducedMotion || lowPower) {
    return <KmtCardFallback />;
  }

  return (
    <div className="h-[320px] w-full sm:h-[380px]">
      <SceneBoundary>
        <Suspense fallback={<KmtCardFallback />}>
          <KmtCardScene />
        </Suspense>
      </SceneBoundary>
    </div>
  );
}
