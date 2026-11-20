/**
 * Landing-page and site-chrome copy, carried over verbatim from the approved
 * v4 homepage so the React build reads identically.
 */

import type { AccentKey } from '@/lib/accents';
import type { Faq, Testimonial } from './products';

export const SITE = {
  name: 'Aurae',
  tagline: 'lit from within ✦',
  announcement: 'Free shipping over $40',
  supportEmail: 'hello@auraevital.com',
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
    'FDA-Registered Facility',
    'Grass-Fed & Science-Backed',
    'Clean Ingredients',
    'Subscribe & Save 10%',
    'Free Shipping $40+',
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
          { label: 'Contact', href: 'mailto:hello@auraevital.com' },
        ],
      },
    ],
    legal: ['Privacy', 'Terms', 'Cookies'],
  },
} as const;

/**
 * A benefit label per product in the hero photographs.
 *
 * `handle` is the product page the label links to. `null` means the product is
 * in the shot but has no page yet — the label renders as plain text instead of
 * a link, so nobody lands on a 404. Fill the handle in once the product is
 * live in Shopify and the link turns on by itself.
 *
 * The two shots hold different products in a different order, so each has its
 * own list. Both sets of coordinates are measured against their specific image
 * — reshoot a hero and these need re-measuring.
 */
export type HeroPillar = {
  label: string;
  product: string;
  handle: string | null;
};

/**
 * Wide shot, `public/images/aurae-hero-products.webp`, left to right.
 * `x` is the centre of the product below the label, `y` the top of the label,
 * both as percentages of the 16:9 frame. STILL is not in this shot.
 */
export const HERO_PILLARS: (HeroPillar & { x: number; y: number })[] = [
  {
    label: 'Radiant skin*',
    product: 'GLOW',
    handle: 'grass-fed-hydrolyzed-collagen-peptides',
    x: 33,
    y: 58,
  },
  { label: 'Cellular energy*', product: 'RENEWAL', handle: 'nad', x: 45, y: 44.5 },
  { label: 'Mental clarity*', product: 'CALM', handle: 'ashwagandha-plus', x: 52.5, y: 36 },
  { label: 'Gut balance*', product: 'FLORA', handle: null, x: 63, y: 25.5 },
  { label: 'Longevity*', product: 'RADIANCE', handle: 'resveratrol-50-600mg', x: 70, y: 33.5 },
  { label: 'Sharper focus*', product: 'VITAL', handle: null, x: 81.5, y: 13.5 },
  { label: 'Easy digestion*', product: 'RELEASE', handle: null, x: 89, y: 4.5 },
];

/**
 * Tall shot, `public/images/aurae-hero-vertical.webp`, top to bottom.
 * The products alternate sides as the ribbon spirals, so `side` says which
 * margin the label sits in and which half of the frame is tappable. `y` is the
 * vertical centre of the product, `top`/`height` its band, all as percentages.
 */
export const HERO_PILLARS_MOBILE: (HeroPillar & {
  side: 'l' | 'r';
  y: number;
  top: number;
  height: number;
})[] = [
  {
    label: 'Longevity*',
    product: 'RADIANCE',
    handle: 'resveratrol-50-600mg',
    side: 'l',
    y: 24.5,
    top: 17,
    height: 15,
  },
  { label: 'Cellular energy*', product: 'RENEWAL', handle: 'nad', side: 'r', y: 31, top: 24, height: 14 },
  {
    label: 'Mental clarity*',
    product: 'CALM',
    handle: 'ashwagandha-plus',
    side: 'l',
    y: 43,
    top: 35,
    height: 16,
  },
  {
    label: 'Radiant skin*',
    product: 'GLOW',
    handle: 'grass-fed-hydrolyzed-collagen-peptides',
    side: 'r',
    y: 51,
    top: 42,
    height: 18,
  },
  { label: 'Gut balance*', product: 'FLORA', handle: null, side: 'l', y: 61, top: 53, height: 16 },
  { label: 'Easy digestion*', product: 'RELEASE', handle: null, side: 'r', y: 70, top: 63, height: 14 },
  { label: 'Sharper focus*', product: 'VITAL', handle: null, side: 'l', y: 79, top: 71, height: 16 },
  { label: 'Relaxed focus*', product: 'STILL', handle: null, side: 'r', y: 85, top: 77, height: 15 },
];

/** Section intros for the landing page. */
export const LANDING = {
  products: {
    eyebrow: 'The Ritual',
    titleLead: 'Your rituals.',
    titleItalic: 'One intention.',
    // Ordered the way the day runs, morning to night, so the list reads as a
    // routine rather than a catalogue. No count in the copy here or in the
    // subtitle — the line stays true as products are added.
    pillars: [
      'Gut balance',
      'Radiant skin',
      'Cellular energy',
      'Easy digestion',
      'Sharper focus',
      'Mental clarity',
      'Longevity',
      'Relaxed focus',
    ],
    subtitle:
      'Science-backed formulas designed for women who believe that real beauty starts at the cellular level.',
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
        { lead: 'GLOW:', text: 'Grass-fed hydrolyzed collagen peptides, Types 1 & 3, with a full amino acid profile. 20 g of collagen and 18 g of protein per serving, hydrolyzed for easy absorption' },
        { lead: 'FLORA:', text: '40 billion CFU across 4 clinically studied strains + MAKTREK Bi-Pass delivery + prebiotic fiber' },
        { lead: 'RELEASE:', text: 'Makzyme-Pro 6-enzyme blend with 2,500 HUT of declared activity' },
        { lead: 'STILL:', text: 'Reishi 200mg + L-Theanine + Lemon Balm + Passion Flower + Valerian — calm focus, not sedation' },
        { lead: 'RADIANCE:', text: '50% Trans-Resveratrol from Japanese Knotweed' },
        { lead: 'All formulas:', text: 'Made in an FDA-registered, cGMP-certified facility in the USA, no fillers' },
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
        'Probiotics with no delivery protection — most cultures die in stomach acid, and nothing to feed the ones that survive',
        'Enzyme blends that never declare their activity units, so the real dose is unknowable',
        'Single-herb calm pills, or focus blends built on caffeine that trade a short peak for a crash',
        'Low-purity resveratrol (25% or less trans-resveratrol)',
        'Magnesium stearate, artificial fillers, and no word on where they are actually made',
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
      body: 'Where competitors sell single-ingredient bottles at under-dosed levels, we formulate complete stacks. CALM has 8 active compounds. RENEWAL is a 3-in-1 longevity formula. STILL pairs reishi with L-theanine for calm, unsedated focus. Every formula is backed by peer-reviewed research.',
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
    /**
     * Several reviewers are friends of the founder who were among Aurae's
     * first supporters. A personal connection to the brand has to be
     * disclosed wherever the review appears — it is what lets a reader weigh
     * the review for themselves.
     */
    disclosure:
      'Some reviews are from friends of the founder who were among the first to try Aurae. Reviews are published as written, edited only for length.',
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
    body: '500mg NAD+ for cellular energy + Quercetin for inflammatory response + 98% Resveratrol from Japanese Knotweed for antioxidant support. Three powerhouse molecules, one capsule.',
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
    body: 'Sourced from Polygonum cuspidatum (Japanese Knotweed) — the most concentrated natural source. Activates SIRT1 longevity genes and provides powerful antioxidant protection.',
    stat: '600mg',
    statLabel: '50% trans-resveratrol',
  },
  {
    glyph: '❖',
    title: 'MAKTREK Bi-Pass Delivery',
    body: '40 billion CFU across four clinically studied strains — L. acidophilus La-14, B. lactis Bl-04, L. plantarum Lp-115 and L. paracasei Lpc-37 — carried intact past stomach acid, with marine polysaccharide and fructooligosaccharide as prebiotic fuel.',
    stat: '40B',
    statLabel: 'CFU delivered past stomach acid',
  },
  {
    glyph: '◉',
    title: 'Makzyme-Pro Enzyme Blend',
    body: 'Six digestive enzymes at a declared 2,500 HUT of activity — a figure most brands never publish at all. Breaks down proteins, fats, lactose and carbohydrates so a meal is absorbed rather than sitting. One vegetable capsule per serving.',
    stat: '2,500 HUT',
    statLabel: 'Declared enzyme activity',
  },
  {
    glyph: '✤',
    title: 'Wild-Caught Omega-3',
    body: '1,000mg of fish oil concentrate from sardines and anchovies, delivering 180mg EPA and 120mg DHA — fats the body cannot make on its own. Stabilised with vitamin E, 100 softgels to a bottle.',
    stat: '100',
    statLabel: 'Softgels, one a day',
  },
  {
    glyph: '◐',
    title: 'Reishi + L-Theanine',
    body: '200mg reishi extract with L-theanine, lemon balm, passion flower and valerian root. L-theanine is the amino acid behind calm alertness — it settles a racing mind without dulling it, which is why it suits focused work rather than winding down. Non-drowsy, caffeine-free, in a blackberry gummy coloured with real blackberries.',
    stat: '200mg',
    statLabel: 'Reishi extract, non-drowsy',
  },
  {
    glyph: '★',
    title: 'FDA-Registered, cGMP Facility',
    body: 'Every Aurae formula is made in the United States, in a facility registered with the FDA and operating to current Good Manufacturing Practice standards — the rules covering sourcing, hygiene, traceability and process control from raw ingredient to sealed bottle.',
    stat: 'cGMP',
    statLabel: 'Made in the USA',
  },
];

export const LANDING_TESTIMONIALS: (Testimonial & { tag: string; accent: AccentKey })[] = [
  {
    tag: 'FLORA',
    accent: 'flora',
    stars: 5,
    headline: 'I finally feel balanced again.',
    body: 'My digestion had been completely off-track for a while. FLORA helped me feel balanced again so quickly. I love that it is 40 billion CFU — you can genuinely feel the quality within the first few days.',
    author: 'Hannah G.',
    location: 'Austin, TX',
  },
  {
    tag: 'RELEASE',
    accent: 'release',
    stars: 5,
    headline: 'My absolute lifesaver for eating out.',
    body: 'RELEASE has become my go-to handbag essential. Whenever I go out for dinner or eat a heavier meal than usual, I take one capsule and completely forget about that heavy feeling afterwards. It delivers exactly what it promises.',
    author: 'Chloe T.',
    location: 'Miami, FL',
  },
  {
    tag: 'VITAL',
    accent: 'vital',
    stars: 5,
    headline: 'Clearer at work, and my joints feel great.',
    body: 'I started taking VITAL to support my daily focus at work, and I am in love. I feel so much clearer throughout the day, and my joints have felt great during my workouts.',
    author: 'Lucia V.',
    location: 'San Diego, CA',
  },
  {
    tag: 'CALM',
    accent: 'calm',
    stars: 5,
    headline: 'Fewer cravings, and finally relaxed.',
    body: 'I noticed my cravings dropped way down, and I feel noticeably less bloated. With ashwagandha plus vitamins D3, B6 and B12, I finally feel genuinely relaxed.',
    author: 'Maya R.',
    location: 'Denver, CO',
  },
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
    tag: 'FULL RITUAL',
    accent: 'ritual',
    stars: 5,
    headline: 'I feel 28 again, and I am 38.',
    body: 'After 4 months on the Full Ritual, my friends keep asking what I am doing differently. The answer is Aurae. This is my forever wellness stack.',
    author: 'Anne L.',
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
    q: 'Where are Aurae supplements made?',
    a: [
      'In the United States, in a facility registered with the FDA and operating to current Good Manufacturing Practice (cGMP) standards. That covers ingredient sourcing, hygiene, traceability and process control from raw material to sealed bottle.',
      'Registration is not an FDA endorsement — the FDA does not approve dietary supplements, and no brand that says otherwise is telling you the truth.',
    ],
  },
  {
    q: 'Can I take the Aurae products together?',
    a: [
      'Yes. The formulas are built to complement each other rather than overlap — gut balance, skin, cellular energy, digestion, essential fats, stress, longevity and focus each support a different part of your day.',
      'A full-line day looks like this. Morning: FLORA first thing, GLOW stirred into your coffee or smoothie, and RENEWAL with water before you head out.',
      'With meals: RELEASE as you sit down to a heavier meal, and VITAL alongside food, since a little fat helps it absorb. RADIANCE is taken twice daily, 20–30 minutes before meals. CALM goes with a meal, morning or early evening.',
      'STILL is for the moments you need to settle and concentrate — the afternoon slump, or before anything that calls for a clear head. It’s non-drowsy, so it isn’t a bedtime product.',
      'You don’t need the whole line to feel a difference. Most women start with one or two and build from there. If you’re pregnant, nursing, or taking medication, talk to your doctor before combining supplements.',
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
      'Free standard shipping (5–7 business days) on all orders of $40 or more. Orders under $40 ship standard for a flat $4.99.',
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
