/**
 * =============================================================================
 *  ★  ЕДИНСТВЕННЫЙ ФАЙЛ КОНТЕНТА  ★
 * -----------------------------------------------------------------------------
 *  Здесь живут ВСЕ данные сайта: имя, роль, проекты, стек, скриншоты,
 *  соцсети и цветовые палитры. Больше нигде править ничего не нужно —
 *  меняешь только этот файл.
 *
 *  ФОТО:
 *   1. Положи картинки в папку  public/images/
 *   2. Укажи путь от корня, например: "/images/me.jpg"
 *   3. Если картинки ещё нет — сайт сам покажет аккуратную заглушку
 *      (монограмму или подпись), так что всё будет красиво и без фото.
 *
 *  ПОДСКАЗКА: если написать `name` из двух слов (Имя Фамилия) —
 *  последнее слово автоматически станет курсивным акцентом.
 * =============================================================================
 */

export interface SocialLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  blurb: string;
  year: string;
  tags: string[];
  href?: string;
  image?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Shot {
  id: string;
  title: string;
  caption?: string;
  image?: string;
}

/** Цветовая палитра. hue = тон (0–360), sat = насыщенность в % (0–100). */
export interface Palette {
  id: string;
  label: string;
  hue: number;
  sat: number;
}

export interface Profile {
  /** Имя. Два слова → последнее слово станет акцентом-курсивом. */
  name: string;
  /** Чем занимаешься — короткая строка, показывается в самом низу hero. */
  role: string;
  /** Одна короткая строка «о себе». Без воды. */
  tagline: string;
  /** Город / таймзона. */
  location: string;
  /** Рабочая почта. */
  email: string;
  /** Показывать статус «открыт к работе». */
  available: boolean;
  /** Путь к фото, напр. "/images/me.jpg". Пусто → покажется монограмма. */
  photo?: string;
  /** 1–3 буквы для монограммы (заглушка, если фото нет). */
  initials: string;
}

export interface SectionMeta {
  id: string;
  /** Подпись секции в навигации. */
  label: string;
}

/* ---------------------------------------------------------------------------
 *  ПРОФИЛЬ
 * ------------------------------------------------------------------------- */

export const profile: Profile = {
  name: "Miras Kustaibek",
  role: "Creative Developer — Interfaces & Motion",
  tagline: "Building software at the speed of thought. I don't just write code; I orchestrate AI agents to solve real-world problems.",
  location: "Astana, KZ",
  email: "mirasbusy@gmail.com",
  available: true,
  photo: "/images/me.jpg",
  initials: "M",
};

/* ---------------------------------------------------------------------------
 *  СЕКЦИИ (порядок и подписи в навигации)
 *  id менять не нужно — они привязаны к внутренним блокам сайта.
 * ------------------------------------------------------------------------- */

export const sections: SectionMeta[] = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "screens", label: "Screens" },
  { id: "contact", label: "Contact" },
];

/* ---------------------------------------------------------------------------
 *  СОЦСЕТИ / ССЫЛКИ
 * ------------------------------------------------------------------------- */

export const socials: SocialLink[] = [
  { label: "Email", href: "mailto:mirasbusy@gmail.com" },
  { label: "GitHub", href: "https://github.com/qtttyr" },
  { label: "Telegram", href: "https://t.me/mkcompanyn" },
];

/* ---------------------------------------------------------------------------
 *  ПРОЕКТЫ  (все — показываются в секции Work)
 * ------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: "Bilim",
    title: "Bilim",
    blurb: "Bilim — AI-Powered Smart Study Platform",
    year: "2025",
    tags: ["Product", "Data", "Design System"],
    href: "https://bilim-gamma.vercel.app",
    image: "/images/bilim.jpg",
  },
  {
    id: "Shadow.me",
    title: "Shadow.me",
    blurb: "VISUALIZING THE INVISIBLE • CLEANING THE UNSEEN",
    year: "2026",
    tags: ["Side Project", "Web", "Motion"],
    href: "https://github.com/qtttyr/Shadow.me",
    image: "/images/shadowme.jpg",
  },
  {
    id: "mkitap",
    title: "MKitap",
    blurb: "Free book reader",
    year: "2026",
    tags: ["Web App", "BookReader", "Tooling"],
    href: "https://mkitap.vercel.app",
    image: "/images/mkitap.jpg",
  },
  {
    id: "qaryz",
    title: "Qaryz",
    blurb: "Tracking of debts, shared expenses, and mutual settlements.",
    year: "2025",
    tags: ["Startup", "iOS", "Mobile"],
    href: "https://qaryz-five.vercel.app",
    image: "/images/qaryz.jpg",
  },
  {
    id: "Wally",
    title: "Wally",
    blurb: "Personal finance PWA with AI-powered receipt scanning and budget tracking.",
    year: "2025",
    tags: ["Startup", "iOS", "Mobile"],
    href: "https://wallyai.vercel.app",
    image: "/images/wally.jpg",
  },
  {
    id: "MiraLM",
    title: "MiraLM",
    blurb: "AI-powered language model for personal assistance",
    year: "2026",
    tags: ["LLM", "iOS", "Assistant"],
    href: "https://mira-lm.vercel.app",
    image: "/images/mira.jpg",
  },
];

/* ---------------------------------------------------------------------------
 *  СТЕК / СКИЛЛЫ  (блоки и пункты)
 * ------------------------------------------------------------------------- */

export const stack: SkillGroup[] = [
  {
    label: "Frontend / Web",
    items: ["React", "Vite", "PWA", "Tailwind CSS", "SVG", "HTML5", "CSS3"],
  },
  {
    label: "Apple / Mobile",
    items: ["Swift", "SwiftUI", "iOS", "Xcode", "App Store Connect"],
  },
  {
    label: "Backend / Automation",
    items: ["Python", "aiogram", "SQLite", "REST API", "JSON"],
  },
  {
    label: "AI / ML",
    items: [
      "LLM APIs",
      "OpenAI API",
      "AI agents",
      "Prompt engineering",
      "Computer vision",
      "Image generation",
      "Ollama",
      "Local LLMs",
      "MCP",
    ],
  },
  {
    label: "Data",
    items: ["SQLite", "JSON", "APIs", "Data processing"],
  },
  {
    label: "Dev Tools",
    items: ["Git", "GitHub", "VS Code", "Xcode", "OpenCode CLI", "n8n"],
  },
  {
    label: "Deployment / Infrastructure",
    items: ["Vercel", "Google Cloud", "VPS", "GitHub", "Namecheap", "PWA deployment"],
  },
];

/* ---------------------------------------------------------------------------
 *  СКРИНШОТЫ  (галерея в секции Screens)
 * ------------------------------------------------------------------------- */

export const shots: Shot[] = [
  { id: "s1", title: "Qaryz - Overview", caption: "Dashboard", image: "/images/qaryz2.jpg" },
  { id: "s2", title: "Shadow.me", caption: "Landing", image: "/images/shadow2.jpg" },
  { id: "s3", title: "Shadow.me - App", caption: "Motion", image: "/images/shadow.jpg" },
  { id: "s4", title: "MKitap - App", caption: "Dashboard", image: "/images/mkitapp.jpg" },
  { id: "s5", title: "Bagdar — Today", caption: "iOS", image: "/images/bagdar.jpg" },
  { id: "s6", title: "MiraLM - Landing", caption: "Landing", image: "/images/miralm.jpg" },
];

/* ---------------------------------------------------------------------------
 *  ПАЛИТРЫ  (три штуки, переключаются по кругу кнопкой рядом с темой)
 *  hue/sat могут быть любыми — остальное система досчитает сама (светлота,
 *  оттенки, прозрачности), а акцент автоматически подстроится под тему.
 * ------------------------------------------------------------------------- */

export const palettes: Palette[] = [
  { id: "clay", label: "Clay", hue: 20, sat: 58 },
  { id: "moss", label: "Moss", hue: 112, sat: 26 },
  { id: "dusk", label: "Dusk", hue: 248, sat: 44 },
];

/* ---------------------------------------------------------------------------
 *  META (title/description для <head>) и цвет системы для каждой темы
 * ------------------------------------------------------------------------- */

export const meta = {
  title: "Miras Kustaibek | Portfolio",
  description: profile.tagline,
};

export const themeColors = {
  light: "#f2ebe1",
  dark: "#0e0c0b",
} as const;
