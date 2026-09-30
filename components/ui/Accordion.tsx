'use client';

import { useState } from 'react';
import type { Faq } from '@/content/products';

type Props = {
  items: Faq[];
  /** Index open on first render. -1 opens none. */
  defaultOpen?: number;
  className?: string;
};

export default function Accordion({ items, defaultOpen = 0, className = '' }: Props) {
  const [open, setOpen] = useState<number>(defaultOpen);

  return (
    <div className={['mx-auto w-full max-w-3xl', className].join(' ')}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.q}
            className="border-b border-espresso/10 first:border-t first:border-espresso/10"
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-coral"
              >
                <span className="font-display text-[17px] font-semibold leading-snug sm:text-[19px]">
                  {item.q}
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
                <div className="space-y-3 pb-7 pr-10">
                  {item.a.map((paragraph) => (
                    <p key={paragraph} className="text-[15px] leading-relaxed text-espresso/70">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
