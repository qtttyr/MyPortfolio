import { stack } from "@/content";
import { Marquee } from "@/components/marquee";
import type { CSSVars } from "@/lib/cn";

const d = (ms: number): CSSVars => ({ "--d": ms });

export function Stack() {
  const all = stack.flatMap((group) => group.items);
  // В бегущую строку берём по паре «подписей» из каждой группы —
  // так строка показывает весь спектр и остаётся лёгкой.
  const marqueeItems = stack.flatMap((group) => group.items.slice(0, 2));

  return (
    <div className="flex h-full min-h-0 flex-col gap-6">
      <div
        data-reveal
        style={d(0)}
        className="flex items-baseline justify-between gap-4"
      >
        <h2 className="font-display text-[clamp(1.75rem,4.4vw,3.25rem)] leading-none">
          Tool <em className="text-accent italic">stack</em>
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
          {String(all.length).padStart(2, "0")} skills
        </span>
      </div>

      <div
        data-scroll-y=""
        className="no-scrollbar grid min-h-0 flex-1 content-start gap-x-10 gap-y-8 overflow-y-auto overscroll-contain sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {stack.map((group, groupIndex) => (
          <div key={group.label} data-reveal style={d(120 + groupIndex * 70)}>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase leading-snug tracking-[0.2em] text-muted">
              <span aria-hidden className="mt-px h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span className="text-ink/70">{group.label}</span>
            </div>
            <ul className="mt-4">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-2 border-b border-line py-2 text-[clamp(0.95rem,1.3vw,1.1rem)] leading-snug"
                >
                  <span className="h-px w-0 bg-accent transition-all duration-500 group-hover:w-4" />
                  <span className="transition-colors duration-300 group-hover:text-accent">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div data-reveal style={d(320)} className="shrink-0">
        <Marquee items={marqueeItems} />
      </div>
    </div>
  );
}
