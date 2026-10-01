import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Grain } from "@/components/grain";
import { meta, palettes, profile, projects, socials, stack, themeColors } from "@/content";
import { siteUrl } from "@/lib/site-url";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-src",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-src",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  display: "swap",
});

/** Все навыки одной строкой — из них собираются keywords и knowsAbout. */
const skills = stack.flatMap((group) => group.items);

const keywords = [
  profile.name,
  "portfolio",
  "creative developer",
  "frontend developer",
  "web developer",
  "AI engineer",
  profile.role,
  ...skills,
].join(", ");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: meta.title,
    template: `%s | ${profile.name}`,
  },
  description: meta.description,
  applicationName: meta.title,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  keywords,
  category: "portfolio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: meta.title,
    title: meta.title,
    description: meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, date: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Разметка schema.org: Person + WebSite + ItemList проектов.
 * Это то, что позволяет поиску и AI-ассистентам понять, кто это и что
 * за проекты, и показывать карточку прямо в выдаче.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: "Creative Developer",
      description: profile.tagline,
      url: siteUrl,
      image: `${siteUrl}${profile.photo ?? "/images/me.jpg"}`,
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.location.split(",")[0]?.trim(),
        addressCountry: profile.location.split(",")[1]?.trim(),
      },
      knowsAbout: skills,
      sameAs: socials.filter((link) => link.href.startsWith("http")).map((link) => link.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: meta.title,
      description: meta.description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: `Projects by ${profile.name}`,
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.blurb,
          url: project.href ?? `${siteUrl}/#${project.id}`,
          keywords: project.tags.join(", "),
          dateCreated: project.year,
          author: { "@id": `${siteUrl}/#person` },
        },
      })),
    },
  ],
};


/**
 * Скрипт выполняется ДО первой отрисовки: читает тему и палитру из
 * localStorage и мгновенно проставляет их на <html>, чтобы не было «мигания».
 */
const themeScript = `
(function(){try{
  var d=document.documentElement;
  var P=${JSON.stringify(palettes)};
  var C=${JSON.stringify(themeColors)};
  var t=localStorage.getItem("pf-theme");
  if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
  var id=localStorage.getItem("pf-palette");
  var p=null;
  for(var i=0;i<P.length;i++){if(P[i].id===id){p=P[i];break;}}
  if(!p){p=P[0];}
  d.setAttribute("data-theme",t);
  d.setAttribute("data-palette",p.id);
  d.style.colorScheme=t;
  d.style.setProperty("--a-h",String(p.hue));
  d.style.setProperty("--a-s",p.sat+"%");
  var m=document.querySelectorAll('meta[name="theme-color"]');
  if(!m.length){var c=document.createElement("meta");c.setAttribute("name","theme-color");document.head.appendChild(c);c.setAttribute("content",t==="dark"?C.dark:C.light);}
  else{for(var j=0;j<m.length;j++){m[j].setAttribute("content",t==="dark"?C.dark:C.light);m[j].removeAttribute("media");}}
}catch(e){}})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        {/* Структурированные данные: Person + WebSite + список проектов */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Если JS выключен — показываем весь контент без анимаций */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>",
          }}
        />
      </head>
      <body>
        {children}
        <Grain />
      </body>
    </html>
  );
}
