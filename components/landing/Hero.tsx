import Link from 'next/link';
import { HERO_PILLARS, HERO_PILLARS_MOBILE, SITE } from '@/content/site';
import type { HeroPillar } from '@/content/site';
import { HERO_BLUR_DATA_URL, HERO_CORAL } from '@/lib/hero-blur';
import SmartImage from '@/components/ui/SmartImage';

/**
 * Desktop: the wide photograph, seven products on the brand coral.
 * Phones: a tall shot of the full line of eight, so the products stack
 * vertically and fill the screen width instead of shrinking to a thin strip.
 *
 * The two shots hold different products in a different order, so each has its
 * own pillar list in `content/site.ts`.
 *
 * Both are local assets, pre-optimised on disk (the Shopify CDN loader passes
 * local paths through untouched). See README › Image loading.
 */
const HERO_IMAGE = {
  src: '/images/aurae-hero-products.webp',
  alt: 'Aurae GLOW, RENEWAL, CALM, FLORA, RADIANCE, VITAL and RELEASE supplements floating on a coral background, threaded by an iridescent glass ribbon',
};

const HERO_IMAGE_MOBILE = {
  src: '/images/aurae-hero-vertical.webp',
  alt: 'The full Aurae line — RADIANCE, RENEWAL, CALM, GLOW, FLORA, RELEASE, VITAL and STILL — spiralling up a coral background around an iridescent glass ribbon',
};

/**
 * The tall image is lit unevenly, so a single flat colour would show a seam.
 * These gradients are the image's own top and bottom edge, sampled left to
 * right; the colour blocks above and below the photo continue them.
 */
const MOBILE_TOP =
  'linear-gradient(90deg,#C14844,#C14744,#C14744,#C04744,#C04844,#BF6C6B,#C89495,#B84440,#B7413F)';
const MOBILE_BOTTOM =
  'linear-gradient(90deg,#F6B8B2,#F7BFB8,#FAC6BF,#FBC6BF,#FBC8C1,#FAC7C0,#FAC7C0,#F7C4BD,#F4BFB9)';

/** Pale pink that reads on the coral without washing out. */
const INK = '#FFE3EA';

/**
 * A pillar links to its product page once that page exists; until then the
 * label is plain text. Same markup either way, so nothing shifts when a
 * handle is filled in.
 */
function PillarLabel({
  pillar,
  className,
  style,
  children,
}: {
  pillar: HeroPillar;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (!pillar.handle) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  return (
    <Link href={`/product/${pillar.handle}`} className={className} style={style}>
      {children}
      <span className="sr-only"> — shop {pillar.product}</span>
    </Link>
  );
}

function DesktopActions() {
  return (
    <div className="mt-8 hidden flex-wrap items-center gap-5 lg:flex">
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
      className="relative overflow-hidden bg-[#C14744] lg:bg-[var(--hero-coral)]"
      style={
        {
          '--hero-coral': HERO_CORAL,
        } as React.CSSProperties
      }
      aria-label="Aurae — the full ritual"
    >
      {/* Decorative sparkle, kept from the original design */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[2%] top-[6%] z-20 hidden animate-twinkle text-[22px] lg:block"
        style={{ color: INK }}
      >
        ✦
      </span>

      {/* Headline: over the photograph at every width — the top of both shots
          is empty coral, so it sits on the image rather than in a band. */}
      <div className="animate-fade-up absolute inset-x-0 top-0 z-10 px-6 pt-8 text-center lg:left-[4%] lg:right-auto lg:top-[7%] lg:w-[40%] lg:px-0 lg:pt-0 lg:text-left">
        <h1
          className="u-hero-shadow font-display font-semibold leading-[1.08] tracking-[-0.01em] text-[#FFE3EA]"
          style={{ fontSize: 'clamp(1.75rem, 4.2vw, 4.25rem)' }}
        >
          {SITE.hero.titleLead}{' '}
          <em className="italic text-[#FFE3EA]">{SITE.hero.titleItalic}</em>
        </h1>

        <DesktopActions />
      </div>

      {/* ── Desktop photograph ───────────────────────────────────────── */}
      <div className="relative hidden aspect-[16/9] w-full lg:block">
        <SmartImage
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          blurDataURL={HERO_BLUR_DATA_URL}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
        />

        {/* One label per product, centred over it. */}
        <ul>
          {HERO_PILLARS.map((pillar, index) => (
            <li
              key={pillar.product}
              className="absolute z-10 -translate-x-1/2"
              style={{ left: `${pillar.x}%`, top: `${pillar.y}%` }}
            >
              <PillarLabel
                pillar={pillar}
                className={[
                  'u-hero-shadow block animate-float whitespace-nowrap font-display text-[13px] font-medium uppercase tracking-[0.18em] xl:text-[15px]',
                  pillar.handle
                    ? 'transition-all duration-300 ease-aurae hover:-translate-y-0.5 hover:text-cream'
                    : '',
                ].join(' ')}
                style={{ color: INK, animationDelay: `${index * 0.9}s` }}
              >
                <span aria-hidden className="mr-2">
                  ✦
                </span>
                {pillar.label}
              </PillarLabel>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Phone photograph: tall, the full line spiralling up ───────── */}
      <div className="relative aspect-[1/2] w-full lg:hidden">
        <SmartImage
          src={HERO_IMAGE_MOBILE.src}
          alt={HERO_IMAGE_MOBILE.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
          imgClassName="h-full w-full object-cover"
        />

        {/* Keeps the headline legible where the ribbon crosses the top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[20%]"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(150,45,45,0.60), rgba(150,45,45,0.28) 55%, transparent)',
          }}
        />

        {/* Soft seams into the colour blocks above and below */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[5%]"
          style={{
            backgroundImage: MOBILE_TOP,
            maskImage: 'linear-gradient(black, transparent)',
            WebkitMaskImage: 'linear-gradient(black, transparent)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[5%]"
          style={{
            backgroundImage: MOBILE_BOTTOM,
            maskImage: 'linear-gradient(transparent, black)',
            WebkitMaskImage: 'linear-gradient(transparent, black)',
          }}
        />

        {/* Tap a bottle to open it — only the half of the frame it sits in. */}
        {HERO_PILLARS_MOBILE.map((pillar) =>
          pillar.handle ? (
            <Link
              key={pillar.product}
              href={`/product/${pillar.handle}`}
              className={[
                'absolute z-10',
                pillar.side === 'l' ? 'left-[6%] right-[50%]' : 'left-[50%] right-[6%]',
              ].join(' ')}
              style={{ top: `${pillar.top}%`, height: `${pillar.height}%` }}
            >
              <span className="sr-only">
                {pillar.label} — shop {pillar.product}
              </span>
            </Link>
          ) : null,
        )}

        {/* Benefit labels, in the margin on the product's own side */}
        <ul aria-hidden className="pointer-events-none">
          {HERO_PILLARS_MOBILE.map((pillar) => {
            const left = pillar.side === 'l';
            return (
              <li
                key={pillar.product}
                className={[
                  'absolute z-20 -translate-y-1/2',
                  left ? 'right-[77%]' : 'left-[77%]',
                ].join(' ')}
                style={{ top: `${pillar.y}%` }}
              >
                <span
                  className={[
                    'flex items-center gap-1',
                    left ? 'flex-row' : 'flex-row-reverse',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'block max-w-[68px] break-words font-display text-[9px] font-medium uppercase leading-tight tracking-[0.06em] text-cream drop-shadow-[0_1px_2px_rgba(90,30,30,0.45)]',
                      left ? 'text-right' : 'text-left',
                    ].join(' ')}
                  >
                    {pillar.label}
                  </span>
                  <span className="block h-px w-3 flex-shrink-0 bg-cream/70" />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Phone actions, on the light end of the photograph ─────────── */}
      <div
        className="flex flex-col items-center gap-1 px-5 pb-12 pt-4 lg:hidden"
        style={{ backgroundImage: MOBILE_BOTTOM }}
      >
        <Link href="#shop" className="btn-dark">
          {SITE.hero.primaryCta}
        </Link>
        <Link
          href="#rituals"
          className="btn border-b-2 border-espresso/70 px-0 py-4 text-espresso transition-colors duration-300 hover:text-ivory"
        >
          {SITE.hero.secondaryCta} →
        </Link>
      </div>
    </section>
  );
}
