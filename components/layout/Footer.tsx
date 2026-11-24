import Link from 'next/link';
import { SITE } from '@/content/site';

/** Legal pages linked from the bottom bar. */
const LEGAL_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Cookies', href: '/privacy#cookies' },
];

export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory">
      {/*
        Two columns on a phone, not one. Stacked, the brand block plus four
        link lists ran past 1,000px of nothing but text — the single tallest
        thing after the hero, at the point where a visitor is least invested.
        Side by side it is about half that, and a footer is scanned, never
        read, so narrow columns cost nothing.
      */}
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-9 py-12 sm:gap-x-10 lg:grid-cols-5 lg:gap-12 lg:py-14">
        <div className="col-span-2 lg:col-span-1">
          <p className="font-display text-[32px] font-bold leading-none text-coral">aurae</p>
          <p className="mt-2 font-display text-[14px] italic text-ivory/60">{SITE.tagline}</p>
        </div>

        {SITE.footer.columns.map((column) => (
          <div key={column.title}>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-sun">
              {column.title}
            </h4>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-ivory/65 transition-colors duration-300 hover:text-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ivory/10">
        <div className="shell flex flex-col gap-3 py-5 text-[12px] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aurae All rights reserved.</p>
          <ul className="flex gap-6">
            {LEGAL_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors duration-300 hover:text-coral">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="shell pb-6">
          <p className="max-w-3xl text-[11px] leading-relaxed text-ivory/30">
            These statements have not been evaluated by the Food and Drug Administration. This
            product is not intended to diagnose, treat, cure or prevent any disease. Consult your
            healthcare provider before starting any supplement, particularly if you are pregnant,
            breastfeeding or taking prescription medication.
          </p>
        </div>
      </div>
    </footer>
  );
}
