'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'pending' | 'done' | 'error';

/** Seconds on the page before the popup appears. */
const DELAY_MS = 8000;
/** After a close or a signup, stay quiet for this long. */
const QUIET_DAYS = 14;
const STORAGE_KEY = 'aurae-popup-until';
/** Pages where a popup would be in the way. */
const HIDDEN_ON = ['/privacy', '/terms'];

function isQuiet(): boolean {
  try {
    const until = Number(window.localStorage.getItem(STORAGE_KEY) ?? 0);
    return Date.now() < until;
  } catch {
    return false;
  }
}

function stayQuiet() {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      String(Date.now() + QUIET_DAYS * 24 * 60 * 60 * 1000),
    );
  } catch {
    /* storage can be blocked; the popup then just shows again next visit */
  }
}

export default function SubscribePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const hidden = HIDDEN_ON.some((path) => pathname?.startsWith(path));

  const close = useCallback(() => {
    setOpen(false);
    stayQuiet();
  }, []);

  // Show once, after a delay, unless it was closed or used recently.
  useEffect(() => {
    if (hidden || isQuiet()) return;
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [hidden]);

  // Escape closes; focus goes to the field when it opens.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'pending') return;
    setStatus('pending');
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (response.ok && data?.ok) {
        setStatus('done');
        stayQuiet();
        return;
      }
      setError(data?.error ?? 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
      setStatus('error');
    }
  }

  if (!open || hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-espresso/60 p-4 sm:items-center"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-[440px] rounded-lg bg-espresso px-7 py-10 text-center text-ivory shadow-2xl sm:px-10"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[22px] leading-none text-ivory/60 transition-colors hover:text-sun"
        >
          ×
        </button>

        <p className="u-eyebrow">Welcome gift</p>
        <h2 id="popup-title" className="mt-3 font-display text-[30px] font-bold leading-tight">
          10% off your <span className="font-display italic text-sun">first ritual.</span>
        </h2>

        {status === 'done' ? (
          <p role="status" className="mt-6 font-display text-[18px] italic text-sun">
            Check your inbox — your code is on its way ✦
          </p>
        ) : (
          <>
            <p className="mx-auto mt-3 max-w-[320px] text-[14px] leading-relaxed text-ivory/70">
              Join the Aurae Letter and get a 10% welcome code, plus early access to new
              formulas.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <label>
                <span className="sr-only">Email address</span>
                <input
                  ref={inputRef}
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'pending'}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'popup-error' : undefined}
                  placeholder="Your email"
                  className="w-full rounded border border-ivory/20 bg-transparent px-5 py-4 text-[14px] text-ivory placeholder:text-ivory/40 focus:border-sun focus:outline-none disabled:opacity-60"
                />
              </label>
              <button type="submit" disabled={status === 'pending'} className="btn-sun">
                {status === 'pending' ? 'Joining…' : 'Get my 10%'}
              </button>
            </form>

            <div className="mt-3 min-h-[21px]">
              {status === 'error' ? (
                <p id="popup-error" role="alert" className="text-[13px] text-coral-soft">
                  {error}
                </p>
              ) : null}
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-ivory/45">
              By signing up you agree to receive marketing emails from Aurae. Unsubscribe any
              time. See our{' '}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-sun">
                Privacy Policy
              </Link>
              .
            </p>

            <button
              type="button"
              onClick={close}
              className="mt-4 text-[12px] text-ivory/50 underline underline-offset-2 transition-colors hover:text-ivory"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
