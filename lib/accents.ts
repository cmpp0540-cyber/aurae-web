/**
 * Per-product accent palettes, carried over from the v4 homepage prototype.
 * Tailwind needs literal class strings, so these are written out in full
 * rather than composed at runtime.
 */

import { gradientBlurDataUrl } from './blur';

export type AccentKey = 'glow' | 'calm' | 'sleep' | 'radiance' | 'renewal' | 'ritual';

export type Accent = {
  key: AccentKey;
  /** Soft gradient used behind product imagery. */
  imageGradient: string;
  /** Wider, airier gradient for full-bleed sections. */
  sectionGradient: string;
  /** Small chip / tag. */
  chip: string;
  /** Solid dot or rule. */
  dot: string;
  /** Raw hex, for inline SVG strokes. */
  hex: string;
  /** The two stops behind this accent's imagery, reused for blur placeholders. */
  blur: [from: string, to: string];
};

export const ACCENTS: Record<AccentKey, Accent> = {
  glow: {
    key: 'glow',
    imageGradient: 'bg-[linear-gradient(135deg,#FFE5D9,#FFA9A3)]',
    sectionGradient: 'bg-[linear-gradient(180deg,#FFF8F0_0%,#FFE5D9_100%)]',
    chip: 'bg-blush text-coral',
    dot: 'bg-coral',
    hex: '#FF6F91',
    blur: ['#FFE5D9', '#FFA9A3'],
  },
  calm: {
    key: 'calm',
    imageGradient: 'bg-[linear-gradient(135deg,#E8D5F0,#D4A5D4)]',
    sectionGradient: 'bg-[linear-gradient(180deg,#FFF8F0_0%,#F1E4F6_100%)]',
    chip: 'bg-[#F1E4F6] text-[#8E5B94]',
    dot: 'bg-[#D4A5D4]',
    hex: '#D4A5D4',
    blur: ['#E8D5F0', '#D4A5D4'],
  },
  sleep: {
    key: 'sleep',
    imageGradient: 'bg-[linear-gradient(135deg,#D5E8F2,#A8D8F0)]',
    sectionGradient: 'bg-[linear-gradient(180deg,#FFF8F0_0%,#E2F1F9_100%)]',
    chip: 'bg-[#E2F1F9] text-[#3E7C99]',
    dot: 'bg-[#A8D8F0]',
    hex: '#7FC4E8',
    blur: ['#D5E8F2', '#A8D8F0'],
  },
  radiance: {
    key: 'radiance',
    imageGradient: 'bg-[linear-gradient(135deg,#FFE5D9,#FFB366)]',
    sectionGradient: 'bg-[linear-gradient(180deg,#FFF8F0_0%,#FFEBD6_100%)]',
    chip: 'bg-[#FFEBD6] text-[#B96F1F]',
    dot: 'bg-[#FFB366]',
    hex: '#FFB366',
    blur: ['#FFE5D9', '#FFB366'],
  },
  renewal: {
    key: 'renewal',
    imageGradient: 'bg-[linear-gradient(135deg,#D5E8DD,#B8D4C8)]',
    sectionGradient: 'bg-[linear-gradient(180deg,#FFF8F0_0%,#E3F1EA_100%)]',
    chip: 'bg-[#E3F1EA] text-[#3F7A61]',
    dot: 'bg-[#B8D4C8]',
    hex: '#8FBCA6',
    blur: ['#D5E8DD', '#B8D4C8'],
  },
  ritual: {
    key: 'ritual',
    imageGradient: 'bg-[linear-gradient(135deg,#FFE5D9,#FFD66B)]',
    sectionGradient: 'bg-[linear-gradient(180deg,#FFE5D9_0%,#FFF8F0_100%)]',
    chip: 'bg-sun/30 text-espresso',
    dot: 'bg-sun',
    hex: '#FFD66B',
    blur: ['#FFE5D9', '#FFD66B'],
  },
};

export function accentFor(key: AccentKey | string | undefined): Accent {
  return ACCENTS[(key as AccentKey) ?? 'glow'] ?? ACCENTS.glow;
}

/** Inline blur placeholder matching an accent's image gradient. */
export function accentBlurDataUrl(key: AccentKey | string | undefined): string {
  const [from, to] = accentFor(key).blur;
  return gradientBlurDataUrl(from, to);
}
