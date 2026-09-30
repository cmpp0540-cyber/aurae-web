import Link from 'next/link';
import type { BundleContent } from '@/content/bundles';
import { accentFor } from '@/lib/accents';
import { formatPrice, savings, subscribeLabel, subscribePrice } from '@/lib/format';
import type { AuraeProduct } from '@/lib/types';
import AddToCart from '@/components/cart/AddToCart';
import SmartImage from '@/components/ui/SmartImage';
import Stars from '@/components/ui/Stars';

type Props = { bundle: AuraeProduct; content: BundleContent | null };

/** Bundles have one image, so this hero is a single figure — no carousel. */
export default function BundleHero({ bundle, content }: Props) {
  const accent = accentFor(content?.accent ?? 'ritual');
  const image = bundle.images[0];
  const saved = savings(bundle.price, bundle.compareAtPrice);

  return (
    <section className={accent.sectionGradient}>
      <div className="shell grid gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <figure
            className={[
              'relative aspect-square w-full overflow-hidden rounded-[22px]',
              accent.imageGradient,
            ].join(' ')}
          >
            {image ? (
              <SmartImage
                src={image.url}
                alt={image.altText ?? bundle.title}
                accent={accent.key}
                fill
                priority
                quality={82}
                sizes="(max-width: 1024px) 100vw, 620px"
                imgClassName="object-cover"
              />
            ) : null}
            {saved ? (
              <figcaption className="absolute left-5 top-5 rounded-full bg-espresso px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-sun">
                Save {formatPrice(saved.amount, bundle.currency)} · {saved.percent}% off
              </figcaption>
            ) : null}
          </figure>
        </div>

        <div>
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-[11px] uppercase tracking-[0.15em] text-espresso/45"
          >
            <Link href="/" className="transition-colors hover:text-coral">
              Aurae
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <Link href="/#rituals" className="transition-colors hover:text-coral">
              Rituals
            </Link>
            <span aria-hidden className="mx-2">
              /
            </span>
            <span className="text-espresso/70">{bundle.title}</span>
          </nav>

          {content?.badge ? (
            <span className="mb-4 inline-block rounded-full bg-sun px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-espresso">
              ⭐ {content.badge}
            </span>
          ) : null}

          <p className="u-eyebrow">{content?.eyebrow ?? 'Ritual bundle'}</p>

          <h1 className="mt-3 font-display text-display-lg font-extrabold">{bundle.title}</h1>

          {content?.tagline ? (
            <p className="mt-3 font-display text-[18px] italic text-coral sm:text-[20px]">
              &ldquo;{content.tagline}&rdquo;
            </p>
          ) : null}

          {content?.testimonials.length ? (
            <div className="mt-5 flex items-center gap-3">
              <Stars />
              <span className="text-[12px] text-espresso/55">
                {content.testimonials.length} verified ritual reviews
              </span>
            </div>
          ) : null}

          <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-espresso/75">
            {content?.intro ?? bundle.description}
          </p>

          {/* Pricing */}
          <div className="mt-8 flex flex-wrap items-baseline gap-3">
            {bundle.compareAtPrice ? (
              <span className="text-[15px] text-espresso/40 line-through">
                {formatPrice(bundle.compareAtPrice, bundle.currency)}
              </span>
            ) : null}
            <span className="font-display text-[38px] font-bold leading-none text-coral">
              {formatPrice(bundle.price, bundle.currency)}
            </span>
          </div>
          <p className="mt-2 text-[12px] tracking-[0.08em] text-espresso/55">
            or {formatPrice(subscribePrice(bundle.price), bundle.currency)} with Subscribe &amp; Save{' '}
            {subscribeLabel()}
          </p>

          <AddToCart
            product={bundle}
            label="Add Bundle to Cart"
            variant="primary"
            withQuantity
            className="mt-6 max-w-[440px]"
          />

          <Link
            href="/#shop"
            className="mt-5 inline-block border-b-2 border-coral pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-coral"
          >
            Shop individual products →
          </Link>

          <p className="mt-6 text-[11px] uppercase tracking-[0.12em] text-espresso/50">
            ✦ Free shipping · 30-day money-back guarantee · cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
