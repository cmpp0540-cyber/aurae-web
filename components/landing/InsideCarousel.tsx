'use client';

import { LOOP_MIN, railCopies, useRail } from '@/lib/use-rail';
import { INSIDE_COMPARISONS, LANDING } from '@/content/site';
import { accentFor } from '@/lib/accents';
import Reveal from '@/components/ui/Reveal';

/**
 * The formula comparison, one card per product.
 *
 * This was two tall columns — every Aurae formula stacked on the left, every
 * drugstore equivalent on the right. Readers had to count rows to work out
 * which line answered which, so the contrast the section exists to make was
 * the one thing it did not show. A card puts the pair side by side with
 * nothing between them.
 *
 * Same mechanics as the other two rails: native overflow with CSS scroll
 * snap, so swipe, trackpad and keyboard work without a library, and the
 * arrows are a mouse-only enhancement.
 */
export default function InsideCarousel() {
  const loop = INSIDE_COMPARISONS.length >= LOOP_MIN;
  const cards = railCopies(INSIDE_COMPARISONS, loop);
  const { trackRef, step, atStart, atEnd } = useRail({ count: INSIDE_COMPARISONS.length, loop });

  const arrow =
    'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full ' +
    'border border-espresso/10 bg-cream text-espresso shadow-[0_4px_18px_rgba(58,46,42,0.14)] ' +
    'transition-all duration-300 ease-aurae hover:bg-ivory hover:text-coral ' +
    'disabled:pointer-events-none disabled:opacity-0 lg:grid';

  const total = String(INSIDE_COMPARISONS.length).padStart(2, '0');

  return (
    <div className="relative mt-9">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={atStart}
        aria-label="Previous formulas"
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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[13%] py-3 -my-3 [scrollbar-width:none] sm:gap-6 sm:px-0 [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Aurae formulas compared with typical drugstore brands"
      >
        {cards.map(({ item, copy }, index) => {
          const accent = accentFor(item.accent);
          return (
            <li
              key={`${item.product}-${copy}`}
              // Centred on a phone, with the neighbours peeking.
              //
              // The width is `w-full` and the padding lives on the track:
              // percentage padding shrinks the flex container's content box,
              // so 13% either side leaves the card at 74% of the scrollport
              // and lets the first and last cards reach the centre. Setting
              // the card to a percentage AND padding the track would compound
              // the two and shrink it twice.
              //
              // From `sm` up two or three cards fill the row, so the padding
              // and the centre snap both come off.
              //
              // `[&>*]:h-full` evens the cards out: a grid cell stretched them
              // on its own, a flex child does not.
              className="w-full flex-[0_0_auto] snap-center [&>*]:h-full sm:w-[calc((100%-24px)/2)] sm:snap-start lg:w-[calc((100%-48px)/3)]"
            >
              <Reveal
                as="article"
                delay={(index % INSIDE_COMPARISONS.length) * 70}
                className="flex flex-col overflow-hidden rounded-2xl bg-cream shadow-[0_2px_20px_rgba(58,46,42,0.05)]"
              >
                {/* The product's own colour, as a hairline across the top.
                    It is the only colour on the card, which is what keeps
                    eight of these from turning into a paint chart. */}
                <span aria-hidden className={`block h-[3px] w-full ${accent.imageGradient}`} />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-[23px] font-bold leading-none tracking-[0.01em]">
                      {item.product}
                    </h3>
                    <span className="flex-shrink-0 text-[10px] font-medium tracking-[0.18em] text-espresso/30">
                      {String((index % INSIDE_COMPARISONS.length) + 1).padStart(2, '0')} / {total}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-espresso/45">
                    {item.subject}
                  </p>

                  {/* Ours */}
                  <p className="mt-5 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.2em] text-coral">
                    <span aria-hidden className={`block h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                    {LANDING.inside.labels.us}
                  </p>
                  <p className="mt-2.5 text-[13px] leading-[1.6] text-espresso/85">{item.us}</p>

                  {/*
                    Theirs is pinned to the bottom, so the recessed panels line
                    up across the rail however long the copy above them runs.
                    It is set smaller, lighter and on a tinted ground: the
                    hierarchy makes the point before a word is read.
                  */}
                  <div className="mt-auto pt-5">
                    <div className="rounded-xl bg-blush/40 px-4 py-3.5">
                      <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-espresso">
                        <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-espresso/70" />
                        {LANDING.inside.labels.them}
                      </p>
                      <p className="mt-2 text-[12px] leading-[1.55] text-espresso/50">
                        {item.them}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => step(1)}
        disabled={atEnd}
        aria-label="More formulas"
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
