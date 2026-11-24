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

export default function TrustBar() {
  return (
    <div className="bg-sun">
      <div className="shell">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 py-8 sm:gap-x-16 sm:py-9">
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
                className="h-9 w-auto opacity-90 sm:h-11"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
