'use client';

import { useState } from 'react';
import { SCIENCE_CARDS } from '@/content/site';

/**
 * The nine ingredients, as an accordion.
 *
 * This was a 3x3 grid of cards — about 1,100px down a phone, the longest
 * stretch on the page — and briefly a carousel, which was shorter but hid
 * the one thing the section exists to prove. Nobody reads nine ingredient
 * write-ups; what persuades is seeing that there ARE nine, each with a
 * figure attached. A carousel shows one at a time and buries the count.
 *
 * So every row stays shut and carries its own evidence: the name and the
 * number. The write-up is there for whoever wants it, one tap away. Closed,
 * the whole section is roughly 700px and the argument is already made.
 *
 * Deliberately not the shared `Accordion`: that one takes {q, a[]} and has
 * nowhere to put a glyph or a figure. The borders, the rotating plus and
 * the grid-rows transition are copied from it on purpose, so the two read
 * as the same pattern — if you restyle one, restyle the other.
 */
/**
 * Rows open on first render. The three delivery-and-dose cards carry the
 * argument, so they are shown rather than hidden behind a tap.
 */
const OPEN_BY_DEFAULT = [0, 1, 2];

export default function ScienceAccordion() {
  // A set, not a single index: with three rows already open, one-at-a-time
  // would snap two of them shut the moment anyone touched a third.
  const [open, setOpen] = useState<Set<number>>(() => new Set(OPEN_BY_DEFAULT));

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(index)) next.add(index);
      return next;
    });

  return (
    <div className="mx-auto mt-9 w-full max-w-3xl">
      {SCIENCE_CARDS.map((card, index) => {
        const isOpen = open.has(index);
        return (
          <div
            key={card.title}
            className="border-b border-espresso/10 first:border-t first:border-espresso/10"
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-5 py-5 text-left transition-colors duration-300 hover:text-coral"
              >
                <span aria-hidden className="mt-0.5 flex-shrink-0 text-[18px] leading-none text-coral">
                  {card.glyph}
                </span>

                <span className="flex-1">
                  <span className="block font-display text-[17px] font-semibold leading-snug sm:text-[18px]">
                    {card.title}
                  </span>
                  {/* The figure rides on the closed row: it is the part that
                      does the convincing, and most visitors never open one. */}
                  <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-coral">
                    {card.stat}
                    <span className="font-normal text-espresso/45"> · {card.statLabel}</span>
                  </span>
                </span>

                <span
                  aria-hidden
                  className={[
                    'mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full text-[18px] leading-none transition-all duration-300 ease-aurae',
                    isOpen ? 'rotate-45 bg-coral text-cream' : 'bg-blush text-coral',
                  ].join(' ')}
                >
                  +
                </span>
              </button>
            </h3>

            <div
              className={[
                'grid transition-all duration-300 ease-aurae',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              ].join(' ')}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pl-8 pr-10 text-[14px] leading-relaxed text-espresso/70">
                  {card.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
