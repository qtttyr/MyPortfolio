"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content";
import { useHorizontalScroll } from "@/lib/use-horizontal-scroll";
import { PanelFrame } from "@/components/panel-frame";
import { Intro } from "@/components/sections/intro";
import { Work } from "@/components/sections/work";
import { Stack } from "@/components/sections/stack";
import { Shots } from "@/components/sections/shots";
import { Contact } from "@/components/sections/contact";
import { cn } from "@/lib/cn";

export function SiteShell() {
  const { trackRef, active, progress, goTo } = useHorizontalScroll({
    count: sections.length,
  });

  // Даём браузеру один кадр отрисовать стартовое состояние, чтобы hero
  // красиво «въехал» на загрузке (а не появился мгновенно).
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setBooted(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  const renderBody = (id: string) => {
    switch (id) {
      case "intro":
        return <Intro />;
      case "work":
        return <Work />;
      case "stack":
        return <Stack />;
      case "screens":
        return <Shots />;
      case "contact":
        return <Contact onRestart={() => goTo(0)} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-svh w-full overflow-hidden">
      {/* Горизонтальный трек с панелями */}
      <main ref={trackRef} className="track" aria-label="Portfolio">
        {sections.map((section, index) => (
          <PanelFrame
            key={section.id}
            index={index + 1}
            total={sections.length}
            label={section.label}
            active={booted && active === index}
            onHome={() => goTo(0)}
          >
            {renderBody(section.id)}
          </PanelFrame>
        ))}
      </main>

      {/* Навигация: вертикальный рейл на десктопе.
          По умолчанию — только миниатюрные чёрточки (активная — акцентная),
          при наведении на рейл плавно проявляются номер и подпись. */}
      <nav
        aria-label="Sections"
        className="group/nav fixed left-0 top-0 z-30 hidden h-full flex-col justify-center pl-[clamp(0.75rem,1.4vw,1.25rem)] lg:flex"
      >
        {sections.map((section, index) => {
          const isActive = active === index;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => goTo(index)}
              aria-current={isActive ? "true" : undefined}
              aria-label={section.label}
              className="flex items-center gap-2.5 py-[0.42rem] text-left"
            >
              <span
                className={cn(
                  "w-4 shrink-0 font-mono text-[10px] leading-none tabular-nums",
                  "transition-all duration-500 ease-out",
                  "opacity-0 -translate-x-2 group-hover/nav:translate-x-0 group-hover/nav:opacity-100",
                  isActive ? "text-accent" : "text-muted",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={cn(
                  "h-px shrink-0 transition-all duration-500 ease-out",
                  isActive
                    ? "w-7 bg-accent"
                    : "w-3 bg-line group-hover/nav:w-5 group-hover/nav:bg-muted",
                )}
              />

              <span
                className={cn(
                  "whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em]",
                  "transition-all duration-500 ease-out",
                  "opacity-0 -translate-x-1.5 group-hover/nav:translate-x-0 group-hover/nav:opacity-100",
                  isActive ? "text-ink" : "text-muted",
                )}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Навигация: нижний док на телефоне */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex flex-col items-center gap-3 px-4 pb-5 lg:hidden">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {sections[active]?.label}
        </span>
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-line bg-paper/70 px-3 py-2 backdrop-blur-md">
          {sections.map((section, index) => {
            const isActive = active === index;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={section.label}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  isActive ? "w-5 bg-accent" : "w-1.5 bg-line hover:bg-muted",
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Прогресс прокрутки */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[2px] bg-transparent">
        <div
          className="h-full bg-accent"
          style={{
            width: `${(progress * 100).toFixed(2)}%`,
            transition: "width 120ms linear",
          }}
        />
      </div>
    </div>
  );
}
