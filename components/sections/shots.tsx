"use client";

import { useEffect, useState } from "react";
import { shots } from "@/content";
import { SafeImage } from "@/components/media";
import type { CSSVars } from "@/lib/cn";

const d = (ms: number): CSSVars => ({ "--d": ms });

export function Shots() {
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : shots[open];

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((v) => (v === null ? v : (v + 1) % shots.length));
      if (event.key === "ArrowLeft")
        setOpen((v) => (v === null ? v : (v - 1 + shots.length) % shots.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="flex h-full min-h-0 flex-col gap-5">
        <div
          data-reveal
          style={d(0)}
          className="flex items-baseline justify-between gap-4"
        >
          <h2 className="font-display text-[clamp(1.75rem,4.4vw,3.25rem)] leading-none">
            Screen<em className="text-accent italic">shots</em>
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
            tap to open
          </span>
        </div>

        <div
          data-scroll-y=""
          className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shots.map((shot, index) => (
              <button
                key={shot.id}
                type="button"
                data-reveal
                style={d(120 + index * 70)}
                onClick={() => setOpen(index)}
                className="group block w-full text-left"
                aria-label={`Открыть ${shot.title}`}
              >
                <SafeImage
                  src={shot.image}
                  alt={shot.title}
                  className="aspect-[16/10] w-full rounded-xl border border-line transition-colors duration-500 group-hover:border-accent-line"
                  imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="mt-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  <span className="truncate">{shot.title}</span>
                  <span className="text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    ↗
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-paper/85 p-6 backdrop-blur-xl"
        >
          <figure
            className="w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <SafeImage
              src={current.image}
              alt={current.title}
              className="aspect-[16/10] max-h-[72vh] w-full rounded-2xl border border-line"
              imgClassName="object-contain"
              sizes="90vw"
            />
            <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              <span className="truncate">{current.title}</span>
              <span>{current.caption}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Закрыть"
            className="absolute right-[clamp(1.25rem,4vw,2.5rem)] top-[clamp(1.25rem,4vw,2.5rem)] grid h-10 w-10 place-items-center rounded-full border border-line bg-paper/70 font-mono text-sm text-ink backdrop-blur-md transition-colors hover:border-accent-line"
          >
            ✕
          </button>
        </div>
      ) : null}
    </>
  );
}
