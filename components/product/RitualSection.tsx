import type { ProductContent } from '@/content/products';
import { accentFor } from '@/lib/accents';
import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/ui/RichText';
import SectionHeading from '@/components/ui/SectionHeading';

type Props = {
  ritual: ProductContent['ritual'];
  accent: ProductContent['accent'];
  /** Shopify `custom.how_to_use` — the authoritative dosage instructions. */
  howToUse: string | null;
};

/**
 * "How it works" as a numbered timeline, with Shopify's own dosage copy
 * printed underneath so the label and the site can never disagree.
 */
export default function RitualSection({ ritual, accent, howToUse }: Props) {
  const palette = accentFor(accent);

  return (
    <section className={['section-y', palette.sectionGradient].join(' ')}>
      <div className="shell">
        <SectionHeading
          eyebrow="The Ritual"
          lead="How to"
          italic="use it."
          subtitle={ritual.intro}
        />

        <ol className="relative mx-auto mt-14 max-w-[960px]">
          {/* Vertical rule on mobile, horizontal on desktop */}
          <span
            aria-hidden
            className="absolute left-[19px] top-2 h-[calc(100%-2rem)] w-px bg-coral/25 md:left-0 md:top-[19px] md:h-px md:w-full"
          />

          <div className="grid gap-9 md:grid-cols-3 md:gap-7">
            {ritual.steps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={index * 110}
                className="relative pl-14 md:pl-0 md:pt-14"
              >
                <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-coral font-display text-[15px] font-bold text-cream">
                  {index + 1}
                </span>
                <p className="u-eyebrow">{step.label}</p>
                <h3 className="mt-2 font-display text-[19px] font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-espresso/70">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </ol>

        {howToUse ? (
          <Reveal className="mx-auto mt-14 max-w-[760px] rounded-2xl border border-coral/20 bg-cream p-7 sm:p-9">
            <p className="u-eyebrow mb-3">Directions from the label</p>
            <RichText value={howToUse} />
            <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-espresso/40">
              Pulled live from Shopify · always matches the bottle
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
