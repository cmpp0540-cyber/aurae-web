/** Runtime configuration, read once so the rest of the app stays pure. */

export const SHOPIFY_DOMAIN = (
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'auraevital.com'
).replace(/^https?:\/\//, '').replace(/\/$/, '');

export const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export const API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-07';

/** Live Storefront API calls are only attempted when a token is present. */
export const HAS_STOREFRONT_TOKEN = STOREFRONT_TOKEN.length > 0;

export const SUBSCRIBE_DISCOUNT = Number(
  process.env.NEXT_PUBLIC_SUBSCRIBE_DISCOUNT || '0.10',
);

/**
 * Handles of the three bundles. Used both to route them to /bundle/[id] and to
 * keep them out of the 5-product grid. A product with no productType whose
 * handle starts with `the-` is treated as a bundle too, so a 4th bundle added
 * in Shopify shows up without a code change.
 */
export const BUNDLE_HANDLES = [
  'the-glow-ritual',   // GLOW + RADIANCE
  'the-unwind-ritual', // CALM + STILL
  'the-gut-ritual',    // FLORA + RELEASE
  'the-full-aurae-ritual',
] as const;

/**
 * Display order of the eight products in the landing-page carousel.
 *
 * GLOW leads because it is the flagship; the rest follow the day the
 * "Your rituals" line sets out just above the carousel, morning to night.
 * This list only ranks — a product missing from it still appears, sorted
 * alphabetically after the ones listed, so a new Shopify product is never
 * invisible, just last.
 */
export const PRODUCT_ORDER = [
  'grass-fed-hydrolyzed-collagen-peptides', // GLOW     · radiant skin
  'probiotic-40-billion-with-prebiotics',   // FLORA    · gut balance
  'nad',                                    // RENEWAL  · cellular energy
  'digestive-enzyme-pro-blend',             // RELEASE  · easy digestion
  'omega-3-epa-180mg-dha-120mg',            // VITAL    · sharper focus
  'ashwagandha-plus',                       // CALM     · mental clarity
  'resveratrol-50-600mg',                   // RADIANCE · longevity
  'reishi-relax-gummies',                   // STILL    · relaxed focus
] as const;

/**
 * Display order of the bundles (cheapest → full ritual).
 *
 * `the-calm-sleep-ritual` is gone: SLEEP was discontinued, and the Unwind
 * Ritual (CALM + STILL) replaces it. The old product still sits in Shopify
 * as a draft — delete or archive it there so it can never be published by
 * accident, since classify.ts treats anything named "ritual" as a bundle.
 */
export const BUNDLE_ORDER = [
  'the-gut-ritual',    // $50.83
  'the-unwind-ritual', // $58.65
  'the-glow-ritual',   // $59.33
  'the-full-aurae-ritual',
] as const;

/**
 * Which bundle card gets the "Most Popular" treatment.
 *
 * It used to point at `the-calm-sleep-ritual`, a draft that never reaches
 * the Storefront API, so the badge simply never rendered. The Glow Ritual
 * carries it now: it pairs the two flagship products.
 */
export const FEATURED_BUNDLE_HANDLE = 'the-glow-ritual';

/** Which bundle card gets the dark "Best value" treatment. */
export const PREMIUM_BUNDLE_HANDLE = 'the-full-aurae-ritual';

/**
 * Shipping, as quoted in the cart and the FAQ.
 *
 * These drive the estimate shown in the drawer only — Shopify's checkout is
 * where the real rates are calculated, so keep them in step with the shipping
 * profile configured there.
 */
export const FREE_SHIPPING_THRESHOLD = 40;
export const FLAT_SHIPPING_RATE = 4.99;
