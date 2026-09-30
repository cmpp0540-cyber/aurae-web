import Link from 'next/link';
import { SITE } from '@/content/site';
import { HERO_BLUR_DATA_URL } from '@/lib/hero-blur';
import { formatPrice } from '@/lib/format';
import type { AuraeProduct } from '@/lib/types';
import SmartImage from '@/components/ui/SmartImage';

/**
 * The hero photograph. Local asset rather than Shopify imagery, so it is
 * pre-optimised on disk (1200px WebP) — the CDN loader passes local paths
 * through untouched. See README › Image loading.
 */
const HERO_IMAGE = {
  src: '/images/aurae-hero-image.webp',
  alt: 'Woman with Aurae GLOW collagen supplement - radiant, confident beauty',
  width: 1200,
  height: 1600,
};

type Props = {
  /** The product the hero points at (GLOW) — drives the caption and the link. */
  feature: AuraeProduct | undefined;
};

export default function Hero({ feature }: Props) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#FFE5D9_0%,#FFF8F0_58%,#FFD66B_155%)]">
      {/* Decorative sparkles from the original design */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[12%] top-[12%] animate-twinkle text-[26px] text-coral"
      >
        ✦
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[18%] left-[7%] hidden animate-twinkle text-[20px] text-sun lg:block"
      >
        ✦
      </span>

      <div className="shell grid items-center gap-8 py-8 sm:py-14 lg:min-h-[86vh] lg:grid-cols-2 lg:gap-12 lg:py-24">
        {/*
          Mobile stacks the photograph above the copy; desktop puts the copy
          back on the left. `order` handles it without duplicating markup, and
          the DOM order stays image-then-text so the reading order matches what
          is on screen at the narrow breakpoint.
        */}
        <div className="order-1 flex justify-center lg:order-2">
          {/*
            Held to 290px on phones on purpose. At full column width the 3:4
            frame eats the entire first screen and the headline and CTA land
            below the fold — the visitor sees a photograph and nothing to act
            on. This keeps the photograph first, as intended, while the eyebrow
            and headline still break the fold.
          */}
          <div className="group relative w-full max-w-[290px] sm:max-w-[400px] lg:max-w-[460px]">
            {/* Coral bloom behind the photo, same treatment as before */}
            <span
              aria-hidden
              className="absolute inset-x-6 bottom-4 top-10 rounded-[28px] bg-coral/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
            />

            <SmartImage
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              // This is the page's LCP element — see the note in the README on
              // why it is preloaded rather than lazy.
              priority
              blurDataURL={HERO_BLUR_DATA_URL}
              sizes="(max-width: 640px) 290px, (max-width: 1024px) 400px, 460px"
              className="aspect-[3/4] rounded-[24px] shadow-bottle ring-1 ring-cream/60"
              imgClassName="h-full w-full object-cover object-top transition-transform duration-700 ease-aurae group-hover:scale-[1.03]"
            />

            {feature ? (
              <Link
                href={`/product/${feature.handle}`}
                className="absolute bottom-5 left-5 rounded-full bg-cream/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-espresso backdrop-blur transition-colors duration-300 hover:bg-coral hover:text-cream"
              >
                Shop {feature.title} →
              </Link>
            ) : null}
          </div>
        </div>

        <div className="order-2 animate-fade-up lg:order-1">
          <p className="u-eyebrow mb-4">{SITE.hero.eyebrow}</p>

          <h1 className="font-display text-display-xl font-extrabold text-espresso">
            {SITE.hero.titleLead} <span className="u-italic">{SITE.hero.titleItalic}</span>
          </h1>

          <p className="mt-3 font-display text-[20px] italic text-espresso/75 sm:text-[23px]">
            {SITE.hero.tagline}
          </p>

          <p className="mt-6 max-w-[430px] text-[15px] leading-relaxed text-espresso/80 sm:text-[16px]">
            {SITE.hero.body}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="#shop" className="btn-primary">
              {SITE.hero.primaryCta}
            </Link>
            <Link href="#rituals" className="btn-underline">
              {SITE.hero.secondaryCta} →
            </Link>
          </div>

          {feature ? (
            <p className="mt-8 text-[12px] uppercase tracking-[0.15em] text-espresso/50">
              Start with {feature.title} · from {formatPrice(feature.price, feature.currency)}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
