import Link from 'next/link';
import type { ProductContent } from '@/content/products';
import { accentFor } from '@/lib/accents';
import { shortDescription } from '@/lib/format';
import type { AuraeProduct } from '@/lib/types';
import Stars from '@/components/ui/Stars';
import ProductGallery from './ProductGallery';
import PurchasePanel from './PurchasePanel';

type Props = { product: AuraeProduct; content: ProductContent | null };

export default function ProductHero({ product, content }: Props) {
  const accent = accentFor(content?.accent);
  const intro = content?.intro ?? shortDescription(product.description, 3);
  const reviewCount = content?.testimonials.length ?? 0;

  return (
    <section className={['relative', accent.sectionGradient].join(' ')}>
      <div className="shell grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        {/* Gallery — every Shopify image for this product */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductGallery
            images={product.images}
            title={product.title}
            gradientClass={accent.imageGradient}
            accent={accent.key}
          />
        </div>

        {/* Buy box */}
        <div>
          <nav aria-label="Breadcrumb" className="mb-6 text-[11px] uppercase tracking-[0.15em] text-espresso/45">
            <Link href="/" className="transition-colors hover:text-coral">
              Aurae
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <Link href="/#shop" className="transition-colors hover:text-coral">
              Shop
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span className="text-espresso/70">{product.title}</span>
          </nav>

          <p className="u-eyebrow">{content?.eyebrow ?? product.productType}</p>

          <h1 className="mt-3 font-display text-display-lg font-extrabold uppercase tracking-[0.02em]">
            {product.title}
          </h1>

          {product.metafields.cardIngredient ? (
            <p className="mt-3 font-display text-[19px] font-semibold text-espresso/85 sm:text-[21px]">
              {product.metafields.cardIngredient}
            </p>
          ) : null}

          {content?.tagline ? (
            <p className="mt-2 font-display text-[16px] italic text-coral sm:text-[18px]">
              {content.tagline}
            </p>
          ) : null}

          {reviewCount ? (
            <div className="mt-5 flex items-center gap-3">
              <Stars />
              <span className="text-[12px] text-espresso/55">
                {reviewCount} verified {reviewCount === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          ) : null}

          <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-espresso/75">{intro}</p>

          {product.metafields.cardDetail ? (
            <p className="mt-4 text-[13px] leading-relaxed text-espresso/60">
              {product.metafields.cardDetail}
            </p>
          ) : null}

          <PurchasePanel product={product} />

          {content?.quickFacts?.length ? (
            <ul className="mt-7 space-y-2 border-t border-espresso/10 pt-6">
              {content.quickFacts.map((fact) => (
                <li key={fact} className="flex gap-2.5 text-[13px] text-espresso/70">
                  <span aria-hidden className="text-coral">
                    ✦
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
