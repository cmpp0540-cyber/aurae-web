import type { Benefit } from '@/content/products';
import { accentFor, type AccentKey } from '@/lib/accents';
import Glyph from '@/components/ui/Glyph';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

type Props = {
  benefits: Benefit[];
  accent: AccentKey;
  productTitle: string;
};

export default function BenefitsSection({ benefits, accent, productTitle }: Props) {
  if (!benefits.length) return null;
  const palette = accentFor(accent);

  return (
    <section className="section-y bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="Why it works"
          lead="What"
          italic={`${productTitle} does.`}
          subtitle="Four mechanisms, each with a job. No vague promises about wellness."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal
              key={benefit.title}
              as="article"
              delay={index * 80}
              className="card card-hover flex flex-col p-7"
            >
              <Glyph name={benefit.icon} color={palette.hex} />
              <h3 className="mt-5 font-display text-[18px] font-semibold leading-snug">
                {benefit.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-espresso/70">{benefit.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
