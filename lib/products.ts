/**
 * The only module the pages talk to for catalog data.
 *
 * Resolution order:
 *   1. Shopify Storefront API (when SHOPIFY_STOREFRONT_ACCESS_TOKEN is set)
 *   2. data/shopify-snapshot.json — a real snapshot of the Aurae store
 *      (same product IDs, image URLs, prices, descriptions and metafields),
 *      so `npm run dev` works before the token exists.
 *
 * Run `npm run sync:shopify` to refresh the snapshot from the live store.
 */

import snapshot from '@/data/shopify-snapshot.json';
import { BUNDLE_ORDER, PRODUCT_ORDER } from './config';
import { fetchAllProducts } from './shopify';
import type { AuraeProduct, DataSource } from './types';

const SNAPSHOT_PRODUCTS = snapshot.products as unknown as AuraeProduct[];

export type Catalog = {
  products: AuraeProduct[];
  bundles: AuraeProduct[];
  all: AuraeProduct[];
  source: DataSource;
};

function orderBy(list: AuraeProduct[], order: readonly string[]): AuraeProduct[] {
  const rank = (handle: string) => {
    const index = order.indexOf(handle);
    return index === -1 ? order.length : index;
  };
  return [...list].sort((a, b) => rank(a.handle) - rank(b.handle) || a.title.localeCompare(b.title));
}

/** Products + bundles, ordered for display, from whichever source responded. */
export async function getCatalog(): Promise<Catalog> {
  const live = await fetchAllProducts();
  const all = live?.length ? live : SNAPSHOT_PRODUCTS;
  const source: DataSource = live?.length ? 'storefront-api' : 'snapshot';

  return {
    all,
    products: orderBy(all.filter((product) => !product.isBundle), PRODUCT_ORDER),
    bundles: orderBy(all.filter((product) => product.isBundle), BUNDLE_ORDER),
    source,
  };
}

/**
 * Look a product up by handle *or* numeric Shopify id, so both
 * /product/grass-fed-hydrolyzed-collagen-peptides and
 * /product/10121267970334 resolve.
 */
export async function getProduct(idOrHandle: string): Promise<AuraeProduct | null> {
  const key = decodeURIComponent(idOrHandle).toLowerCase();
  const { all } = await getCatalog();
  return (
    all.find((product) => product.handle.toLowerCase() === key) ??
    all.find((product) => product.numericId === key) ??
    all.find((product) => product.title.toLowerCase() === key) ??
    null
  );
}

/** Every product route we prerender. */
export async function getProductParams(): Promise<{ productId: string }[]> {
  const { products } = await getCatalog();
  return products.map((product) => ({ productId: product.handle }));
}

export async function getBundleParams(): Promise<{ bundleId: string }[]> {
  const { bundles } = await getCatalog();
  return bundles.map((bundle) => ({ bundleId: bundle.handle }));
}

/** Cross-sell: everything except the product being viewed. */
export async function getCrossSell(
  handle: string,
  preferred: readonly string[] = [],
  limit = 3,
): Promise<AuraeProduct[]> {
  const { products } = await getCatalog();
  const pool = products.filter((product) => product.handle !== handle);
  const ranked = [...pool].sort((a, b) => {
    const ai = preferred.indexOf(a.handle);
    const bi = preferred.indexOf(b.handle);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  return ranked.slice(0, limit);
}

/** The individual products that make up a bundle, resolved from Shopify. */
export async function getBundleContents(handles: readonly string[]): Promise<AuraeProduct[]> {
  const { products } = await getCatalog();
  return handles
    .map((handle) => products.find((product) => product.handle === handle))
    .filter((product): product is AuraeProduct => Boolean(product));
}
