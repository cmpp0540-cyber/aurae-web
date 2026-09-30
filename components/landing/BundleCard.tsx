import Link from 'next/link';
import { bundleContent } from '@/content/bundles';
import { FEATURED_BUNDLE_HANDLE, PREMIUM_BUNDLE_HANDLE } from '@/lib/config';
import { formatPrice, savings, subscribePrice } from '@/lib/format';
import type { AuraeProduct } from '@/lib/types';
import AddToCart from '@/components/cart/AddToCart';
import Reveal from '@/components/ui/Reveal';
import SmartImage from '@/components/ui/SmartImage';

type Props = { bundle: AuraeProduct; index?: number };

export default function BundleCard({ bundle, index = 0 }: Props) {
  const content = bundleContent(bundle.handle);
  const image = bundle.images[0];
  const href = `/bundle/${bundle.handle}`;

  const isFeatured = bundle.handle === FEATURED_BUNDLE_HANDLE;
  const isPremium = bundle.handle === PREMIUM_BUNDLE_HANDLE;
  const saved = savings(bundle.price, bundle.compareAtPrice);

  return (
    <Reveal
      as="article"
      delay={index * 90}
      className={[
        'relative flex flex-col overflow-hidden rounded-[18px] p-7 text-center transition-all duration-300 ease-aurae hover:-translate-y-1 sm:p-9',
        isPremium
          ? 'bg-espresso text-ivory hover:shadow-[0_25px_60px_rgba(58,46,42,0.3)]'
          : isFeatured
            ? 'border-2 border-coral bg-cream shadow-[0_20px_50px_rgba(255,111,145,0.18)]'
            : 'border border-coral/15 bg-cream hover:shadow-card',
      ].join(' ')}
    >
      {isFeatured && content?.badge ? (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-[14px] bg-sun px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-espresso">
          ⭐ {content.badge}
        </span>
      ) : null}

      {saved ? (
        <span
          className={[
            'mx-auto mb-5 inline-block rounded-2xl px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em]',
            isFeatured ? 'mt-4 bg-coral text-cream' : isPremium ? 'bg-sun text-espresso' : 'bg-blush text-coral',
          ].join(' ')}
        >
          {isPremium ? 'Best value · ' : ''}Save {formatPrice(saved.amount, bundle.currency)}
        </span>
      ) : null}

      {/* The bundle's single Shopify image */}
      <Link href={href} className="group relative mx-auto block w-full max-w-[280px] overflow-hidden rounded-2xl">
        <span
          aria-hidden
          className={[
            'absolute inset-0',
            isPremium ? 'bg-ivory/10' : 'bg-blush/60',
          ].join(' ')}
        />
        {image ? (
          <SmartImage
            src={image.url}
            alt={image.altText ?? bundle.title}
            accent={content?.accent ?? 'ritual'}
            width={image.width}
            height={image.height}
            quality={74}
            sizes="(max-width: 768px) 80vw, 280px"
            className="relative"
            imgClassName="h-auto w-full object-cover transition-transform duration-700 ease-aurae group-hover:scale-[1.04]"
          />
        ) : null}
      </Link>

      <Link href={href} className="mt-6 block">
        <h3
          className={[
            'font-display text-[21px] font-bold leading-tight transition-colors duration-300 sm:text-[22px]',
            isPremium ? 'text-ivory hover:text-sun' : 'hover:text-coral',
          ].join(' ')}
        >
          {bundle.title}
        </h3>
      </Link>

      <p className={['mt-2 text-[12px]', isPremium ? 'text-ivory/70' : 'text-espresso/60'].join(' ')}>
        {bundle.description}
      </p>

      {content ? (
        <p
          className={[
            'mt-3 font-display text-[14px] italic',
            isPremium ? 'text-sun' : 'text-coral',
          ].join(' ')}
        >
          &ldquo;{content.tagline}&rdquo;
        </p>
      ) : null}

      <div className="mt-6">
        {bundle.compareAtPrice ? (
          <span
            className={[
              'mr-3 text-[13px] line-through',
              isPremium ? 'text-ivory/50' : 'text-espresso/40',
            ].join(' ')}
          >
            {formatPrice(bundle.compareAtPrice, bundle.currency)}
          </span>
        ) : null}
        <span
          className={[
            'font-display text-[34px] font-bold',
            isPremium ? 'text-sun' : 'text-coral',
          ].join(' ')}
        >
          {formatPrice(bundle.price, bundle.currency)}
        </span>
      </div>

      {saved ? (
        <p
          className={[
            'mt-2 text-[11px] font-bold uppercase tracking-[0.15em]',
            isPremium ? 'text-sun' : 'text-coral',
          ].join(' ')}
        >
          You save {formatPrice(saved.amount, bundle.currency)} · {saved.percent}% off
        </p>
      ) : null}

      <div className="mt-6 space-y-3">
        <AddToCart
          product={bundle}
          label="Add Bundle to Cart"
          variant={isPremium ? 'sun' : isFeatured ? 'primary' : 'dark'}
          className="[&>button]:w-full"
        />
        <Link
          href={href}
          className={[
            'block text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
            isPremium ? 'text-ivory/70 hover:text-sun' : 'text-espresso/60 hover:text-coral',
          ].join(' ')}
        >
          Shop Bundle →
        </Link>
      </div>

      <p
        className={[
          'mt-4 font-display text-[11px] italic',
          isPremium ? 'text-sun/80' : 'text-espresso/50',
        ].join(' ')}
      >
        or {formatPrice(subscribePrice(bundle.price), bundle.currency)} with Subscribe &amp; Save
      </p>
    </Reveal>
  );
}
