/**
 * Editorial layer for the three bundle pages.
 *
 * Name, image, price and compare-at price come from Shopify. This file adds
 * what Shopify has no field for: which products are inside (by handle), the
 * synergy argument, the timed ritual, and full-ritual testimonials.
 */

import type { AccentKey } from '@/lib/accents';
import type { Testimonial } from './products';

export type SynergyPoint = { title: string; text: string };

export type RitualSlot = {
  /** "Morning", "Midday", "Early evening", "Before bed" */
  time: string;
  /** Shopify handle of the product taken in this slot. */
  handle: string;
  dose: string;
  why: string;
};

export type BundleContent = {
  accent: AccentKey;
  eyebrow: string;
  tagline: string;
  /** 2–3 sentences. Bundle descriptions in Shopify are one line. */
  intro: string;
  /** Shopify handles of the products inside, in ritual order. */
  contains: string[];
  badge: string | null;
  /**
   * Everything below is optional. A bundle can ship with just its identity
   * — accent, eyebrow, tagline, intro, contains — and the page renders the
   * hero and the contents list without the deeper sections. That matters:
   * without an entry at all, BundleIncludes returns null and the page never
   * says what is in the box.
   *
   * Testimonials stay empty until there are real ones to quote.
   */
  synergy?: { headline: string; body: string; points: SynergyPoint[] };
  ritual?: { headline: string; note: string; slots: RitualSlot[] };
  testimonials?: Testimonial[];
  finalCta?: { headline: string; sub: string };
};

export const BUNDLE_CONTENT: Record<string, BundleContent> = {
  'the-unwind-ritual': {
    accent: 'calm',
    eyebrow: 'Two-formula ritual',
    tagline: 'Stress down. Head clear.',
    intro:
      'CALM brings KSM-66 ashwagandha at 600mg with eight supporting actives. STILL brings reishi with L-theanine, lemon balm and passion flower. One works on the stress response across the day, the other settles the mind without sedation — so you can wind down and still think straight.',
    contains: ['ashwagandha-plus', 'reishi-relax-gummies'],
    badge: null,
    synergy: {
      headline: 'One holds the floor. One catches the spikes.',
      body: 'Stress does not arrive evenly. There is the background level you carry all week, and there are the afternoons that go sideways. Most supplements pick one of those and ignore the other.',
      points: [
        {
          title: 'Baseline',
          text: 'CALM works on the background level. KSM-66 ashwagandha at 600mg with D3, B6, B12 and four botanicals — taken daily, it lowers the floor you are starting from.*',
        },
        {
          title: 'In the moment',
          text: 'STILL is for the spike. Reishi at 200mg with L-theanine and three calming botanicals, chewed at your desk when the day tightens, with no water and no wait.*',
        },
        {
          title: 'Neither one sedates',
          text: 'That is the constraint both formulas were built around. No melatonin anywhere in this ritual — you stay clear-headed, which is the only version of calm that is any use before four in the afternoon.',
        },
      ],
    },
    ritual: {
      headline: 'Your Unwind Ritual, hour by hour.',
      note: 'One fixed habit, one you reach for. The second is the point.',
      slots: [
        {
          time: 'Morning',
          handle: 'ashwagandha-plus',
          dose: 'Two capsules',
          why: 'With breakfast. CALM works on the whole day, so it goes in before the day starts rather than after it has already gone wrong.',
        },
        {
          time: 'When the day tightens',
          handle: 'reishi-relax-gummies',
          dose: 'One gummy',
          why: 'Mid-afternoon for most women. The full 200mg of reishi is in a single gummy, so one is a real dose — chew it, no water needed.',
        },
        {
          time: 'Evening, if you want it',
          handle: 'reishi-relax-gummies',
          dose: 'A second gummy',
          why: 'An hour before you want to wind down. Two a day is the ceiling; most women find one is enough once CALM has settled the baseline.',
        },
      ],
    },
    finalCta: {
      headline: 'Ready for calm that does not cost you the day?',
      sub: 'Baseline and spikes — one ritual, two formulas.',
    },
  },
  'the-gut-ritual': {
    accent: 'flora',
    eyebrow: 'Two-formula ritual',
    tagline: 'Everything your gut asks for.',
    intro:
      'FLORA seeds the gut with 40 billion CFU across four clinically studied strains, carried past stomach acid by MAKTREK Bi-Pass delivery and fed by prebiotic fibre. RELEASE adds a six-enzyme blend at a declared 2,500 HUT, so what you eat is actually broken down. Culture and digestion, handled together.',
    contains: ['probiotic-40-billion-with-prebiotics', 'digestive-enzyme-pro-blend'],
    badge: null,
    synergy: {
      headline: 'Fix the terrain. Handle the meal.',
      body: 'Gut supplements almost always solve one half of the problem. A probiotic changes what lives in your gut over weeks. An enzyme changes what happens to dinner tonight. Buy one and you are still waiting on the other.',
      points: [
        {
          title: 'Seed',
          text: 'FLORA delivers 40 billion CFU across four named strains, carried past stomach acid by MAKTREK® Bi-Pass delivery. This is the part that takes weeks and lasts.*',
        },
        {
          title: 'Feed',
          text: 'Prebiotic fibre — 24mg of FOS plus a marine polysaccharide — arrives in the same capsule, because cultures that land with nothing to eat do not stay long.*',
        },
        {
          title: 'Break down',
          text: 'RELEASE handles the meal in front of you: 2,500 HUT of protease activity plus lipase, lactase and alpha-galactosidase, twenty minutes before you sit down.*',
        },
      ],
    },
    ritual: {
      headline: 'Your Gut Ritual, hour by hour.',
      note: 'Four small moments, none of which need a reminder after week one.',
      slots: [
        {
          time: 'Morning',
          handle: 'probiotic-40-billion-with-prebiotics',
          dose: 'One capsule',
          why: 'First thing. FLORA is two capsules a day and splitting them keeps a steady supply arriving rather than one crowd all at once.',
        },
        {
          time: 'Before lunch',
          handle: 'digestive-enzyme-pro-blend',
          dose: 'One capsule',
          why: '20–30 minutes ahead of the meal. Taken afterwards the enzymes arrive behind the food they were meant to meet.',
        },
        {
          time: 'Before dinner',
          handle: 'digestive-enzyme-pro-blend',
          dose: 'One capsule',
          why: 'Same again before your second large meal. This is the one you will notice most on a heavy evening.',
        },
        {
          time: 'Evening',
          handle: 'probiotic-40-billion-with-prebiotics',
          dose: 'Second capsule',
          why: 'The other half of the daily dose. Do not exceed two capsules of FLORA per day.',
        },
      ],
    },
    finalCta: {
      headline: 'Ready to stop negotiating with your stomach?',
      sub: 'Seed, feed and break down — one ritual, two formulas.',
    },
  },
  'the-glow-ritual': {
    accent: 'glow',
    eyebrow: 'Two-formula ritual',
    tagline: 'Cellular beauty, from every angle.',
    intro:
      'GLOW rebuilds the structure of your skin. RADIANCE protects what you have just built. Taken together they close the loop — collagen synthesis on one side, antioxidant defence on the other — which is why this is the pairing dermatologists reach for when asked what actually works from the inside.',
    contains: ['grass-fed-hydrolyzed-collagen-peptides', 'resveratrol-50-600mg'],
    badge: null,
    synergy: {
      headline: 'Build and protect, in the same ritual.',
      body: 'Most women take collagen alone and lose a share of it to the same oxidative stress that broke the original down. Pairing it with a high-purity polyphenol changes the arithmetic.',
      points: [
        {
          title: 'Build',
          text: 'GLOW supplies the glycine, proline and hydroxyproline peptides that signal fibroblasts to produce new collagen and hyaluronic acid.',
        },
        {
          title: 'Protect',
          text: 'RADIANCE brings 600mg of 50% trans-resveratrol — antioxidant defence against the free-radical damage that degrades collagen in the first place.',
        },
        {
          title: 'Compound',
          text: 'Building without protecting is a leaking bucket. Running both pathways daily is what turns eight weeks of effort into visible, durable change.',
        },
      ],
    },
    ritual: {
      headline: 'Your Glow Ritual, hour by hour.',
      note: 'Two touchpoints a day. Neither needs a reminder after week one.',
      slots: [
        {
          time: 'Morning',
          handle: 'grass-fed-hydrolyzed-collagen-peptides',
          dose: 'One level scoop',
          why: 'Into coffee, matcha or cold water. Dissolves clear and tasteless — it disappears into whatever you already drink.',
        },
        {
          time: 'Morning & evening',
          handle: 'resveratrol-50-600mg',
          dose: 'One capsule, twice daily',
          why: '20–30 minutes before a meal. Splitting the dose holds antioxidant levels steady across the whole day.',
        },
      ],
    },
    testimonials: [
      {
        stars: 5,
        headline: 'The pairing is what made the difference.',
        body: 'I took collagen alone for a year with okay results. Adding RADIANCE was the switch — three months in, my skin holds light completely differently.',
        author: 'Valentina C.',
        location: 'Los Angeles, CA',
      },
      {
        stars: 5,
        headline: 'Two products, one habit.',
        body: 'Scoop in the coffee, capsule before lunch and dinner. I have never managed to keep a supplement routine before this one.',
        author: 'Thea M.',
        location: 'Nashville, TN',
      },
      {
        stars: 5,
        headline: 'Cheaper than the facial I cancelled.',
        body: 'I dropped one monthly treatment to pay for this and got more out of it. My esthetician agrees, which felt like a real endorsement.',
        author: 'Ingrid P.',
        location: 'Minneapolis, MN',
      },
    ],
    finalCta: {
      headline: 'Ready to glow from every angle?',
      sub: 'Build and protect — one ritual, two formulas.',
    },
  },

  'the-full-aurae-ritual': {
    accent: 'ritual',
    eyebrow: 'The complete ritual',
    tagline: 'Everything your glow needs.',
    intro:
      'All eight formulas, sequenced across one day: gut and collagen first thing, cellular energy alongside them, enzymes and omega-3s with your meals, antioxidant protection at midday, something to take the edge off in the afternoon, and cortisol support with dinner. Eight systems, zero overlap — the full Aurae protocol, and the only way to buy it at this price.',
    contains: [
      'probiotic-40-billion-with-prebiotics',
      'grass-fed-hydrolyzed-collagen-peptides',
      'nad',
      'digestive-enzyme-pro-blend',
      'omega-3-epa-180mg-dha-120mg',
      'resveratrol-50-600mg',
      'reishi-relax-gummies',
      'ashwagandha-plus',
    ],
    badge: 'Best Value',
    synergy: {
      headline: 'Eight formulas, eight systems, no overlap.',
      body: 'This is not eight variations on one idea. Each formula owns a different mechanism, which is why they stack cleanly rather than competing for the same pathway.',
      points: [
        {
          title: 'Terrain',
          text: 'FLORA seeds the gut with 40 billion CFU across four named strains, carried past stomach acid and fed by prebiotic fibre.*',
        },
        {
          title: 'Structure',
          text: 'GLOW rebuilds the collagen matrix of skin, hair, nails and joints with Types 1 & 3 peptides.*',
        },
        {
          title: 'Energy & repair',
          text: 'RENEWAL supplies NAD+ 500mg with quercetin and resveratrol for mitochondrial output and DNA repair.*',
        },
        {
          title: 'Breakdown',
          text: 'RELEASE brings 2,500 HUT of protease activity plus lipase, lactase and alpha-galactosidase, so your meals are actually broken down.*',
        },
        {
          title: 'Membranes',
          text: 'VITAL supplies EPA 180mg and DHA 120mg — the structural fats your brain, eyes and cardiovascular system are built from.*',
        },
        {
          title: 'Defence',
          text: 'RADIANCE adds 600mg of 50% trans-resveratrol for antioxidant, vascular and cognitive support.*',
        },
        {
          title: 'Reset',
          text: 'STILL is the in-the-moment one: reishi at 200mg with L-theanine, for the afternoons that tighten.*',
        },
        {
          title: 'Regulation',
          text: 'CALM supports a normal cortisol response with KSM-66 at 600mg plus seven supporting actives.*',
        },
      ],
    },
    ritual: {
      headline: 'The full ritual, hour by hour.',
      note: 'It reads like a lot and it is roughly four minutes a day. Most women have it automatic inside a week.',
      slots: [
        {
          time: 'First thing',
          handle: 'probiotic-40-billion-with-prebiotics',
          dose: 'One capsule',
          why: 'Before anything else. The second FLORA capsule goes in the evening — splitting them keeps a steady supply arriving.',
        },
        {
          time: 'Morning',
          handle: 'grass-fed-hydrolyzed-collagen-peptides',
          dose: 'One level scoop',
          why: 'Into your coffee or smoothie. Tasteless, dissolves clear — the easiest habit in the stack.',
        },
        {
          time: 'Morning',
          handle: 'nad',
          dose: 'Two capsules with water',
          why: 'Alongside GLOW. Morning dosing matches the energy curve and avoids feeling activated at bedtime.',
        },
        {
          time: 'Before lunch',
          handle: 'digestive-enzyme-pro-blend',
          dose: 'One capsule',
          why: '20–30 minutes ahead of the meal, with the second capsule before dinner. Taken afterwards it arrives behind the food.',
        },
        {
          time: 'Midday',
          handle: 'ashwagandha-plus',
          dose: 'Two capsules with a meal',
          why: 'With lunch. Taking CALM in the middle of the day gets ahead of the stress rather than catching up with it.',
        },
        {
          time: 'With lunch',
          handle: 'omega-3-epa-180mg-dha-120mg',
          dose: 'One softgel (of two daily)',
          why: 'Omega-3s are fat-soluble, so food alongside them improves absorption — and it is what stops the aftertaste. Second softgel with dinner.',
        },
        {
          time: 'When the day tightens',
          handle: 'reishi-relax-gummies',
          dose: 'One gummy',
          why: 'Mid-afternoon for most women. The full 200mg of reishi is in a single gummy. Chew it, no water needed.',
        },
        {
          time: 'Early evening',
          handle: 'resveratrol-50-600mg',
          dose: 'One capsule (of two daily)',
          why: '20–30 minutes before dinner, alongside your evening skincare — protecting from the inside while you treat the outside. The first capsule goes before lunch.',
        },
      ],
    },
    testimonials: [
      {
        stars: 5,
        headline: 'I feel 28 again, and I am 38.',
        body: 'Four months on the Full Ritual and my friends keep asking what I am doing differently. The answer is Aurae. This is my forever stack.',
        author: 'Maya P.',
        location: 'San Francisco, CA',
      },
      {
        stars: 5,
        headline: 'The whole day is covered.',
        body: 'What sold me was that nothing overlaps. Morning, midday, evening, bedtime — each one has a job. It feels designed rather than upsold.',
        author: 'Ximena R.',
        location: 'San Antonio, TX',
      },
      {
        stars: 5,
        headline: 'Cheaper than the four brands it replaced.',
        body: 'I was running collagen, ashwagandha, melatonin and resveratrol from four different companies. One box now, better formulas, less money.',
        author: 'Clara B.',
        location: 'Washington, DC',
      },
    ],
    finalCta: {
      headline: 'Ready for the whole ritual?',
      sub: 'Eight formulas. One day. Everything your glow needs.',
    },
  },
};

export function bundleContent(handle: string): BundleContent | null {
  return BUNDLE_CONTENT[handle] ?? null;
}
