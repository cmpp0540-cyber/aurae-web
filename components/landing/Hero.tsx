import Link from 'next/link';
import { HERO_PILLARS, SITE } from '@/content/site';
import { HERO_BLUR_DATA_URL, HERO_CORAL } from '@/lib/hero-blur';
import SmartImage from '@/components/ui/SmartImage';

/**
 * The hero photograph: all five products on the brand coral.
 *
 * Local asset, so it is pre-optimised on disk (1920px WebP) — the Shopify CDN
 * loader passes local paths through untouched. See README › Image loading.
 */
const HERO_IMAGE = {
  src: '/images/aurae-hero-products.webp',
  alt: 'Aurae GLOW, CALM, SLEEP, RADIANCE and RENEWAL supplements floating on a coral background with a flowing pink liquid ribbon',
};

/** Pale pink that reads on the coral without washing out. */
const INK = '#FFE3EA';

function HeroActions({ className = '' }: { className?: string }) {
  return (
    <div className={['flex-wrap items-center gap-5', className].join(' ')}>
      <Link href="#shop" className="btn-cream">
        {SITE.hero.primaryCta}
      </Link>
      <Link
        href="#rituals"
        className="btn u-hero-shadow border-b-2 px-0 py-4 transition-colors duration-300 hover:text-cream"
        style={{ color: INK, borderColor: INK }}
      >
        {SITE.hero.secondaryCta} →
      </Link>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: HERO_CORAL }}
      aria-label="Aurae — the five rituals"
    >
      {/* Decorative sparkle, kept from the original design */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[2%] top-[6%] z-20 hidden animate-twinkle text-[22px] lg:block"
        style={{ color: INK }}
      >
        ✦
      </span>

      {/*
        One headline for both layouts: in normal flow above the photograph on
        mobile, absolutely positioned over it from `lg` up. The section is the
        positioning context, and every mobile-only block below is display:none
        at that breakpoint, so the section's box is exactly the photograph's —
        which is what makes the percentages line up with the bottles.
      */}
      <div className="shell animate-fade-up pb-6 pt-10 text-center lg:absolute lg:left-[4%] lg:top-[7%] lg:z-10 lg:w-[40%] lg:p-0 lg:text-left">
        <h1
          className="u-hero-shadow font-display font-semibold leading-[1.08] tracking-[-0.01em]"
          style={{ color: INK, fontSize: 'clamp(2rem, 4.2vw, 4.25rem)' }}
        >
          {SITE.hero.titleLead} <em className="italic">{SITE.hero.titleItalic}</em>
        </h1>

        <HeroActions className="mt-8 hidden lg:flex" />
      </div>

      {/* ── The photograph ────────────────────────────────────────────── */}
      <div className="relative aspect-[16/9] w-full">
        <SmartImage
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          // The LCP element on the landing page.
          priority
          blurDataURL={HERO_BLUR_DATA_URL}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
        />

        {/* One label per product, centred over it. Hidden on mobile. */}
        <ul className="hidden lg:block">
          {HERO_PILLARS.map((pillar, index) => (
            <li
              key={pillar.handle}
              className="absolute z-10 -translate-x-1/2"
              style={{ left: `${pillar.x}%`, top: `${pillar.y}%` }}
            >
              <Link
                href={`/product/${pillar.handle}`}
                // The float is staggered so the five never drift in unison.
                // globals.css neutralises it under prefers-reduced-motion.
                className="u-hero-shadow block animate-float whitespace-nowrap font-display text-[13px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ease-aurae hover:-translate-y-0.5 hover:text-cream xl:text-[15px]"
                style={{ color: INK, animationDelay: `${index * 0.9}s` }}
              >
                <span aria-hidden className="mr-2">
                  ✦
                </span>
                {pillar.label}
                <span className="sr-only"> — shop {pillar.product}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Mobile: the same five benefits as pills ───────────────────── */}
      <ul className="shell flex flex-wrap justify-center gap-2 pt-6 lg:hidden">
        {HERO_PILLARS.map((pillar) => (
          <li key={pillar.handle}>
            <Link
              href={`/product/${pillar.handle}`}
              className="inline-block rounded-full bg-cream/20 px-3.5 py-2 font-display text-[11px] font-medium uppercase tracking-[0.14em] backdrop-blur-sm transition-colors duration-300 hover:bg-cream/35"
              style={{ color: INK }}
            >
              <span aria-hidden className="mr-1.5">
                ✦
              </span>
              {pillar.label}
              <span className="sr-only"> — shop {pillar.product}</span>
            </Link>
          </li>
        ))}
      </ul>

      <HeroActions className="shell flex justify-center pb-12 pt-8 lg:hidden" />
    </section>
  );
}
