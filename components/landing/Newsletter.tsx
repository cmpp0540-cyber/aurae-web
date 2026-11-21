'use client';

import { useState } from 'react';
import { LANDING } from '@/content/site';
import { track } from '@/lib/meta-pixel';

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
        track('Lead', { content_name: 'Newsletter' });
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
    /*
      Light rather than the espresso this used to be. The footer directly
      below is already espresso, so the page ended in one long dark block
      with the sign-up buried inside it. On cream the form is the brightest
      thing on screen at the moment someone is deciding to hand over an email.
    */
    <section className="section-y bg-[linear-gradient(180deg,#FFF8F0_0%,#FFEDE4_100%)] text-espresso">
      <div className="shell text-center">
        <p className="u-eyebrow">{LANDING.newsletter.eyebrow}</p>
        <h2 className="mt-4 font-display text-display-lg font-bold">
          {LANDING.newsletter.titleLead}{' '}
          <span className="font-display italic text-coral">{LANDING.newsletter.titleItalic}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-prose2 text-[15px] leading-relaxed text-espresso/70">
          {LANDING.newsletter.body}
        </p>

        {status === 'done' ? (
          <p
            role="status"
            className="mx-auto mt-8 max-w-md font-display text-[18px] italic text-coral"
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
                  className="w-full rounded border border-espresso/15 bg-cream px-5 py-4 text-[14px] text-espresso placeholder:text-espresso/40 focus:border-coral focus:outline-none disabled:opacity-60"
                />
              </label>
              <button type="submit" disabled={status === 'pending'} className="btn-primary">
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
                <p id="newsletter-error" role="alert" className="text-[13px] text-[#B3324F]">
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
