'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AccentKey } from '@/lib/accents';
import type { AuraeImage } from '@/lib/types';
import ImageSkeleton from '@/components/ui/ImageSkeleton';
import SmartImage from '@/components/ui/SmartImage';

type Props = {
  images: AuraeImage[];
  title: string;
  /** Accent gradient class behind the image. */
  gradientClass: string;
  accent?: AccentKey | string;
};

/** If the first frame is slow or cached oddly, start the rest anyway. */
const WARM_FALLBACK_MS = 1200;

/**
 * Image carousel for the product hero.
 *
 * Supports any number of Shopify images: thumbnail strip, keyboard arrows,
 * swipe, and a counter. With a single image it renders as a plain figure with
 * no controls.
 *
 * Loading strategy — the first frame is `priority`, so it is preloaded and gets
 * the high-priority fetch slot on its own. Once it lands (or after a short
 * fallback) every remaining frame mounts at once and streams in behind the
 * scenes, which is what makes thumbnail clicks instant afterwards.
 *
 * Mounting all of them is the preload: with the Shopify CDN loader each frame
 * is ~15-25 KB of WebP, so a full 8-image gallery costs less than a fifth of
 * what a single unoptimised source PNG did. Warming them through a separate
 * `new Image()` pass would risk requesting a width the browser's srcset never
 * picks, and fetching everything twice.
 */
export default function ProductGallery({ images, title, gradientClass, accent }: Props) {
  const [active, setActive] = useState(0);
  const [warm, setWarm] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  const total = images.length;

  const go = useCallback(
    (next: number) => {
      if (!total) return;
      setActive(((next % total) + total) % total);
    },
    [total],
  );

  const prev = useCallback(() => go(active - 1), [active, go]);
  const next = useCallback(() => go(active + 1), [active, go]);

  // Failsafe: never leave the rest of the gallery unmounted because the first
  // image's load event did not arrive.
  useEffect(() => {
    if (warm || total < 2) return;
    const timer = window.setTimeout(() => setWarm(true), WARM_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [warm, total]);

  useEffect(() => {
    if (total < 2) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') prev();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, total]);

  // Keep the active thumbnail in view on narrow screens.
  useEffect(() => {
    const strip = thumbsRef.current;
    const button = strip?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    button?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  if (!total) {
    return (
      <div className={['relative aspect-square w-full rounded-[22px]', gradientClass].join(' ')}>
        <ImageSkeleton accent={accent} animate={false} className="rounded-[22px]" />
      </div>
    );
  }

  const current = images[active];

  return (
    <div className="w-full min-w-0 max-w-full">
      <div
        className={[
          'relative aspect-square w-full overflow-hidden rounded-[22px]',
          gradientClass,
        ].join(' ')}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchStartX.current;
          const end = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (start == null || end == null) return;
          const delta = end - start;
          if (Math.abs(delta) < 40) return;
          if (delta > 0) prev();
          else next();
        }}
      >
        {images.map((image, index) => {
          // Frame 0 paints immediately; the rest join once it has landed. The
          // active frame is always mounted so a fast click is never blank.
          if (index !== 0 && index !== active && !warm) return null;

          return (
            <SmartImage
              key={image.url}
              src={image.url}
              alt={image.altText ?? `${title} — image ${index + 1} of ${total}`}
              accent={accent}
              fill
              priority={index === 0}
              // Frames 1..n are stacked behind frame 0, so they are technically
              // "in viewport" and lazy loading is unreliable for them. Once the
              // hero frame is in, fetch the rest outright — at ~20 KB of WebP
              // each that is cheaper than one unoptimised source PNG.
              eager={index !== 0}
              quality={index === 0 ? 80 : 72}
              sizes="(max-width: 1024px) 100vw, 620px"
              onLoaded={index === 0 ? () => setWarm(true) : undefined}
              // SmartImage positions `fill` wrappers absolutely, so the frames
              // already stack; this only drives the crossfade between them.
              className={[
                'transition-opacity duration-500 ease-aurae',
                index === active ? 'z-[1] opacity-100' : 'pointer-events-none opacity-0',
              ].join(' ')}
              imgClassName="object-cover"
              shimmer={index === active}
            />
          );
        })}

        {total > 1 ? (
          <span className="absolute bottom-4 right-4 z-[2] rounded-full bg-espresso/70 px-3 py-1 text-[11px] font-semibold tabular-nums text-ivory backdrop-blur">
            {active + 1} / {total}
          </span>
        ) : null}
      </div>

      {/* Thumbnails */}
      {total > 1 ? (
        <div
          ref={thumbsRef}
          className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1"
          role="tablist"
          aria-label={`${title} images`}
        >
          {images.map((image, index) => (
            <button
              key={image.url}
              data-index={index}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show image ${index + 1}`}
              onClick={() => setActive(index)}
              className={[
                // One fixed size at every breakpoint. A responsive thumbnail
                // makes the preload scanner guess one candidate and layout pick
                // another, so each one downloads twice.
                'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 ease-aurae',
                index === active
                  ? 'ring-2 ring-coral ring-offset-2 ring-offset-cream'
                  : 'opacity-60 hover:opacity-100',
              ].join(' ')}
            >
              <SmartImage
                src={image.url}
                alt=""
                accent={accent}
                fill
                eager
                quality={60}
                sizes="80px"
                shimmer={false}
                className="h-full w-full"
                imgClassName="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {current.altText ?? `Image ${active + 1} of ${total}`}
      </p>
    </div>
  );
}
