/**
 * Генерация PNG-иконок для PWA-манифеста.
 *
 *   node scripts/generate-icons.mjs
 *
 * Иконки собираются из того же знака, что и app/icon.svg, поэтому
 * достаточно поменять геометрию в одном месте (см. MARK ниже).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const PAPER = "#0e0c0b";
const INK = "#ece4d9";
const ACCENT = "#d8916e";

/** Знак «арка-M». Та же геометрия, что в components/logo.tsx (viewBox 32×32). */
function mark(size) {
  const unit = size / 20; // знак занимает 20 условных единиц
  const archW = 10 * unit;
  const archH = 20 * unit;
  const stroke = 2.8 * unit;
  const radius = 5 * unit;
  const dot = 3.4 * unit;

  const arch = {
    width: archW,
    height: archH,
    borderTop: `${stroke}px solid ${INK}`,
    borderLeft: `${stroke}px solid ${INK}`,
    borderRight: `${stroke}px solid ${INK}`,
    borderRadius: `${radius}px ${radius}px 0 0`,
  };

  return h(
    "div",
    { style: { position: "relative", display: "flex", alignItems: "flex-end" } },
    h("div", { style: arch }),
    // вторая арка наезжает на первую ровно на толщину рамки → стык = третья стойка
    h("div", { style: { ...arch, marginLeft: `${-stroke}px` } }),
    h("div", {
      style: {
        position: "absolute",
        top: 5 * unit + stroke / 2 - dot / 2,
        left: archW - stroke / 2 - dot / 2,
        width: dot,
        height: dot,
        borderRadius: `${dot / 2}px`,
        background: ACCENT,
      },
    }),
  );
}

async function render(size) {
  const tree = h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: PAPER,
      },
    },
    // 45% от холста — с запасом для maskable-иконок Android
    mark(Math.round(size * 0.45)),
  );

  const response = new ImageResponse(tree, { width: size, height: size });
  return Buffer.from(await response.arrayBuffer());
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "icons");
await mkdir(outDir, { recursive: true });

for (const size of [192, 512]) {
  const png = await render(size);
  const file = join(outDir, `icon-${size}.png`);
  await writeFile(file, png);
  console.log(`✓ ${file} (${size}×${size}, ${(png.length / 1024).toFixed(1)} KB)`);
}
