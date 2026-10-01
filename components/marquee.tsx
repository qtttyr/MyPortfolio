import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Бесконечная бегущая строка (пауза при наведении). */
export function Marquee({ items, className }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={cn("marquee", className)} aria-hidden="true">
      <div className="marquee__track">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-6 pr-6 font-mono text-[11px] uppercase tracking-[0.28em] text-muted"
          >
            <span>{item}</span>
            <span className="h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
