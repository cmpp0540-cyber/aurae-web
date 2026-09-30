import Link from 'next/link';
import { PRODUCT_CARD } from '@/content/site';
import { accentFor } from '@/lib/accents';
import { formatPrice, subscribeLabel, subscribePrice } from '@/lib/format';
import type { AuraeProduct } from '@/lib/types';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';

type Props = { product: AuraeProduct; index?: number };

export default function ProductCard({ product, index = 0 }: Props) {
  const card = PRODUCT_CARD[product.handle];
  const accent = accentFor(card?.accent);
  const image = product.images[0];
  const href = `/product/${product.handle}`;

  return (
    <Reveal as="article" delay={index * 70} className="card card-hover group flex flex-col overflow-hidden">
      {/* Shopify featured image on the accent gradient */}
      <Link href={href} className={['relative block aspect-square overflow-hidden', accent.imageGradient].join(' ')}>
        {image ? (
          <SmartImage
            src={image.url}
            alt={image.altText ?? `${product.title} — ${product.productType}`}
            accent={card?.accent}
            fill
            // The first two cards sit above the fold on most screens.
            priority={index < 2}
            quality={74}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
            imgClassName="object-cover transition-transform duration-700 ease-aurae group-hover:scale-[1.05]"
          />
        ) : null}
        <span className="absolute left-3 top-3 rounded-full bg-cream/85 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-espresso backdrop-blur">
          {product.productType}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 text-center">
        <Link href={href}>
          <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.18em] text-coral">
            {product.title}
          </h3>
          <p className="mt-2 min-h-[44px] font-display text-[17px] font-semibold leading-snug text-espresso transition-colors duration-300 group-hover:text-coral">
            {product.metafields.cardIngredient ?? product.title}
          </p>
        </Link>

        {product.metafields.cardDetail ? (
          <p className="mt-2 min-h-[38px] text-[12px] leading-relaxed text-espresso/60">
            {product.metafields.cardDetail}
          </p>
        ) : null}

        {card?.benefits?.length ? (
          <div className="mt-4 rounded-[10px] bg-ivory p-3.5 text-left">
            <span className="mb-2 block text-center text-[9px] font-bold uppercase tracking-[0.18em] text-coral">
              Benefits
            </span>
            <ul className="space-y-1">
              {card.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2 text-[12px] font-medium leading-snug">
                  <span aria-hidden className="mt-[2px] flex-shrink-0 text-[11px] text-coral">
                    ✦
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-auto pt-5">
          <p className="font-display text-[22px] font-bold text-coral">
            {formatPrice(product.price, product.currency)}
          </p>
          <p className="mt-1 text-[11px] tracking-[0.08em] text-espresso/55">
            {formatPrice(subscribePrice(product.price), product.currency)} SUBSCRIBE &amp; SAVE{' '}
            {subscribeLabel()}
          </p>

          <Link
            href={href}
            className="mt-4 inline-block border-b-2 border-coral pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-coral"
          >
            Shop Product
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
