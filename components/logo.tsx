import { cn } from "@/lib/cn";

/**
 * Знак сайта: «арка-M».
 *
 * Две арки складываются в букву M и одновременно повторяют мотив портрета
 * на сайте. В стыке арок — акцентный «клин» (keystone), он же цвет палитры.
 * Геометрия в координатах viewBox 32×32: дуги R5, стойки от y=11 до y=26.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Miras Kustaibek"
      className={cn("h-[18px] w-[18px] text-ink", className)}
    >
      {/* левая стойка → две арки → правая стойка */}
      <path
        d="M6 26V11a5 5 0 0 1 10 0 5 5 0 0 1 10 0v15"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* центральная стойка */}
      <path
        d="M16 11v15"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* клин в стыке арок */}
      <circle cx="16" cy="11" r="1.7" className="fill-accent" />
    </svg>
  );
}
