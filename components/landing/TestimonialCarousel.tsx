'use client';

import { LOOP_MIN, railCopies, useRail } from '@/lib/use-rail';
import { LANDING_TESTIMONIALS } from '@/content/site';
import { accentFor } from '@/lib/accents';
import Reveal from '@/components/ui/Reveal';
import Stars from '@/components/ui/Stars';

/**
 * The review rail.
 *
 * Same mechanics as the product carousel: native overflow with CSS scroll
 * snap, so swipe, trackpad and keyboard all work without a library, and the
 * arrows are an enhancement for mouse users only.
 *
 * Three across at most — these are paragraphs, not product shots, and a
 * fourth column squeezes the lines too narrow to read comfortably.
 */
export default function TestimonialCarousel() {
  const loop = LANDING_TESTIMONIALS.length >= LOOP_MIN;
  const cards = railCopies(LANDING_TESTIMONIALS, loop);
  const { trackRef, step, atStart, atEnd } = useRail({ count: LANDING_TESTIMONIALS.length, loop });

  const arrow =
    'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full ' +
    'border border-espresso/10 bg-cream text-espresso shadow-[0_4px_18px_rgba(58,46,42,0.14)] ' +
    'transition-all duration-300 ease-aurae hover:bg-ivory hover:text-coral ' +
    'disabled:pointer-events-none disabled:opacity-0 lg:grid';

  return (
    <div className="relative mt-9">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={atStart}
        aria-label="Previous reviews"
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
        aria-label="Customer reviews"
      >
        {cards.map(({ item, copy }, index) => {
          const accent = accentFor(item.accent);
          return (
            <li
              key={`${item.author}-${copy}`}
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
                delay={(index % LANDING_TESTIMONIALS.length) * 70}
                className="flex flex-col rounded-2xl bg-cream p-6 shadow-[0_2px_20px_rgba(58,46,42,0.05)]"
              >
                <span
                  className={[
                    'inline-block self-start rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em]',
                    accent.chip,
                  ].join(' ')}
                >
                  {item.tag}
                </span>
                <Stars count={item.stars} className="mt-3 block" />
                <p className="mt-2.5 font-display text-[17px] font-semibold leading-snug">
                  &ldquo;{item.headline}&rdquo;
                </p>
                <p className="mt-2.5 flex-1 text-[13px] leading-[1.6] text-espresso/70">
                  {item.body}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-espresso/10 pt-3.5">
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-blush font-display text-[14px] font-bold text-coral">
                    {item.author.charAt(0)}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[13px] font-semibold">{item.author}</span>
                    <span className="block text-[11px] text-espresso/50">{item.location}</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-coral">
                    Verified
                  </span>
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
        aria-label="More reviews"
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
