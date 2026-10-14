import { SITE } from '@/content/site';

/**
 * The yellow strip under the hero: a slow, endless marquee.
 *
 * The list is repeated so the loop never shows a gap, and the second copy is
 * hidden from screen readers. It pauses on hover/touch, fades at the edges, and
 * the global `prefers-reduced-motion` rule in globals.css stops the movement.
 */
export default function TrustBar() {
  // Two copies per half so even a wide desktop never runs out of items.
  const half = [...SITE.trustBar, ...SITE.trustBar];

  return (
    <div
      className="group overflow-hidden bg-sun"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
      }}
    >
      <div className="flex w-max animate-marquee py-4 will-change-transform group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex flex-shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
          >
            {half.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex flex-shrink-0 items-center gap-3 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.15em] text-espresso sm:text-[11px]"
              >
                <span aria-hidden className="text-coral">
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
