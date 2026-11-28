import Link from 'next/link';
import { SITE } from '@/content/site';

/**
 * The scrolling strip above the header.
 *
 * One bar, not two. This is the most valuable band on the page — above the
 * logo, first thing anyone sees — and splitting it between two messages means
 * neither gets read. A marquee buys that space back: several facts share one
 * strip because they arrive one at a time rather than competing for it.
 *
 * True black, not the brand espresso. Espresso is warm and soft — correct for
 * the footer, which should recede, wrong here, where the strip is meant to be
 * the hardest edge on the page. White on black is 21:1, the highest contrast
 * there is, which is what lets the type be this heavy without looking cheap.
 *
 * The weight is Inter 700, the heaviest the font link in app/layout.tsx
 * actually loads. Do not reach for font-extrabold here without adding 800 to
 * that link first — the browser will fake the weight by smearing the 700, and
 * at this size that reads as blur rather than as bold.
 *
 * HOW THE LOOP WORKS. The track holds the same sequence twice and slides from
 * 0 to -50% — exactly one copy's width — then snaps back. The second copy is
 * pixel-identical and sits immediately after the first, so the snap lands on
 * the same picture and the seam is invisible.
 *
 * Three details keep it that way:
 *
 *  1. The track is `w-max`, so it measures its real content width instead of
 *     the viewport. Without this, -50% is half the screen, not half the track,
 *     and the loop jumps.
 *  2. One copy has to be WIDER THAN THE WIDEST SCREEN, or the strip empties out
 *     before it wraps. Three short lines are roughly 900px, which leaves a gap
 *     on a desktop monitor, so the sequence repeats REPEATS times inside each
 *     copy. Shorten the list and this is the number to raise.
 *  3. The second copy is `aria-hidden`, so screen readers read the list once.
 *
 * The strip pauses on hover, so nobody has to chase a moving link, and
 * `motion-reduce` stops it outright for anyone who asked their system for less
 * movement — a band that never stops moving is a real problem for vestibular
 * disorders, and this one sits on every page.
 */
const REPEATS = 3;

export default function AnnouncementBar() {
  const sequence = Array.from({ length: REPEATS }, () => SITE.announcements).flat();

  return (
    <div className="relative overflow-hidden bg-black">
      <Link
        href="/#products"
        aria-label={SITE.announcements.join('. ')}
        className="flex w-max animate-marquee items-center [animation-duration:30s] hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
            {sequence.map((item, index) => (
              <span key={`${copy}-${index}`} className="flex shrink-0 items-center">
                <span className="px-6 py-[4px] text-[13px] font-bold uppercase tracking-[0.03em] text-white">
                  {item}
                </span>
                <span aria-hidden className="text-[10px] text-white">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </Link>
    </div>
  );
}
