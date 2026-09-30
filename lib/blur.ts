/**
 * Inline blur placeholders for next/image.
 *
 * With a custom loader, `placeholder="blur"` on a remote image needs an
 * explicit `blurDataURL`. Rather than fetching a tiny variant of every product
 * photo at build time (8 products × 8 images = 64 extra round trips), we render
 * a two-stop gradient in the product's own accent colours as an inline SVG.
 *
 * It costs zero network requests, is ~250 bytes in the HTML, and — because the
 * accents were picked from the photography in the first place — reads as a
 * genuine blurred preview of the image rather than a grey box.
 *
 * `encodeURIComponent` rather than base64 so the same helper runs unchanged on
 * the server and in the browser (no Buffer, no btoa).
 */

export function gradientBlurDataUrl(from: string, to: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4" preserveAspectRatio="none">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>` +
    `</linearGradient></defs>` +
    `<rect width="4" height="4" fill="url(#g)"/></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
