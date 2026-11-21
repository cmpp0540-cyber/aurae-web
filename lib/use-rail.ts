'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
  /** How many real items the rail holds, not counting the copies. */
  count: number;
  /** Wrap around for ever instead of stopping at the ends. */
  loop: boolean;
};

/**
 * Scroll mechanics shared by the three card rails.
 *
 * Looping works the way it has to with native scroll snap: the caller renders
 * the list three times and this keeps the viewer on the middle copy. When a
 * scroll ends outside it, scrollLeft jumps by exactly one copy's width —
 * which puts an identical card in an identical place, so there is nothing to
 * see. The rail never reaches an end, so the arrows are never disabled.
 *
 * Two details carry the whole thing:
 *
 * 1. The jump waits for the scroll to settle. Writing scrollLeft during a
 *    smooth scroll cancels the animation and re-fires snapping, which reads
 *    as a stutter exactly when the viewer is paying attention.
 *
 * 2. A copy's width is measured, never derived. `scrollWidth / 3` is wrong:
 *    the track's padding is counted once and there is one gap fewer than
 *    there are cards, so the thirds do not line up with the card boundaries
 *    and the rail drifts a little further out of true on every wrap.
 */
export function useRail({ count, loop }: Options) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const settle = useRef<number | null>(null);
  const [atStart, setAtStart] = useState(!loop);
  const [atEnd, setAtEnd] = useState(false);

  const pitch = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.children.length <= count) return 0;
    const first = el.children[0] as HTMLElement;
    const sameCardNextCopy = el.children[count] as HTMLElement;
    return sameCardNextCopy.offsetLeft - first.offsetLeft;
  }, [count]);

  const toMiddleCopy = useCallback(() => {
    const el = trackRef.current;
    const p = pitch();
    if (!el || p <= 0) return;
    el.scrollLeft = p;
  }, [pitch]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Too few cards to hide the seam: behave like an ordinary rail and let
    // the arrows grey out at the ends.
    if (!loop) {
      const sync = () => {
        const max = el.scrollWidth - el.clientWidth;
        // 1px of slack: sub-pixel layout rarely hits max exactly.
        setAtStart(el.scrollLeft <= 1);
        setAtEnd(el.scrollLeft >= max - 1);
      };
      sync();
      el.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      return () => {
        el.removeEventListener('scroll', sync);
        window.removeEventListener('resize', sync);
      };
    }

    // After layout, so the cards have real widths to measure.
    const frame = requestAnimationFrame(toMiddleCopy);

    const onScroll = () => {
      if (settle.current) window.clearTimeout(settle.current);
      settle.current = window.setTimeout(() => {
        const p = pitch();
        if (p <= 0) return;
        if (el.scrollLeft < p * 0.5) el.scrollLeft += p;
        else if (el.scrollLeft > p * 1.5) el.scrollLeft -= p;
      }, 140);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', toMiddleCopy);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', toMiddleCopy);
      if (settle.current) window.clearTimeout(settle.current);
    };
  }, [loop, pitch, toMiddleCopy]);

  const step = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
    // One card at a time, so nothing is ever skipped past unseen.
    const amount = first ? first.offsetWidth + gap : el.clientWidth * 0.9;
    el.scrollBy({ left: amount * direction, behavior: 'smooth' });
  }, []);

  return { trackRef, step, atStart, atEnd };
}

/**
 * Below this many cards the copies would be visible side by side on a wide
 * screen, which looks like a bug rather than a loop.
 */
export const LOOP_MIN = 5;

/** The list, repeated for a looping rail. */
export function railCopies<T>(items: T[], loop: boolean): { item: T; copy: number }[] {
  const copies = loop ? 3 : 1;
  return Array.from({ length: copies }, (_, copy) => items.map((item) => ({ item, copy }))).flat();
}
