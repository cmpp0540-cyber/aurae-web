'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { formatPrice, subscribeLabel, subscribePrice } from '@/lib/format';
import type { AuraeProduct } from '@/lib/types';

type Props = {
  product: AuraeProduct;
  subtitle?: string;
};

/**
 * Price + Subscribe & Save toggle + quantity + Add to Cart.
 *
 * Shopify selling plans are not enabled on this store yet, so choosing
 * "Subscribe" shows the discounted price and tags the cart line; the hosted
 * checkout is where the subscription contract gets applied once a
 * subscriptions app is installed.
 */
export default function PurchasePanel({ product, subtitle }: Props) {
  const { add } = useCart();
  const [mode, setMode] = useState<'once' | 'subscribe'>('once');
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants[0];
  const soldOut = variant ? !variant.availableForSale : true;
  const unitPrice = mode === 'subscribe' ? subscribePrice(product.price) : product.price;

  const handleAdd = () => {
    if (!variant) return;
    add(
      {
        variantId: variant.id,
        numericVariantId: variant.numericId,
        productHandle: product.handle,
        title: product.title,
        subtitle:
          mode === 'subscribe'
            ? `Subscribe & Save ${subscribeLabel()}`
            : (subtitle ?? product.metafields.cardIngredient ?? product.productType),
        image: product.images[0]?.url ?? null,
        price: unitPrice,
        isBundle: product.isBundle,
      },
      quantity,
    );
  };

  return (
    <div className="mt-8">
      {/* Purchase mode */}
      <div className="grid gap-3 sm:grid-cols-2">
        {(
          [
            { key: 'once', label: 'One-time purchase', price: product.price, note: null },
            {
              key: 'subscribe',
              label: 'Subscribe & Save',
              price: subscribePrice(product.price),
              note: `Save ${subscribeLabel()} · free shipping · cancel anytime`,
            },
          ] as const
        ).map((option) => {
          const selected = mode === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setMode(option.key)}
              aria-pressed={selected}
              className={[
                'rounded-xl border p-4 text-left transition-all duration-300 ease-aurae',
                selected
                  ? 'border-coral bg-blush/40 shadow-soft'
                  : 'border-espresso/12 bg-cream hover:border-coral/40',
              ].join(' ')}
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={[
                    'grid h-4 w-4 flex-shrink-0 place-items-center rounded-full border',
                    selected ? 'border-coral' : 'border-espresso/25',
                  ].join(' ')}
                >
                  <span
                    className={['h-2 w-2 rounded-full', selected ? 'bg-coral' : 'bg-transparent'].join(
                      ' ',
                    )}
                  />
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.1em]">
                  {option.label}
                </span>
              </span>
              <span className="mt-2 block font-display text-[22px] font-bold text-coral">
                {formatPrice(option.price, product.currency)}
              </span>
              {option.note ? (
                <span className="mt-1 block text-[11px] leading-snug text-espresso/55">
                  {option.note}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Quantity + add */}
      <div className="mt-5 flex flex-wrap items-stretch gap-3">
        <div className="flex items-center rounded border border-espresso/15">
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            aria-label="Decrease quantity"
            className="grid h-full w-12 place-items-center text-[18px] leading-none text-espresso/70 transition-colors hover:text-coral"
          >
            −
          </button>
          <span className="w-8 text-center text-[14px] font-semibold tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.min(12, current + 1))}
            aria-label="Increase quantity"
            className="grid h-full w-12 place-items-center text-[18px] leading-none text-espresso/70 transition-colors hover:text-coral"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          className="btn-primary flex-1"
        >
          {soldOut ? 'Sold out' : `Add to Cart · ${formatPrice(unitPrice * quantity, product.currency)}`}
        </button>
      </div>

      <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-espresso/50">
        ✦ Free shipping over $50 · 30-day money-back guarantee
      </p>
    </div>
  );
}
