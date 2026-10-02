/**
 * Klaviyo subscription integration.
 *
 * Kept out of the route handler so the request shape can be tested on its own,
 * and so the route stays about HTTP: validate input, map a result to a status.
 *
 * Server-only. `KLAVIYO_PRIVATE_API_KEY` is a private key with write scopes —
 * it must never carry the NEXT_PUBLIC_ prefix and must never reach the browser.
 */

import 'server-only';

const ENDPOINT = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/';
const REVISION = '2024-10-15';

/** How this signup is attributed in Klaviyo. */
const CUSTOM_SOURCE = 'website_popup';

/** Klaviyo gives up long before this; the timeout only stops a hung socket. */
const TIMEOUT_MS = 10_000;

export type SubscribeResult =
  | { status: 'subscribed' }
  | { status: 'not-configured'; missing: string[] }
  | { status: 'rate-limited' }
  | { status: 'failed'; detail: string };

/**
 * The request body for POST /api/profile-subscription-bulk-create-jobs/.
 *
 * `consented_at` is deliberately absent: Klaviyo only accepts it alongside
 * `historical_import: true`, and stamps the consent time itself otherwise.
 *
 * @see https://developers.klaviyo.com/en/reference/bulk_subscribe_profiles
 */
export function buildSubscribePayload(email: string, listId: string) {
  return {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        custom_source: CUSTOM_SOURCE,
        profiles: {
          data: [
            {
              type: 'profile',
              attributes: {
                email,
                subscriptions: {
                  email: { marketing: { consent: 'SUBSCRIBED' } },
                },
              },
            },
          ],
        },
        historical_import: false,
      },
      relationships: {
        list: { data: { type: 'list', id: listId } },
      },
    },
  };
}

/** Subscribe one address to the configured list with email marketing consent. */
export async function subscribeToList(email: string): Promise<SubscribeResult> {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    return {
      status: 'not-configured',
      missing: [
        !apiKey && 'KLAVIYO_PRIVATE_API_KEY',
        !listId && 'KLAVIYO_LIST_ID',
      ].filter(Boolean) as string[],
    };
  }

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        revision: REVISION,
        'content-type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json',
      },
      body: JSON.stringify(buildSubscribePayload(email, listId)),
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    return { status: 'failed', detail: `request failed: ${(error as Error).message}` };
  }

  // A bulk job is accepted asynchronously and comes back as an empty 202.
  if (response.status === 202 || response.ok) return { status: 'subscribed' };

  if (response.status === 429) return { status: 'rate-limited' };

  const body = await response.text().catch(() => '');
  return {
    status: 'failed',
    detail: `${response.status} ${response.statusText}: ${body.slice(0, 500)}`,
  };
}
