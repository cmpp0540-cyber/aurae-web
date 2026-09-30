/**
 * Normalised Aurae domain model.
 *
 * Everything the UI renders goes through these types, no matter whether the
 * data arrived from the live Shopify Storefront API or from the local
 * snapshot in `data/shopify-snapshot.json`.
 */

export type AuraeImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type AuraeVariant = {
  /** gid://shopify/ProductVariant/123 */
  id: string;
  /** 123 — used for /cart permalinks */
  numericId: string;
  title: string;
  sku: string | null;
  price: number;
  compareAtPrice: number | null;
  availableForSale: boolean;
};

/** Raw values as stored in Shopify custom metafields. */
export type AuraeMetafields = {
  /** e.g. "GRASS-FED COLLAGEN TYPES 1 & 3" */
  cardIngredient: string | null;
  /** e.g. "+ glycine, proline, hydroxyproline · skin, hair, nails, joints" */
  cardDetail: string | null;
  /** Shopify `rich_text_field` JSON string */
  howToUse: string | null;
  /** Shopify `rich_text_field` JSON string */
  whatsInside: string | null;
};

export type AuraeProduct = {
  /** gid://shopify/Product/123 */
  id: string;
  /** 123 */
  numericId: string;
  handle: string;
  title: string;
  productType: string;
  vendor: string;
  tags: string[];
  description: string;
  descriptionHtml: string;
  images: AuraeImage[];
  currency: string;
  price: number;
  compareAtPrice: number | null;
  variants: AuraeVariant[];
  metafields: AuraeMetafields;
  /** true for the three "Ritual" bundles */
  isBundle: boolean;
};

export type CartLine = {
  variantId: string;
  numericVariantId: string;
  productHandle: string;
  title: string;
  subtitle: string;
  image: string | null;
  price: number;
  quantity: number;
  isBundle: boolean;
};

/** Where the current page's product data came from — surfaced in dev only. */
export type DataSource = 'storefront-api' | 'snapshot';
