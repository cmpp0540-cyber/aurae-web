import { PRODUCT_CARD } from '@/content/site';
import { formatPrice, subscribeLabel, subscribePrice } from '@/lib/format';
import type { AuraeProduct } from '@/lib/types';
import AddToCart from '@/components/cart/AddToCart';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';

type Props = {
  product: AuraeProduct;
  headline: string;
  sub: string;
  /** "Add to Cart" vs "Add Bundle to Cart" */
  label?: string;
};

export default function FinalCta({ product, headline, sub, label = 'Add to Cart' }: Props) {
  const image = product.images[0];
  // Bundles have no card entry — they fall back to the warm "ritual" palette.
  const accent = PRODUCT_CARD[product.handle]?.accent ?? 'ritual';

  return (
    <section className="bg-cream">
      <div className="shell py-16 lg:py-20">
        <Reveal className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#FFE5D9_0%,#FFF8F0_55%,#FFD66B_150%)] px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
          <span
            aria-hidden
            className="pointer-events-none absolute right-[8%] top-[14%] animate-twinkle text-[24px] text-coral"
          >
            ✦
          </span>

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-display text-display-lg font-extrabold balance">{headline}</h2>
              <p className="mt-4 max-w-[460px] font-display text-[17px] italic text-espresso/75">
                {sub}
              </p>

              <div className="mt-8">
                <p className="font-display text-[34px] font-bold text-coral">
                  {formatPrice(product.price, product.currency)}
                </p>
                <p className="mt-1 text-[12px] tracking-[0.08em] text-espresso/55">
                  or {formatPrice(subscribePrice(product.price), product.currency)} with Subscribe &amp;
                  Save {subscribeLabel()}
                </p>
              </div>

              <AddToCart
                product={product}
                label={label}
                variant="primary"
                withQuantity
                className="mt-6 max-w-[420px]"
              />

              <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-espresso/50">
                ✦ Free shipping over $50 · 30-day money-back guarantee
              </p>
            </div>

            {image ? (
              <div className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-[20px] shadow-bottle">
                <SmartImage
                  src={image.url}
                  alt={image.altText ?? product.title}
                  accent={accent}
                  width={image.width}
                  height={image.height}
                  quality={74}
                  sizes="(max-width: 1024px) 70vw, 280px"
                  imgClassName="h-auto w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
