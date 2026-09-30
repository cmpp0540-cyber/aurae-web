'use client';

import { useState } from 'react';
import { LANDING } from '@/content/site';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

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

        {sent ? (
          <p className="mx-auto mt-8 max-w-md font-display text-[18px] italic text-sun">
            {LANDING.newsletter.success}
          </p>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              // Wire this to Shopify Customer / Klaviyo when the list is ready.
              if (email.includes('@')) setSent(true);
            }}
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={LANDING.newsletter.placeholder}
                className="w-full rounded border border-ivory/20 bg-transparent px-5 py-4 text-[14px] text-ivory placeholder:text-ivory/40 focus:border-sun focus:outline-none"
              />
            </label>
            <button type="submit" className="btn-sun">
              {LANDING.newsletter.cta}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
