import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Явно фиксируем корень проекта, чтобы Turbopack не искал lock-файлы выше.
  turbopack: {
    root: process.cwd(),
  },
  // Не отдаём заголовок X-Powered-By: мелочь, но аккуратно.
  poweredByHeader: false,
};

export default nextConfig;
