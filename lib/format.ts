import { SUBSCRIBE_DISCOUNT } from './config';

export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Price with Subscribe & Save applied. */
export function subscribePrice(amount: number): number {
  return Math.round(amount * (1 - SUBSCRIBE_DISCOUNT) * 100) / 100;
}

export function subscribeLabel(): string {
  return `${Math.round(SUBSCRIBE_DISCOUNT * 100)}%`;
}

/** Savings between a bundle's price and its compare-at price. */
export function savings(price: number, compareAt: number | null) {
  if (!compareAt || compareAt <= price) return null;
  const amount = Math.round((compareAt - price) * 100) / 100;
  const percent = Math.round((amount / compareAt) * 100);
  return { amount, percent };
}

/** gid://shopify/Product/123 → "123" */
export function numericId(gid: string): string {
  const match = /\/(\d+)(?:\?.*)?$/.exec(gid);
  return match ? match[1] : gid;
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

/**
 * Shopify Supliful descriptions are one long run-on blob. Pull out the first
 * couple of sentences for use as a short marketing description.
 */
export function shortDescription(description: string, sentences = 2): string {
  const clean = description
    .replace(/\s+/g, ' ')
    .replace(/(\*|Ingredients:|Manufacturer's country:).*$/s, '')
    .trim();
  const parts = clean.match(/[^.!?]+[.!?]+/g);
  if (!parts) return truncate(clean, 180);
  return parts.slice(0, sentences).join(' ').trim();
}
