import { LANDING, SITE, SITE_FAQS } from '@/content/site';
import Accordion from '@/components/ui/Accordion';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

/** The four questions shown on the home page, in this order. */
const FEATURED = [
  'How do I take each Aurae product?',
  'How does Subscribe & Save work?',
  'How long does shipping take?',
  "What's your return policy?",
];

const FAQS = FEATURED.map((q) => SITE_FAQS.find((faq) => faq.q === q)).filter(
  (faq): faq is (typeof SITE_FAQS)[number] => Boolean(faq),
);

export default function FaqSection() {
  return (
    <section id="faq" className="section-y scroll-mt-24 bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow={LANDING.faq.eyebrow}
          lead={LANDING.faq.titleLead}
          italic={LANDING.faq.titleItalic}
          subtitle={LANDING.faq.subtitle}
        />

        <Accordion items={FAQS} className="mt-12" />

        <Reveal className="mt-12 text-center">
          <p className="text-[15px] text-espresso/65">{LANDING.faq.ctaLead}</p>
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="mt-3 inline-block border-b-2 border-coral pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-coral"
          >
            {LANDING.faq.ctaLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
