'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SITE } from '@/content/site';
import { useCart } from '@/components/cart/CartProvider';

/**
 * The sticky masthead.
 *
 * Petal pink (#FFD9E3), not cream and not espresso. Cream made the header and
 * the hero read as one undifferentiated pale block; espresso stacked a second
 * dark band under the black announcement strip. Pink separates from both, and
 * the hard black strip directly above it is what keeps it from reading sweet.
 *
 * THE WORDMARK IS BLACK, NOT CORAL, and that is the one thing here worth not
 * undoing. Coral on this pink is 2.05:1 — it fails the 3:1 minimum for large
 * text, and the two colours are close enough in tone that the logo muddies
 * into the background on a phone outdoors. Black is 17.1:1 and matches the
 * strip above. Worth knowing: coral on the old cream header was already only
 * 2.59:1, so this was never passing; the pink only made it visible.
 *
 * The nav sits in espresso rather than black, a step down in weight from the
 * wordmark, which is the hierarchy you want. Hover goes to black, not coral,
 * for the same contrast reason.
 */
export default function Header() {
  const { count, open, hydrated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-[120] bg-petal/95 text-espresso backdrop-blur transition-shadow duration-300',
        scrolled
          ? 'shadow-[0_1px_0_rgba(58,46,42,0.10),0_10px_30px_rgba(58,46,42,0.07)]'
          : 'border-b border-espresso/[0.10]',
      ].join(' ')}
    >
      <div className="shell flex items-center justify-between py-4 lg:py-5">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="font-display text-[30px] font-bold leading-none tracking-[0.01em] text-black lg:text-[34px]"
        >
          aurae
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {SITE.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] font-medium uppercase tracking-[0.15em] text-espresso/85 transition-colors duration-300 hover:text-black"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={open}
            aria-label={`Open cart${count ? `, ${count} items` : ''}`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-espresso transition-colors duration-300 hover:bg-white/60"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M6 8h12l-1 11.5a1.5 1.5 0 0 1-1.5 1.4h-8A1.5 1.5 0 0 1 6 19.5z" />
              <path d="M9.2 8V6.6a2.8 2.8 0 0 1 5.6 0V8" />
            </svg>
            {hydrated && count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-coral px-1 text-[10px] font-bold text-cream">
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 hover:bg-white/60 lg:hidden"
          >
            <span className="relative block h-[11px] w-[19px]" aria-hidden>
              <span
                className={[
                  'absolute left-0 block h-[1.5px] w-full bg-espresso transition-all duration-300 ease-aurae',
                  menuOpen ? 'top-[5px] rotate-45' : 'top-0',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-0 block h-[1.5px] w-full bg-espresso transition-all duration-300 ease-aurae',
                  menuOpen ? 'top-[5px] -rotate-45' : 'top-[10px]',
                ].join(' ')}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={[
          'grid overflow-hidden border-espresso/[0.10] transition-all duration-300 ease-aurae lg:hidden',
          menuOpen ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]',
        ].join(' ')}
      >
        <nav aria-label="Mobile" className="overflow-hidden">
          <ul className="shell flex flex-col py-2">
            {SITE.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-espresso/[0.08] py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-espresso/85 last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
