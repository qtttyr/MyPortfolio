import type { MetadataRoute } from "next";
import { meta, profile, themeColors } from "@/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: meta.title,
    short_name: "MK Portfolio",
    description: profile.tagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: themeColors.dark,
    theme_color: themeColors.dark,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
