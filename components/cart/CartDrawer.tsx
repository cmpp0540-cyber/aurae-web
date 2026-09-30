'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/format';
import SmartImage from '@/components/ui/SmartImage';
import { useCart } from './CartProvider';

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartDrawer() {
  const { lines, isOpen, close, subtotal, setQuantity, remove, checkout, isCheckingOut, count } =
    useCart();

  const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <>
      {/* Scrim */}
      <div
        onClick={close}
        aria-hidden
        className={[
          'fixed inset-0 z-[190] bg-espresso/40 backdrop-blur-[2px] transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={[
          'fixed right-0 top-0 z-[200] flex h-full w-full max-w-[420px] flex-col bg-cream shadow-drawer',
          'transition-transform duration-300 ease-aurae',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <header className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <div>
            <p className="u-eyebrow">Your ritual</p>
            <h2 className="font-display text-[22px] font-bold">
              Cart{' '}
              <span className="text-coral">
                {count > 0 ? `(${count})` : ''}
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 text-[18px] leading-none transition-colors duration-300 hover:border-coral hover:text-coral"
          >
            ×
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="animate-twinkle text-[28px] text-coral">✦</span>
            <p className="font-display text-[20px] font-semibold">Your cart is empty.</p>
            <p className="text-[14px] text-espresso/60">
              Five formulas, one intention. Start with the one your skin is asking for.
            </p>
            <button type="button" onClick={close} className="btn-primary mt-2">
              Shop the ritual
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Free-shipping nudge */}
              <div className="mb-6 rounded-xl bg-ivory p-4">
                {toFreeShipping > 0 ? (
                  <p className="text-[12px] leading-relaxed text-espresso/70">
                    You&apos;re{' '}
                    <strong className="text-coral">{formatPrice(toFreeShipping)}</strong> away from
                    free shipping.
                  </p>
                ) : (
                  <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-coral">
                    ✦ Free shipping unlocked
                  </p>
                )}
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-blush">
                  <div
                    className="h-full rounded-full bg-coral transition-all duration-500 ease-aurae"
                    style={{
                      width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <ul className="space-y-5">
                {lines.map((line) => (
                  <li key={line.variantId} className="flex gap-4">
                    <Link
                      href={`${line.isBundle ? '/bundle' : '/product'}/${line.productHandle}`}
                      onClick={close}
                      className="relative h-[86px] w-[86px] flex-shrink-0 overflow-hidden rounded-lg bg-blush"
                    >
                      {line.image ? (
                        <SmartImage
                          src={line.image}
                          alt={line.title}
                          fill
                          quality={60}
                          sizes="86px"
                          shimmer={false}
                          imgClassName="object-cover"
                        />
                      ) : null}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={`${line.isBundle ? '/bundle' : '/product'}/${line.productHandle}`}
                          onClick={close}
                          className="font-display text-[15px] font-semibold leading-snug hover:text-coral"
                        >
                          {line.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(line.variantId)}
                          aria-label={`Remove ${line.title}`}
                          className="text-[11px] uppercase tracking-[0.12em] text-espresso/40 transition-colors hover:text-coral"
                        >
                          Remove
                        </button>
                      </div>

                      {line.subtitle ? (
                        <p className="mt-0.5 line-clamp-2 text-[12px] text-espresso/55">
                          {line.subtitle}
                        </p>
                      ) : null}

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-espresso/15">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.variantId, line.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="grid h-8 w-8 place-items-center text-[16px] leading-none text-espresso/70 transition-colors hover:text-coral"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-[13px] font-semibold tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.variantId, line.quantity + 1)}
                            aria-label="Increase quantity"
                            className="grid h-8 w-8 place-items-center text-[16px] leading-none text-espresso/70 transition-colors hover:text-coral"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-display text-[16px] font-bold text-coral">
                          {formatPrice(line.price * line.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-espresso/10 px-6 py-5">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-[12px] uppercase tracking-[0.15em] text-espresso/60">
                  Subtotal
                </span>
                <span className="font-display text-[26px] font-bold text-coral">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mb-4 text-[11px] text-espresso/50">
                Taxes and shipping calculated at checkout on Shopify.
              </p>
              <button
                type="button"
                onClick={checkout}
                disabled={isCheckingOut}
                className="btn-dark w-full"
              >
                {isCheckingOut ? 'Opening checkout…' : 'Checkout'}
              </button>
              <button
                type="button"
                onClick={close}
                className="mt-3 block w-full text-[11px] uppercase tracking-[0.15em] text-espresso/50 transition-colors hover:text-coral"
              >
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
