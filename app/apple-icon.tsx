import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";
import { OgMark } from "@/components/og-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Иконка для «домашнего экрана» iOS (apple-touch-icon). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.paperDark,
        }}
      >
        <OgMark size={104} />
      </div>
    ),
    { ...size },
  );
}
