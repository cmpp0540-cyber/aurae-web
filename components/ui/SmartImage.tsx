'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { accentBlurDataUrl, type AccentKey } from '@/lib/accents';
import ImageSkeleton from './ImageSkeleton';

type BaseProps = {
  src: string;
  alt: string;
  /** Picks the blur + skeleton tint. Defaults to the coral "glow" palette. */
  accent?: AccentKey | string;
  /**
   * Overrides the accent gradient with a real blurred preview. Worth it for
   * photography, where a tiny inlined thumbnail of the actual image beats a
   * two-stop gradient; the accent default stays right for packshots.
   */
  blurDataURL?: string;
  sizes: string;
  priority?: boolean;
  /**
   * Force `loading="eager"` without `priority`'s preload <link>.
   *
   * For images that must arrive but should not compete with the LCP element —
   * the carousel frames behind the active one, for instance. Lazy loading is
   * viewport-driven, and anything stacked behind a visible sibling is a poor
   * fit for it: some engines never trigger the fetch at all.
   */
  eager?: boolean;
  quality?: number;
  /** Classes for the wrapper box (sizing, rounding, background). */
  className?: string;
  /** Classes for the <img> itself (object-fit, hover transforms). */
  imgClassName?: string;
  /** Turn the shimmer off for tiny thumbnails where it is just noise. */
  shimmer?: boolean;
  onLoaded?: () => void;
};

type Props =
  | (BaseProps & { fill: true; width?: never; height?: never })
  | (BaseProps & { fill?: false; width: number; height: number });

/**
 * next/image plus a loading state.
 *
 * Three layers, in order:
 *   1. `placeholder="blur"` paints the accent gradient inline, before any
 *      network request — so the box is never empty, not even for a frame.
 *   2. A shimmer sweeps over it while the photo is in flight.
 *   3. The photo fades in over 500ms once decoded.
 *
 * The wrapper owns the dimensions, so the placeholder occupies exactly the
 * space the final image will — no layout shift.
 */
export default function SmartImage({
  src,
  alt,
  accent,
  blurDataURL,
  sizes,
  priority = false,
  eager = false,
  quality = 75,
  className = '',
  imgClassName = '',
  shimmer = true,
  onLoaded,
  fill,
  width,
  height,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const markLoaded = useCallback(() => {
    setLoaded(true);
    onLoaded?.();
  }, [onLoaded]);

  /**
   * An image already in the HTTP cache can finish decoding before React
   * attaches its onLoad handler, which would strand the skeleton on screen
   * forever. Checking `complete` at ref time closes that race.
   */
  const captureRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth > 0) markLoaded();
    },
    [markLoaded],
  );

  /*
   * The CDN loader can only produce width variants for Shopify URLs; a local
   * file passes through untouched. Left "optimized", Next would emit a srcset
   * listing the same file under a dozen different width descriptors — noise in
   * the HTML describing variants that do not exist. Local assets are
   * pre-optimised on disk instead, so declare them as the single file they are.
   */
  const isLocal = !src.startsWith('http');

  const shared = {
    src,
    alt,
    sizes,
    quality,
    unoptimized: isLocal,
    priority,
    // priority already implies eager; otherwise wait for the viewport unless
    // the call site has a reason not to.
    loading: priority || eager ? ('eager' as const) : ('lazy' as const),
    // Eager-but-not-priority images are background work (carousel frames the
    // visitor has not asked for yet) — they must never contend with the LCP.
    fetchPriority: priority ? ('high' as const) : eager ? ('low' as const) : undefined,
    placeholder: 'blur' as const,
    blurDataURL: blurDataURL ?? accentBlurDataUrl(accent),
    ref: captureRef,
    onLoad: markLoaded,
    onError: markLoaded,
    className: [
      'transition-opacity duration-500 ease-aurae',
      loaded ? 'opacity-100' : 'opacity-0',
      imgClassName,
    ].join(' '),
  };

  return (
    /*
     * `fill` means "cover the parent box", so the wrapper is absolutely
     * positioned over it — exactly what a bare <Image fill> did. This has to
     * live here rather than in a caller-supplied class: Tailwind emits
     * `relative` after `absolute`, so a hard-coded `relative` would silently
     * win over any `absolute` passed in and drop stacked images into normal
     * flow (which is how the carousel ended up eight frames tall).
     */
    <span
      className={[fill ? 'absolute inset-0' : 'relative', 'block overflow-hidden', className].join(
        ' ',
      )}
    >
      {fill ? (
        <Image {...shared} fill />
      ) : (
        <Image {...shared} width={width!} height={height!} />
      )}

      <span
        className={[
          'absolute inset-0 z-10 transition-opacity duration-500 ease-aurae',
          loaded ? 'pointer-events-none opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        <ImageSkeleton accent={accent} animate={shimmer && !loaded} />
      </span>
    </span>
  );
}
