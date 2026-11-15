"use client";

import { useEffect, useRef } from "react";

const CELL = 56;

/**
 * Living grid behind a section: faint lines, the cell under the pointer lights up in the accent
 * colour and fades out (a short trail), and every so often a random cell glows on its own so the
 * section never sits still. Listens on its parent section; paused off screen; static lines only
 * for reduced motion.
 */
export function GridBackdrop({ tone }: { tone?: "dark" } = {}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, cols = 0, rows = 0;
    let line = "#000", accent = "#1f5fd6";
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = tone === "dark" ? "#4d6bff" : cs.getPropertyValue("--accent").trim() || accent;
      const dark = tone === "dark" || document.documentElement.classList.contains("dark");
      line = dark ? "rgba(255,255,255,0.08)" : "rgba(30,40,70,0.09)";
    };
    readColors();
    const resize = () => {
      W = host.clientWidth;
      H = host.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / CELL);
      rows = Math.ceil(H / CELL);
    };
    resize();

    const lit = new Map<number, number>(); // cell index -> brightness 0..1
    let last = -1;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const c = Math.floor((e.clientX - r.left) / CELL), rw = Math.floor((e.clientY - r.top) / CELL);
      if (c < 0 || rw < 0 || c >= cols || rw >= rows) return;
      const k = rw * cols + c;
      if (k !== last) {
        lit.set(k, 1);
        last = k;
        kick();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= W; x += CELL) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H);
      }
      for (let y = 0; y <= H; y += CELL) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(W, y + 0.5);
      }
      ctx.stroke();
      for (const [k, v] of lit) {
        const x = (k % cols) * CELL, y = Math.floor(k / cols) * CELL;
        ctx.globalAlpha = v * 0.26;
        ctx.fillStyle = accent;
        ctx.fillRect(x + 1, y + 1, CELL - 1, CELL - 1);
        ctx.globalAlpha = v * 0.9;
        ctx.strokeStyle = accent;
        ctx.strokeRect(x + 0.5, y + 0.5, CELL, CELL);
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, visible = false, ambient = 0;
    const tick = (t: number) => {
      // ambient: a random cell starts glowing roughly every 0.7s
      if (t - ambient > 700) {
        ambient = t;
        lit.set(Math.floor(Math.random() * cols * rows), 0.7);
      }
      for (const [k, v] of lit) {
        const n = v - 0.012;
        if (n <= 0) lit.delete(k);
        else lit.set(k, n);
      }
      draw();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf && visible && !reduced) raf = requestAnimationFrame(tick);
    };

    draw();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    });
    io.observe(host);
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(host);
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    if (!reduced) host.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onMove);
    };
  }, [tone]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0" />;
}
