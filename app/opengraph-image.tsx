import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";
import { OgMark } from "@/components/og-mark";
import { profile, projects } from "@/content";

export const alt = `${profile.name} — ${profile.role}. Portfolio: ${projects
  .slice(0, 4)
  .map((project) => project.title)
  .join(", ")}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const featured = projects
  .slice(0, 4)
  .map((project) => project.title)
  .join("   ·   ");

/** Превью для ссылок в соцсетях и мессенджерах (OG / Twitter). */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.paperDark,
          padding: "60px 72px",
        }}
      >
        {/* верх: знак + подпись */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <OgMark size={44} />
          <div
            style={{
              marginLeft: 22,
              color: brand.mutedDark,
              fontSize: 20,
              letterSpacing: 9,
            }}
          >
            PORTFOLIO
          </div>
        </div>

        {/* центр: имя + акцентная черта + роль */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: brand.inkDark,
              fontSize: 92,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 30,
              width: 128,
              height: 4,
              background: brand.accent,
            }}
          />
          <div
            style={{
              marginTop: 30,
              color: brand.accent,
              fontSize: 30,
              letterSpacing: 0.5,
            }}
          >
            {profile.role}
          </div>
        </div>

        {/* низ: локация + избранные проекты */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: brand.mutedDark,
            fontSize: 21,
          }}
        >
          <div>{profile.location}</div>
          <div style={{ color: brand.inkDark }}>{featured}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
