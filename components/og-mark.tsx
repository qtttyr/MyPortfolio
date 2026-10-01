import { brand } from "@/lib/brand";

/**
 * Знак «арка-M» для генерируемых картинок (Satori / next-og).
 *
 * Satori не умеет рисовать inline-SVG со stroke, поэтому арки собраны из
 * обычных div-ов: бокс с верхней и боковыми рамками + скругление = арка.
 * Две арки накладываются ровно на толщину рамки, поэтому на стыке получается
 * третья стойка — буква M. В стыке же стоит акцентный «клин».
 */
export function OgMark({
  size,
  ink = brand.inkDark,
  accent = brand.accent,
}: {
  /** Габарит знака: сколько занимает сам рисунок (20 условных единиц). */
  size: number;
  ink?: string;
  accent?: string;
}) {
  const unit = size / 20; // знак в координатах viewBox = 20×20
  const archW = 10 * unit;
  const archH = 20 * unit;
  const stroke = 2.8 * unit;
  const radius = 5 * unit;
  const dot = 3.4 * unit;

  const arch: React.CSSProperties = {
    width: archW,
    height: archH,
    borderTop: `${stroke}px solid ${ink}`,
    borderLeft: `${stroke}px solid ${ink}`,
    borderRight: `${stroke}px solid ${ink}`,
    borderRadius: `${radius}px ${radius}px 0 0`,
  };

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "flex-end" }}>
      <div style={arch} />
      <div style={{ ...arch, marginLeft: `${-stroke}px` }} />
      <div
        style={{
          position: "absolute",
          top: 5 * unit + stroke / 2 - dot / 2,
          left: archW - stroke / 2 - dot / 2,
          width: dot,
          height: dot,
          borderRadius: `${dot / 2}px`,
          background: accent,
        }}
      />
    </div>
  );
}
