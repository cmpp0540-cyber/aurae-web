'use client';

import { createElement, useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger in ms, for grids of cards. */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'ol' | 'ul';
};

/**
 * Failsafe window: if IntersectionObserver has not reported by now, show the
 * content anyway. Some embedded webviews and screenshot renderers never run
 * observer callbacks, and content must never be permanently invisible.
 */
const FAILSAFE_MS = 900;

/**
 * Subtle scroll-triggered fade-up.
 *
 * Reveal is progressive enhancement only: the markup is always in the DOM, a
 * <noscript> rule in the root layout un-hides it without JS, motion is
 * neutralised under prefers-reduced-motion, and the timer above guarantees the
 * page is readable even where the observer never fires.
 */
export default function Reveal({ children, className = '', delay = 0, as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setShown(true);
    };

    const failsafe = window.setTimeout(show, FAILSAFE_MS);

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      show();
      return () => window.clearTimeout(failsafe);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            show();
          }
        }
      },
      // threshold 0 so a block taller than the viewport can never get stuck
      // below the ratio and stay invisible; rootMargin supplies the delay.
      { rootMargin: '0px 0px -60px 0px', threshold: 0 },
    );

    observer.observe(node);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return createElement(
    as,
    {
      ref,
      className: [shown ? 'animate-fade-up' : 'opacity-0', className].join(' '),
      style: shown && delay ? { animationDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}
