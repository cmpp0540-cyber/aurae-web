import type { BenefitIcon } from '@/content/products';

type Props = {
  name: BenefitIcon;
  /** Stroke colour — pass the product accent hex. */
  color?: string;
  className?: string;
};

/**
 * Decorative line glyphs for benefit cards: concentric circles, a star, a
 * bloom, a wave, an orbit, a moon, a spark. Deliberately thin-stroked and
 * geometric so they read as Aurae rather than as stock iconography.
 */
export default function Glyph({ name, color = '#FF6F91', className = '' }: Props) {
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth: 1.25,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <svg
      viewBox="0 0 48 48"
      className={['h-11 w-11', className].join(' ')}
      aria-hidden
      role="presentation"
    >
      {name === 'circles' && (
        <g {...common}>
          <circle cx="24" cy="24" r="16" />
          <circle cx="24" cy="24" r="10" opacity="0.65" />
          <circle cx="24" cy="24" r="4" opacity="0.4" />
        </g>
      )}

      {name === 'star' && (
        <g {...common}>
          <path d="M24 6v36M6 24h36" />
          <path d="M12 12l24 24M36 12L12 36" opacity="0.5" />
          <circle cx="24" cy="24" r="5" opacity="0.7" />
        </g>
      )}

      {name === 'bloom' && (
        <g {...common}>
          <path d="M24 24c0-9 5-14 5-14s-5 5-5 14zM24 24c0-9-5-14-5-14s5 5 5 14z" />
          <path d="M24 24c-9 0-14 5-14 5s5-5 14-5zM24 24c9 0 14 5 14 5s-5-5-14-5z" opacity="0.7" />
          <circle cx="24" cy="24" r="3.2" />
          <path d="M24 27v13" opacity="0.5" />
        </g>
      )}

      {name === 'wave' && (
        <g {...common}>
          <path d="M6 20c4.5 0 4.5-6 9-6s4.5 6 9 6 4.5-6 9-6 4.5 6 9 6" />
          <path d="M6 30c4.5 0 4.5-6 9-6s4.5 6 9 6 4.5-6 9-6 4.5 6 9 6" opacity="0.6" />
          <path d="M6 40c4.5 0 4.5-6 9-6s4.5 6 9 6 4.5-6 9-6 4.5 6 9 6" opacity="0.3" />
        </g>
      )}

      {name === 'orbit' && (
        <g {...common}>
          <circle cx="24" cy="24" r="6" />
          <ellipse cx="24" cy="24" rx="17" ry="7.5" />
          <ellipse cx="24" cy="24" rx="17" ry="7.5" transform="rotate(60 24 24)" opacity="0.6" />
          <ellipse cx="24" cy="24" rx="17" ry="7.5" transform="rotate(120 24 24)" opacity="0.35" />
        </g>
      )}

      {name === 'moon' && (
        <g {...common}>
          <path d="M29 8a16 16 0 1 0 11 27A16 16 0 0 1 29 8z" />
          <path d="M14 14l1.6 3.4L19 19l-3.4 1.6L14 24l-1.6-3.4L9 19l3.4-1.6z" opacity="0.7" />
        </g>
      )}

      {name === 'spark' && (
        <g {...common}>
          <path d="M24 5l3.4 12.2L39 21l-11.6 3.8L24 37l-3.4-12.2L9 21l11.6-3.8z" />
          <circle cx="37" cy="38" r="2.6" opacity="0.7" />
          <circle cx="11" cy="37" r="1.8" opacity="0.5" />
        </g>
      )}
    </svg>
  );
}
