import Link from 'next/link';
import { PRODUCT_CARD } from '@/content/site';
import { accentFor } from '@/lib/accents';
import { formatPrice } from '@/lib/format';
import type { AuraeProduct } from '@/lib/types';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SmartImage from '@/components/ui/SmartImage';

type Props = {
  contents: AuraeProduct[];
  bundlePrice: number;
  currency: string;
};

/** What's in the box — each product with its real Shopify thumbnail. */
export default function BundleIncludes({ contents, bundlePrice, currency }: Props) {
  if (!contents.length) return null;

  const individualTotal = contents.reduce((total, product) => total + product.price, 0);
  const difference = Math.round((individualTotal - bundlePrice) * 100) / 100;

  return (
    <section className="section-y bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="What's included"
          lead={`${contents.length} formulas,`}
          italic="one box."
          subtitle="Full-size products — not samples, not travel sizes."
        />

        <ul className="mx-auto mt-12 grid max-w-[1000px] gap-5">
          {contents.map((product, index) => {
            const accent = accentFor(PRODUCT_CARD[product.handle]?.accent);
            const image = product.images[0];

            return (
              <Reveal
                key={product.id}
                as="li"
                delay={index * 70}
                className="group flex items-center gap-5 rounded-2xl border border-espresso/10 bg-ivory/40 p-4 transition-all duration-300 ease-aurae hover:border-coral/30 hover:bg-cream sm:gap-6 sm:p-5"
              >
                <Link
                  href={`/product/${product.handle}`}
                  className={[
                    'relative h-[88px] w-[88px] flex-shrink-0 overflow-hidden rounded-xl sm:h-[104px] sm:w-[104px]',
                    accent.imageGradient,
                  ].join(' ')}
                >
                  {image ? (
                    <SmartImage
                      src={image.url}
                      alt={image.altText ?? product.title}
                      accent={PRODUCT_CARD[product.handle]?.accent}
                      fill
                      quality={65}
                      // The box is 88px until sm, 104px after — say so, or the
                      // browser fetches one candidate then swaps to another.
                      sizes="(min-width: 640px) 104px, 88px"
                      shimmer={false}
                      imgClassName="object-cover transition-transform duration-500 ease-aurae group-hover:scale-105"
                    />
                  ) : null}
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <Link href={`/product/${product.handle}`}>
                      <h3 className="font-display text-[18px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 group-hover:text-coral">
                        {product.title}
                      </h3>
                    </Link>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-espresso/45">
                      {product.productType}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[13px] leading-snug text-espresso/65">
                    {product.metafields.cardIngredient ?? ''}
                  </p>
                  {product.metafields.cardDetail ? (
                    <p className="mt-1 text-[12px] leading-snug text-espresso/50">
                      {product.metafields.cardDetail}
                    </p>
                  ) : null}
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className="font-display text-[17px] font-bold text-espresso/50">
                    {formatPrice(product.price, product.currency)}
                  </p>
                  <Link
                    href={`/product/${product.handle}`}
                    className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-espresso/45 transition-colors duration-300 hover:text-coral"
                  >
                    Details →
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </ul>

        {difference > 0 ? (
          <Reveal className="mx-auto mt-8 flex max-w-[1000px] flex-wrap items-center justify-between gap-4 rounded-2xl bg-blush/50 px-6 py-5">
            <span className="text-[13px] text-espresso/70">
              Bought individually:{' '}
              <span className="line-through">{formatPrice(individualTotal, currency)}</span>
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-coral">
              Your ritual price {formatPrice(bundlePrice, currency)} · save{' '}
              {formatPrice(difference, currency)}
            </span>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
