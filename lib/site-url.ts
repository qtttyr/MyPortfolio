/**
 * Канонический адрес сайта.
 *
 * Порядок источников:
 *  1. NEXT_PUBLIC_SITE_URL        — задаёшь руками (свой домен);
 *  2. VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL — подставляет сам Vercel;
 *  3. http://localhost:3000        — локальная разработка.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) return `https://${vercelProduction.replace(/\/+$/, "")}`;

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
