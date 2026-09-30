import { NextResponse } from 'next/server';
import { cartPermalink, createCheckout } from '@/lib/shopify';

type Line = { variantId: string; numericVariantId: string; quantity: number };

/**
 * Turns the client cart into a Shopify checkout URL.
 *
 *  1. With a Storefront token: `cartCreate` → cart.checkoutUrl (keeps discount
 *     codes, selling plans and analytics intact).
 *  2. Without one: a /cart/{variantId}:{qty} permalink, which works on any
 *     Shopify store with no credentials at all.
 */
export async function POST(request: Request) {
  let lines: Line[] = [];

  try {
    const body = (await request.json()) as { lines?: Line[] };
    lines = (body.lines ?? []).filter(
      (line) => line?.numericVariantId && Number(line.quantity) > 0,
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!lines.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const checkoutUrl = await createCheckout(
    lines.map((line) => ({ variantId: line.variantId, quantity: line.quantity })),
  );

  if (checkoutUrl) {
    return NextResponse.json({ url: checkoutUrl, via: 'storefront-api' });
  }

  return NextResponse.json({
    url: cartPermalink(
      lines.map((line) => ({
        numericVariantId: line.numericVariantId,
        quantity: line.quantity,
      })),
    ),
    via: 'cart-permalink',
  });
}
