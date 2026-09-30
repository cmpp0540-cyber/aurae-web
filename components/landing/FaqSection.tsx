import { LANDING, SITE, SITE_FAQS } from '@/content/site';
import Accordion from '@/components/ui/Accordion';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

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

        <Accordion items={SITE_FAQS} className="mt-12" />

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
