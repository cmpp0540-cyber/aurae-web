'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AuraeProduct } from '@/lib/types';
import ProductCard from './ProductCard';

/**
 * The product rail.
 *
 * Eight products no longer fit a grid without pushing the page down twice its
 * old length, so they scroll sideways instead: native overflow with CSS scroll
 * snap, which means swipe works on a phone, the trackpad works on a laptop and
 * the keyboard works everywhere — no carousel library, no JS needed for the
 * scrolling itself. The arrows are an enhancement on top for mouse users, and
 * are hidden where a finger does the job.
 *
 * Card widths are calc() rather than round percentages so a whole number of
 * cards lands in view at each breakpoint with the gap accounted for: 4 on a
 * wide screen, 3 on a laptop, 2 on a tablet, and 1 plus a sliver on a phone.
 * That sliver matters — it is what tells someone there is more to the right.
 */
export default function ProductCarousel({ products }: { products: AuraeProduct[] }) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // 1px of slack: sub-pixel layout means scrollLeft rarely hits max exactly.
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
    // One card at a time, so nothing is ever skipped past unseen.
    const amount = first ? first.offsetWidth + gap : el.clientWidth * 0.9;
    el.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  const arrow =
    'absolute top-[28%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full ' +
    'border border-espresso/10 bg-cream text-espresso shadow-[0_4px_18px_rgba(58,46,42,0.14)] ' +
    'transition-all duration-300 ease-aurae hover:bg-ivory hover:text-coral ' +
    'disabled:pointer-events-none disabled:opacity-0 lg:grid';

  return (
    <div className="relative mt-12">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={atStart}
        aria-label="Previous products"
        className={`${arrow} -left-2 xl:-left-5`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M10 13 5 8l5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <ul
        ref={trackRef}
        // py/-my so a card's hover lift and shadow are not clipped by overflow.
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain py-3 -my-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Aurae products"
      >
        {products.map((product, index) => (
          <li
            key={product.id}
            // `[&>*]:h-full` stretches the card to the tallest in the row.
            // A grid cell did this on its own; a flex child does not.
            className="w-[82%] flex-[0_0_auto] snap-start [&>*]:h-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)]"
          >
            <ProductCard product={product} index={index} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => step(1)}
        disabled={atEnd}
        aria-label="More products"
        className={`${arrow} -right-2 xl:-right-5`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="m6 3 5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
