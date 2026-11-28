/**
 * The strip under the hero: the four manufacturing marks, held still.
 *
 * This replaced a scrolling marquee of claims. Certification marks are read,
 * not skimmed — moving them undercuts the one thing they are there to do.
 *
 * The art is traced from the certificates in the brand's own supplier pack and
 * tinted to espresso rather than pure black, so the row sits in the page
 * instead of punching a hole in it. Intrinsic sizes are declared on each image
 * so nothing shifts while they load.
 *
 * On `sun`, the brand yellow. It is the only place the yellow runs full
 * width, which is what makes the strip register as its own statement rather
 * than a footnote to the hero — and espresso marks on yellow are the
 * highest-contrast pairing in the palette.
 *
 * DESKTOP ONLY. On a phone the same marks are rendered inside the hero,
 * under the buttons, where they back the call to action instead of arriving
 * after it. The row of badges is exported as `TrustBadges` so both places
 * draw from one list — add a badge here and it appears in both.
 */
const BADGES = [
  {
    src: '/images/badges/fda-registered.png',
    alt: 'FDA Registered Facility',
    width: 206,
    height: 115,
  },
  {
    src: '/images/badges/cgmp.png',
    alt: 'Current Good Manufacturing Practice certified',
    width: 166,
    height: 165,
  },
  {
    src: '/images/badges/us-based.png',
    alt: 'US-based fulfilment and operations',
    width: 167,
    height: 171,
  },
  {
    src: '/images/badges/formulated-usa.png',
    alt: 'Formulated in the USA',
    width: 207,
    height: 90,
  },
];

/** The row of marks on its own, for mounting anywhere. */
export function TrustBadges({
  className = '',
  imgClassName = 'h-9 w-auto opacity-90 sm:h-11',
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-6 ${className}`}>
      {BADGES.map((badge) => (
        <li key={badge.src}>
          {/* A plain img: these are small fixed-size PNGs, so the image
              pipeline would add indirection without buying anything. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={badge.src}
            alt={badge.alt}
            width={badge.width}
            height={badge.height}
            loading="lazy"
            decoding="async"
            className={imgClassName}
          />
        </li>
      ))}
    </ul>
  );
}

export default function TrustBar() {
  return (
    <div className="hidden bg-sun lg:block">
      <div className="shell">
        <TrustBadges className="py-8 sm:gap-x-16 sm:py-9" />
      </div>
    </div>
  );
}
