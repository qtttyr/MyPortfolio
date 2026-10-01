"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Мягкое «магнитное» доведение: быстрый разгон, бархатное торможение. */
function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isCoarsePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches
  );
}

interface Options {
  /** Сколько панелей на треке. */
  count: number;
}

/**
 * Горизонтальный скролл-движок.
 *
 *  • Тач-устройства — нативный свайп + CSS scroll-snap: браузер сам доводит
 *    до секции, максимально нативно и без рывков.
 *  • Мышь/тачпад     — вертикальное колесо превращается в горизонтальное
 *    движение с инерцией, а когда скролл «успокаивается», позиция ВСЕГДА
 *    плавно доводится ровно до ближайшей секции (магнитный снап).
 *  • Стрелки / PageUp-Down / Home / End — переходы тем же мягким доведением.
 *  • Вложенные вертикальные списки продолжают крутиться колесом.
 */
export function useHorizontalScroll({ count }: Options) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const lerpTargetRef = useRef(0); // пиксельная цель инерции (колесо)
  const lerpRafRef = useRef<number | null>(null);

  const tweenRafRef = useRef<number | null>(null);

  const settleRef = useRef<number | null>(null);

  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const activeRef = useRef(0);

  const stopLerp = useCallback(() => {
    if (lerpRafRef.current != null) {
      cancelAnimationFrame(lerpRafRef.current);
      lerpRafRef.current = null;
    }
  }, []);

  const stopTween = useCallback(() => {
    if (tweenRafRef.current != null) {
      cancelAnimationFrame(tweenRafRef.current);
      tweenRafRef.current = null;
    }
  }, []);

  /** Плавно доехать до позиции: ease-out, длительность зависит от дистанции. */
  const tweenTo = useCallback(
    (to: number) => {
      const el = trackRef.current;
      if (!el) return;

      const from = el.scrollLeft;
      stopLerp();
      stopTween();

      if (Math.abs(to - from) < 1 || prefersReduced()) {
        el.scrollLeft = to;
        lerpTargetRef.current = to;
        return;
      }

      const dist = Math.abs(to - from);
      const dur = clamp(380 + dist * 0.35, 380, 1050);
      const start = performance.now();

      function tick(now: number) {
        const t = Math.min(1, (now - start) / dur);
        el!.scrollLeft = from + (to - from) * easeOutQuart(t);
        if (t >= 1) {
          el!.scrollLeft = to;
          lerpTargetRef.current = to;
          tweenRafRef.current = null;
          return;
        }
        tweenRafRef.current = requestAnimationFrame(tick);
      }

      tweenRafRef.current = requestAnimationFrame(tick);
    },
    [stopLerp, stopTween],
  );

  /** Перейти к секции по индексу. */
  const goTo = useCallback(
    (index: number, smooth = true) => {
      const el = trackRef.current;
      if (!el) return;
      const width = el.clientWidth || 1;
      const max = Math.max(0, el.scrollWidth - width);
      const target = clamp(index * width, 0, max);
      if (!smooth) {
        stopLerp();
        stopTween();
        el.scrollLeft = target;
        lerpTargetRef.current = target;
        return;
      }
      tweenTo(target);
    },
    [stopLerp, stopTween, tweenTo],
  );

  /** Довести до ближайшей секции — гарантия «встать ровно». */
  const snapToNearest = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const width = el.clientWidth || 1;
    const max = Math.max(0, el.scrollWidth - width);
    const index = clamp(Math.round(el.scrollLeft / width), 0, count - 1);
    const target = clamp(index * width, 0, max);
    if (Math.abs(target - el.scrollLeft) < 1.5) {
      el.scrollLeft = target;
      lerpTargetRef.current = target;
      return;
    }
    tweenTo(target);
  }, [count, tweenTo]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // На тач-устройствах снапом заведует CSS — JS-доводку не вмешиваем.
    const coarse = isCoarsePointer();
    let frameQueued = false;

    const measure = () => {
      frameQueued = false;
      const width = el.clientWidth || 1;
      const max = Math.max(1, el.scrollWidth - width);
      setProgress(clamp(el.scrollLeft / max, 0, 1));
      const index = clamp(Math.round(el.scrollLeft / width), 0, count - 1);
      activeRef.current = index;
      setActive((prev) => (prev === index ? prev : index));
    };

    /** Через короткую паузу после скролла — мягко доводим до секции. */
    const scheduleSettle = () => {
      if (coarse) return;
      if (settleRef.current != null) window.clearTimeout(settleRef.current);
      settleRef.current = window.setTimeout(() => {
        settleRef.current = null;
        if (lerpRafRef.current != null || tweenRafRef.current != null) return;
        snapToNearest();
      }, 130);
    };

    const lerp = () => {
      const current = el.scrollLeft;
      const target = lerpTargetRef.current;
      const diff = target - current;
      if (Math.abs(diff) < 0.4) {
        el.scrollLeft = target;
        lerpRafRef.current = null;
        return;
      }
      el.scrollLeft = current + diff * 0.13;
      lerpRafRef.current = requestAnimationFrame(lerp);
    };

    const onScroll = () => {
      if (lerpRafRef.current == null && tweenRafRef.current == null) {
        lerpTargetRef.current = el.scrollLeft;
      }
      if (!frameQueued) {
        frameQueued = true;
        requestAnimationFrame(measure);
      }
      scheduleSettle();
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // не мешаем зуму
      // горизонтальный трекпад — отдаём нативному скроллу + доведём снапом
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        scheduleSettle();
        return;
      }

      // вложенный вертикальный список: крутим его, пока не дойдём до края
      const scrollable = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-scroll-y]",
      );
      if (scrollable && scrollable.scrollHeight > scrollable.clientHeight + 1) {
        const atTop = scrollable.scrollTop <= 0;
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;
        const goingUp = event.deltaY < 0;
        if ((!goingUp && !atBottom) || (goingUp && !atTop)) return;
      }

      event.preventDefault();

      // если идёт доводка — отпускаем её и продолжаем с текущей точки
      if (tweenRafRef.current != null) {
        stopTween();
        lerpTargetRef.current = el.scrollLeft;
      }

      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 120 : 1;
      lerpTargetRef.current = clamp(
        lerpTargetRef.current + event.deltaY * unit * 1.15,
        0,
        max,
      );

      if (prefersReduced()) {
        el.scrollLeft = lerpTargetRef.current;
        scheduleSettle();
        return;
      }
      if (lerpRafRef.current == null) {
        lerpRafRef.current = requestAnimationFrame(lerp);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const current = activeRef.current;
      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
          event.preventDefault();
          goTo(Math.min(current + 1, count - 1));
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          goTo(Math.max(current - 1, 0));
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(count - 1);
          break;
      }
    };

    const observer = new ResizeObserver(() => {
      goTo(Math.round(el.scrollLeft / (el.clientWidth || 1)), false);
    });

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    observer.observe(el);
    measure();

    // если браузер восстановил позицию «между секциями» — встаём ровно
    const boot = requestAnimationFrame(() => {
      goTo(Math.round(el.scrollLeft / (el.clientWidth || 1)), false);
    });

    return () => {
      cancelAnimationFrame(boot);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      observer.disconnect();
      stopLerp();
      stopTween();
      if (settleRef.current != null) window.clearTimeout(settleRef.current);
    };
  }, [count, goTo, snapToNearest, stopLerp, stopTween]);

  return { trackRef, active, progress, goTo };
}
