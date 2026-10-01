/** Маленький хелпер для склейки className-ов. */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}

/** Кастомные CSS-переменные в style={{}} (напр. --d для задержки ревила). */
export type CSSVars = React.CSSProperties &
  Record<`--${string}`, string | number>;
