import { NextResponse } from 'next/server';
import { previewDiscount } from '@/lib/shopify';

/**
 * Checks a discount code against the cart and reports what it takes off, so the
 * cart drawer can show the saving before the customer reaches checkout.
 * Nothing is saved: Shopify only builds a throwaway cart to price it.
 */

type Line = { variantId: string; quantity: number };

const CODE_PATTERN = /^[A-Za-z0-9_-]{1,40}$/;

type DiscountResponse =
  | { ok: true; code: string; amount: number }
  | { ok: false; error: string };

function fail(error: string, status: number) {
  return NextResponse.json<DiscountResponse>({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  let code = '';
  let lines: Line[] = [];

  try {
    const body = (await request.json()) as { code?: unknown; lines?: Line[] };
    code = typeof body.code === 'string' ? body.code.trim() : '';
    lines = (body.lines ?? []).filter((line) => line?.variantId && Number(line.quantity) > 0);
  } catch {
    return fail('Please enter a valid code.', 400);
  }

  if (!CODE_PATTERN.test(code)) return fail('That code doesn’t look right.', 400);
  if (!lines.length) return fail('Your cart is empty.', 400);

  const result = await previewDiscount(lines, code);

  if (result.status === 'applied') {
    return NextResponse.json<DiscountResponse>({ ok: true, code, amount: result.amount });
  }
  if (result.status === 'invalid') {
    return fail('That code isn’t valid for this cart.', 422);
  }
  return fail('We couldn’t check the code right now. You can still enter it at checkout.', 503);
}

export async function GET() {
  return fail('Method not allowed.', 405);
}
