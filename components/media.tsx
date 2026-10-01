"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface SafeImageProps {
  src?: string;
  alt: string;
  /** Классы внешней рамки (у неё обязательно должен быть размер). */
  className?: string;
  /** Классы самой картинки. */
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Что показать вместо картинки, если её нет / она не загрузилась. */
  fallback?: React.ReactNode;
}

/**
 * Картинка, которая не ломает дизайн, если файла ещё нет.
 * Пока вместо фото лежит аккуратная подпись — в стиле сайта.
 */
export function SafeImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority,
  fallback,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {showImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        fallback ?? (
          <div className="flex h-full w-full items-center justify-center px-4">
            <span className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
              {alt}
            </span>
          </div>
        )
      )}
    </div>
  );
}
