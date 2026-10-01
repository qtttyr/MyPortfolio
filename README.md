# Miras Kustaibek | Portfolio

Горизонтальное минималистичное портфолио: один экран — одна секция, скролл
**горизонтальный** и всегда с плавной доводкой ровно до секции. Две темы,
три цветовые палитры, зернистый фон, живая типографика.

Стек: **Next.js 16** (App Router) · **React 19** · **Tailwind CSS v4** ·
шрифты через `next/font` · **zero** новых зависимостей.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # прод-сборка
npm start        # запустить прод-сборку
npm run lint     # eslint
npm run icons    # перегенерировать PNG-иконки (192/512) из знака
```

## Всё содержимое — в одном файле

**[`content.ts`](./content.ts)**: имя, роль, описание, почта, фото, проекты,
стек, скриншоты, соцсети, цветовые палитры, title/description для поиска.

- Фото и обложки кладутся в `public/images/`, путь указывается вида
  `/images/me.jpg`. Нет файла — сайт покажет аккуратную заглушку, ничего не сломается.
- Имя из двух слов → последнее слово автоматически становится курсивом-акцентом.
- `palettes` — три штуки; у каждой только `hue` (тон) и `sat` (насыщенность),
  остальное (светлота под тему, оттенки, прозрачности) считает CSS,
  а смена цвета плавно анимируется.
- Метаданные для поиска собираются **автоматически** из `content.ts`:
    добавь навык в `stack` — он сразу попадёт и в `keywords`, и в `knowsAbout`
    в schema.org, и в бегущую строку. Ничего дублировать не надо.

## Знак и иконки

Знак — две арки, сложенные в букву **M** (мотив портрета-арки на сайте),
в стыке — акцентный «клин» цветом палитры.

| Файл | Что это |
| --- | --- |
| `components/logo.tsx` | знак в интерфейсе (цветом палитры) |
| `app/icon.svg` | фавиконка (векторная) |
| `app/apple-icon.tsx` | иконка на «домашний экран» iOS (генерируется на билде) |
| `app/opengraph-image.tsx` | превью для соцсетей 1200×630 (генерируется на билде) |
| `app/twitter-image.tsx` | то же для Twitter/X |
| `public/icons/*.png` | иконки для PWA-манифеста, `npm run icons` |

## Что уже сделано для SEO

- `title` = `Miras Kustaibek | Portfolio`, `description`, `keywords`
  (собираются из стека), `author`, `canonical`, `robots` (index/follow + googlebot).
- **Open Graph + Twitter Card** с автоматически сгенерированной картинкой.
- **JSON-LD schema.org**: `Person` (имя, роль, почта, город, фото, `sameAs`
  на соцсети, `knowsAbout` из стека), `WebSite` и `ItemList` со всеми проектами
  как `CreativeWork` — именно это читают поисковики и AI-ассистенты.
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest` (PWA).
- Статический рендер: вся страница отдаётся готовым HTML, без клиентских
  данных — быстро индексируется.

## Деплой

### Vercel (самый простой путь)

1. Залей проект в Git-репозиторий.
2. [vercel.com/new](https://vercel.com/new) → импорт репозитория → Deploy.
   Framework определится сам, ничего настраивать не нужно.

### Свой домен

В `lib/site-url.ts` адрес берётся в таком порядке:

1. `NEXT_PUBLIC_SITE_URL` — задай руками (см. `.env.example`);
2. переменные Vercel (`VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`) —
   на Vercel домен подставится сам;
3. `http://localhost:3000` — локально.

На Vercel: **Settings → Environment Variables → `NEXT_PUBLIC_SITE_URL` =
`https://твой-домен`**, затем re-deploy. Это важно: от этого адреса зависят
`canonical`, `sitemap.xml`, `robots.txt` и ссылки в schema.org — без него они
укажут на localhost.

Для другого хостинга: любой Node-хостинг, `npm run build && npm start`
(нужен Node 20+).

## После деплоя: чтобы тебя находили по имени

1. **[Google Search Console](https://search.google.com/search-console)** →
   добавь домен → **Sitemaps** → `sitemap.xml` → «Отправить».
   Там же **Проверка URL** на главной странице.
2. **[Bing Webmaster Tools](https://www.bing.com/webmasters)** — тот же домен и sitemap.
3. **Проверь разметку**: [validator.schema.org](https://validator.schema.org/)
   вставь адрес страницы. Должны быть `Person` и `ItemList` без ошибок.
   [Rich Results Test](https://search.google.com/test/rich-results) — то же от Google.
4. **Пропиши себя на GitHub** (`https://github.com/qtttyr`) в профиле и в README:
   ссылка с `github.com/твой-ник` → `твой-домен` и наоборот работает как
   подтверждение личности для поисковика.
5. **Залей OG-картинку в превью** — она уже генерируется, просто проверь, как
   выглядит ссылка в мессенджере (Telegram, WhatsApp, Discord, Slack).
6. Через пару недель зайди в Search Console → **Эффективность** → поисковые
   запросы: появятся запросы с твоим именем.

> 💡 Несколько профилей на разных площадках (GitHub, Telegram, Vercel,
> Product Hunt, Telegram-канал) с ссылкой на портфолио — самый быстрый способ
> стать «находимым» по имени. Поисковики видят согласованность ссылок.

## Структура

```
app/
  layout.tsx           шрифты, <head>, метаданные, JSON-LD, мгновенная тема
  page.tsx             рендерит <SiteShell />
  globals.css          токены тем/палитр, зерно, трек, ревилы, marquee
  icon.svg             фавиконка
  apple-icon.tsx       иконка iOS (генерируется)
  opengraph-image.tsx  превью 1200×630 (генерируется)
  twitter-image.tsx    то же для X
  manifest.ts          PWA-манифест
  robots.ts            robots.txt
  sitemap.ts           sitemap.xml
content.ts             ★ все данные сайта
components/
  logo.tsx             знак «арка-M»
  og-mark.tsx          знак для генерируемых картинок
  site-shell.tsx       трек, навигация (рейл/док), прогресс
  panel-frame.tsx      общая рамка панели (знак, номер, кнопки темы)
  theme-controls.tsx   тема + палитра
  sections/            intro · work · stack · shots · contact
  media.tsx            картинка-с-заглушкой
  arch-portrait.tsx    портрет-арка
  marquee.tsx          бегущая строка
lib/
  use-horizontal-scroll.ts  движок скролла (инерция + магнитный снап)
  theme.ts / cn.ts / site-url.ts / brand.ts
scripts/
  generate-icons.mjs   генерация PNG-иконок из знака
```

## Производительность

`next/image` сам оптимизирует картинки (WebP/AVIF по формату) и грузит их
лениво. Но исходники в `public/images/` стоит сжать заранее — там есть файлы
на несколько мегабайт (например `shadow.jpg` ~8.8 МБ). Помогут
[squoosh.app](https://squoosh.app) или `cwebp`; для скриншотов интерфейса
обычно хватает 1600px по ширине и качества 75–80.

