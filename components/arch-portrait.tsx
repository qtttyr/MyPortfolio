"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface ArchPortraitProps {
  src?: string;
  alt: string;
  initials: string;
  caption?: string;
  className?: string;
}

/**
 * Портрет в форме арки — минималистично и не банально.
 * Картинки нет → показываем монограмму в сериф-шрифте (тоже красиво).
 */
export function ArchPortrait({ src, alt, initials, caption, className }: ArchPortraitProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <figure className={cn("group relative select-none", className)}>
      {/* акцентный волосок-рамка со сдвигом */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-2 -top-2 bottom-2 arch border border-accent-line"
      />
      <div className="arch relative aspect-[3/4] w-full overflow-hidden bg-surface">
        {showImage ? (
          <Image
            src={src as string}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 45vw, 22vw"
            onError={() => setFailed(true)}
            className="arch-img h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-[clamp(3rem,9vw,6rem)] leading-none text-accent">
              {initials}
            </span>
          </div>
        )}
        {/* тонкая внутренняя рамка */}
        <span aria-hidden className="pointer-events-none absolute inset-0 arch border border-line" />
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
