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
  synergy: { headline: string; body: string; points: SynergyPoint[] };
  ritual: { headline: string; note: string; slots: RitualSlot[] };
  testimonials: Testimonial[];
  finalCta: { headline: string; sub: string };
};

export const BUNDLE_CONTENT: Record<string, BundleContent> = {
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

  'the-calm-sleep-ritual': {
    accent: 'calm',
    // The "Most Popular" badge already says it — keep the eyebrow descriptive.
    eyebrow: 'Two-formula ritual',
    tagline: 'Stress down. Sleep deep.',
    intro:
      'Poor sleep raises cortisol, and raised cortisol wrecks sleep. It is a loop, and breaking it from one side rarely holds. CALM lowers the daytime stress load while SLEEP handles the night-time onset — the same twenty-four hours, addressed twice.',
    contains: ['ashwagandha-plus', 'sleep-strips'],
    badge: 'Most Popular',
    synergy: {
      headline: 'One loop, two interventions.',
      body: 'Cortisol and sleep are the same system observed at different hours. Treating only the night is why most sleep aids stop working by week three.',
      points: [
        {
          title: 'Days',
          text: 'CALM supports a normal cortisol response with 600mg of KSM-66 plus seven supporting actives — so the stress does not accumulate into the evening.',
        },
        {
          title: 'Nights',
          text: 'SLEEP delivers five botanicals sublingually for roughly twenty-minute onset, with a low melatonin dose that clears before your alarm.',
        },
        {
          title: 'Reinforce',
          text: 'Lower daytime cortisol makes falling asleep easier; better sleep lowers tomorrow’s cortisol. Run both and the loop starts working for you.',
        },
      ],
    },
    ritual: {
      headline: 'Your Calm & Sleep Ritual, hour by hour.',
      note: 'One with breakfast, one at bedtime. Nothing to carry, nothing to time precisely.',
      slots: [
        {
          time: 'Morning',
          handle: 'ashwagandha-plus',
          dose: 'Two capsules with a meal',
          why: 'Food improves withanolide absorption. Taking both together delivers the full 600mg clinical serving in one go.',
        },
        {
          time: '20–30 min before bed',
          handle: 'sleep-strips',
          dose: 'One oral strip',
          why: 'Dissolves on the tongue, no water. Take it when you actually intend to sleep — not two hours earlier.',
        },
      ],
    },
    testimonials: [
      {
        stars: 5,
        headline: 'Calm during the day. Out cold at night.',
        body: 'I was sceptical about sleep strips but they work in about twenty minutes. Combined with CALM, my anxiety has dropped massively. Game changer.',
        author: 'Emma R.',
        location: 'Los Angeles, CA',
      },
      {
        stars: 5,
        headline: 'I stopped waking at 3am.',
        body: 'The strips got me down and CALM seems to be what keeps me down. First uninterrupted stretch of sleep in about four years.',
        author: 'Rebecca J.',
        location: 'Atlanta, GA',
      },
      {
        stars: 5,
        headline: 'My husband bought his own.',
        body: 'He watched me stop doom-scrolling at midnight and asked for a set. We are now a two-ritual household.',
        author: 'Anaïs D.',
        location: 'Houston, TX',
      },
    ],
    finalCta: {
      headline: 'Ready to break the loop?',
      sub: 'Calmer days. Deeper nights. Both, from tonight.',
    },
  },

  'the-full-aurae-ritual': {
    accent: 'ritual',
    eyebrow: 'The complete ritual',
    tagline: 'Everything your glow needs.',
    intro:
      'All five formulas, sequenced across one day: collagen and cellular energy in the morning, antioxidant protection at midday, cortisol support in the early evening, and sleep onset before bed. Five systems, zero overlap — this is the full Aurae protocol, and the only way to buy it at this price.',
    contains: [
      'grass-fed-hydrolyzed-collagen-peptides',
      'nad',
      'resveratrol-50-600mg',
      'ashwagandha-plus',
      'sleep-strips',
    ],
    badge: 'Best Value',
    synergy: {
      headline: 'Five formulas, five systems, no overlap.',
      body: 'This is not five variations on one idea. Each formula owns a different mechanism, which is why they stack cleanly rather than competing for the same pathway.',
      points: [
        {
          title: 'Structure',
          text: 'GLOW rebuilds the collagen matrix of skin, hair, nails and joints with Types 1 & 3 peptides.',
        },
        {
          title: 'Energy & repair',
          text: 'RENEWAL supplies NAD+ 500mg with quercetin and resveratrol for mitochondrial output and DNA repair.',
        },
        {
          title: 'Defence',
          text: 'RADIANCE adds 600mg of 50% trans-resveratrol for antioxidant, vascular and cognitive support.',
        },
        {
          title: 'Regulation',
          text: 'CALM supports a normal cortisol response with KSM-66 plus seven supporting actives.',
        },
        {
          title: 'Recovery',
          text: 'SLEEP closes the day with five botanicals delivered sublingually for fast, clean onset.',
        },
      ],
    },
    ritual: {
      headline: 'The full ritual, hour by hour.',
      note: 'Four touchpoints across the day. Most women have it automatic inside a week.',
      slots: [
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
          time: 'Midday',
          handle: 'resveratrol-50-600mg',
          dose: 'One capsule (of two daily)',
          why: '20–30 minutes before lunch, with the second capsule before dinner.',
        },
        {
          time: 'Early evening',
          handle: 'ashwagandha-plus',
          dose: 'Two capsules with a meal',
          why: 'With dinner. Early-evening dosing suits women whose stress peaks late in the working day.',
        },
        {
          time: '20–30 min before bed',
          handle: 'sleep-strips',
          dose: 'One oral strip',
          why: 'On the tongue, no water. The last thing in the ritual, right before lights out.',
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
      sub: 'Five formulas. One day. Everything your glow needs.',
    },
  },
};

export function bundleContent(handle: string): BundleContent | null {
  return BUNDLE_CONTENT[handle] ?? null;
}
