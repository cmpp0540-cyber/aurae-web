import { BUNDLE_HANDLES } from './config';

/**
 * A product is a bundle when it is in the explicit list, or when Shopify gives
 * it no productType and it is named like a ritual — so a 4th bundle created in
 * Shopify lands on /bundle/... automatically.
 */
export function isBundleHandle(handle: string, productType = '', title = ''): boolean {
  if ((BUNDLE_HANDLES as readonly string[]).includes(handle)) return true;
  const looksLikeRitual = /ritual|bundle|kit|set/i.test(`${handle} ${title}`);
  return looksLikeRitual && !productType.trim();
}
