import { NextResponse } from 'next/server';
import { subscribeToList } from '@/lib/klaviyo';

/**
 * Newsletter signup → Klaviyo.
 *
 * This route exists so the private Klaviyo key stays on the server: the form
 * posts here, and only here does anything know the credentials. The Klaviyo
 * call itself lives in lib/klaviyo.ts.
 */

/**
 * Deliberately permissive. Real validation is Klaviyo's job (and the
 * confirmation email's) — this only rejects input that is obviously not an
 * address, so we do not burn an API call on it.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321

type SubscribeResponse = { ok: true } | { ok: false; error: string };

function fail(error: string, status: number) {
  return NextResponse.json<SubscribeResponse>({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  let email: unknown;
  try {
    const body = (await request.json()) as { email?: unknown };
    email = body?.email;
  } catch {
    return fail('Please enter a valid email address.', 400);
  }

  if (typeof email !== 'string') {
    return fail('Please enter a valid email address.', 400);
  }

  const address = email.trim().toLowerCase();
  if (!address || address.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(address)) {
    return fail('Please enter a valid email address.', 400);
  }

  const result = await subscribeToList(address);

  switch (result.status) {
    case 'subscribed':
      return NextResponse.json<SubscribeResponse>({ ok: true });

    case 'not-configured':
      // Variable names only — never their values.
      console.error(`[subscribe] missing env: ${result.missing.join(', ')}`);
      return fail('Signups are temporarily unavailable. Please try again later.', 503);

    case 'rate-limited':
      return fail('Too many signups right now. Please try again in a moment.', 429);

    case 'failed':
      // Log enough to debug; return nothing that describes the integration.
      console.error(`[subscribe] Klaviyo ${result.detail}`);
      return fail('Something went wrong. Please try again.', 502);
  }
}

/** Anything but POST is a mistake worth being explicit about. */
export async function GET() {
  return fail('Method not allowed.', 405);
}
