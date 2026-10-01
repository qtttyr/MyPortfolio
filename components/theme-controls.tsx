"use client";

import { useSyncExternalStore } from "react";
import { palettes } from "@/content";
import {
  applyPalette,
  applyTheme,
  getPaletteSnapshot,
  getThemeSnapshot,
  PALETTE_KEY,
  subscribeTheme,
  THEME_KEY,
  type ThemeMode,
} from "@/lib/theme";

const FALLBACK_PALETTE = palettes[0]?.id ?? "clay";

/**
 * Две кнопки в правом верхнем углу:
 *  ☀/☾  — переключить тему (light ⇄ dark)
 *  ●    — переключить палитру по кругу (Clay → Moss → Dusk → …)
 */
export function ThemeControls() {
  // DOM (<html>) — источник правды; inline-скрипт уже проставил значения.
  const mode = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light" as ThemeMode);
  const paletteId = useSyncExternalStore(
    subscribeTheme,
    getPaletteSnapshot,
    () => FALLBACK_PALETTE,
  );

  const toggleTheme = () => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* приватный режим — просто игнорируем */
    }
  };

  const cyclePalette = () => {
    const current = palettes.findIndex((p) => p.id === paletteId);
    const next = palettes[(current + 1) % palettes.length];
    if (!next) return;
    applyPalette(next);
    try {
      localStorage.setItem(PALETTE_KEY, next.id);
    } catch {
      /* приватный режим — просто игнорируем */
    }
  };

  const paletteIndex = palettes.findIndex((p) => p.id === paletteId);
  const palette = palettes[paletteIndex >= 0 ? paletteIndex : 0];

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        onClick={cyclePalette}
        aria-label={`Цветовая палитра: ${palette?.label ?? ""}. Нажми, чтобы сменить.`}
        title="Сменить палитру"
        className="group flex h-8 items-center gap-2 rounded-full border border-line px-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-accent-line"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-125" />
        <span className="hidden min-w-[3.1rem] text-left sm:inline">{palette?.label}</span>
      </button>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={mode === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
        title={mode === "dark" ? "Светлая тема" : "Тёмная тема"}
        className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-accent-line"
      >
        {/* обе иконки в DOM — верную показывает CSS по data-theme, без «мигания» */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="h-3.5 w-3.5 dark:hidden"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hidden h-3.5 w-3.5 dark:block"
          aria-hidden
        >
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
        </svg>
      </button>
    </div>
  );
}
