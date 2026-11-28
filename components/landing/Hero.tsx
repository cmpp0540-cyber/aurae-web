import Link from 'next/link';
import { HERO_PILLARS, HERO_PILLARS_MOBILE, SITE } from '@/content/site';
import type { HeroPillar } from '@/content/site';
import { HERO_BLUR_DATA_URL, HERO_CORAL } from '@/lib/hero-blur';
import SmartImage from '@/components/ui/SmartImage';
import { TrustBadges } from '@/components/layout/TrustBar';

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
  // A new filename, not a new upload under the old one: phones cache the
  // hero hard, and the last reshoot had us chasing a stale image for an
  // afternoon.
  src: '/images/aurae-hero-mobile-v3.webp',
  alt: 'The full Aurae line in two rows — GLOW, RENEWAL, RADIANCE and CALM above; FLORA, RELEASE, VITAL and STILL below — on a pale peach background with an iridescent glass ribbon behind them',
};

/**
 * The tall image is lit unevenly, so a single flat colour would show a seam.
 * These gradients are the image's own top and bottom edge, sampled left to
 * right; the colour blocks above and below the photo continue them.
 */
const MOBILE_TOP =
  'linear-gradient(90deg,#FEEDE3,#FEECE0,#FCEBDE,#FCE9DC,#FBE5D9,#F9E1D5,#F6DCD0,#F1D8CB,#F0D4C8)';
const MOBILE_BOTTOM =
  'linear-gradient(90deg,#F3D9CE,#F0D5C9,#F4D9CC,#F2D6CB,#F3D8CD,#EFDBD2,#EFD8CD,#EFD4C9,#F6DFD5)';

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
  /* The size lives on the <li>, not the <ul>, so a caller cannot shrink the
     row by putting a text size in `className` — it would be overridden. This
     prop is the way to change it. */
  itemClassName = 'text-[11px]',
  style,
}: {
  className?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`} style={style}>
      {SITE.hero.reassurance.map((item) => (
        <li
          key={item.text}
          className={`flex items-center gap-1.5 whitespace-nowrap font-semibold uppercase tracking-[0.1em] ${itemClassName}`}
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

/**
 * The hero's support line, rendered in two places.
 *
 * On a phone it sits BELOW the photograph, in the actions band, where it
 * introduces the buttons rather than crowding the headline. From `lg` up it
 * sits under the headline in the floating copy block, because there the
 * photograph is beside the text, not above it.
 *
 * One component, two mountings, each hidden at the other's breakpoint — so
 * the markup exists twice but only ever one is rendered, and the wording and
 * styling can never drift apart.
 *
 * Sentence case at reading size, the brand sans at its normal weight, in a
 * softened espresso — the shape of a hero subhead rather than a caption.
 *
 * NO HARD BREAK, and no width cap on a phone: the line runs the full content
 * width, so it measures exactly as wide as the primary button beneath it.
 * `text-balance` then divides it into even lines instead of leaving one long
 * and one short. A manual break would fight that — it fixes the split at one
 * width and stops balance working at every other. The 38ch cap applies only
 * from `lg`, where the copy floats in a column beside the photograph.
 *
 * Espresso on the phone band; pink with the hero shadow on the desktop
 * photograph, where a dark ink would lose the letters entirely.
 */
function Tagline({ className = '' }: { className?: string }) {
  return (
    <p
      className={[
        'text-balance text-[13px] font-semibold leading-[1.4] text-espresso/65',
        'lg:u-hero-shadow lg:max-w-[38ch] lg:text-[14px] lg:text-[#FFE3EA]/90',
        className,
      ].join(' ')}
    >
      {SITE.hero.taglineLead} {SITE.hero.taglineTail}
    </p>
  );
}

function DesktopActions() {
  return (
    <div className="mt-8 hidden lg:block">
      <div className="flex flex-wrap items-center gap-5">
        {/* Both CTAs are full pills. The secondary used to be an underlined
            text link, which read as a footnote beside a filled button; as an
            outlined pill of the same height it reads as the second of two
            choices, which is what it is. */}
        <Link href="#shop" className="btn-cream rounded-full">
          {SITE.hero.primaryCta}
        </Link>
        <Link
          href="#rituals"
          className="btn u-hero-shadow rounded-full border-2 px-9 py-[17px] transition-colors duration-300 hover:bg-cream hover:text-coral"
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
      <div className="animate-fade-up bg-[image:var(--m-top)] px-6 pb-0 pt-4 text-center lg:absolute lg:left-[4%] lg:top-[7%] lg:z-10 lg:w-[40%] lg:bg-none lg:px-0 lg:pb-0 lg:pt-0 lg:text-left">
        <h1
          className="font-display font-semibold leading-[1.08] tracking-[-0.01em] text-espresso lg:u-hero-shadow lg:text-[#FFE3EA]"
          style={{ fontSize: 'clamp(2.5rem, 4.6vw, 4.25rem)' }}
        >
          {/* Hard break, not a natural wrap: the line has to split in the
              same place at every width, because the colour change lands on
              it. Left to wrap, a narrow column would put "in" on the first
              line and the coral would start mid-phrase. */}
          {SITE.hero.titleLead}
          <br />
          <em className="italic text-coral lg:text-[#FFE3EA]">{SITE.hero.titleItalic}</em>
        </h1>

        <Tagline className="mt-4" />

        {/* Phone actions, above the photograph.

            The whole call to action — buttons, reassurance, marks — now sits
            between the copy and the picture, so a phone reads headline,
            promise, button without scrolling past the bottles first. The
            band below the photograph is gone with it; the copy band's own
            paint carries the seam.

            On desktop this is hidden and DesktopActions takes over, because
            there the photograph is beside the text rather than under it. */}
        <div className="flex flex-col items-center pb-0 pt-6 lg:hidden">
          <Link href="#shop" className="btn-dark w-full rounded-full">
            {SITE.hero.primaryCta}
          </Link>
          {/* One row, never two. Measured: at 10px with a 16px gap the two
              claims come to exactly the width of a 360px phone, and 11px
              overflows it. Do not raise the size or the tracking here
              without re-measuring at 360. */}
          <Reassurance
            className="mt-5 flex-nowrap justify-center gap-x-4 text-espresso/75"
            itemClassName="text-[10px]"
          />
        </div>

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
                  'u-hero-shadow block animate-float whitespace-nowrap text-[13px] font-light uppercase tracking-[0.14em] xl:text-[15px]',
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
      <div className="relative aspect-[8/9] w-full lg:hidden">
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

        {/* Tap a bottle to open it — its own column, within its row. */}
        {HERO_PILLARS_MOBILE.map((pillar) =>
          pillar.handle ? (
            <Link
              key={pillar.product}
              href={`/product/${pillar.handle}`}
              className="absolute z-10"
              style={{
                left: `${pillar.left}%`,
                width: `${pillar.width}%`,
                top: pillar.row === 'top' ? '13%' : '50.5%',
                height: pillar.row === 'top' ? '37%' : '31%',
              }}
            >
              <span className="sr-only">
                {pillar.label} — shop {pillar.product}
              </span>
            </Link>
          ) : null,
        )}

        {/*
          Benefit labels, in the empty strip above or below their own row.

          They used to sit in the left and right margins, one per vertical
          band. Two rows of four leaves no such bands, so each label is
          centred on its product's column instead and the rule turned from
          horizontal to vertical. 5% clears the GLOW tub, which is the
          tallest thing in the back row; 87% clears the front row's feet.
          Both are measured against the 8:9 crop — recrop and they move.
        */}
        <ul aria-hidden className="pointer-events-none">
          {HERO_PILLARS_MOBILE.map((pillar) => {
            const top = pillar.row === 'top';
            return (
              <li
                key={pillar.product}
                className="absolute z-20 -translate-x-1/2"
                style={{ left: `${pillar.x}%`, top: top ? '5%' : '87%' }}
              >
                <span
                  className={[
                    'flex items-center gap-1',
                    // Reversed below, so the rule always points at the row.
                    top ? 'flex-col' : 'flex-col-reverse',
                  ].join(' ')}
                >
                  {/* Same face and weight as the desktop pillars and the hero
                      tagline — Inter light, uppercase. Tracking is 0.10em
                      rather than their 0.14em: these labels are boxed to
                      68px and sit in columns about that wide, so the extra
                      letter-space would push them into their neighbours. */}
                  <span className="block max-w-[68px] break-words text-center text-[9px] font-light uppercase leading-tight tracking-[0.10em] text-espresso/80">
                    {pillar.label}
                  </span>
                  <span className="block h-2.5 w-px flex-shrink-0 bg-espresso/40" />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The secondary call to action, below the photograph on a phone.

          Split from the primary on purpose: the filled button sits above the
          picture where it catches the first look, and this one waits under
          the bottles for whoever scrolled past it. On desktop DesktopActions
          keeps the pair together, because there they share a line. */}
      <div className="px-6 pb-10 pt-6 lg:hidden" style={{ backgroundImage: MOBILE_BOTTOM }}>
        <Link
          href="#rituals"
          className="btn w-full rounded-full border-2 border-espresso px-9 py-[17px] text-espresso transition-colors duration-300 hover:bg-espresso hover:text-ivory"
        >
          {SITE.hero.secondaryCta} →
        </Link>

        {/* The manufacturing marks close the hero. The yellow TrustBar strip
            is desktop-only for this reason — both draw from the same BADGES
            list in TrustBar.tsx.

            One row, guaranteed. Measured from the badges' own intrinsic
            sizes: at 40px tall with a 16px gap the four come to 291px, which
            clears a 360px phone's 312px of content width; 44px does not.
            `flex-nowrap` holds the row, so raising either number pushes a
            badge off the screen rather than wrapping it. */}
        <TrustBadges className="mt-8 flex-nowrap gap-x-4" imgClassName="h-10 w-auto opacity-80" />
      </div>
    </section>
  );
}
