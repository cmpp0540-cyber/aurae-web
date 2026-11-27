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
    titleLead: 'Lit from',
    titleItalic: 'within.',
    /**
     * The brand line, in the display serif, broken deliberately rather
     * than left to wrap where it lands: the claim on the first line, the
     * reason under it. The lead is hard-broken, so keep it under about 30
     * characters or it wraps on a 360px phone; the tail wraps on its own
     * and runs to two lines, three in all.
     */
    taglineLead: 'Cellular beauty made ritual,',
    taglineTail:
      'because true radiance isn’t something you apply — it’s something you build.',
    primaryCta: 'Try Aurae Vital Risk-Free',
    secondaryCta: 'Explore the Rituals',
    /**
     * Shown under the hero buttons. `icon` names the glyph drawn in Hero.tsx
     * — keep the two in step if you add an item.
     */
    reassurance: [
      { icon: 'shield', text: '30-Day Guarantee' },
      { icon: 'flask', text: 'Science-Backed Formulas' },
    ],
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
        // One link, not one per product. The carousel up the page already
        // lists all eight, and naming five of them here meant the footer
        // had to be edited every time the range changed — which is how the
        // link to the discontinued SLEEP survived as long as it did.
        links: [{ label: 'All Products', href: '/#shop' }],
      },
      {
        title: 'Rituals',
        links: [
          { label: 'The Gut Ritual', href: '/bundle/the-gut-ritual' },
          { label: 'The Unwind Ritual', href: '/bundle/the-unwind-ritual' },
          { label: 'The Glow Ritual', href: '/bundle/the-glow-ritual' },
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
  { label: 'Gut balance*', product: 'FLORA', handle: 'probiotic-40-billion-with-prebiotics', x: 63, y: 25.5 },
  { label: 'Longevity*', product: 'RADIANCE', handle: 'resveratrol-50-600mg', x: 70, y: 33.5 },
  { label: 'Sharper focus*', product: 'VITAL', handle: 'omega-3-epa-180mg-dha-120mg', x: 81.5, y: 13.5 },
  { label: 'Easy digestion*', product: 'RELEASE', handle: 'digestive-enzyme-pro-blend', x: 89, y: 4.5 },
];

/**
 * Tall shot, `public/images/aurae-hero-vertical.webp`, top to bottom.
 * The products alternate sides as the ribbon spirals, so `side` says which
 * margin the label sits in and which half of the frame is tappable. `y` is the
 * vertical centre of the product, `top`/`height` its band, all as percentages.
 */
/**
 * Phone shot, `public/images/aurae-hero-mobile-v2.webp`: two rows of four.
 *
 * The labels moved from the margins to above and below. With eight products
 * in two horizontal rows there are no longer eight free vertical bands to
 * hang them in, so each label now sits in the empty strip at the top or the
 * bottom of the frame, centred over its own product.
 *
 * `x` is the centre of the product, `left` and `width` its own edges for the
 * tap target — all percentages of the 4:5 frame, measured against THIS
 * image. Reshoot the hero and every number here needs re-measuring.
 */
export const HERO_PILLARS_MOBILE: (HeroPillar & {
  row: 'top' | 'bottom';
  x: number;
  left: number;
  width: number;
})[] = [
  {
    label: 'Radiant skin*',
    product: 'GLOW',
    handle: 'grass-fed-hydrolyzed-collagen-peptides',
    row: 'top',
    x: 21,
    left: 8,
    width: 27,
  },
  { label: 'Cellular energy*', product: 'RENEWAL', handle: 'nad', row: 'top', x: 45.5, left: 38, width: 15 },
  {
    label: 'Longevity*',
    product: 'RADIANCE',
    handle: 'resveratrol-50-600mg',
    row: 'top',
    x: 64,
    left: 55.5,
    width: 17.5,
  },
  {
    label: 'Mental clarity*',
    product: 'CALM',
    handle: 'ashwagandha-plus',
    row: 'top',
    x: 83.5,
    left: 75,
    width: 17,
  },
  { label: 'Gut balance*', product: 'FLORA', handle: 'probiotic-40-billion-with-prebiotics', row: 'bottom', x: 20.5, left: 13.5, width: 16 },
  { label: 'Easy digestion*', product: 'RELEASE', handle: 'digestive-enzyme-pro-blend', row: 'bottom', x: 41, left: 32, width: 17 },
  { label: 'Sharper focus*', product: 'VITAL', handle: 'omega-3-epa-180mg-dha-120mg', row: 'bottom', x: 61.5, left: 52.5, width: 17.5 },
  { label: 'Relaxed focus*', product: 'STILL', handle: 'reishi-relax-gummies', row: 'bottom', x: 81, left: 72, width: 18 },
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
    labels: {
      us: 'Aurae',
      them: 'Typical drugstore brand',
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
      'The first women to make Aurae part of their ritual. Here’s what they told us.',
    /**
     * Several reviewers are friends of the founder who were among Aurae's
     * first supporters. A personal connection to the brand has to be
     * disclosed wherever the review appears — it is what lets a reader weigh
     * the review for themselves.
     */
    disclosure:
      'Some reviews are from friends of the founder who were among the first to try Aurae. Reviews are published as written, edited only for length.',
    /** Sits under the closing button, where the guarantee answers the risk. */
    ctaNote: '30-Day Money-Back Guarantee',
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
/**
 * The ingredient-by-ingredient comparison, one card per product.
 *
 * `accent` keys into lib/accents.ts and colours the rule at the top of each
 * card. The order follows the one the rail reads best in, not the catalogue
 * — reorder freely, the component takes the array as given.
 *
 * Every `them` line describes a practice (under-dosing, not declaring a
 * figure, a single ingredient) rather than naming a competitor, and says
 * only what a label would show. Keep it that way.
 */
export const INSIDE_COMPARISONS: {
  product: string;
  accent: AccentKey;
  subject: string;
  us: string;
  them: string;
}[] = [
  {
    product: 'CALM',
    accent: 'calm',
    subject: 'Stress & vitality',
    us: 'KSM-66 Ashwagandha 600mg at 5% withanolides, with Vitamins D3, B6 and B12, Maca, Panax Ginseng, Shatavari and L-Arginine — eight actives working together.',
    them: 'Ashwagandha on its own, with no vitamins and no supporting adaptogens.',
  },
  {
    product: 'RENEWAL',
    accent: 'renewal',
    subject: 'Cellular energy',
    us: 'NAD+ 500mg with Quercetin 250mg and 98% Trans-Resveratrol — three longevity molecules in one capsule.',
    them: 'NAD+ and resveratrol at a fraction of the dose, and no quercetin at all.',
  },
  {
    product: 'GLOW',
    accent: 'glow',
    subject: 'Skin, hair & nails',
    us: 'Grass-fed hydrolyzed collagen peptides, Types 1 and 3, with the full amino acid profile — 20g of collagen and 18g of protein per serving.',
    them: 'Generic single-type collagen, missing key amino acids and not hydrolyzed for absorption.',
  },
  {
    product: 'FLORA',
    accent: 'flora',
    subject: 'Gut balance',
    us: '40 billion CFU across four clinically studied strains, carried past stomach acid by MAKTREK Bi-Pass delivery, with prebiotic fiber to feed them.',
    them: 'Probiotics with no delivery protection, and nothing to feed the cultures that make it through.',
  },
  {
    product: 'RELEASE',
    accent: 'release',
    subject: 'Easy digestion',
    us: 'Makzyme-Pro six-enzyme blend at a declared 2,500 HUT of activity — the number most brands never publish.',
    them: 'Enzyme blends that list ingredients but never declare activity units, so the real dose is unknowable.',
  },
  {
    product: 'VITAL',
    accent: 'vital',
    subject: 'Omega-3',
    us: '1,000mg of wild-caught fish oil from sardines and anchovies, declaring 180mg EPA and 120mg DHA, stabilised with vitamin E.',
    them: 'Fish oil sold by total milligrams, with the EPA and DHA actually delivered left off the front of the label.',
  },
  {
    product: 'STILL',
    accent: 'sleep',
    subject: 'Relaxed focus',
    us: 'Reishi 200mg with L-Theanine, Lemon Balm, Passion Flower and Valerian — calm alertness, not sedation, and caffeine-free.',
    them: 'Single-herb calm pills, or focus blends built on caffeine that trade a short peak for a crash.',
  },
  {
    product: 'RADIANCE',
    accent: 'radiance',
    subject: 'Longevity',
    us: '50% Trans-Resveratrol from Japanese Knotweed, the most concentrated natural source.',
    them: 'Low-purity resveratrol, commonly 25% trans-resveratrol or less.',
  },
];

export const SCIENCE_CARDS: {
  glyph: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
}[] = [
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
    glyph: '⊛',
    title: 'NAD+ 3-in-1 Longevity Stack',
    body: '500mg NAD+ for cellular energy + Quercetin for inflammatory response + 98% Resveratrol from Japanese Knotweed for antioxidant support. Three powerhouse molecules, one capsule.',
    stat: '500mg',
    statLabel: 'NAD+ + senolytic cofactors',
  },
  {
    glyph: '✦',
    title: 'Hydrolyzed Collagen Types 1 & 3',
    body: 'Grass-fed bovine peptides rich in glycine, proline, hydroxyproline, and alanine — the amino acids that boost collagen synthesis. Type 1 supports skin elasticity. Type 3 supports tendons, joints, and structure.',
    stat: 'Types 1 & 3',
    statLabel: 'Full amino acid profile',
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
];

export const LANDING_TESTIMONIALS: (Testimonial & { tag: string; accent: AccentKey })[] = [
  {
    tag: 'FLORA',
    accent: 'flora',
    stars: 5,
    headline: 'I finally feel balanced again.',
    body: 'My digestion had been off-track for a while. FLORA helped me feel balanced again so quickly, and at 40 billion CFU you can feel the quality within the first few days.',
    author: 'Hannah G.',
    location: 'Austin, TX',
  },
  {
    tag: 'RELEASE',
    accent: 'release',
    stars: 5,
    headline: 'My absolute lifesaver for eating out.',
    body: 'RELEASE has become my go-to handbag essential. Whenever I eat out or have a heavier meal, I take one capsule and completely forget that heavy feeling afterwards.',
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
  'probiotic-40-billion-with-prebiotics': {
    accent: 'flora',
    shortName: 'Flora',
    benefits: [
      'Daily gut balance',
      'Eases bloating & irregularity',
      'Supports natural immunity',
      'Prebiotics feed the cultures',
    ],
  },
  'digestive-enzyme-pro-blend': {
    accent: 'release',
    shortName: 'Release',
    benefits: [
      'Lighter after a heavy meal',
      'Breaks down protein, fat & carbs',
      'Absorb more from your food',
      'Easier on beans & dairy',
    ],
  },
  'omega-3-epa-180mg-dha-120mg': {
    accent: 'vital',
    shortName: 'Vital',
    benefits: [
      'Sharper, steadier thinking',
      'Heart & circulation support',
      'Supports healthy vision',
      'Essential fats most diets miss',
    ],
  },
  'reishi-relax-gummies': {
    accent: 'sleep',
    shortName: 'Still',
    benefits: [
      'Calm without the drowsiness',
      'Takes the edge off stress',
      'A clearer head under pressure',
      'No melatonin, non-habit forming',
    ],
  },
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
