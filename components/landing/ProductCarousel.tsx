'use client';

import { LOOP_MIN, railCopies, useRail } from '@/lib/use-rail';
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
  const loop = products.length >= LOOP_MIN;
  const cards = railCopies(products, loop);
  const { trackRef, step, atStart, atEnd } = useRail({ count: products.length, loop });

  const arrow =
    'absolute top-[28%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full ' +
    'border border-espresso/10 bg-cream text-espresso shadow-[0_4px_18px_rgba(58,46,42,0.14)] ' +
    'transition-all duration-300 ease-aurae hover:bg-ivory hover:text-coral ' +
    'disabled:pointer-events-none disabled:opacity-0 lg:grid';

  return (
    // `id` is the anchor the review section's button jumps to, so it lands on
    // the products themselves rather than the top of the section. scroll-mt
    // keeps the first row clear of the sticky header.
    <div id="products" className="relative mt-9 scroll-mt-28">
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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[10%] py-3 -my-3 [scrollbar-width:none] sm:gap-6 sm:px-0 [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Aurae products"
      >
        {cards.map(({ item, copy }, index) => (
          <li
            key={`${item.id}-${copy}`}
            // Centred on a phone, with the neighbours peeking.
            //
            // The width is `w-full` and the padding lives on the track:
            // percentage padding shrinks the flex container's content box, so
            // 10% either side leaves the card at 80% of the scrollport and
            // lets the first and last cards reach the centre — wider than the
            // other two rails, because a product card carries an image, a
            // name, a price and a button. Setting the card
            // to a percentage AND padding the track would compound the two and
            // shrink it twice.
            //
            // From `sm` up the cards fill the row, so the padding and the
            // centre snap both come off.
            //
            // `[&>*]:h-full` stretches the card to the tallest in the row.
            // A grid cell did this on its own; a flex child does not.
            className="w-full flex-[0_0_auto] snap-center [&>*]:h-full sm:w-[calc((100%-24px)/2)] sm:snap-start lg:w-[calc((100%-48px)/3)] xl:w-[calc((100%-72px)/4)]"
          >
            <ProductCard product={item} index={index % products.length} />
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
