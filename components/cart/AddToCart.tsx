'use client';

import { useState } from 'react';
import type { AuraeProduct } from '@/lib/types';
import { useCart } from './CartProvider';

type Props = {
  product: AuraeProduct;
  /** Short line shown under the title in the drawer. */
  subtitle?: string;
  label?: string;
  variant?: 'primary' | 'dark' | 'sun';
  className?: string;
  /** Show a −/+ quantity stepper next to the button. */
  withQuantity?: boolean;
};

const STYLES = {
  primary: 'btn-primary',
  dark: 'btn-dark',
  sun: 'btn-sun',
} as const;

export default function AddToCart({
  product,
  subtitle,
  label = 'Add to Cart',
  variant = 'primary',
  className = '',
  withQuantity = false,
}: Props) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);

  const chosen = product.variants[0];
  const soldOut = chosen ? !chosen.availableForSale : false;

  if (!chosen) {
    return (
      <button type="button" disabled className={[STYLES[variant], className].join(' ')}>
        Unavailable
      </button>
    );
  }

  const handleAdd = () =>
    add(
      {
        variantId: chosen.id,
        numericVariantId: chosen.numericId,
        productHandle: product.handle,
        title: product.title,
        subtitle: subtitle ?? product.metafields.cardIngredient ?? product.productType,
        image: product.images[0]?.url ?? null,
        price: chosen.price,
        isBundle: product.isBundle,
      },
      quantity,
    );

  return (
    <div className={['flex flex-wrap items-stretch gap-3', className].join(' ')}>
      {withQuantity ? (
        <div className="flex items-center rounded border border-espresso/15">
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            aria-label="Decrease quantity"
            className="grid h-full w-11 place-items-center text-[18px] leading-none text-espresso/70 transition-colors hover:text-coral"
          >
            −
          </button>
          <span className="w-8 text-center text-[14px] font-semibold tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.min(12, current + 1))}
            aria-label="Increase quantity"
            className="grid h-full w-11 place-items-center text-[18px] leading-none text-espresso/70 transition-colors hover:text-coral"
          >
            +
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleAdd}
        disabled={soldOut}
        className={[STYLES[variant], withQuantity ? 'flex-1' : ''].join(' ')}
      >
        {soldOut ? 'Sold out' : label}
      </button>
    </div>
  );
}
