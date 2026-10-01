import type { Palette } from "@/content";
import { themeColors } from "@/content";

export type ThemeMode = "light" | "dark";

export const THEME_KEY = "pf-theme";
export const PALETTE_KEY = "pf-palette";

/* ---------------------------------------------------------------------------
 *  Крошечный внешний стор: DOM (<html>) — источник правды для темы и палитры.
 *  Компонент читает его через useSyncExternalStore, поэтому никаких
 *  setState-в-effect и никакого мигания при гидратации.
 * ------------------------------------------------------------------------ */

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeTheme(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Снапшот темы (клиент). */
export function getThemeSnapshot(): ThemeMode {
  const value = document.documentElement.getAttribute("data-theme");
  return value === "dark" ? "dark" : "light";
}

/** Снапшот палитры (клиент). */
export function getPaletteSnapshot(): string {
  return document.documentElement.getAttribute("data-palette") ?? "";
}

/** Поставить тему (light/dark) на <html> + синхронизировать color-scheme и meta. */
export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  root.style.colorScheme = mode;
  syncThemeColorMeta(mode);
  emit();
}

/**
 * В <head> может быть несколько meta theme-color (по одному на media-тему).
 * После ручного переключения темы media-фильтры больше не нужны — проставляем
 * актуальный цвет всем, иначе в тёмной теме останется светлая полоска.
 */
function syncThemeColorMeta(mode: ThemeMode) {
  const metas = document.querySelectorAll('meta[name="theme-color"]');
  if (metas.length === 0) {
    const created = document.createElement("meta");
    created.setAttribute("name", "theme-color");
    document.head.appendChild(created);
    created.setAttribute("content", themeColors[mode]);
    return;
  }
  for (const meta of metas) {
    meta.setAttribute("content", themeColors[mode]);
    meta.removeAttribute("media");
  }
}

/** Поставить палитру на <html> + обновить акцентные CSS-переменные. */
export function applyPalette(palette: Palette) {
  const root = document.documentElement;
  root.setAttribute("data-palette", palette.id);
  root.style.setProperty("--a-h", String(palette.hue));
  root.style.setProperty("--a-s", `${palette.sat}%`);
  emit();
}
