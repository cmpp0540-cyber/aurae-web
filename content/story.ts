/**
 * Copy + layout for the scroll-driven hero (components/landing/HeroScroll.tsx).
 *
 * Order here is the order of the story as you scroll — morning to night.
 * Ingredient facts come straight from the product copy in content/products.ts
 * and the pack labels; the benefit lines are the label's own structure/function
 * wording. Edit freely, but keep them in line with what is on the bottle.
 *
 * `chips` positions are percentages of the stage: x/y is the chip's anchor
 * (centre), separately for desktop (`d`) and phones (`m`). A chip with no `m`
 * is hidden on phones.
 */

export type StoryChip = {
  name: string;
  note: string;
  d: { x: number; y: number };
  m?: { x: number; y: number };
};

export type StoryProduct = {
  handle: string;
  /** Short name on the pack. */
  name: string;
  /** File in /public/images/products. */
  image: string;
  /** width / height of the image, for layout before it loads. */
  aspect: number;
  /** Where the bottle sits in the opening "fan" (stage %, rotation in degrees). */
  fan: { d: { x: number; y: number; s: number; r: number }; m: { x: number; y: number; s: number; r: number } };
  /** Background the stage eases to while this product is in focus. */
  bg: string;
  chips: StoryChip[];
};

export const STORY: StoryProduct[] = [
  {
    handle: 'grass-fed-hydrolyzed-collagen-peptides',
    name: 'GLOW',
    image: '/images/products/glow.webp',
    aspect: 0.752,
    fan: {
      d: { x: 50, y: 56, s: 0.92, r: 0 },
      m: { x: 50, y: 56, s: 0.85, r: 0 },
    },
    bg: '#EC6F6E',
    chips: [
      { name: 'Type 1 collagen', note: 'Skin*', d: { x: 22, y: 30 }, m: { x: 27, y: 7 } },
      { name: 'Type 3 collagen', note: 'Hair & muscles*', d: { x: 78, y: 36 }, m: { x: 73, y: 15 } },
      { name: 'Grass-fed bovine', note: 'Hydrolyzed peptides', d: { x: 20, y: 66 }, m: { x: 27, y: 23 } },
      { name: 'Unflavoured', note: 'Dissolves clear', d: { x: 80, y: 70 } },
    ],
  },
  {
    handle: 'nad',
    name: 'RENEWAL',
    image: '/images/products/renewal.webp',
    aspect: 0.658,
    fan: {
      d: { x: 87, y: 36, s: 0.62, r: 8 },
      m: { x: 84, y: 40, s: 0.45, r: 6 },
    },
    bg: '#E98458',
    chips: [
      { name: 'NAD+ 500mg', note: 'Cellular energy*', d: { x: 22, y: 32 }, m: { x: 27, y: 7 } },
      { name: 'Quercetin', note: 'Cognition*', d: { x: 79, y: 38 }, m: { x: 73, y: 15 } },
      { name: 'Resveratrol 98%', note: 'Healthy aging*', d: { x: 20, y: 68 }, m: { x: 27, y: 23 } },
    ],
  },
  {
    handle: 'resveratrol-50-600mg',
    name: 'RADIANCE',
    image: '/images/products/radiance.webp',
    aspect: 0.558,
    fan: {
      d: { x: 33, y: 58, s: 0.7, r: -5 },
      m: { x: 16, y: 40, s: 0.45, r: -6 },
    },
    bg: '#A85AB8',
    chips: [
      { name: 'Trans-resveratrol 50%', note: '600mg · antioxidant*', d: { x: 22, y: 30 }, m: { x: 27, y: 7 } },
      { name: 'Japanese knotweed', note: 'Concentrated source', d: { x: 79, y: 40 }, m: { x: 73, y: 15 } },
      { name: 'Heart health', note: 'Healthy aging*', d: { x: 21, y: 68 }, m: { x: 27, y: 23 } },
    ],
  },
  {
    handle: 'ashwagandha-plus',
    name: 'CALM',
    image: '/images/products/calm.webp',
    aspect: 0.658,
    fan: {
      d: { x: 69, y: 50, s: 0.7, r: 6 },
      m: { x: 84, y: 74, s: 0.45, r: 6 },
    },
    bg: '#D15D8E',
    chips: [
      { name: 'KSM-66 ashwagandha', note: '600mg · calm*', d: { x: 21, y: 28 }, m: { x: 27, y: 7 } },
      { name: 'Vitamins D3, B6, B12', note: 'Energy*', d: { x: 79, y: 34 }, m: { x: 73, y: 15 } },
      { name: 'Maca & panax ginseng', note: 'Vitality*', d: { x: 19, y: 64 }, m: { x: 27, y: 23 } },
      { name: 'Shatavari & L-arginine', note: 'Overall wellness*', d: { x: 81, y: 70 } },
    ],
  },
  {
    handle: 'sleep-strips',
    name: 'SLEEP',
    image: '/images/products/sleep.webp',
    aspect: 0.547,
    fan: {
      d: { x: 13, y: 64, s: 0.72, r: -8 },
      m: { x: 20, y: 74, s: 0.45, r: -6 },
    },
    bg: '#BE5A9E',
    chips: [
      { name: 'Valerian', note: 'Sleep*', d: { x: 22, y: 30 }, m: { x: 27, y: 7 } },
      { name: 'Chamomile', note: 'Relaxation*', d: { x: 78, y: 34 }, m: { x: 73, y: 15 } },
      { name: 'Lavender & hibiscus', note: 'Wind-down', d: { x: 20, y: 66 }, m: { x: 27, y: 23 } },
      { name: 'Melatonin', note: 'Overall well-being*', d: { x: 80, y: 70 } },
    ],
  },
];
