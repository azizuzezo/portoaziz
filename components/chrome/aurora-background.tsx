"use client";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(45,212,191,0.14),_transparent_60%)]" />
      <div className="animate-float-slow absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-aurora-cyan/[0.14] blur-[120px]" />
      <div className="animate-float absolute right-[-15%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-aurora-violet/[0.1] blur-[130px]" />
      <div className="animate-float-slow absolute bottom-[-15%] left-[20%] h-[34rem] w-[34rem] rounded-full bg-aurora-cyan/[0.1] blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full bg-aurora-rose/[0.06] blur-[130px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--color-void)_92%)]" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
