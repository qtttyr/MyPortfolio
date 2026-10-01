"use client";

import { useState } from "react";
import { projects } from "@/content";
import { SafeImage } from "@/components/media";
import { cn, type CSSVars } from "@/lib/cn";

const d = (ms: number): CSSVars => ({ "--d": ms });

export function Work() {
  const [hovered, setHovered] = useState(0);
  const current = projects[hovered] ?? projects[0];

  return (
    <div className="flex h-full min-h-0 flex-col gap-5">
      <div
        data-reveal
        style={d(0)}
        className="flex items-baseline justify-between gap-4"
      >
        <h2 className="font-display text-[clamp(1.75rem,4.4vw,3.25rem)] leading-none">
          Selected <em className="text-accent italic">work</em>
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
          {String(projects.length).padStart(2, "0")} projects
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Список всех проектов */}
        <ul
          data-reveal
          data-scroll-y=""
          style={d(120)}
          className="no-scrollbar h-full min-h-0 overflow-y-auto overscroll-contain"
        >
          {projects.map((project, index) => {
            const isActive = hovered === index;
            return (
              <li key={project.id}>
                <a
                  href={project.href ?? "#"}
                  target={project.href ? "_blank" : undefined}
                  rel="noreferrer"
                  onMouseEnter={() => setHovered(index)}
                  onFocus={() => setHovered(index)}
                  className={cn(
                    "group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-line py-[clamp(0.8rem,1.9vw,1.35rem)] transition-colors duration-300",
                    isActive ? "text-accent" : "text-ink",
                  )}
                >
                  <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex min-w-0 items-center gap-4">
                    <span className="min-w-0">
                      <span className="font-display block text-[clamp(1.35rem,3.2vw,2.3rem)] leading-none transition-transform duration-500 group-hover:translate-x-1">
                        {project.title}
                      </span>
                      <span className="mt-1.5 block truncate font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        {project.tags.join(" · ")} — {project.year}
                      </span>
                    </span>
                    {/* миниатюра для телефона */}
                    <SafeImage
                      src={project.image}
                      alt={project.title}
                      className="ml-auto h-11 w-16 shrink-0 rounded-lg lg:hidden"
                      sizes="80px"
                    />
                  </span>

                  <span className="font-mono text-[11px] text-muted transition-colors group-hover:text-accent">
                    ↗
                  </span>
                </a>
              </li>
            );
          })}
          <li className="border-t border-line" />
        </ul>

        {/* Превью активного проекта (десктоп) */}
        <div
          data-reveal
          style={d(220)}
          className="hidden min-h-0 flex-col gap-4 lg:flex"
        >
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-line bg-surface">
            {projects.map((project, index) => (
              <div
                key={project.id}
                aria-hidden={index !== hovered}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: index === hovered ? 1 : 0 }}
              >
                <SafeImage
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full"
                  sizes="45vw"
                />
              </div>
            ))}
            <span
              aria-hidden
              className="pointer-events-none absolute left-4 top-4 rounded-full bg-paper/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink backdrop-blur-md"
            >
              {current?.year}
            </span>
          </div>
          <p className="min-h-[3.25rem] text-[0.8125rem] leading-relaxed text-muted">
            {current?.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}
