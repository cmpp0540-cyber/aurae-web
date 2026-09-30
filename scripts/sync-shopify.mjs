#!/usr/bin/env node
/**
 * Refresh data/shopify-snapshot.json from the live Shopify Storefront API.
 *
 *   npm run sync:shopify
 *
 * Needs SHOPIFY_STOREFRONT_ACCESS_TOKEN and NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
 * in .env.local. The snapshot is what the site renders whenever the API is
 * unreachable or the token is missing, so keeping it fresh is worth doing
 * whenever products, prices or images change in Shopify.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SNAPSHOT = resolve(ROOT, 'data/shopify-snapshot.json');

// ── tiny .env reader (no dependency) ───────────────────────────────────────
function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    try {
      const raw = readFileSync(resolve(ROOT, file), 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i.exec(line);
        if (!match) continue;
        const [, key, value] = match;
        if (process.env[key] === undefined || process.env[key] === '') {
          process.env[key] = value.replace(/^["']|["']$/g, '');
        }
      }
    } catch {
      /* file is optional */
    }
  }
}

loadEnv();

const DOMAIN = (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const VERSION = process.env.SHOPIFY_API_VERSION || '2025-07';

const BUNDLE_HANDLES = ['the-glow-ritual', 'the-calm-sleep-ritual', 'the-full-aurae-ritual'];

if (!DOMAIN || !TOKEN) {
  console.error(
    '\n✕ Missing credentials.\n' +
      '  Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local\n' +
      '  (Shopify admin → Settings → Apps and sales channels → Develop apps → your app\n' +
      '   → Configuration → Storefront API → API credentials)\n',
  );
  process.exit(1);
}

const QUERY = `
  query AllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          productType
          vendor
          tags
          description
          descriptionHtml
          images(first: 24) { edges { node { url altText width height } } }
          priceRange { minVariantPrice { amount currencyCode } }
          compareAtPriceRange { minVariantPrice { amount currencyCode } }
          variants(first: 20) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
              }
            }
          }
          cardIngredient: metafield(namespace: "custom", key: "card_ingredient") { value }
          cardDetail: metafield(namespace: "custom", key: "card_detail") { value }
          howToUse: metafield(namespace: "custom", key: "how_to_use") { value }
          whatsInside: metafield(namespace: "custom", key: "what_s_inside") { value }
        }
      }
    }
  }
`;

const numericId = (gid) => {
  const match = /\/(\d+)$/.exec(gid || '');
  return match ? match[1] : gid;
};

const isBundle = (handle, productType, title) =>
  BUNDLE_HANDLES.includes(handle) ||
  (/ritual|bundle|kit|set/i.test(`${handle} ${title}`) && !String(productType || '').trim());

async function main() {
  const endpoint = `https://${DOMAIN}/api/${VERSION}/graphql.json`;
  console.log(`→ Fetching products from ${endpoint}`);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query: QUERY, variables: { first: 50 } }),
  });

  if (!res.ok) {
    console.error(`✕ ${res.status} ${res.statusText}`);
    console.error(await res.text());
    process.exit(1);
  }

  const json = await res.json();
  if (json.errors?.length) {
    console.error('✕ GraphQL errors:');
    for (const error of json.errors) console.error(`  · ${error.message}`);
    if (!json.data?.products) process.exit(1);
  }

  const edges = json.data?.products?.edges ?? [];
  if (!edges.length) {
    console.error('✕ No products returned. Is the app published to the Online Store channel?');
    process.exit(1);
  }

  const products = edges.map(({ node }) => {
    const variants = node.variants.edges.map(({ node: variant }) => ({
      id: variant.id,
      numericId: numericId(variant.id),
      title: variant.title,
      sku: variant.sku ?? null,
      price: Number(variant.price.amount),
      compareAtPrice: variant.compareAtPrice ? Number(variant.compareAtPrice.amount) : null,
      availableForSale: Boolean(variant.availableForSale),
    }));

    const compareAt = node.compareAtPriceRange?.minVariantPrice?.amount
      ? Number(node.compareAtPriceRange.minVariantPrice.amount)
      : (variants.find((variant) => variant.compareAtPrice)?.compareAtPrice ?? null);

    return {
      id: node.id,
      numericId: numericId(node.id),
      handle: node.handle,
      title: node.title,
      productType: node.productType ?? '',
      vendor: node.vendor ?? 'Aurae',
      tags: node.tags ?? [],
      description: (node.description ?? '').trim(),
      descriptionHtml: node.descriptionHtml ?? '',
      images: node.images.edges.map(({ node: image }) => ({
        url: image.url,
        // "" means "no alt set" in Shopify; keep it null so the UI can fall
        // back to a descriptive string instead of rendering alt="".
        altText: image.altText?.trim() ? image.altText : null,
        width: image.width ?? 1254,
        height: image.height ?? 1254,
      })),
      currency: node.priceRange.minVariantPrice.currencyCode,
      price: Number(node.priceRange.minVariantPrice.amount),
      compareAtPrice: compareAt && compareAt > 0 ? compareAt : null,
      variants,
      metafields: {
        cardIngredient: node.cardIngredient?.value ?? null,
        cardDetail: node.cardDetail?.value ?? null,
        howToUse: node.howToUse?.value ?? null,
        whatsInside: node.whatsInside?.value ?? null,
      },
      isBundle: isBundle(node.handle, node.productType, node.title),
    };
  });

  products.sort((a, b) => a.handle.localeCompare(b.handle));

  const payload = {
    shop: { name: 'Aurae', domain: DOMAIN, currency: products[0]?.currency ?? 'USD' },
    syncedAt: new Date().toISOString(),
    products,
  };

  writeFileSync(SNAPSHOT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`✓ Wrote ${products.length} products to data/shopify-snapshot.json\n`);
  for (const product of products) {
    const missing = Object.entries(product.metafields)
      .filter(([, value]) => !value)
      .map(([key]) => key);
    console.log(
      `  ${product.isBundle ? '◆' : '·'} ${product.handle.padEnd(40)} ` +
        `${product.images.length} img  $${product.price}` +
        (missing.length ? `  (no ${missing.join(', ')})` : ''),
    );
  }

  const anyMetafields = products.some((product) =>
    Object.values(product.metafields).some(Boolean),
  );
  if (!anyMetafields) {
    console.warn(
      '\n! No metafields came back. In Shopify, each custom metafield definition needs\n' +
        '  "Storefronts" access enabled (Settings → Custom data → Products → the definition\n' +
        '  → Access → Storefronts: read).',
    );
  }
}

main().catch((error) => {
  console.error('✕ Sync failed:', error.message);
  process.exit(1);
});
