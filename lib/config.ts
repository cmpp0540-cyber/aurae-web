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
  'the-glow-ritual',
  'the-calm-sleep-ritual',
  'the-full-aurae-ritual',
] as const;

/** Display order of the five hero products on the landing page. */
export const PRODUCT_ORDER = [
  'grass-fed-hydrolyzed-collagen-peptides', // GLOW
  'ashwagandha-plus',                       // CALM
  'sleep-strips',                           // SLEEP
  'resveratrol-50-600mg',                   // RADIANCE
  'nad',                                    // RENEWAL
] as const;

/** Display order of the bundles (cheapest → full ritual). */
export const BUNDLE_ORDER = [
  'the-glow-ritual',
  'the-calm-sleep-ritual',
  'the-full-aurae-ritual',
] as const;

/** Which bundle card gets the "Most Popular" treatment. */
export const FEATURED_BUNDLE_HANDLE = 'the-calm-sleep-ritual';

/** Which bundle card gets the dark "Best value" treatment. */
export const PREMIUM_BUNDLE_HANDLE = 'the-full-aurae-ritual';

/**
 * Shipping, as quoted in the cart and the FAQ.
 *
 * These drive the estimate shown in the drawer only — Shopify's checkout is
 * where the real rates are calculated, so keep them in step with the shipping
 * profile configured there.
 */
export const FREE_SHIPPING_THRESHOLD = 50;
export const FLAT_SHIPPING_RATE = 9.99;
