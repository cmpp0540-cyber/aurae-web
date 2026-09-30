import type { Faq } from '@/content/products';
import { SITE } from '@/content/site';
import Accordion from '@/components/ui/Accordion';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

type Props = { faqs: Faq[]; productTitle: string };

export default function ProductFaqs({ faqs, productTitle }: Props) {
  if (!faqs.length) return null;

  return (
    <section className="section-y bg-ivory/60">
      <div className="shell">
        <SectionHeading
          eyebrow={`${productTitle} questions`}
          lead="Asked and"
          italic="answered."
          subtitle="The questions women actually email us about this formula."
        />

        <Accordion items={faqs} className="mt-12" />

        <Reveal className="mt-10 text-center">
          <a
            href={`mailto:${SITE.supportEmail}`}
            className="inline-block border-b-2 border-coral pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:text-coral"
          >
            Ask us anything →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
