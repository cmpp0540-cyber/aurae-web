/**
 * Shopify Storefront API client.
 *
 * Runs server-side only (the token never reaches the browser). If no token is
 * configured, every function here returns null and `lib/products.ts` falls
 * back to the committed snapshot of the live store.
 */

import { API_VERSION, HAS_STOREFRONT_TOKEN, SHOPIFY_DOMAIN, STOREFRONT_TOKEN } from './config';
import { numericId } from './format';
import type { AuraeImage, AuraeProduct, AuraeVariant } from './types';
import { isBundleHandle } from './classify';

const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate = 60 * 30,
): Promise<T | null> {
  if (!HAS_STOREFRONT_TOKEN) return null;

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });

    if (!res.ok) {
      console.warn(`[shopify] ${res.status} ${res.statusText} - falling back to snapshot`);
      return null;
    }

    const json = (await res.json()) as GraphQLResponse<T>;
    if (json.errors?.length) {
      console.warn('[shopify] GraphQL errors:', json.errors.map((e) => e.message).join('; '));
      if (!json.data) return null;
    }
    return json.data ?? null;
  } catch (error) {
    console.warn('[shopify] request failed - falling back to snapshot:', (error as Error).message);
    return null;
  }
}

/** Mutations need a live request (no caching). */
async function storefrontMutation<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T | null> {
  if (!HAS_STOREFRONT_TOKEN) return null;
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = (await res.json()) as GraphQLResponse<T>;
    return json.data ?? null;
  } catch {
    return null;
  }
}

// -- Fragments --------------------------------------------------------------

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    title
    handle
    productType
    vendor
    tags
    description
    descriptionHtml
    images(first: 24) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    cardIngredient: metafield(namespace: "custom", key: "card_ingredient") {
      value
    }
    cardDetail: metafield(namespace: "custom", key: "card_detail") {
      value
    }
    howToUse: metafield(namespace: "custom", key: "how_to_use") {
      value
    }
    whatsInside: metafield(namespace: "custom", key: "what_s_inside") {
      value
    }
  }
`;

// -- Raw Storefront shapes --------------------------------------------------

type Money = { amount: string; currencyCode: string };

type RawProduct = {
  id: string;
  title: string;
  handle: string;
  productType: string;
  vendor: string;
  tags: string[];
  description: string;
  descriptionHtml: string;
  images: {
    edges: { node: { url: string; altText: string | null; width: number; height: number } }[];
  };
  priceRange: { minVariantPrice: Money };
  compareAtPriceRange: { minVariantPrice: Money } | null;
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        sku: string | null;
        availableForSale: boolean;
        price: Money;
        compareAtPrice: Money | null;
      };
    }[];
  };
  cardIngredient: { value: string } | null;
  cardDetail: { value: string } | null;
  howToUse: { value: string } | null;
  whatsInside: { value: string } | null;
};

// -- Normalisation ----------------------------------------------------------

export function normalizeProduct(raw: RawProduct): AuraeProduct {
  const images: AuraeImage[] = raw.images.edges.map(({ node }) => ({
    url: node.url,
    // Shopify returns "" (not null) for images with no alt text set. Left as-is
    // that silently renders alt="", which marks the photo decorative and hides
    // it from screen readers — collapse it so call-site fallbacks can fire.
    altText: node.altText?.trim() ? node.altText : null,
    width: node.width,
    height: node.height,
  }));

  const variants: AuraeVariant[] = raw.variants.edges.map(({ node }) => ({
    id: node.id,
    numericId: numericId(node.id),
    title: node.title,
    sku: node.sku,
    price: Number(node.price.amount),
    compareAtPrice: node.compareAtPrice ? Number(node.compareAtPrice.amount) : null,
    availableForSale: node.availableForSale,
  }));

  const rawCompareAt = raw.compareAtPriceRange?.minVariantPrice?.amount;
  const compareAt = rawCompareAt ? Number(rawCompareAt) : null;

  return {
    id: raw.id,
    numericId: numericId(raw.id),
    handle: raw.handle,
    title: raw.title,
    productType: raw.productType ?? '',
    vendor: raw.vendor ?? 'Aurae',
    tags: raw.tags ?? [],
    description: raw.description ?? '',
    descriptionHtml: raw.descriptionHtml ?? '',
    images,
    currency: raw.priceRange.minVariantPrice.currencyCode || 'USD',
    price: Number(raw.priceRange.minVariantPrice.amount),
    compareAtPrice: compareAt && compareAt > 0 ? compareAt : null,
    variants,
    metafields: {
      cardIngredient: raw.cardIngredient?.value ?? null,
      cardDetail: raw.cardDetail?.value ?? null,
      howToUse: raw.howToUse?.value ?? null,
      whatsInside: raw.whatsInside?.value ?? null,
    },
    isBundle: isBundleHandle(raw.handle, raw.productType, raw.title),
  };
}

// -- Queries ----------------------------------------------------------------

/** Every published product (products + bundles), or null when offline. */
export async function fetchAllProducts(): Promise<AuraeProduct[] | null> {
  const data = await storefront<{ products: { edges: { node: RawProduct }[] } }>(
    /* GraphQL */ `
      ${PRODUCT_FRAGMENT}
      query AllProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    `,
    { first: 50 },
  );
  if (!data?.products) return null;
  return data.products.edges.map(({ node }) => normalizeProduct(node));
}

export async function fetchProductByHandle(handle: string): Promise<AuraeProduct | null> {
  const data = await storefront<{ product: RawProduct | null }>(
    /* GraphQL */ `
      ${PRODUCT_FRAGMENT}
      query ProductByHandle($handle: String!) {
        product(handle: $handle) {
          ...ProductFields
        }
      }
    `,
    { handle },
  );
  if (!data?.product) return null;
  return normalizeProduct(data.product);
}

// -- Cart / checkout --------------------------------------------------------

type CartCreateResponse = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

/**
 * Create a Shopify cart and return its hosted checkout URL.
 * Returns null when there is no token - callers fall back to a /cart permalink.
 */
export async function createCheckout(
  lines: { variantId: string; quantity: number }[],
  discountCode?: string | null,
): Promise<string | null> {
  if (!lines.length) return null;

  const data = await storefrontMutation<CartCreateResponse>(
    /* GraphQL */ `
      mutation CartCreate($lines: [CartLineInput!]!, $discountCodes: [String!]) {
        cartCreate(input: { lines: $lines, discountCodes: $discountCodes }) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      lines: lines.map((line) => ({
        merchandiseId: line.variantId,
        quantity: line.quantity,
      })),
      discountCodes: discountCode ? [discountCode] : [],
    },
  );

  if (data?.cartCreate?.userErrors?.length) {
    console.warn(
      '[shopify] cartCreate errors:',
      data.cartCreate.userErrors.map((e) => e.message).join('; '),
    );
  }

  return data?.cartCreate?.cart?.checkoutUrl ?? null;
}

type DiscountPreviewResponse = {
  cartCreate: {
    cart: {
      discountCodes: { code: string; applicable: boolean }[];
      discountAllocations: { discountedAmount: { amount: string } }[];
      lines: {
        edges: {
          node: { discountAllocations: { discountedAmount: { amount: string } }[] };
        }[];
      };
    } | null;
    userErrors: { message: string }[];
  };
};

export type DiscountPreview =
  | { status: 'applied'; amount: number }
  | { status: 'invalid' }
  | { status: 'unavailable' };

/**
 * Ask Shopify whether a code works on these lines and how much it takes off.
 * Builds a throwaway cart, so nothing is saved or charged.
 */
export async function previewDiscount(
  lines: { variantId: string; quantity: number }[],
  code: string,
): Promise<DiscountPreview> {
  if (!lines.length) return { status: 'unavailable' };

  const data = await storefrontMutation<DiscountPreviewResponse>(
    /* GraphQL */ `
      mutation DiscountPreview($lines: [CartLineInput!]!, $discountCodes: [String!]) {
        cartCreate(input: { lines: $lines, discountCodes: $discountCodes }) {
          cart {
            discountCodes {
              code
              applicable
            }
            discountAllocations {
              discountedAmount {
                amount
              }
            }
            lines(first: 50) {
              edges {
                node {
                  discountAllocations {
                    discountedAmount {
                      amount
                    }
                  }
                }
              }
            }
          }
          userErrors {
            message
          }
        }
      }
    `,
    {
      lines: lines.map((line) => ({ merchandiseId: line.variantId, quantity: line.quantity })),
      discountCodes: [code],
    },
  );

  const cart = data?.cartCreate?.cart;
  if (!cart) return { status: 'unavailable' };

  const match = cart.discountCodes.find((item) => item.code.toLowerCase() === code.toLowerCase());
  if (!match?.applicable) return { status: 'invalid' };

  const sum = (items: { discountedAmount: { amount: string } }[]) =>
    items.reduce((total, item) => total + Number(item.discountedAmount.amount), 0);

  const amount =
    sum(cart.discountAllocations) +
    cart.lines.edges.reduce((total, edge) => total + sum(edge.node.discountAllocations), 0);

  return { status: 'applied', amount };
}

/**
 * Checkout URL that works with zero API credentials.
 * https://shop.com/cart/{variantId}:{qty},{variantId}:{qty}
 */
export function cartPermalink(
  lines: { numericVariantId: string; quantity: number }[],
  discountCode?: string | null,
): string {
  const path = lines
    .filter((line) => line.quantity > 0)
    .map((line) => `${line.numericVariantId}:${line.quantity}`)
    .join(',');
  const query = discountCode ? `?discount=${encodeURIComponent(discountCode)}` : '';
  return `https://${SHOPIFY_DOMAIN}/cart/${path}${query}`;
}
