"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type LightboxItem = { src: string; alt: string; w: number; h: number; caption?: string };

type State = { items: LightboxItem[]; index: number } | null;
const OpenCtx = createContext<(items: LightboxItem[], index: number) => void>(() => {});

/**
 * Full-screen viewer. Purpose: product screenshots are dense dashboards; this lets a reader
 * actually read them. Escape closes, arrow keys move between images in the same group.
 */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(null);
  const open = useCallback((items: LightboxItem[], index: number) => setState({ items, index }), []);
  const step = useCallback(
    (d: number) =>
      setState((s) => (s ? { ...s, index: (s.index + d + s.items.length) % s.items.length } : s)),
    []
  );

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, step]);

  const item = state?.items[state.index];
  const many = (state?.items.length ?? 0) > 1;
  const ctrl =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25";

  return (
    <OpenCtx.Provider value={open}>
      {children}
      <Dialog.Root open={!!state} onOpenChange={(o) => !o && setState(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/85 data-[state=open]:animate-[fade-in_200ms_ease-out]" />
          <Dialog.Content
            className="fixed inset-0 z-[81] flex flex-col items-center justify-center gap-3 p-4 outline-none sm:p-10 data-[state=open]:animate-[zoom-in_220ms_cubic-bezier(0.22,1,0.36,1)]"
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">{item?.alt ?? "Image"}</Dialog.Title>
            {item && (
              <>
                <div className="relative flex max-h-[80vh] w-full max-w-6xl items-center justify-center">
                  <Image
                    key={item.src}
                    src={item.src}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    sizes="100vw"
                    className="h-auto max-h-[80vh] w-auto max-w-full rounded-md object-contain"
                  />
                </div>
                <div className="flex w-full max-w-6xl items-center justify-between gap-4 text-sm text-white/85">
                  <p className="min-w-0 flex-1">
                    {item.caption ?? item.alt}
                    {many && (
                      <span className="ml-2 text-white/60">
                        {state!.index + 1} / {state!.items.length}
                      </span>
                    )}
                  </p>
                  {many && (
                    <div className="flex gap-2">
                      <button type="button" onClick={() => step(-1)} className={ctrl} aria-label="Previous image">
                        <ChevronLeft className="h-5 w-5" aria-hidden />
                      </button>
                      <button type="button" onClick={() => step(1)} className={ctrl} aria-label="Next image">
                        <ChevronRight className="h-5 w-5" aria-hidden />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            <Dialog.Close className={cn(ctrl, "absolute top-4 right-4")} aria-label="Close image viewer">
              <X className="h-5 w-5" aria-hidden />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </OpenCtx.Provider>
  );
}

/** Wraps an image in a button that opens it (and its group) in the viewer. */
export function Zoom({
  items,
  index = 0,
  children,
  className,
}: {
  items: LightboxItem[];
  index?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const open = useContext(OpenCtx);
  return (
    <button
      type="button"
      onClick={() => open(items, index)}
      aria-label={`Enlarge image: ${items[index].alt}`}
      className={cn("group/zoom relative block w-full cursor-zoom-in text-left", className)}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100"
      >
        Click to enlarge
      </span>
    </button>
  );
}
