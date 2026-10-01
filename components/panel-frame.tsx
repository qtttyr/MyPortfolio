import { cn } from "@/lib/cn";
import { ThemeControls } from "@/components/theme-controls";
import { Logo } from "@/components/logo";

interface PanelFrameProps {
  index: number;
  total: number;
  label: string;
  active: boolean;
  children: React.ReactNode;
  className?: string;
  /** Клик по знаку — вернуться на первую секцию. */
  onHome?: () => void;
}

/**
 * Единая «рамка» панели: знак, номер и имя секции, справа — кнопки темы
 * и палитры. Через data-active включаются ревилы внутри.
 */
export function PanelFrame({
  index,
  total,
  label,
  active,
  children,
  className,
  onHome,
}: PanelFrameProps) {
  return (
    <section
      data-panel=""
      data-active={active}
      aria-label={label}
      className={cn("panel", className)}
    >
      <div
        className={cn(
          // слева на десктопе оставляем жёлоб под боковую навигацию — она
          // ничего не перекрывает даже когда раскрывает подписи
          "flex h-full w-full flex-col",
          "pl-[clamp(1.25rem,4vw,2.75rem)] pr-[clamp(1.25rem,4vw,2.75rem)]",
          "lg:pr-[clamp(2.5rem,4.5vw,4.5rem)] lg:pl-[10.5rem]",
          "pt-[clamp(1.1rem,2.4vw,1.9rem)] pb-24",
          "lg:pb-[clamp(1.25rem,2.6vw,2.25rem)]",
        )}
      >
        <header className="flex shrink-0 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            {onHome ? (
              <button
                type="button"
                onClick={onHome}
                aria-label="В начало"
                title="В начало"
                className="shrink-0 text-ink/75 transition-colors duration-300 hover:text-accent"
              >
                <Logo />
              </button>
            ) : (
              <Logo className="shrink-0" />
            )}

            <span className="flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              <span className="tabular-nums text-accent">
                {String(index).padStart(2, "0")}
              </span>
              <span className="hidden h-px w-6 bg-line sm:block" />
              <span className="truncate">{label}</span>
              <span className="hidden text-muted/60 sm:inline">
                / {String(total).padStart(2, "0")}
              </span>
            </span>
          </div>

          <ThemeControls />
        </header>

        <div className="relative mt-[clamp(1rem,2.6vw,2.5rem)] min-h-0 flex-1">
          {children}
        </div>
      </div>
    </section>
  );
}
