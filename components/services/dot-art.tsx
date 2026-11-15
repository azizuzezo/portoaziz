"use client";

import { useEffect, useRef } from "react";
import type { Service } from "@/lib/content/profile";

type Dot = { x: number; y: number; r: number; a?: number };
type Art = Service["art"];

/*
 * Generative dot drawings, one per service, all made of the same small dots so the six
 * panels feel like one family. Every frame is a pure function of time, so pausing off-screen
 * and redrawing later is seamless. Dots near the pointer are pushed aside.
 */
const TAU = Math.PI * 2;

function ripple(t: number, w: number, h: number): Dot[] {
  const out: Dot[] = [];
  const cx = w / 2, cy = h / 2;
  const step = Math.min(w, h) / 20;
  for (let k = 1; k <= 9; k++) {
    const n = 8 * k;
    const rr = k * step + Math.sin(t * 2 - k * 0.7) * step * 0.25;
    for (let i = 0; i < n; i++) {
      const th = (i / n) * TAU + k * 0.3 + t * 0.05 * (k % 2 ? 1 : -1);
      const pulse = Math.max(0, Math.sin(t * 2 - k * 0.7));
      out.push({ x: cx + Math.cos(th) * rr, y: cy + Math.sin(th) * rr, r: 1.4 + pulse * 1.8, a: 0.35 + pulse * 0.65 });
    }
  }
  return out;
}

function wave(t: number, w: number, h: number): Dot[] {
  const out: Dot[] = [];
  const cols = 30, rows = 9;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const u = i / (cols - 1);
      const x = w * 0.04 + u * w * 0.92;
      const base = h * 0.18 + (j / (rows - 1)) * h * 0.64;
      const y = base + Math.sin(u * 7 + t * 1.3 + j * 0.55) * h * 0.035 + Math.sin(u * 3 - t * 0.7) * h * 0.02;
      const big = (i + j * 3 + Math.floor(t * 2)) % 11 === 0;
      out.push({ x, y, r: big ? 3.2 : 1.6, a: big ? 1 : 0.7 });
    }
  }
  return out;
}

function orbit(t: number, w: number, h: number): Dot[] {
  const out: Dot[] = [];
  const cx = w / 2, cy = h / 2;
  const R = Math.min(w, h) * 0.42;
  for (let k = 0; k < 4; k++) {
    const rx = R * (0.45 + k * 0.18), ry = rx * 0.38;
    const tilt = -0.5 + k * 0.33;
    const n = 46 + k * 12;
    const head = (t * (0.5 - k * 0.08)) % 1;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const th = u * TAU;
      const px = Math.cos(th) * rx, py = Math.sin(th) * ry;
      const d = Math.min(Math.abs(u - (head < 0 ? head + 1 : head)), 1 - Math.abs(u - (head < 0 ? head + 1 : head)));
      const glow = Math.max(0, 1 - d * 14);
      out.push({
        x: cx + px * Math.cos(tilt) - py * Math.sin(tilt),
        y: cy + px * Math.sin(tilt) + py * Math.cos(tilt),
        r: 1.3 + glow * 3.2,
        a: 0.3 + glow * 0.7,
      });
    }
  }
  out.push({ x: cx, y: cy, r: 7 + Math.sin(t * 2) * 1.5, a: 1 });
  return out;
}

function phone(t: number, w: number, h: number): Dot[] {
  const out: Dot[] = [];
  const ph = Math.min(h * 0.8, w * 1.2), pw = ph * 0.5;
  const x0 = w / 2 - pw / 2, y0 = h / 2 - ph / 2;
  const per = 2 * (pw + ph);
  const n = 150;
  const head = (t * 0.18) % 1;
  for (let i = 0; i < n; i++) {
    const u = i / n;
    let s = u * per;
    let x: number, y: number;
    if (s < pw) { x = x0 + s; y = y0; }
    else if ((s -= pw) < ph) { x = x0 + pw; y = y0 + s; }
    else if ((s -= ph) < pw) { x = x0 + pw - s; y = y0 + ph; }
    else { s -= pw; x = x0; y = y0 + ph - s; }
    const d = Math.min(Math.abs(u - head), 1 - Math.abs(u - head));
    const glow = Math.max(0, 1 - d * 10);
    out.push({ x, y, r: 1.4 + glow * 2.6, a: 0.55 + glow * 0.45 });
  }
  // App icons: a 3x4 grid that lights up one after another.
  const lit = Math.floor(t * 3) % 12;
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      const k = j * 3 + i;
      const cx = x0 + pw * (0.25 + i * 0.25), cy = y0 + ph * (0.2 + j * 0.15);
      const on = k === lit;
      for (let q = 0; q < 4; q++) {
        out.push({ x: cx + (q % 2 ? 4 : -4), y: cy + (q > 1 ? 4 : -4), r: on ? 2.6 : 1.5, a: on ? 1 : 0.45 });
      }
    }
  }
  return out;
}

function bars(t: number, w: number, h: number): Dot[] {
  const out: Dot[] = [];
  const cols = 34;
  const gap = 9;
  const maxRows = Math.floor((h * 0.8) / gap / 2);
  for (let i = 0; i < cols; i++) {
    const u = i / (cols - 1);
    const env = Math.sin(u * Math.PI);
    const level =
      0.25 +
      0.75 * env * Math.abs(Math.sin(t * 3.1 + i * 0.45) * 0.6 + Math.sin(t * 1.7 - i * 0.9) * 0.4);
    const rows = Math.max(1, Math.round(level * maxRows));
    const x = w * 0.06 + u * w * 0.88;
    for (let j = -rows; j <= rows; j++) {
      const edge = Math.abs(j) === rows;
      out.push({ x, y: h / 2 + j * gap, r: edge ? 2.6 : 1.6, a: edge ? 1 : 0.6 });
    }
  }
  return out;
}

function spiral(t: number, w: number, h: number): Dot[] {
  const out: Dot[] = [];
  const cx = w / 2, cy = h / 2;
  const n = 360;
  const c = (Math.min(w, h) * 0.46) / Math.sqrt(n);
  const golden = 137.508 * (Math.PI / 180);
  for (let i = 1; i < n; i++) {
    const th = i * golden + t * 0.12;
    const r = c * Math.sqrt(i);
    const wave = Math.sin(r * 0.05 - t * 2.2);
    out.push({ x: cx + Math.cos(th) * r, y: cy + Math.sin(th) * r, r: 1 + (i / n) * 1.6 + Math.max(0, wave) * 1.4, a: 0.45 + Math.max(0, wave) * 0.55 });
  }
  return out;
}

const ARTS: Record<Art, (t: number, w: number, h: number) => Dot[]> = { ripple, wave, orbit, phone, bars, spiral };

export function DotArt({ art, color, className }: { art: Art; color: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fn = ARTS[art];
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ptr = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left;
      ptr.y = e.clientY - r.top;
    };
    const onLeave = () => {
      ptr.x = ptr.y = -9999;
    };

    // `color` may be a CSS variable like var(--l-navy); resolve it, and again when the theme flips.
    let fill = color;
    const resolveFill = () => {
      const m = color.match(/^var\((--[\w-]+)\)$/);
      fill = m ? getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() || "#888" : color;
    };
    resolveFill();
    const themeObserver = new MutationObserver(resolveFill);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const draw = (now: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = fill;
      for (const d of fn(t, w, h)) {
        let { x, y } = d;
        const dx = x - ptr.x, dy = y - ptr.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0.01) {
          const push = (1 - dist / 110) ** 2 * 34;
          x += (dx / dist) * push;
          y += (dy / dist) * push;
        }
        ctx.globalAlpha = d.a ?? 1;
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let visible = false;
    const loop = (now: number) => {
      draw(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (reduced) draw(4000);
      else if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      draw(reduced ? 4000 : performance.now());
    });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [art, color]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
