/**
 * Landing-page and site-chrome copy, carried over verbatim from the approved
 * v4 homepage so the React build reads identically.
 */

import type { AccentKey } from '@/lib/accents';
import type { Faq, Testimonial } from './products';

export const SITE = {
  name: 'Aurae',
  tagline: 'lit from within ✦',
  announcement: 'Free shipping over $50 · Subscribe & save 10%',
  supportEmail: 'care@auraevital.com',
  nav: [
    { label: 'Shop', href: '/#shop' },
    { label: 'Rituals', href: '/#rituals' },
    { label: 'The Science', href: '/#science' },
    { label: 'Reviews', href: '/#reviews' },
  ],
  hero: {
    /** Rendered as two lines, with `titleItalic` set in italics. */
    titleLead: 'Real beauty starts at the',
    titleItalic: 'cellular level',
    primaryCta: 'Shop the Ritual',
    secondaryCta: 'Explore the Rituals',
  },
  trustBar: [
    'Third-Party Tested',
    'Grass-Fed & Clinically Studied',
    'Clean Ingredients',
    'Subscribe & Save 10%',
    'Free Shipping $50+',
  ],
  footer: {
    columns: [
      {
        title: 'Shop',
        links: [
          { label: 'All Products', href: '/#shop' },
          { label: 'Glow', href: '/product/grass-fed-hydrolyzed-collagen-peptides' },
          { label: 'Calm', href: '/product/ashwagandha-plus' },
          { label: 'Sleep', href: '/product/sleep-strips' },
          { label: 'Radiance', href: '/product/resveratrol-50-600mg' },
          { label: 'Renewal', href: '/product/nad' },
        ],
      },
      {
        title: 'Rituals',
        links: [
          { label: 'The Glow Ritual', href: '/bundle/the-glow-ritual' },
          { label: 'The Calm & Sleep Ritual', href: '/bundle/the-calm-sleep-ritual' },
          { label: 'The Full Aurae Ritual', href: '/bundle/the-full-aurae-ritual' },
        ],
      },
      {
        title: 'About',
        links: [
          { label: 'The Science', href: '/#science' },
          { label: 'Ingredients', href: '/#inside' },
          { label: 'Reviews', href: '/#reviews' },
          { label: 'FAQ', href: '/#faq' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Shipping', href: '/#faq' },
          { label: 'Returns', href: '/#faq' },
          { label: 'Contact', href: 'mailto:care@auraevital.com' },
        ],
      },
    ],
    legal: ['Privacy', 'Terms', 'Cookies'],
  },
} as const;

/**
 * The five benefit labels that float over the hero photograph, one per product,
 * left to right as they appear in the shot.
 *
 * `x` and `y` are percentages of the 16:9 frame: `x` is the centre of the
 * product below the label, `y` is the top of the label itself. They are tied to
 * `public/images/aurae-hero-products.webp` specifically — reshoot the hero and
 * these need re-measuring.
 */
export const HERO_PILLARS: {
  label: string;
  product: string;
  handle: string;
  x: number;
  y: number;
}[] = [
  { label: 'Quality sleep', product: 'SLEEP', handle: 'sleep-strips', x: 15.5, y: 39 },
  { label: 'Longevity', product: 'RADIANCE', handle: 'resveratrol-50-600mg', x: 33.5, y: 35.5 },
  {
    label: 'Radiant skin',
    product: 'GLOW',
    handle: 'grass-fed-hydrolyzed-collagen-peptides',
    x: 52,
    y: 22,
  },
  { label: 'Mental clarity', product: 'CALM', handle: 'ashwagandha-plus', x: 71, y: 15 },
  { label: 'Cellular energy', product: 'RENEWAL', handle: 'nad', x: 86, y: 8 },
];

/** Section intros for the landing page. */
export const LANDING = {
  products: {
    eyebrow: 'The Ritual',
    titleLead: 'Five rituals.',
    titleItalic: 'One intention.',
    pillars: ['Radiant skin', 'Mental clarity', 'Quality sleep', 'Cellular energy', 'Longevity'],
    subtitle:
      'Five science-backed formulas designed for women who believe that real beauty starts at the cellular level.',
  },
  bundles: {
    eyebrow: 'Save More · Glow More',
    titleLead: 'Build your',
    titleItalic: 'ritual bundle.',
    subtitle:
      'Curated combinations that work better together. Because your glow has layers.',
  },
  inside: {
    eyebrow: 'The Aurae Difference',
    titleLead: "What's",
    titleItalic: 'actually inside.',
    subtitle:
      'Most beauty supplements contain "sprinkles" of active ingredients — enough to claim them on the label, but far below clinical doses. We don’t believe in sprinkles. Compare our formulas to typical drugstore brands and you’ll see why our women feel the difference.',
    callout: {
      leadIn: 'Most beauty supplements contain',
      emphasis: '"sprinkles"',
      middle: 'of active ingredients — enough to claim them on the label, but',
      emphasis2: 'far below clinical doses.',
      signature: '— The Aurae Standard',
    },
    us: {
      label: 'Aurae Formulas',
      title: 'The complete stack.',
      note: 'Premium dosages, multi-ingredient synergy, no fillers.',
      items: [
        { lead: 'CALM:', text: 'KSM-66 600mg + Vitamins D3, B6, B12 + Maca + Ginseng + Shatavari + L-Arginine' },
        { lead: 'RENEWAL:', text: 'NAD+ 500mg + Quercetin 250mg + Resveratrol 98% (3-in-1 longevity)' },
        { lead: 'GLOW:', text: 'Grass-Fed Collagen Types 1 & 3 with full amino acid profile, 20 g + 18 g protein - hydrolyzed = true absorption' },
        { lead: 'SLEEP:', text: '5 botanicals (Valerian, Lavender, Chamomile, Hibiscus, Melatonin)' },
        { lead: 'RADIANCE:', text: '50% Trans-Resveratrol from Japanese Knotweed' },
        { lead: 'All formulas:', text: 'Third-party tested, GMP-certified, no fillers' },
      ],
    },
    them: {
      label: 'Typical Drugstore Brands',
      title: 'The half-dose.',
      note: 'Single-ingredient formulas, under-dosed, fillers included.',
      items: [
        'Ashwagandha alone (no vitamins, no synergistic adaptogens)',
        'NAD+ with resveratrol, but under-dosed — too low for real results and does not contain quercetin',
        'Generic collagen, single type, missing key amino acids, poor absorption',
        '1–2 sleep ingredients (often just melatonin)',
        'Low-purity resveratrol (25% or less trans-resveratrol)',
        'Magnesium stearate, artificial fillers, no testing transparency',
      ],
    },
    summary: {
      lead: "You're not paying for marketing —",
      emphasis: "you're paying for what's actually in the bottle.",
    },
  },
  science: {
    eyebrow: 'The Science',
    titleLead: 'Beauty',
    titleItalic: 'at the cellular level.',
    subtitle:
      'We don’t believe in pseudoscience. Every formula is built on clinical research, sourced from premium ingredients, and dosed at clinically-relevant levels.',
    research: {
      title: 'The Aurae standard: multi-ingredient synergy.',
      body: 'Where competitors sell single-ingredient bottles at under-dosed levels, we formulate complete stacks. CALM has 8 active compounds. RENEWAL is a 3-in-1 longevity formula. SLEEP combines 5 sleep botanicals. Every formula is backed by peer-reviewed research and tested for purity.',
      badges: ['GMP Certified', 'Non-GMO', 'Gluten-Free', 'No Fillers'],
    },
  },
  testimonials: {
    eyebrow: 'Real Women · Real Results',
    titleLead: "She's",
    titleItalic: 'lit from within.',
    subtitle:
      'Over 1,200 women have made Aurae part of their daily ritual. Here’s what they’re saying.',
    rating: { score: '4.9', label: 'Average Rating' },
    stats: [
      { value: '1,200+', label: 'Verified Reviews' },
      { value: '94%', label: 'Would Recommend' },
      { value: '87%', label: 'Repeat Buyers' },
    ],
  },
  faq: {
    eyebrow: 'Questions Answered',
    titleLead: 'Everything you need',
    titleItalic: 'to know.',
    subtitle:
      'Transparency is non-negotiable. Honest answers to the questions women ask us most.',
    ctaLead: 'Still have questions? We’re here to help.',
    ctaLabel: 'Email Our Team →',
  },
  newsletter: {
    eyebrow: 'Join the Aurae Letter',
    titleLead: 'Join the',
    titleItalic: 'ritual.',
    body: 'Exclusive access to new launches, wellness guides, and our weekly letter on cellular beauty — plus 10% off your first order.',
    placeholder: 'your email',
    cta: 'Get 10% Off',
    success: 'You’re on the list ✦ Check your inbox for your 10% code.',
  },
} as const;

/** The science grid on the landing page. */
export const SCIENCE_CARDS: {
  glyph: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
}[] = [
  {
    glyph: '✦',
    title: 'Hydrolyzed Collagen Types 1 & 3',
    body: 'Grass-fed bovine peptides rich in glycine, proline, hydroxyproline, and alanine — the amino acids that boost collagen synthesis. Type 1 supports skin elasticity. Type 3 supports tendons, joints, and structure.',
    stat: 'Types 1 & 3',
    statLabel: 'Full amino acid profile',
  },
  {
    glyph: '⊛',
    title: 'NAD+ 3-in-1 Longevity Stack',
    body: '500mg NAD+ for cellular energy + Quercetin for inflammatory response + 98% Resveratrol from Japanese Knotweed for cardiovascular and cognitive support. Three powerhouse molecules, one capsule.',
    stat: '500mg',
    statLabel: 'NAD+ + senolytic cofactors',
  },
  {
    glyph: '◈',
    title: 'KSM-66 + 7 Power Ingredients',
    body: '600mg KSM-66 Ashwagandha (5% withanolides) combined with Vitamins D3, B6, B12, plus L-Arginine, Maca, Panax Ginseng, and Shatavari. The most complete stress + vitality formula on the market.',
    stat: '8',
    statLabel: 'Synergistic active compounds',
  },
  {
    glyph: '✧',
    title: '50% Trans-Resveratrol',
    body: 'Sourced from Polygonum cuspidatum (Japanese Knotweed) — the most concentrated natural source. Activates SIRT1 longevity genes, supports normal cholesterol, brain health, and powerful antioxidant protection.',
    stat: '600mg',
    statLabel: '50% trans-resveratrol',
  },
  {
    glyph: '◐',
    title: '5-Ingredient Sleep Formula',
    body: 'Valerian root + Lavender + Chamomile + Hibiscus + Melatonin work synergistically for deeper rest. Oral strip delivery for faster sublingual absorption — non-addictive, raspberry-flavored, no water needed.',
    stat: '5',
    statLabel: 'Synergistic sleep botanicals',
  },
  {
    glyph: '★',
    title: 'Third-Party Tested',
    body: 'Every batch is independently tested for purity, potency, and contaminants. We meet GMP standards in certified facilities.',
    stat: '100%',
    statLabel: 'Third-party verified',
  },
];

export const LANDING_TESTIMONIALS: (Testimonial & { tag: string; accent: AccentKey })[] = [
  {
    tag: 'GLOW',
    accent: 'glow',
    stars: 5,
    headline: 'My skin looks like I have been on vacation.',
    body: 'After 8 weeks of GLOW every morning in my coffee, my skin is visibly plumper and that tired girl face is gone. Worth every penny.',
    author: 'Sofia M.',
    location: 'New York, NY',
  },
  {
    tag: 'CALM + SLEEP',
    accent: 'calm',
    stars: 5,
    headline: 'Calm during the day. Out cold at night.',
    body: 'I was skeptical about sleep strips but they work in like 20 minutes. Combined with CALM, my anxiety has dropped massively. Game changer.',
    author: 'Emma R.',
    location: 'Los Angeles, CA',
  },
  {
    tag: 'RENEWAL',
    accent: 'renewal',
    stars: 5,
    headline: 'I do not need three coffees anymore.',
    body: 'NAD+ is the real deal. After 3 weeks of RENEWAL, my energy is steadier, my workouts are better, and I just feel sharper overall.',
    author: 'Camila T.',
    location: 'Miami, FL',
  },
  {
    tag: 'RADIANCE',
    accent: 'radiance',
    stars: 5,
    headline: 'The longevity stack I actually stuck with.',
    body: 'I have tried a lot of resveratrol brands but RADIANCE actually delivers — and at almost half the price of the competition. Pure quality.',
    author: 'Jasmine K.',
    location: 'Chicago, IL',
  },
  {
    tag: 'SLEEP',
    accent: 'sleep',
    stars: 5,
    headline: 'Better than melatonin gummies, promise.',
    body: 'The strips are genius. No sticky gummies, no chalky pills. They melt under your tongue and 20 mins later, I am dreaming. Deep, restorative sleep.',
    author: 'Ava L.',
    location: 'Austin, TX',
  },
  {
    tag: 'FULL RITUAL',
    accent: 'ritual',
    stars: 5,
    headline: 'I feel 28 again, and I am 38.',
    body: 'After 4 months on the Full Ritual, my friends keep asking what I am doing differently. The answer is Aurae. This is my forever wellness stack.',
    author: 'Maya P.',
    location: 'San Francisco, CA',
  },
];

export const SITE_FAQS: Faq[] = [
  {
    q: 'How long until I see results?',
    a: [
      'Most women notice subtle changes within 2–4 weeks: better sleep quality, calmer mornings, more even skin tone. Visible results typically appear at the 8–12 week mark with consistent daily use.',
      'Cellular wellness is a marathon, not a sprint. We recommend committing to at least 90 days to see the full benefits.',
    ],
  },
  {
    q: 'Are Aurae supplements third-party tested?',
    a: [
      'Yes — every batch. We test for purity, potency, heavy metals, and contaminants through independent labs. Certificates of Analysis are available upon request.',
      'Our products are manufactured in GMP-certified facilities in the United States.',
    ],
  },
  {
    q: 'Can I take all five products together?',
    a: [
      'Absolutely. The Five Rituals are designed to work synergistically — beauty, calm, sleep, anti-aging, and cellular energy support different aspects of wellness without overlap or interaction.',
      'For best results: GLOW + RENEWAL in the morning, RADIANCE midday, CALM early evening, and SLEEP 30 minutes before bed.',
    ],
  },
  {
    q: 'What makes Aurae different from drugstore supplements?',
    a: [
      'Three things: dosage, multi-ingredient synergy, and intention. Most drugstore brands use single-ingredient, under-dosed formulas to cut costs.',
      'Compare CALM: most ashwagandha supplements are just ashwagandha. Ours combines KSM-66 600mg with Vitamins D3, B6, B12, plus L-Arginine, Maca, Ginseng, and Shatavari — eight active compounds working synergistically.',
      'Or RENEWAL: instead of buying NAD+ and Resveratrol separately, our 3-in-1 stack delivers NAD+ 500mg + Quercetin + 98% Resveratrol in one capsule. Plus our direct-to-consumer model means premium quality at honest prices.',
    ],
  },
  {
    q: 'How do I take each Aurae product?',
    a: [
      'GLOW (Collagen): mix one serving into your morning coffee, smoothie, or water.',
      'CALM (Ashwagandha+): take 2 capsules daily with a meal, ideally morning or early evening.',
      'SLEEP: place one oral strip on your tongue 20–30 minutes before bed. Maximum 1 strip per day.',
      'RADIANCE (Resveratrol): take 1 veggie capsule twice daily, 20–30 minutes before meals.',
      'RENEWAL (NAD+): take 2 capsules daily with water, with or without food.',
    ],
  },
  {
    q: 'How does Subscribe & Save work?',
    a: [
      'Subscribe & Save gives you 10% off every order, free shipping, and automatic monthly delivery. Pause, skip, or cancel anytime — no strings, no commitments.',
      'You’ll get an email 3 days before each shipment so you can adjust with one click.',
    ],
  },
  {
    q: "What's your return policy?",
    a: [
      'We offer a 30-day money-back guarantee. If you’re not feeling your glow within 30 days, send the bottles back (even if empty) for a full refund — no questions asked.',
      'Just email hello@auraevital.com and we’ll process within 48 hours.',
    ],
  },
  {
    q: 'How long does shipping take?',
    a: [
      'Free standard shipping (5–7 business days) on all orders over $50. Orders under $50 ship standard for a flat $9.99.',
      'We currently ship throughout the continental United States. International shipping will be available in Q3 2027.',
    ],
  },
  {
    q: 'Why are your prices lower than other premium brands?',
    a: [
      'We’re a direct-to-consumer brand. We skip the retail markup, distribution fees, and middleman costs that inflate the price of supplements at Whole Foods or Target.',
      'You get the same (and often superior) quality at a more honest price. Premium wellness shouldn’t require a luxury budget.',
    ],
  },
];

/**
 * The four benefit bullets shown on each landing-page product card, plus the
 * accent palette for that card. Keyed by Shopify handle.
 */
export const PRODUCT_CARD: Record<
  string,
  { accent: AccentKey; shortName: string; benefits: string[] }
> = {
  'grass-fed-hydrolyzed-collagen-peptides': {
    accent: 'glow',
    shortName: 'Glow',
    benefits: [
      'Plump, radiant skin from within',
      'Stronger hair & nails',
      'Joint & tendon support',
      'Boosts natural collagen synthesis',
    ],
  },
  'ashwagandha-plus': {
    accent: 'calm',
    shortName: 'Calm',
    benefits: [
      'Reduces stress & cortisol',
      'Boosts daily energy & vitality',
      'Sharper mental clarity',
      'Supports immune & nervous system',
    ],
  },
  'sleep-strips': {
    accent: 'sleep',
    shortName: 'Sleep',
    benefits: [
      'Fall asleep in 20 minutes',
      'Deeper, restorative rest',
      'Wake up refreshed, no grogginess',
      'Non-addictive, no water needed',
    ],
  },
  'resveratrol-50-600mg': {
    accent: 'radiance',
    shortName: 'Radiance',
    benefits: [
      'Powerful anti-aging antioxidant',
      'Supports cardiovascular health',
      'Brain & cognitive support',
      'Activates longevity genes (SIRT1)',
    ],
  },
  nad: {
    accent: 'renewal',
    shortName: 'Renewal',
    benefits: [
      'Steady, all-day cellular energy',
      'Supports DNA & cellular repair',
      'Sharper focus & memory',
      'Promotes healthy aging from within',
    ],
  },
};
