/**
 * Editorial layer for the product detail pages.
 *
 * Everything commercial — title, price, images, ingredient panel, dosage —
 * comes from Shopify at request time. This file holds only the copy Shopify
 * has no field for: benefit cards, the ritual steps, the science write-up,
 * per-product FAQs, testimonials and sustainability notes.
 *
 * Keyed by Shopify product handle. Add a key here and the new product's page
 * picks it up; leave one out and the page falls back to Shopify data alone.
 */

import type { AccentKey } from '@/lib/accents';

export type Benefit = { icon: BenefitIcon; title: string; text: string };
export type BenefitIcon = 'circles' | 'star' | 'bloom' | 'wave' | 'orbit' | 'moon' | 'spark';

export type RitualStep = { label: string; title: string; text: string };

export type ScienceStat = { value: string; label: string };

export type Evidence = { claim: string; detail: string };

export type Testimonial = {
  stars: number;
  headline: string;
  body: string;
  author: string;
  location: string;
};

export type Faq = { q: string; a: string[] };

export type ProductContent = {
  accent: AccentKey;
  /** Short kicker above the product title in the hero. */
  eyebrow: string;
  /** One-line poetic promise, shown under the title. */
  tagline: string;
  /** 2–3 sentence hero paragraph. Falls back to the Shopify description. */
  intro: string;
  /** Quick facts strip under the Add to Cart button. */
  quickFacts: string[];
  benefits: Benefit[];
  ritual: { intro: string; steps: RitualStep[] };
  science: {
    headline: string;
    body: string[];
    stats: ScienceStat[];
    evidence: Evidence[];
  };
  testimonials: Testimonial[];
  faqs: Faq[];
  sustainability: { title: string; text: string }[];
  crossSell: { intro: string; handles: string[] };
  finalCta: { headline: string; sub: string };
};

export const PRODUCT_CONTENT: Record<string, ProductContent> = {
  // ─────────────────────────────────────────── GLOW
  'grass-fed-hydrolyzed-collagen-peptides': {
    accent: 'glow',
    eyebrow: 'Radiant Skin',
    tagline: 'Plump, luminous skin — built from the inside out.',
    intro:
      'Collagen is the scaffolding of your skin, and production drops roughly 1% every year after 25. GLOW replaces it with grass-fed hydrolyzed peptides in Types 1 & 3 — the exact forms your dermis uses — at a full clinical serving, unflavoured, so it disappears into your morning coffee.',
    quickFacts: [
      'Types 1 & 3 · grass-fed bovine',
      'Unflavoured — dissolves clear',
      'Third-party tested every batch',
    ],
    benefits: [
      {
        icon: 'bloom',
        title: 'Visible radiance',
        text: 'Peptides signal fibroblasts to rebuild collagen, softening fine lines and restoring the light-catching bounce of younger skin.',
      },
      {
        icon: 'wave',
        title: 'Hydration that holds',
        text: 'Glycine and proline improve the dermis’ ability to bind water, so skin reads dewy rather than tight by 4pm.',
      },
      {
        icon: 'circles',
        title: 'Skin elasticity',
        text: 'Type 1 rebuilds the elastic matrix of the dermis. Firmer along the jaw, smoother across the cheekbone.',
      },
      {
        icon: 'star',
        title: 'Hair, nails & joints',
        text: 'Type 3 supports tendons, cartilage and follicles — stronger nails and less morning stiffness come along for the ride.',
      },
    ],
    ritual: {
      intro: 'One scoop. Anywhere in your morning. That is the whole commitment.',
      steps: [
        {
          label: 'Step 01',
          title: 'Mix into your morning ritual',
          text: 'One level scoop into 8–10 oz of coffee, matcha, smoothie or cold water. Hydrolyzed peptides dissolve clear with no chalk and no taste.',
        },
        {
          label: 'Step 02',
          title: 'Absorbed within 30 minutes',
          text: 'Because the collagen is already broken into low-weight peptides, it clears the gut wall fast and circulates as free amino acids your skin can use.',
        },
        {
          label: 'Step 03',
          title: 'Visible results by week 4',
          text: 'Hydration and nail strength come first. Tone, elasticity and fine-line softening build through weeks 8–12 with daily use.',
        },
      ],
    },
    science: {
      headline: 'Why hydrolyzed peptides, and why this dose.',
      body: [
        'Intact collagen is too large to cross the intestinal wall. Hydrolysis cuts it into di- and tripeptides — chiefly glycine, proline and hydroxyproline — small enough to absorb and specific enough to act as a signal, not just as protein.',
        'That signal matters. Hydroxyproline-containing peptides arriving in the dermis are read by fibroblasts as collagen breakdown, which upregulates new collagen and hyaluronic acid synthesis. Under-dosed formulas send too faint a signal to matter, which is why serving size is the whole game.',
      ],
      stats: [
        { value: 'Types 1 & 3', label: 'The two forms skin is built from' },
        { value: 'Grass-fed', label: 'Pasture-raised bovine source' },
        { value: '8–12 wks', label: 'Typical window for visible change' },
      ],
      evidence: [
        {
          claim: 'Peptides are bioavailable',
          detail:
            'Hydrolyzed collagen is absorbed as small peptides and detectable in plasma within an hour of an oral dose.',
        },
        {
          claim: 'Fibroblasts respond to the signal',
          detail:
            'Hydroxyproline-rich peptides stimulate fibroblast activity, driving collagen and hyaluronic acid production in the dermis.',
        },
        {
          claim: 'Consistency beats intensity',
          detail:
            'Skin turnover runs on a multi-week cycle, so daily dosing across 8–12 weeks outperforms occasional large servings.',
        },
      ],
    },
    testimonials: [
      {
        stars: 5,
        headline: 'My skin looks like I have been on vacation.',
        body: 'Eight weeks of GLOW in my coffee every morning and my skin is visibly plumper. The tired-girl face is gone. Worth every penny.',
        author: 'Sofia M.',
        location: 'New York, NY',
      },
      {
        stars: 5,
        headline: 'Truly tasteless — that is the miracle.',
        body: 'I have thrown away three collagens because of the aftertaste. This one vanishes into my latte. Six weeks in, my nails stopped peeling.',
        author: 'Renata V.',
        location: 'Austin, TX',
      },
      {
        stars: 5,
        headline: 'The makeup artist noticed before I did.',
        body: 'She asked what I had changed because my foundation was sitting differently. Smoother, less cakey. It was GLOW.',
        author: 'Priya D.',
        location: 'Chicago, IL',
      },
    ],
    faqs: [
      {
        q: 'How long until I see a difference in my skin?',
        a: [
          'Hydration and nail strength are usually the first things women notice, around weeks 2–4. Tone, elasticity and fine-line softening build through weeks 8–12.',
          'Skin renews on a multi-week cycle, so consistency matters far more than dose size. One scoop daily, every day, beats three scoops twice a week.',
        ],
      },
      {
        q: 'Will it change the taste of my coffee?',
        a: [
          'No. GLOW is unflavoured and fully hydrolyzed, so it dissolves clear in hot or cold liquid with no chalk, no film and no aftertaste.',
          'It also survives heat, so stirring it into coffee or tea does not damage the peptides.',
        ],
      },
      {
        q: 'Is it safe to take alongside the other Aurae formulas?',
        a: [
          'Yes. GLOW is protein, not an active compound, so it layers with CALM, SLEEP, RADIANCE and RENEWAL without interaction.',
          'Most women take GLOW and RENEWAL together in the morning, RADIANCE midday, CALM early evening and SLEEP before bed.',
        ],
      },
      {
        q: 'Where does the collagen come from?',
        a: [
          'Grass-fed, pasture-raised bovine hide. It is a bovine-sourced product, so it is not suitable for vegan or vegetarian diets.',
          'Every batch is third-party tested for purity, potency and heavy metals in a GMP-certified facility in the United States.',
        ],
      },
      {
        q: 'Can I take it while pregnant or breastfeeding?',
        a: [
          'Collagen is a food protein, but we still ask you to check with your doctor first — as with any supplement during pregnancy or breastfeeding.',
        ],
      },
    ],
    sustainability: [
      {
        title: 'Single-ingredient sourcing',
        text: 'One ingredient, one supplier, pasture-raised. No proprietary blends hiding filler weight.',
      },
      {
        title: 'Recyclable packaging',
        text: 'Our tubs and scoops are made from recyclable PET — rinse, drop the cap, and it goes in the bin with your bottles.',
      },
      {
        title: 'Certificates on request',
        text: 'Every batch carries a certificate of analysis. Email us the lot number and we will send it.',
      },
    ],
    crossSell: {
      intro: 'Women who take GLOW most often pair it with these.',
      handles: ['resveratrol-50-600mg', 'nad', 'ashwagandha-plus'],
    },
    finalCta: {
      headline: 'Ready to glow from within?',
      sub: 'One scoop a morning. Visible change by week eight.',
    },
  },

  // ─────────────────────────────────────────── CALM
  'ashwagandha-plus': {
    accent: 'calm',
    eyebrow: 'Mental Clarity',
    tagline: 'Steady mind, steady energy — without the crash.',
    intro:
      'Most ashwagandha supplements are ashwagandha and nothing else. CALM builds around 600mg of KSM-66 — the most clinically studied extract available — and adds seven supporting actives: vitamins D3, B6 and B12, L-arginine, maca, panax ginseng and shatavari. Eight compounds, one capsule, no stimulants.',
    quickFacts: [
      'KSM-66 600mg · 5% withanolides',
      '8 active compounds · no stimulants',
      '60 vegetarian HPMC capsules',
    ],
    benefits: [
      {
        icon: 'circles',
        title: 'Calm under pressure',
        text: 'KSM-66 supports a normal cortisol response, so the same inbox lands differently. Composure, not sedation.',
      },
      {
        icon: 'spark',
        title: 'Energy without stimulants',
        text: 'B6, B12 and D3 support normal energy metabolism while maca and ginseng back stamina — steady lift, no jitter, no 3pm crash.',
      },
      {
        icon: 'orbit',
        title: 'Sharper mental clarity',
        text: 'Lower stress load frees working memory. Women describe it as the mental fog lifting by the end of week two.',
      },
      {
        icon: 'bloom',
        title: 'Hormonal & immune support',
        text: 'Shatavari and D3 support endocrine and immune function — the systems stress quietly taxes first.',
      },
    ],
    ritual: {
      intro: 'Two capsules, one meal. The formula does the sequencing for you.',
      steps: [
        {
          label: 'Step 01',
          title: 'Two capsules with a meal',
          text: 'Take both together with food and 6–8 oz of water. Fat and food improve withanolide absorption, so breakfast or lunch works best.',
        },
        {
          label: 'Step 02',
          title: 'Adaptogens build, not spike',
          text: 'Unlike caffeine, KSM-66 works by adaptation. The first few days feel subtle — that is the mechanism, not a failure.',
        },
        {
          label: 'Step 03',
          title: 'Noticeably steadier by week 4',
          text: 'Clinical work on KSM-66 reports meaningful change across 8 weeks of daily use. Most women feel the shift somewhere in weeks 2–4.',
        },
      ],
    },
    science: {
      headline: 'Adaptogens work on the axis, not the symptom.',
      body: [
        'Ashwagandha acts on the hypothalamic–pituitary–adrenal axis — the loop that governs cortisol release. Rather than blunting stress, it supports a normal, well-regulated response to it: the spike is proportionate and the return to baseline is faster.',
        'KSM-66 is a root-only, full-spectrum extract standardised to 5% withanolides, and it is the ashwagandha form most of the published human research was run on. We dose it at 600mg because that is the range those studies used — and we pair it with the B vitamins and D3 that stress depletes, which single-ingredient formulas ignore.',
      ],
      stats: [
        { value: '600mg', label: 'KSM-66, standardised to 5% withanolides' },
        { value: '8', label: 'Synergistic active compounds' },
        { value: 'Root only', label: 'No leaf, no filler, full spectrum' },
      ],
      evidence: [
        {
          claim: 'Standardised extract, clinical dose',
          detail:
            'KSM-66 is the most studied ashwagandha extract, and 600mg daily sits inside the range used in its published human trials.',
        },
        {
          claim: 'Supports a normal stress response',
          detail:
            'Withanolides modulate HPA-axis signalling, supporting a measured cortisol response to everyday stress.',
        },
        {
          claim: 'Cofactors matter',
          detail:
            'B6, B12 and D3 are required for normal energy metabolism and nervous-system function — the pathways chronic stress draws down.',
        },
      ],
    },
    testimonials: [
      {
        stars: 5,
        headline: 'Calm during the day. Out cold at night.',
        body: 'I take CALM in the morning and SLEEP before bed. My baseline anxiety has dropped massively in six weeks. Genuine game changer.',
        author: 'Emma R.',
        location: 'Los Angeles, CA',
      },
      {
        stars: 5,
        headline: 'I stopped snapping at my team.',
        body: 'Same workload, same deadlines, completely different reaction. I did not expect a supplement to change how I run a meeting.',
        author: 'Daniela O.',
        location: 'Denver, CO',
      },
      {
        stars: 4,
        headline: 'Took three weeks, then clicked.',
        body: 'Nothing for the first fortnight and I nearly quit. Week three the fog lifted and my energy went flat-line steady. Be patient with it.',
        author: 'Hana W.',
        location: 'Seattle, WA',
      },
    ],
    faqs: [
      {
        q: 'Will CALM make me drowsy?',
        a: [
          'No. CALM is non-sedating — it contains no melatonin, no valerian and no stimulants. It lowers the felt intensity of stress rather than your alertness.',
          'If you want help falling asleep, that is SLEEP. Many women take both: CALM in the morning, SLEEP 20 minutes before bed.',
        ],
      },
      {
        q: 'Morning or evening?',
        a: [
          'Either, as long as it is with a meal. Morning suits women whose stress peaks at work; early evening suits women who wind down badly.',
          'Take both capsules together rather than splitting them — the clinical dosing is 600mg in one serving.',
        ],
      },
      {
        q: 'How soon will I feel it?',
        a: [
          'Adaptogens accumulate. Most women notice a steadier baseline in weeks 2–4, and the published research on KSM-66 runs over 8 weeks of daily use.',
          'The first week is usually quiet. That is expected — it is not a stimulant.',
        ],
      },
      {
        q: 'Can I take it with antidepressants, thyroid or blood-pressure medication?',
        a: [
          'Ask your doctor first. Ashwagandha can interact with thyroid medication, sedatives and immunosuppressants, and it is not recommended during pregnancy.',
          'We would rather you check than guess. Bring the label to your appointment — every dose is printed on it.',
        ],
      },
      {
        q: 'Is the capsule vegetarian?',
        a: [
          'Yes. CALM uses an HPMC vegetable capsule and the formula is free from common allergens and artificial fillers.',
        ],
      },
    ],
    sustainability: [
      {
        title: 'Traceable botanicals',
        text: 'KSM-66 is a documented, root-only extract with a traceable supply chain — not anonymous bulk powder.',
      },
      {
        title: 'Vegetarian capsules',
        text: 'HPMC shells from plant cellulose. No gelatin, no titanium dioxide, no magnesium stearate.',
      },
      {
        title: 'No proprietary blends',
        text: 'Every one of the eight actives is listed with its exact milligram dose. You can audit us against the label.',
      },
    ],
    crossSell: {
      intro: 'CALM works hardest when the rest of the day is handled too.',
      handles: ['sleep-strips', 'nad', 'grass-fed-hydrolyzed-collagen-peptides'],
    },
    finalCta: {
      headline: 'Ready to feel steady again?',
      sub: 'Eight actives, one capsule, no stimulants.',
    },
  },

  // ─────────────────────────────────────────── SLEEP
  'sleep-strips': {
    accent: 'sleep',
    eyebrow: 'Quality Sleep',
    tagline: 'Dissolves on your tongue. Works in twenty minutes.',
    intro:
      'No water, no pill, no sticky gummy. SLEEP is a raspberry-flavoured oral strip that melts under your tongue and delivers five calming botanicals — valerian, lavender, chamomile, hibiscus and melatonin — straight through the sublingual tissue, bypassing the slow route through your stomach.',
    quickFacts: [
      '5 botanicals · sublingual delivery',
      'Non-habit forming · no water needed',
      'Raspberry · one strip per night',
    ],
    benefits: [
      {
        icon: 'moon',
        title: 'Asleep in about 20 minutes',
        text: 'Sublingual absorption skips first-pass metabolism, so onset is minutes rather than the hour a capsule needs.',
      },
      {
        icon: 'wave',
        title: 'Deeper, unbroken rest',
        text: 'Valerian and chamomile support sleep continuity — fewer 3am ceiling-staring sessions, more actual restoration.',
      },
      {
        icon: 'spark',
        title: 'No morning grogginess',
        text: 'A low, considered melatonin dose paired with botanicals, rather than the 10mg megadose that leaves you foggy until noon.',
      },
      {
        icon: 'circles',
        title: 'Travel-proof',
        text: 'A flat strip in your passport sleeve. Nothing to swallow, nothing to spill, nothing to explain at security.',
      },
    ],
    ritual: {
      intro: 'The simplest ritual we make. One strip, and you are done.',
      steps: [
        {
          label: 'Step 01',
          title: 'Place one strip on your tongue',
          text: 'Twenty to thirty minutes before bed. Let it dissolve — no water, no chewing, no swallowing required.',
        },
        {
          label: 'Step 02',
          title: 'Absorbs sublingually in minutes',
          text: 'The botanicals cross the tissue under your tongue directly into the bloodstream, skipping the digestive delay entirely.',
        },
        {
          label: 'Step 03',
          title: 'Wake up clear, not heavy',
          text: 'Melatonin clears quickly at this dose, so you wake to your alarm rather than through it. Maximum one strip per night.',
        },
      ],
    },
    science: {
      headline: 'Delivery is the whole difference.',
      body: [
        'Swallow a sleep capsule and it has to survive your stomach, then pass through the liver before anything reaches your brain. That first-pass metabolism costs both time and potency — which is why capsules are dosed high and still take an hour.',
        'The tissue under your tongue is thin and densely vascularised. A dissolving strip delivers its actives straight into circulation, so a smaller, gentler dose does the same work faster. Five botanicals also beats one: valerian and chamomile support sleep continuity, lavender and hibiscus support the wind-down, and melatonin handles the timing signal.',
      ],
      stats: [
        { value: '5', label: 'Synergistic sleep botanicals' },
        { value: '~20 min', label: 'Typical time to onset' },
        { value: 'Sublingual', label: 'No water, no first-pass loss' },
      ],
      evidence: [
        {
          claim: 'Sublingual delivery is faster',
          detail:
            'Oral-mucosal absorption bypasses gastric transit and hepatic first-pass metabolism, shortening time to onset.',
        },
        {
          claim: 'Melatonin is a timing signal',
          detail:
            'Melatonin shifts the circadian phase rather than sedating. Lower doses taken at a consistent hour are generally better tolerated.',
        },
        {
          claim: 'Botanical synergy',
          detail:
            'Valerian, chamomile, lavender and hibiscus act on complementary calming pathways rather than duplicating one mechanism.',
        },
      ],
    },
    testimonials: [
      {
        stars: 5,
        headline: 'Better than melatonin gummies, promise.',
        body: 'The strips are genius. No sticky gummies, no chalky pills. They melt under your tongue and twenty minutes later I am dreaming.',
        author: 'Ava L.',
        location: 'Austin, TX',
      },
      {
        stars: 5,
        headline: 'My jet lag fix, permanently.',
        body: 'I fly Europe monthly. One strip on landing night and my body clock resets in a day instead of five. They live in my passport case.',
        author: 'Noor A.',
        location: 'Miami, FL',
      },
      {
        stars: 5,
        headline: 'I wake up before my alarm now.',
        body: 'Ten-milligram melatonin used to flatten me until lunch. This gets me down fast and lets me come up clean.',
        author: 'Beatriz L.',
        location: 'San Diego, CA',
      },
    ],
    faqs: [
      {
        q: 'Will I feel groggy in the morning?',
        a: [
          'That is usually a melatonin-dose problem, and SLEEP is deliberately dosed low and paired with botanicals rather than relying on a megadose.',
          'Take it 20–30 minutes before you actually intend to sleep. Taking it and then staying up another two hours is the most common cause of a heavy morning.',
        ],
      },
      {
        q: 'Is it habit forming?',
        a: [
          'No. There are no prescription sedatives or hypnotics in SLEEP — it is five botanicals plus melatonin, and it is non-habit forming.',
          'Stick to one strip per night. More is not better with melatonin.',
        ],
      },
      {
        q: 'Do I need water?',
        a: [
          'No. That is the point of the format. Place one strip on your tongue and let it dissolve — nothing to swallow.',
        ],
      },
      {
        q: 'Can I take SLEEP and CALM together?',
        a: [
          'Yes, and it is our most popular pairing — that is exactly what The Calm & Sleep Ritual is. CALM in the morning for cortisol, SLEEP before bed for onset.',
          'They work on different pathways, so there is no overlap or doubling up.',
        ],
      },
      {
        q: 'What does it taste like?',
        a: [
          'Raspberry. Light, not sweet, and gone in about thirty seconds.',
        ],
      },
    ],
    sustainability: [
      {
        title: 'Lighter to ship',
        text: 'A strip pack weighs a fraction of a glass bottle of pills, which cuts shipping weight and emissions per dose.',
      },
      {
        title: 'No water, no waste',
        text: 'No plastic dosing cup, no sugar-syrup base, no gelatin — just the film and the actives.',
      },
      {
        title: 'Tested for what is not in it',
        text: 'Every batch is screened for heavy metals and contaminants alongside potency.',
      },
    ],
    crossSell: {
      intro: 'Sleep is one half of the nervous system. Here is the other.',
      handles: ['ashwagandha-plus', 'nad', 'grass-fed-hydrolyzed-collagen-peptides'],
    },
    finalCta: {
      headline: 'Ready for the good kind of tired?',
      sub: 'One strip. Twenty minutes. No water.',
    },
  },

  // ─────────────────────────────────────────── RADIANCE
  'resveratrol-50-600mg': {
    accent: 'radiance',
    eyebrow: 'Longevity',
    tagline: 'The longevity molecule, at a purity most brands skip.',
    intro:
      'Resveratrol is the polyphenol behind the red-wine longevity headlines — except a glass of wine contains a rounding error of it. RADIANCE delivers 600mg standardised to 50% trans-resveratrol from Japanese knotweed, the most concentrated natural source there is, where most shelf brands sit at 25% or below.',
    quickFacts: [
      '600mg · 50% trans-resveratrol',
      'Japanese knotweed (Polygonum cuspidatum)',
      'Vegetable capsule · twice daily',
    ],
    benefits: [
      {
        icon: 'star',
        title: 'Antioxidant defence',
        text: 'Polyphenols neutralise the free radicals that oxidise lipids and damage cell membranes — the slow-burn side of visible ageing.',
      },
      {
        icon: 'orbit',
        title: 'Activates longevity pathways',
        text: 'Trans-resveratrol is a known SIRT1 activator, part of the sirtuin family tied to cellular repair and metabolic regulation.',
      },
      {
        icon: 'wave',
        title: 'Cardiovascular support',
        text: 'Supports healthy endothelial function and normal cholesterol — the vascular side of looking and feeling well.',
      },
      {
        icon: 'spark',
        title: 'Brain & cognitive support',
        text: 'Resveratrol crosses into neural tissue, where its antioxidant activity supports cerebral blood flow and cognitive health.',
      },
    ],
    ritual: {
      intro: 'Split across the day, and always ahead of a meal.',
      steps: [
        {
          label: 'Step 01',
          title: 'One capsule, twice daily',
          text: 'Take 20–30 minutes before a meal, morning and evening. Splitting the dose keeps plasma levels steadier than one large hit.',
        },
        {
          label: 'Step 02',
          title: 'Works at the cellular level',
          text: 'Trans-resveratrol is the bioactive isomer. It engages sirtuin signalling and quenches oxidative stress inside the cell.',
        },
        {
          label: 'Step 03',
          title: 'A long game, honestly',
          text: 'This is not a formula you feel on Tuesday. Longevity compounds compound — think in quarters, not days.',
        },
      ],
    },
    science: {
      headline: 'Trans-, not cis-. Fifty percent, not fifteen.',
      body: [
        'Resveratrol exists as two isomers and only the trans- form carries the biological activity the research is built on. A label that says "resveratrol 600mg" without naming the trans- percentage is telling you almost nothing about what you are taking.',
        'We source from Polygonum cuspidatum — Japanese knotweed — because it is the richest natural source available, and we standardise to 50% trans-resveratrol. Mechanistically, trans-resveratrol activates SIRT1, one of the sirtuin enzymes involved in DNA repair, mitochondrial function and metabolic regulation: the same pathway calorie restriction is thought to work through.',
      ],
      stats: [
        { value: '600mg', label: 'Per daily serving' },
        { value: '50%', label: 'Standardised trans-resveratrol' },
        { value: 'SIRT1', label: 'Longevity pathway engaged' },
      ],
      evidence: [
        {
          claim: 'The trans- isomer is the active one',
          detail:
            'Published resveratrol research is conducted on trans-resveratrol; standardising the percentage is what makes a dose meaningful.',
        },
        {
          claim: 'A sirtuin activator',
          detail:
            'Trans-resveratrol activates SIRT1, an enzyme implicated in DNA repair, mitochondrial biogenesis and metabolic control.',
        },
        {
          claim: 'Vascular and antioxidant support',
          detail:
            'Polyphenol activity supports endothelial function and helps maintain normal cholesterol levels.',
        },
      ],
    },
    testimonials: [
      {
        stars: 5,
        headline: 'The longevity stack I actually stuck with.',
        body: 'I have tried a lot of resveratrol brands and RADIANCE actually delivers — at close to half the price of the competition. Pure quality.',
        author: 'Jasmine K.',
        location: 'Chicago, IL',
      },
      {
        stars: 5,
        headline: 'Finally a label that states the trans- percentage.',
        body: 'I read supplement labels for a living. Most hide behind "resveratrol extract". Fifty percent trans-, stated plainly, is why I bought it.',
        author: 'Marta S.',
        location: 'Boston, MA',
      },
      {
        stars: 4,
        headline: 'Quiet, not dramatic — as expected.',
        body: 'You do not feel resveratrol the way you feel caffeine. Four months in, my bloodwork is better and my skin holds colour longer. I am staying on it.',
        author: 'Gabriela N.',
        location: 'Phoenix, AZ',
      },
    ],
    faqs: [
      {
        q: 'Why does the trans-resveratrol percentage matter?',
        a: [
          'Resveratrol has two isomers, and only trans-resveratrol is biologically active in the way the research describes. A 600mg capsule at 15% trans- delivers 90mg of what you actually want.',
          'RADIANCE is standardised to 50%, which is why we print it on the front of the label.',
        ],
      },
      {
        q: 'When should I take it?',
        a: [
          'One capsule twice daily, 20–30 minutes before a meal. Splitting morning and evening keeps levels steadier than a single dose.',
        ],
      },
      {
        q: 'Should I take RADIANCE or RENEWAL?',
        a: [
          'RADIANCE is a focused, high-purity resveratrol at 600mg. RENEWAL is a three-in-one stack — NAD+ 500mg with quercetin and a smaller resveratrol dose.',
          'If antioxidant and cardiovascular support is your priority, start with RADIANCE. If cellular energy is, start with RENEWAL. Taking both is fine and is what The Full Aurae Ritual does.',
        ],
      },
      {
        q: 'How long before it does anything?',
        a: [
          'Honestly: this one is a long game. Resveratrol works on cellular maintenance pathways, not on how you feel this afternoon.',
          'Plan in quarters. The women who stay on it longest are the ones who see the most in their bloodwork and their skin.',
        ],
      },
      {
        q: 'Any reason not to take it?',
        a: [
          'Resveratrol can have a mild blood-thinning effect, so speak to your doctor if you take anticoagulants or are scheduled for surgery.',
          'As always, check first if you are pregnant, breastfeeding or on prescription medication.',
        ],
      },
    ],
    sustainability: [
      {
        title: 'Plant-sourced, not synthetic',
        text: 'Extracted from Japanese knotweed root rather than produced synthetically.',
      },
      {
        title: 'Purity you can verify',
        text: 'Standardised to 50% trans-resveratrol and third-party assayed each batch — request the certificate any time.',
      },
      {
        title: 'Vegetable capsules',
        text: 'Plant-cellulose shells. No gelatin, no artificial colourants.',
      },
    ],
    crossSell: {
      intro: 'Longevity is a stack, not a single molecule.',
      handles: ['nad', 'grass-fed-hydrolyzed-collagen-peptides', 'ashwagandha-plus'],
    },
    finalCta: {
      headline: 'Ready to age on your own terms?',
      sub: '600mg at 50% trans-resveratrol. No guesswork.',
    },
  },

  // ─────────────────────────────────────────── RENEWAL
  nad: {
    accent: 'renewal',
    eyebrow: 'Cellular Energy',
    tagline: 'Three longevity molecules. One capsule. All-day energy.',
    intro:
      'NAD+ is the coenzyme every cell uses to turn food into energy, and levels fall steadily with age. RENEWAL delivers 500mg of NAD+ alongside quercetin and 98% resveratrol — a three-in-one stack that would otherwise mean three separate bottles and well over a hundred dollars.',
    quickFacts: [
      'NAD+ 500mg · quercetin · 98% resveratrol',
      '3-in-1 longevity stack',
      'Two capsules daily · with or without food',
    ],
    benefits: [
      {
        icon: 'spark',
        title: 'Steady, all-day energy',
        text: 'NAD+ is the electron carrier mitochondria run on. More available NAD+ means more ATP produced — energy at the source, not a stimulant borrowing against tomorrow.',
      },
      {
        icon: 'orbit',
        title: 'DNA & cellular repair',
        text: 'NAD+ is the required substrate for PARP enzymes and sirtuins, the machinery that repairs DNA and maintains cells.',
      },
      {
        icon: 'circles',
        title: 'Sharper focus & memory',
        text: 'Neurons are among the most energy-hungry cells you own. Supporting mitochondrial output shows up as clarity and recall.',
      },
      {
        icon: 'star',
        title: 'Healthy ageing, from within',
        text: 'Quercetin adds senolytic and anti-inflammatory support while resveratrol activates SIRT1 — three complementary pathways in one dose.',
      },
    ],
    ritual: {
      intro: 'Two capsules in the morning. That is the entire protocol.',
      steps: [
        {
          label: 'Step 01',
          title: 'Two capsules with water',
          text: 'Take both in the morning, with or without food. Morning dosing suits the energy curve — late-day dosing can feel a little too alive at bedtime.',
        },
        {
          label: 'Step 02',
          title: 'Feeds the mitochondria',
          text: 'NAD+ enters cellular respiration as the carrier that moves electrons through the chain that ends in ATP — usable energy.',
        },
        {
          label: 'Step 03',
          title: 'Noticeable within 2–3 weeks',
          text: 'RENEWAL is our fastest-felt formula. Most women describe steadier energy and fewer afternoon dips by week three.',
        },
      ],
    },
    science: {
      headline: 'Why a stack beats a single molecule.',
      body: [
        'NAD+ sits at the centre of cellular metabolism. It is the coenzyme that shuttles electrons through the respiratory chain to make ATP, and it is also the substrate that sirtuins and PARP repair enzymes consume when they work. Levels decline measurably with age, which means less energy production and less repair capacity at the same time.',
        'Raising NAD+ alone leaves the surrounding pathways untouched. Quercetin brings senolytic and anti-inflammatory activity that reduces the load on those repair enzymes, and 98% resveratrol activates SIRT1, which uses NAD+ as its fuel. Together the three do something none does alone — which is also why buying them separately costs three times as much.',
      ],
      stats: [
        { value: '500mg', label: 'NAD+ per daily serving' },
        { value: '3-in-1', label: 'NAD+ · quercetin · resveratrol' },
        { value: '98%', label: 'Resveratrol purity in the stack' },
      ],
      evidence: [
        {
          claim: 'NAD+ declines with age',
          detail:
            'Tissue NAD+ falls across the lifespan, reducing both mitochondrial ATP output and the substrate available for repair enzymes.',
        },
        {
          claim: 'Sirtuins depend on NAD+',
          detail:
            'SIRT1 and related enzymes consume NAD+ as a cofactor, so resveratrol activation and NAD+ availability are complementary.',
        },
        {
          claim: 'Quercetin adds senolytic support',
          detail:
            'Quercetin is studied for senolytic and anti-inflammatory activity, addressing a different lever of cellular ageing.',
        },
      ],
    },
    testimonials: [
      {
        stars: 5,
        headline: 'I do not need three coffees anymore.',
        body: 'NAD+ is the real deal. Three weeks of RENEWAL and my energy is steadier, my workouts are better and I just feel sharper overall.',
        author: 'Camila T.',
        location: 'Miami, FL',
      },
      {
        stars: 5,
        headline: 'Replaced three bottles with one.',
        body: 'I was buying NAD+, quercetin and resveratrol separately for over $150 a month. This is one capsule and a third of the price.',
        author: 'Lucia F.',
        location: 'Portland, OR',
      },
      {
        stars: 5,
        headline: 'The 3pm wall is gone.',
        body: 'I used to schedule my day around the afternoon crash. Six weeks in, it simply does not arrive. Nothing jittery about it either.',
        author: 'Yasmin H.',
        location: 'Brooklyn, NY',
      },
    ],
    faqs: [
      {
        q: 'How is RENEWAL different from RADIANCE?',
        a: [
          'RENEWAL leads with NAD+ 500mg for cellular energy and repair, with quercetin and resveratrol as supporting actives. RADIANCE is a dedicated high-purity resveratrol at 600mg.',
          'Pick RENEWAL for energy and repair, RADIANCE for antioxidant and cardiovascular focus. Together they are the core of The Full Aurae Ritual.',
        ],
      },
      {
        q: 'When should I take it?',
        a: [
          'Two capsules in the morning with water, with or without food.',
          'We do not recommend late-evening dosing — RENEWAL supports energy production, and some women find it a little activating close to bedtime.',
        ],
      },
      {
        q: 'How fast will I feel it?',
        a: [
          'RENEWAL is the formula women report feeling soonest. Steadier energy and fewer afternoon dips typically show up in weeks 2–3.',
          'Unlike caffeine there is no spike and no crash — the change reads as a raised floor rather than a peak.',
        ],
      },
      {
        q: 'Is it a stimulant?',
        a: [
          'No. There is no caffeine and no stimulant of any kind. NAD+ supports your own energy production rather than borrowing against it.',
        ],
      },
      {
        q: 'Why is it the most expensive Aurae formula?',
        a: [
          'Because it is three formulas. NAD+ at 500mg is a costly raw material on its own, and bought separately the three actives typically run past $150 a month.',
          'Standalone NAD+ and resveratrol bottles at this quality are usually $60 each. RENEWAL is $60 for all three.',
        ],
      },
    ],
    sustainability: [
      {
        title: 'Three bottles in one',
        text: 'Consolidating the stack removes two bottles, two labels and two shipments from every month.',
      },
      {
        title: 'High-purity actives',
        text: '98% resveratrol and pharmaceutical-grade NAD+ mean fewer milligrams of filler per dose.',
      },
      {
        title: 'Full dose transparency',
        text: 'No proprietary blend. Every active is listed at its exact milligram dose.',
      },
    ],
    crossSell: {
      intro: 'Pair RENEWAL with the formulas that work the same pathways.',
      handles: ['resveratrol-50-600mg', 'grass-fed-hydrolyzed-collagen-peptides', 'sleep-strips'],
    },
    finalCta: {
      headline: 'Ready for energy at the source?',
      sub: 'Three longevity molecules. One morning capsule.',
    },
  },
};

/** Safe accessor — unknown handles render from Shopify data alone. */
export function productContent(handle: string): ProductContent | null {
  return PRODUCT_CONTENT[handle] ?? null;
}
