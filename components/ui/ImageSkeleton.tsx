import { accentFor, type AccentKey } from '@/lib/accents';

type Props = {
  /** Tints the placeholder with the product's palette instead of neutral grey. */
  accent?: AccentKey | string;
  /** Extra classes — usually rounding, so the skeleton matches its container. */
  className?: string;
  /** Set false for a static placeholder (respects reduced motion automatically). */
  animate?: boolean;
};

/**
 * Loading placeholder for imagery: the product's accent gradient with a
 * highlight sweeping across it.
 *
 * Absolutely positioned, so the parent needs `relative` and its own size —
 * every call site already wraps images in a fixed-ratio box, so the skeleton
 * inherits the exact final dimensions and nothing shifts when the photo lands.
 */
export default function ImageSkeleton({ accent, className = '', animate = true }: Props) {
  const palette = accentFor(accent);

  return (
    <span
      aria-hidden
      className={[
        'pointer-events-none absolute inset-0 overflow-hidden',
        palette.imageGradient,
        className,
      ].join(' ')}
    >
      {animate ? (
        <span className="absolute inset-0 -translate-x-full animate-shimmer bg-[linear-gradient(90deg,transparent_0%,rgba(255,252,248,0.55)_50%,transparent_100%)]" />
      ) : null}
    </span>
  );
}
