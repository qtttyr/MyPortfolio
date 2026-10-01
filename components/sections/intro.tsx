import { profile, socials } from "@/content";
import { ArchPortrait } from "@/components/arch-portrait";
import type { CSSVars } from "@/lib/cn";

const d = (ms: number): CSSVars => ({ "--d": ms });

export function Intro() {
  // Последнее слово имени выделяем курсивом-акцентом (Имя Фамилия → Фамилия).
  const words = profile.name.trim().split(/\s+/);
  const accent = words.length > 1 ? words[words.length - 1] : null;
  const plain = accent ? words.slice(0, -1).join(" ") : words.join(" ");

  return (
    <div className="flex h-full flex-col justify-between gap-6">
      {/* Верхний ряд: статус и локация слева, мини-портрет справа (телефон) */}
      <div className="flex items-start justify-between gap-6">
        <div
          data-reveal
          style={d(0)}
          className="flex items-center gap-3 pt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted"
        >
          {profile.available ? (
            <>
              <span className="animate-dot h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-accent">Open to work</span>
            </>
          ) : null}
          <span className="h-px w-6 bg-line" />
          <span>{profile.location}</span>
        </div>

        <div data-reveal style={d(60)} className="shrink-0 lg:hidden">
          <ArchPortrait
            src={profile.photo}
            alt={profile.name}
            initials={profile.initials}
            className="w-[3.25rem]"
          />
        </div>
      </div>

      {/* Основной блок: имя + роль/теглайн слева, портрет справа (десктоп) */}
      <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(10.5rem,16vw,14rem)] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="font-display text-[clamp(3.25rem,13.5vw,10rem)] leading-[0.88] tracking-[-0.02em] [overflow-wrap:anywhere]">
            <span data-reveal style={d(90)} className="inline-block">
              {plain}
            </span>
            {accent ? (
              <>
                {" "}
                <em data-reveal style={d(200)} className="inline-block text-accent italic">
                  {accent}
                </em>
              </>
            ) : null}
          </h1>

          <span className="draw-line block w-full max-w-[24rem]" style={d(360)} />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-10">
            <p
              data-reveal
              style={d(440)}
              className="shrink-0 font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-muted lg:max-w-[13rem]"
            >
              {profile.role}
            </p>
            <p
              data-reveal
              style={d(520)}
              className="max-w-md text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed text-ink/80"
            >
              {profile.tagline}
            </p>
          </div>
        </div>

        <div data-reveal style={d(300)} className="hidden lg:block">
          <ArchPortrait
            src={profile.photo}
            alt={`${profile.name} — portrait`}
            initials={profile.initials}
            caption={profile.name}
            className="w-full"
          />
        </div>
      </div>

      {/* Нижний ряд: соцсети + подсказка скролла */}
      <div className="flex items-end justify-between gap-6">
        <ul
          data-reveal
          style={d(600)}
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {socials.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="link-underline font-mono text-[11px] uppercase tracking-[0.22em]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <span
          data-reveal
          style={d(680)}
          className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-muted sm:flex"
        >
          <span>Scroll</span>
          <span className="animate-nudge text-accent">→</span>
        </span>
      </div>
    </div>
  );
}

