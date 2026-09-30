/**
 * Custom next/image loader — resizing happens on Shopify's CDN, not on our server.
 *
 * Why this exists:
 *   The source images in the Aurae store are ~1.5 MB 1254×1254 PNGs. With the
 *   built-in optimizer, every one of them has to be downloaded by the Node
 *   server, decoded, resized and re-encoded before a single byte reaches the
 *   browser — roughly 12 MB of upstream traffic to paint one landing page.
 *
 *   Shopify's CDN already does all of that, from the URL:
 *
 *     …/image.png?v=1785736923&width=400&format=webp   →  12 KB
 *     …/image.png?v=1785736923                         →  1.53 MB
 *
 *   ~123× smaller, served from the edge with `cache-control: max-age=31557600`,
 *   and our server never touches the bytes.
 *
 * `format=webp` is honoured through content negotiation: Shopify returns WebP
 * to clients that send `Accept: image/webp` (every current browser) and falls
 * back to the original format for anything that does not. So there is no need
 * to sniff support ourselves.
 *
 * Referenced from next.config.mjs as `images.loaderFile`. Next bundles this for
 * the client too, so it must stay dependency-free and side-effect-free.
 */

type LoaderArgs = {
  src: string;
  width: number;
  quality?: number;
};

const SHOPIFY_CDN = 'cdn.shopify.com';

/** Shopify rejects widths above this; anything larger is served at source size. */
const MAX_CDN_WIDTH = 5760;

export default function shopifyImageLoader({ src, width, quality }: LoaderArgs): string {
  // Local files (/public, static imports) and any non-Shopify host pass through
  // untouched — there is nothing for the CDN to do with them.
  if (!src.startsWith('http')) return src;

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }

  if (!url.hostname.endsWith(SHOPIFY_CDN)) return src;

  url.searchParams.set('width', String(Math.min(Math.round(width), MAX_CDN_WIDTH)));
  url.searchParams.set('format', 'webp');

  // Shopify accepts 1-100. next/image defaults to 75 when the prop is omitted.
  if (quality) url.searchParams.set('quality', String(quality));

  return url.toString();
}

/**
 * Same transform, callable outside React — used by the gallery to warm the
 * browser cache for images that are not mounted yet.
 */
export function shopifyImageUrl(src: string, width: number, quality = 75): string {
  return shopifyImageLoader({ src, width, quality });
}
