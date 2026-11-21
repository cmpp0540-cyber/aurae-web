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
  src: '/images/aurae-hero-mobile.webp',
  alt: 'The full Aurae line — RADIANCE, RENEWAL, CALM, GLOW, FLORA, RELEASE, VITAL and STILL — spiralling up a coral background around an iridescent glass ribbon',
};

/**
 * The tall image is lit unevenly, so a single flat colour would show a seam.
 * These gradients are the image's own top and bottom edge, sampled left to
 * right; the colour blocks above and below the photo continue them.
 */
const MOBILE_TOP =
  'linear-gradient(90deg,#FCEEE5,#FEEDE3,#FBEBE3,#FBEBE3,#F9E8DE,#F5E2D8,#F2DED4,#F0DBCE,#ECD6CC)';
const MOBILE_BOTTOM =
  'linear-gradient(90deg,#EDD4C8,#EFD7CB,#F1DACE,#F2DCD2,#F2DDD2,#F0DBCF,#F0D7CC,#EED6CB,#ECD4CA)';

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

/** The glyphs named by `SITE.hero.reassurance[].icon`. */
const REASSURANCE_ICONS: Record<string, React.ReactNode> = {
  shield: (
    <>
      <path d="M8 1.7 3 3.8v3.5c0 3.1 2 5.9 5 6.9 3-1 5-3.8 5-6.9V3.8L8 1.7Z" />
      <path d="m5.9 7.9 1.5 1.5 2.8-3" />
    </>
  ),
  flask: (
    <>
      <path d="M6.3 1.9v3.4L3.1 11.3a1.6 1.6 0 0 0 1.4 2.4h7a1.6 1.6 0 0 0 1.4-2.4L9.7 5.3V1.9" />
      <path d="M5.4 1.9h5.2" />
      <path d="M4.6 9.6h6.8" />
    </>
  ),
};

/**
 * The two reassurances under the buttons. Colour comes from the parent, so
 * the same row works on the coral hero and on the pale strip below it.
 */
function Reassurance({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`} style={style}>
      {SITE.hero.reassurance.map((item) => (
        <li
          key={item.text}
          className="flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em]"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="flex-shrink-0"
          >
            {REASSURANCE_ICONS[item.icon]}
          </svg>
          {item.text}
        </li>
      ))}
    </ul>
  );
}

function DesktopActions() {
  return (
    <div className="mt-8 hidden lg:block">
      <div className="flex flex-wrap items-center gap-5">
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

      <Reassurance className="u-hero-shadow mt-5" style={{ color: INK }} />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-[#FCEEE5] lg:bg-[var(--hero-coral)]"
      style={
        {
          '--hero-coral': HERO_CORAL,
          '--m-top': MOBILE_TOP,
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

      {/*
        The copy block.

        On a phone it sits in its own band above the photograph, painted with
        the image's own top edge so the seam is invisible — three paragraphs
        laid over the picture would cover the bottles. From `lg` up it floats
        over the empty left side of the wide shot.

        Ink flips with the backdrop: espresso on the pale phone band, blush on
        the coral desktop photograph.
      */}
      <div className="animate-fade-up bg-[image:var(--m-top)] px-6 pb-2 pt-9 text-center lg:absolute lg:left-[4%] lg:top-[7%] lg:z-10 lg:w-[40%] lg:bg-none lg:px-0 lg:pb-0 lg:pt-0 lg:text-left">
        <h1
          className="font-display font-semibold leading-[1.08] tracking-[-0.01em] text-espresso lg:u-hero-shadow lg:text-[#FFE3EA]"
          style={{ fontSize: 'clamp(2.5rem, 4.6vw, 4.25rem)' }}
        >
          {SITE.hero.titleLead}{' '}
          <em className="italic text-coral lg:text-[#FFE3EA]">{SITE.hero.titleItalic}</em>
        </h1>

        <p className="mx-auto mt-4 max-w-[22ch] font-display text-[19px] italic leading-[1.45] text-espresso/80 lg:mx-0 lg:u-hero-shadow lg:max-w-none lg:text-[22px] lg:text-[#FFE3EA]/90">
          {SITE.hero.tagline}
        </p>

        <p className="mx-auto mt-4 max-w-[36ch] text-[12.5px] leading-relaxed text-espresso/70 lg:mx-0 lg:u-hero-shadow lg:max-w-[44ch] lg:text-[14px] lg:text-[#FFE3EA]/85">
          {SITE.hero.body}
        </p>

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
      <div className="relative aspect-[4/5] w-full lg:hidden">
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
                  // The centred bottles get a tighter inset: 64% leaves the
                  // label a hair clear of the bottle instead of stranded in
                  // the margin. The rule points inward from the label, so it
                  // is the inset — not the rule's length — that closes the gap.
                  left
                    ? pillar.centred
                      ? 'right-[64%]'
                      : 'right-[77%]'
                    : pillar.centred
                      ? 'left-[64%]'
                      : 'left-[77%]',
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
                      'block max-w-[68px] break-words font-display text-[9px] font-medium uppercase leading-tight tracking-[0.06em] text-espresso/80',
                      left ? 'text-right' : 'text-left',
                    ].join(' ')}
                  >
                    {pillar.label}
                  </span>
                  <span className="block h-px w-3 flex-shrink-0 bg-espresso/40" />
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

        <Reassurance className="mt-3 justify-center text-espresso/75" />
      </div>
    </section>
  );
}
