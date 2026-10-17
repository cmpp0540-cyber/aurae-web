/**
 * Meta (Facebook / Instagram) Pixel helpers.
 *
 * The Pixel ID is public by design (it is printed in every page's source), so
 * it lives here. Set NEXT_PUBLIC_META_PIXEL_ID in Vercel to override it, or set
 * it to an empty string to switch tracking off.
 */
export const META_PIXEL_ID: string =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '2107277899876834';

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/**
 * Send a standard event. The Pixel script loads after the page hydrates, so if
 * an event fires first, wait briefly for it rather than losing the event.
 */
export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !META_PIXEL_ID) return;

  let attempts = 0;
  const send = () => {
    if (window.fbq) {
      window.fbq('track', event, params);
      return;
    }
    if (attempts++ < 20) window.setTimeout(send, 300);
  };
  send();
}
