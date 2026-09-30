import Link from 'next/link';
import { PRODUCT_CARD } from '@/content/site';
import { accentFor } from '@/lib/accents';
import { formatPrice } from '@/lib/format';
import type { AuraeProduct } from '@/lib/types';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SmartImage from '@/components/ui/SmartImage';

type Props = {
  products: AuraeProduct[];
  intro: string;
};

/** "Often bought together" — compact cards with image, name, price, Explore. */
export default function CrossSellSection({ products, intro }: Props) {
  if (!products.length) return null;

  return (
    <section className="section-y bg-[linear-gradient(180deg,#FFF8F0_0%,#FFE5D9_100%)]">
      <div className="shell">
        <SectionHeading
          eyebrow="Often bought together"
          lead="Layer your"
          italic="ritual."
          subtitle={intro}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const accent = accentFor(PRODUCT_CARD[product.handle]?.accent);
            const image = product.images[0];

            return (
              <Reveal
                key={product.id}
                as="article"
                delay={index * 80}
                className="group flex items-center gap-5 rounded-2xl bg-cream p-4 transition-all duration-300 ease-aurae hover:shadow-card"
              >
                <Link
                  href={`/product/${product.handle}`}
                  className={[
                    'relative h-[104px] w-[104px] flex-shrink-0 overflow-hidden rounded-xl',
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
                      sizes="104px"
                      shimmer={false}
                      imgClassName="object-cover transition-transform duration-500 ease-aurae group-hover:scale-105"
                    />
                  ) : null}
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-espresso/45">
                    {product.productType}
                  </p>
                  <Link href={`/product/${product.handle}`}>
                    <h3 className="mt-1 font-display text-[17px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 group-hover:text-coral">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="mt-1.5 line-clamp-2 text-[12px] leading-snug text-espresso/60">
                    {product.metafields.cardDetail ?? product.metafields.cardIngredient ?? ''}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="font-display text-[17px] font-bold text-coral">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    <Link
                      href={`/product/${product.handle}`}
                      className="border-b border-coral pb-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 hover:text-coral"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
