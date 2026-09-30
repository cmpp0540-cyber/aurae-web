'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SITE } from '@/content/site';
import { useCart } from '@/components/cart/CartProvider';

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
        'sticky top-0 z-[120] bg-cream/95 backdrop-blur transition-shadow duration-300',
        scrolled ? 'shadow-[0_1px_0_rgba(58,46,42,0.08),0_10px_30px_rgba(58,46,42,0.05)]' : 'border-b border-espresso/[0.08]',
      ].join(' ')}
    >
      <div className="shell flex items-center justify-between py-4 lg:py-5">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="font-display text-[30px] font-bold leading-none tracking-[0.01em] text-coral lg:text-[34px]"
        >
          aurae
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {SITE.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-coral"
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
            className="relative grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 hover:bg-blush"
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
            className="grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 hover:bg-blush lg:hidden"
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
          'grid overflow-hidden border-espresso/[0.08] transition-all duration-300 ease-aurae lg:hidden',
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
                  className="block border-b border-espresso/[0.06] py-4 text-[13px] font-medium uppercase tracking-[0.15em] last:border-0"
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
