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
          'Yes. GLOW is protein, not an active compound, so it layers with CALM, STILL, RADIANCE and RENEWAL without interaction.',
          'Most women take GLOW and RENEWAL together in the morning, RADIANCE midday, CALM early evening and STILL to wind down.',
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
          'If you want help settling in the moment, that is STILL. Many women take both: CALM in the morning, STILL when the day tightens.',
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
      handles: ['reishi-relax-gummies', 'nad', 'grass-fed-hydrolyzed-collagen-peptides'],
    },
    finalCta: {
      headline: 'Ready to feel steady again?',
      sub: 'Eight actives, one capsule, no stimulants.',
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
      handles: ['resveratrol-50-600mg', 'grass-fed-hydrolyzed-collagen-peptides', 'omega-3-epa-180mg-dha-120mg'],
    },
    finalCta: {
      headline: 'Ready for energy at the source?',
      sub: 'Three longevity molecules. One morning capsule.',
    },
  },
  // ─────────────────────────────────────────── RELEASE
  'digestive-enzyme-pro-blend': {
    accent: 'release',
    eyebrow: 'Easy Digestion',
    tagline: 'Break it down. Actually absorb it.',
    intro:
      'A good meal is only as good as what you absorb from it. RELEASE is a full-spectrum enzyme blend — protease, lipase, lactase and alpha-galactosidase built around Makzyme-Pro™ — taken 20 minutes before you eat, so protein, fat, carbohydrate and fibre arrive at your gut already halfway broken down.',
    quickFacts: [
      'Makzyme-Pro™ enzyme blend',
      '60 capsules · one twice daily',
      'Taken 20–30 min before meals',
    ],
    benefits: [
      {
        icon: 'wave',
        title: 'Comfort after eating',
        text: 'Enzymes do the work your gut would otherwise strain through, which is what makes the hour after a heavy meal feel lighter.',
      },
      {
        icon: 'circles',
        title: 'Every macronutrient covered',
        text: 'Protease for protein, lipase for fat, lactase for dairy sugars, alpha-galactosidase for the beans and cruciferous vegetables that tend to sit heavy.',
      },
      {
        icon: 'spark',
        title: 'More from the same food',
        text: 'Nutrients you cannot break down are nutrients you do not absorb. Better breakdown means more of what you already eat actually reaches you.',
      },
      {
        icon: 'bloom',
        title: 'Plant enzymes, not animal',
        text: 'Bromelain from pineapple and papain from papaya, alongside fungal-fermented enzymes — active across a wide pH range, so they keep working past the stomach.',
      },
    ],
    ritual: {
      intro: 'Before the meal, not after. Timing is most of the effect.',
      steps: [
        {
          label: 'Step 01',
          title: 'One capsule, twice daily',
          text: 'Take it 20–30 minutes before your two largest meals. Swallowed after eating, the enzymes arrive behind the food they were meant to meet.',
        },
        {
          label: 'Step 02',
          title: 'The blend goes to work',
          text: 'Each enzyme targets a different bond — proteins into amino acids, fats into fatty acids, complex sugars into simple ones your gut can handle.',
        },
        {
          label: 'Step 03',
          title: 'You notice it on the heavy days',
          text: 'The difference is clearest after a big or unfamiliar meal. On a light day you may not notice anything at all, which is the point.',
        },
      ],
    },
    science: {
      headline: 'Your body makes enzymes. Modern eating asks for more.',
      body: [
        'Raw foods arrive with some of the enzymes needed to digest them. Cooking, processing and long shelf lives strip most of that away, which leaves your pancreas and small intestine doing the whole job alone — and enzyme output declines with age regardless.',
        'RELEASE is built around Makzyme-Pro™, a fermented blend pairing fungal protease from Aspergillus oryzae with three Lactobacillus strains. Around it sit bromelain and papain from pineapple and papaya, fungal lipase for fats, lactase for dairy sugars, and alpha-galactosidase for the oligosaccharides in beans and cruciferous vegetables — the ones most responsible for that heavy, gassy feeling afterwards.',
      ],
      stats: [
        { value: '7+', label: 'Distinct enzyme activities' },
        { value: '60', label: 'Vegetable capsules' },
        { value: '20 min', label: 'Before a meal' },
      ],
      evidence: [
        {
          claim: 'Enzymes are substrate-specific',
          detail:
            'No single enzyme digests everything. Protease, lipase, lactase and alpha-galactosidase each act on a different class of molecule, which is why a blend covers a real meal.',
        },
        {
          claim: 'Alpha-galactosidase targets the usual culprits',
          detail:
            'It breaks down the oligosaccharides in legumes and cruciferous vegetables that human enzymes cannot, leaving less for gut bacteria to ferment.',
        },
        {
          claim: 'Fungal enzymes tolerate a wide pH',
          detail:
            'Unlike animal-derived enzymes, fungal-fermented ones stay active across stomach and intestinal conditions.',
        },
      ],
    },
    testimonials: [],
    faqs: [
      {
        q: 'When exactly should I take it?',
        a: [
          'One capsule 20–30 minutes before each of your two largest meals.',
          'Taken after eating it still helps, but less — the enzymes work best when they are already present as the food arrives.',
        ],
      },
      {
        q: 'How is RELEASE different from FLORA?',
        a: [
          'They solve different problems. RELEASE supplies enzymes that break food down in the moment. FLORA supplies live bacteria that populate your gut over weeks.',
          'Enzymes act on this meal; probiotics act on the terrain. That is exactly why The Gut Ritual pairs them.',
        ],
      },
      {
        q: 'Can I take it with every meal?',
        a: [
          'The suggested use is one capsule twice daily. Do not exceed the recommended dose without speaking to your healthcare professional.',
        ],
      },
      {
        q: 'Is it vegetarian?',
        a: [
          'The enzymes are plant- and fungal-derived, and the capsule is hypromellose — plant cellulose, not gelatin.',
        ],
      },
      {
        q: 'Any reason not to take it?',
        a: [
          'Speak to your doctor first if you are pregnant, breastfeeding, under 18, take prescription medication or have a known medical condition — particularly ulcers or a pancreatic condition.',
          'Bromelain and papain can interact with blood thinners.',
        ],
      },
    ],
    sustainability: [
      {
        title: 'Fermented, not extracted from animals',
        text: 'The enzyme activities come from fungal fermentation and fruit, not from animal pancreas.',
      },
      {
        title: 'Vegetable capsules',
        text: 'Hypromellose shells. No gelatin, no artificial colourants.',
      },
      {
        title: 'Made in the USA',
        text: 'Manufactured in a facility held to US dietary-supplement standards.',
      },
    ],
    crossSell: {
      intro: 'Digestion is a system, not a single step.',
      handles: ['probiotic-40-billion-with-prebiotics', 'omega-3-epa-180mg-dha-120mg', 'ashwagandha-plus'],
    },
    finalCta: {
      headline: 'Ready to stop dreading the heavy meal?',
      sub: 'Seven enzyme activities. Twenty minutes before you eat.',
    },
  },

  // ─────────────────────────────────────────── VITAL
  'omega-3-epa-180mg-dha-120mg': {
    accent: 'vital',
    eyebrow: 'Sharper Focus',
    tagline: 'The two fats your brain is largely built from.',
    intro:
      'Your brain is close to sixty percent fat, and DHA is the single most abundant structural one in it. VITAL delivers 180mg EPA and 120mg DHA per serving from fish-oil concentrate — the two omega-3s with the actual research behind them, stabilised with vitamin E so they reach you unoxidised.',
    quickFacts: [
      'EPA 180mg · DHA 120mg per serving',
      '100 softgels · one twice daily',
      'Stabilised with vitamin E',
    ],
    benefits: [
      {
        icon: 'spark',
        title: 'Brain structure and function',
        text: 'DHA is a primary structural component of neuronal membranes and of the retina — it is not a stimulant, it is building material.',
      },
      {
        icon: 'wave',
        title: 'Cardiovascular support',
        text: 'EPA supports normal cholesterol and triglyceride metabolism and a healthy, regular heartbeat.',
      },
      {
        icon: 'orbit',
        title: 'Vision across every stage',
        text: 'DHA concentrates in retinal tissue, where it supports normal vision throughout life.',
      },
      {
        icon: 'circles',
        title: 'What most diets are short on',
        text: 'EPA and DHA come almost entirely from oily fish. Eat it rarely and there is no other meaningful dietary source.',
      },
    ],
    ritual: {
      intro: 'With food, twice a day. Fat needs fat to absorb.',
      steps: [
        {
          label: 'Step 01',
          title: 'One softgel, twice daily',
          text: 'Take with meals. Omega-3s are fat-soluble, so taking them alongside food meaningfully improves how much you absorb.',
        },
        {
          label: 'Step 02',
          title: 'They become part of you',
          text: 'EPA and DHA incorporate into cell membranes over weeks. This is structural work, not a signal that fires and fades.',
        },
        {
          label: 'Step 03',
          title: 'Give it a season',
          text: 'Membrane composition turns over slowly. Most of the research measures outcomes in months, and so should you.',
        },
      ],
    },
    science: {
      headline: 'EPA and DHA. Not "omega-3" as a vague number.',
      body: [
        'A label advertising "1000mg fish oil" is telling you the weight of the oil, not the dose of what matters. What matters is how much EPA and DHA sit inside it, and on a lot of shelf products that figure is a fraction of the headline.',
        'VITAL states both plainly: 180mg EPA and 120mg DHA per serving, from fish-oil concentrate rather than raw oil. EPA is the one tied to cholesterol and triglyceride metabolism and cardiovascular function; DHA is the structural one, concentrated in the brain and retina. Vitamin E is included because polyunsaturated fats oxidise easily, and an oxidised omega-3 is worse than none.',
      ],
      stats: [
        { value: '180mg', label: 'EPA per serving' },
        { value: '120mg', label: 'DHA per serving' },
        { value: '100', label: 'Softgels per bottle' },
      ],
      evidence: [
        {
          claim: 'DHA is structural, not stimulant',
          detail:
            'It is a primary fatty acid in neuronal and retinal membranes, supporting normal brain function and vision at every life stage.',
        },
        {
          claim: 'EPA works on the cardiovascular side',
          detail:
            'It supports normal cholesterol and triglyceride metabolism and the maintenance of a normal heartbeat.',
        },
        {
          claim: 'Oxidation is the real quality question',
          detail:
            'Polyunsaturated fats degrade on contact with air and light. Vitamin E is included as an antioxidant for exactly that reason.',
        },
      ],
    },
    testimonials: [],
    faqs: [
      {
        q: 'Why only 180mg EPA when other brands advertise 1000mg?',
        a: [
          'Those are different numbers. "1000mg fish oil" is the weight of the oil; EPA and DHA are what is inside it, and many such products contain 180mg and 120mg of them — exactly what VITAL states on the front.',
          'We print the actives rather than the oil weight, because the actives are what you are buying.',
        ],
      },
      {
        q: 'Will it repeat on me?',
        a: [
          'Taking it with a meal rather than on an empty stomach is the single thing that helps most. Some women also keep the bottle in the fridge.',
        ],
      },
      {
        q: 'Is it suitable if I do not eat fish?',
        a: [
          'The oil is fish-derived and the softgel shell is gelatin, so it is not vegan or vegetarian.',
          'If you avoid fish for dietary rather than ethical reasons, this is precisely the gap VITAL is meant to fill.',
        ],
      },
      {
        q: 'How long until I notice anything?',
        a: [
          'Omega-3s work by changing the composition of your cell membranes, which takes time. Think in terms of a season rather than a week.',
        ],
      },
      {
        q: 'Any reason not to take it?',
        a: [
          'Omega-3s can have a mild blood-thinning effect, so speak to your doctor if you take anticoagulants or have surgery scheduled.',
          'Check first if you are pregnant, breastfeeding, under 18 or have a fish allergy.',
        ],
      },
    ],
    sustainability: [
      {
        title: 'Concentrated, not raw oil',
        text: 'Concentration means a meaningful EPA and DHA dose in a smaller softgel, and less oil per serving.',
      },
      {
        title: 'Protected from oxidation',
        text: 'Vitamin E is included as an antioxidant, and the softgel shell keeps light and air off the oil.',
      },
      {
        title: 'Made in the USA',
        text: 'Manufactured in a facility held to US dietary-supplement standards.',
      },
    ],
    crossSell: {
      intro: 'The formulas that work the same pathways.',
      handles: ['nad', 'ashwagandha-plus', 'grass-fed-hydrolyzed-collagen-peptides'],
    },
    finalCta: {
      headline: 'Ready to feed the organ you think with?',
      sub: 'EPA and DHA stated plainly, twice a day.',
    },
  },

  // ─────────────────────────────────────────── STILL
  'reishi-relax-gummies': {
    accent: 'sleep',
    eyebrow: 'Relaxed Focus',
    tagline: 'Calm that does not cost you the afternoon.',
    intro:
      'Most calming supplements trade alertness for peace. STILL is built the other way round: reishi at 200mg with L-theanine, lemon balm, passion flower and valerian root, in a blackberry gummy you can take at your desk — botanicals traditionally used to settle the mind without switching it off.',
    quickFacts: [
      'Reishi 200mg + L-theanine 25mg',
      '30 blackberry gummies · one to two daily',
      'No capsule, no water, no melatonin',
    ],
    benefits: [
      {
        icon: 'moon',
        title: 'Settles without sedating',
        text: 'L-theanine is the amino acid in green tea associated with a relaxed but alert state — calm that does not read as drowsy.',
      },
      {
        icon: 'bloom',
        title: 'An adaptogenic mushroom',
        text: 'Reishi has been used for centuries to help the body hold its balance under load, and is the formula’s anchor at 200mg.',
      },
      {
        icon: 'circles',
        title: 'Four calming botanicals',
        text: 'Lemon balm, passion flower and valerian root round out the blend — the traditional European trio for a busy mind.',
      },
      {
        icon: 'star',
        title: 'Easy enough to actually keep up',
        text: 'A gummy you take at your desk gets taken. A capsule that needs water and a glass of it often does not.',
      },
    ],
    ritual: {
      intro: 'One when the day tightens. Two when it really does.',
      steps: [
        {
          label: 'Step 01',
          title: 'One to two gummies daily',
          text: 'Take them when you feel the day building — mid-afternoon for most women, or an hour before winding down in the evening.',
        },
        {
          label: 'Step 02',
          title: 'Chew, do not swallow whole',
          text: 'The gummy format means absorption begins in the mouth. No water needed, which is most of why it fits into a working day.',
        },
        {
          label: 'Step 03',
          title: 'Notice where the edge went',
          text: 'The effect is subtraction rather than addition — less noise, not more energy. It is the kind of thing you register in hindsight.',
        },
      ],
    },
    science: {
      headline: 'Calm and sedation are not the same thing.',
      body: [
        'Plenty of products confuse the two. Anything strong enough to put you under is strong enough to cost you the rest of your day, which is no help at two in the afternoon when the meeting is at four.',
        'STILL leads with reishi at 200mg, an adaptogenic mushroom traditionally used to support the body’s balance under sustained load. L-theanine at 25mg is the amino acid from green tea long associated with relaxed alertness. Lemon balm, passion flower and valerian root at 25mg each are the classical European calming botanicals. The blend is deliberately moderate: enough to take the edge off, not enough to take the afternoon.',
      ],
      stats: [
        { value: '200mg', label: 'Reishi extract' },
        { value: '5', label: 'Calming actives' },
        { value: '30', label: 'Gummies per jar' },
      ],
      evidence: [
        {
          claim: 'L-theanine is associated with relaxed alertness',
          detail:
            'The amino acid naturally present in green tea, long used for calm that does not come with drowsiness.',
        },
        {
          claim: 'Reishi is an adaptogen',
          detail:
            'Traditionally used to support the body in maintaining balance and a normal response to occasional stress.',
        },
        {
          claim: 'A traditional calming trio',
          detail:
            'Lemon balm, passion flower and valerian root have a long history of traditional use for relaxation and a settled mind.',
        },
      ],
    },
    testimonials: [],
    faqs: [
      {
        q: 'Will STILL make me sleepy?',
        a: [
          'It is formulated for calm rather than sedation, and the doses are deliberately moderate.',
          'That said, valerian root affects people differently. Try your first gummy on an evening rather than before something that needs your full attention.',
        ],
      },
      {
        q: 'How is STILL different from CALM?',
        a: [
          'CALM works on the stress response across the whole day, led by KSM-66 ashwagandha at 600mg with supporting vitamins and adaptogens.',
          'STILL is the in-the-moment one: reishi and L-theanine for when the day tightens. They are designed to be taken together, which is what The Unwind Ritual is.',
        ],
      },
      {
        q: 'Does it contain melatonin?',
        a: [
          'No. There is no melatonin in STILL — it is reishi, L-theanine and three calming botanicals.',
        ],
      },
      {
        q: 'How much sugar is in a gummy?',
        a: [
          'The gummies are made with organic cane sugar and tapioca syrup, coloured with blackberry and flavoured naturally. The full panel is on the label.',
        ],
      },
      {
        q: 'Any reason not to take it?',
        a: [
          'Speak to your doctor first if you are pregnant, breastfeeding, under 18, take prescription medication — sedatives in particular — or have a known medical condition.',
          'Do not exceed two gummies daily.',
        ],
      },
    ],
    sustainability: [
      {
        title: 'Coloured with fruit',
        text: 'Colour comes from blackberries and the flavour is natural. No synthetic dyes.',
      },
      {
        title: 'No melatonin, non-habit forming',
        text: 'Botanicals and an amino acid, not a hormone.',
      },
      {
        title: 'Made in the USA',
        text: 'Manufactured in a facility held to US dietary-supplement standards.',
      },
    ],
    crossSell: {
      intro: 'Calm works better as a pair.',
      handles: ['ashwagandha-plus', 'probiotic-40-billion-with-prebiotics', 'nad'],
    },
    finalCta: {
      headline: 'Ready to take the edge off without losing the day?',
      sub: 'Reishi and L-theanine. One gummy, no water.',
    },
  },
};

/** Safe accessor — unknown handles render from Shopify data alone. */
export function productContent(handle: string): ProductContent | null {
  return PRODUCT_CONTENT[handle] ?? null;
}
