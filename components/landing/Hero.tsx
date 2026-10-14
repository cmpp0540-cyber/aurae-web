import Link from 'next/link';
import { HERO_PILLARS, SITE } from '@/content/site';
import { HERO_BLUR_DATA_URL, HERO_CORAL } from '@/lib/hero-blur';
import SmartImage from '@/components/ui/SmartImage';

/**
 * Desktop: the wide photograph, all five products on the brand coral.
 * Phones: a tall version of the same shot, so the five products stack
 * vertically and fill the screen width instead of shrinking to a thin strip.
 *
 * Both are local assets, pre-optimised on disk (the Shopify CDN loader passes
 * local paths through untouched). See README › Image loading.
 */
const HERO_IMAGE = {
  src: '/images/aurae-hero-products.webp',
  alt: 'Aurae GLOW, CALM, SLEEP, RADIANCE and RENEWAL supplements floating on a coral background with a flowing pink liquid ribbon',
};

const HERO_IMAGE_MOBILE = {
  src: '/images/aurae-hero-vertical.webp',
  alt: 'Aurae SLEEP, RADIANCE, GLOW, CALM and RENEWAL supplements stacked vertically on a champagne background with a flowing iridescent glass ribbon',
};

/**
 * The tall image is lit unevenly, so a single flat colour would show a seam.
 * These gradients are the image's own top and bottom edge, sampled left to
 * right; the colour blocks above and below the photo continue them.
 */
const MOBILE_TOP =
  'linear-gradient(90deg,#c5a992,#caaf9a,#d3b9a4,#dec4b3,#e2c4ad,#e3bcab,#eadacc,#f2e5da,#f1e7dd)';
const MOBILE_BOTTOM =
  'linear-gradient(90deg,#a47e71,#ac867d,#b18b82,#bb958d,#ca9e8b,#b58479,#b18980,#af877d,#b89289)';

/**
 * A benefit label beside each product in the tall image, alternating sides.
 * `y` is the vertical centre of the product, as % of the image height.
 * Same order as HERO_PILLARS (sleep, radiance, glow, calm, renewal).
 */
const MOBILE_LABELS: { side: 'l' | 'r'; y: number }[] = [
  { side: 'l', y: 15 },
  { side: 'r', y: 31 },
  { side: 'l', y: 49 },
  { side: 'r', y: 69 },
  { side: 'l', y: 88 },
];

/**
 * Tap areas over each product in the tall image, top to bottom, as % of its
 * height. Same order as HERO_PILLARS (sleep, radiance, glow, calm, renewal).
 */
const MOBILE_HOTSPOTS: { top: number; height: number }[] = [
  { top: 6, height: 16 },
  { top: 22, height: 17 },
  { top: 39, height: 21 },
  { top: 60, height: 18 },
  { top: 78, height: 20 },
];

/** Pale pink that reads on the coral without washing out. */
const INK = '#FFE3EA';

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
      className="relative overflow-hidden bg-[#e3d0c0] lg:bg-[var(--hero-coral)]"
      style={
        {
          '--hero-coral': HERO_CORAL,
          '--m-top': MOBILE_TOP,
        } as React.CSSProperties
      }
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

      {/* Headline: in flow above the photograph on phones, over it from `lg` up. */}
      <div className="shell animate-fade-up bg-[image:var(--m-top)] pb-5 pt-9 text-center lg:absolute lg:left-[4%] lg:top-[7%] lg:z-10 lg:w-[40%] lg:bg-none lg:p-0 lg:text-left">
        <h1
          className="font-display font-semibold leading-[1.08] tracking-[-0.01em] text-espresso lg:u-hero-shadow lg:text-[#FFE3EA]"
          style={{ fontSize: 'clamp(2rem, 4.2vw, 4.25rem)' }}
        >
          {SITE.hero.titleLead}{' '}
          <em className="italic text-coral lg:text-[#FFE3EA]">{SITE.hero.titleItalic}</em>
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
              key={pillar.handle}
              className="absolute z-10 -translate-x-1/2"
              style={{ left: `${pillar.x}%`, top: `${pillar.y}%` }}
            >
              <Link
                href={`/product/${pillar.handle}`}
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

      {/* ── Phone photograph: tall, the five products stacked ────────── */}
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

        {/* Tap a bottle to open it */}
        {HERO_PILLARS.map((pillar, index) => {
          const spot = MOBILE_HOTSPOTS[index];
          return (
            <Link
              key={pillar.handle}
              href={`/product/${pillar.handle}`}
              className="absolute inset-x-[12%] z-10"
              style={{ top: `${spot.top}%`, height: `${spot.height}%` }}
            >
              <span className="sr-only">
                {pillar.label} — shop {pillar.product}
              </span>
            </Link>
          );
        })}

        {/* Benefit labels, alternating sides */}
        <ul aria-hidden className="pointer-events-none">
          {HERO_PILLARS.map((pillar, index) => {
            const { side, y } = MOBILE_LABELS[index];
            const left = side === 'l';
            return (
              <li
                key={pillar.handle}
                className={['absolute z-20 -translate-y-1/2', left ? 'right-[70%]' : 'left-[72%]'].join(' ')}
                style={{ top: `${y}%` }}
              >
                <span className={['flex items-center gap-1.5', left ? 'flex-row' : 'flex-row-reverse'].join(' ')}>
                  <span
                    className={[
                      'block max-w-[82px] font-display text-[11px] font-medium uppercase leading-tight tracking-[0.14em] text-espresso',
                      left ? 'text-right' : 'text-left',
                    ].join(' ')}
                  >
                    {pillar.label}
                  </span>
                  <span className="block h-px w-4 flex-shrink-0 bg-coral/70" />
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
