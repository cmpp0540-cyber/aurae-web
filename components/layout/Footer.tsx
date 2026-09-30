import Link from 'next/link';
import { SITE } from '@/content/site';

export default function Footer() {
  return (
    <footer className="bg-espresso text-ivory">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:py-20">
        <div className="lg:col-span-1">
          <p className="font-display text-[32px] font-bold leading-none text-coral">aurae</p>
          <p className="mt-2 font-display text-[14px] italic text-ivory/60">{SITE.tagline}</p>
          <p className="mt-6 max-w-[240px] text-[13px] leading-relaxed text-ivory/50">
            Premium cellular beauty supplements, dosed at clinically-relevant levels and tested
            every batch.
          </p>
        </div>

        {SITE.footer.columns.map((column) => (
          <div key={column.title}>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-sun">
              {column.title}
            </h4>
            <ul className="space-y-2.5">
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
        <div className="shell flex flex-col gap-4 py-6 text-[12px] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aurae Wellness, Inc. All rights reserved.</p>
          <ul className="flex gap-6">
            {SITE.footer.legal.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="shell pb-8">
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
