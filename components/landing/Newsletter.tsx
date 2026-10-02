'use client';

import { useState } from 'react';
import { LANDING } from '@/content/site';

type Status = 'idle' | 'pending' | 'done' | 'error';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

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

      // Success is only ever the server saying so — never merely "the request
      // came back". A 400 or 502 still parses as JSON.
      if (response.ok && data?.ok) {
        setStatus('done');
        return;
      }

      setError(data?.error ?? 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
      setStatus('error');
    }
  }

  return (
    <section className="section-y bg-espresso text-ivory">
      <div className="shell text-center">
        <p className="u-eyebrow">{LANDING.newsletter.eyebrow}</p>
        <h2 className="mt-4 font-display text-display-lg font-bold">
          {LANDING.newsletter.titleLead}{' '}
          <span className="font-display italic text-sun">{LANDING.newsletter.titleItalic}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-prose2 text-[15px] leading-relaxed text-ivory/70">
          {LANDING.newsletter.body}
        </p>

        {status === 'done' ? (
          <p
            role="status"
            className="mx-auto mt-8 max-w-md font-display text-[18px] italic text-sun"
          >
            {LANDING.newsletter.success}
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <label className="flex-1">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'pending'}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                  placeholder={LANDING.newsletter.placeholder}
                  className="w-full rounded border border-ivory/20 bg-transparent px-5 py-4 text-[14px] text-ivory placeholder:text-ivory/40 focus:border-sun focus:outline-none disabled:opacity-60"
                />
              </label>
              <button type="submit" disabled={status === 'pending'} className="btn-sun">
                {status === 'pending' ? 'Joining…' : LANDING.newsletter.cta}
              </button>
            </form>

            {/*
              Mounted only on failure, rather than always present and faded in
              and out. An error message must never be invisible because a CSS
              transition did not tick, and inserting a role="alert" node is what
              makes a screen reader announce it.

              The reserved height keeps the section from jumping when it appears.
            */}
            <div className="mx-auto mt-4 min-h-[21px] max-w-md">
              {status === 'error' ? (
                <p id="newsletter-error" role="alert" className="text-[13px] text-coral-soft">
                  {error}
                </p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
