import { accentFor, type AccentKey } from '@/lib/accents';
import { parseIngredientRows } from '@/lib/rich-text';
import Reveal from '@/components/ui/Reveal';
import RichText from '@/components/ui/RichText';
import SectionHeading from '@/components/ui/SectionHeading';

type Props = {
  /** Shopify `custom.what_s_inside` rich text. */
  whatsInside: string | null;
  accent: AccentKey;
};

/**
 * Ingredient panel built from Shopify's own `what_s_inside` metafield:
 * one row per active, with its dose and what it does.
 */
export default function IngredientsSection({ whatsInside, accent }: Props) {
  const rows = parseIngredientRows(whatsInside);
  if (!whatsInside) return null;

  const palette = accentFor(accent);

  return (
    <section className="section-y bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="What's inside"
          lead="Every active,"
          italic="every dose."
          subtitle="No proprietary blends, no unnamed milligrams. This panel is generated straight from the product record in Shopify."
        />

        {rows.length > 1 ? (
          <div className="mx-auto mt-14 max-w-[960px] overflow-hidden rounded-2xl border border-espresso/10">
            <div className="hidden grid-cols-[1.1fr_0.8fr_1.6fr] gap-4 border-b border-espresso/10 bg-ivory px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.15em] text-espresso/50 md:grid">
              <span>Ingredient</span>
              <span>Dose</span>
              <span>What it does</span>
            </div>

            <ul>
              {rows.map((row, index) => (
                <Reveal
                  key={`${row.name}-${index}`}
                  as="li"
                  delay={index * 50}
                  className="grid gap-2 border-b border-espresso/[0.07] px-6 py-5 last:border-0 md:grid-cols-[1.1fr_0.8fr_1.6fr] md:items-baseline md:gap-4"
                >
                  <span className="flex items-baseline gap-2.5 font-display text-[16px] font-semibold">
                    <span aria-hidden className={['h-1.5 w-1.5 flex-shrink-0 rounded-full', palette.dot].join(' ')} />
                    {row.name}
                  </span>

                  {row.dose ? (
                    <span className="text-[13px] font-semibold text-coral md:text-[14px]">
                      {row.dose}
                    </span>
                  ) : (
                    <span className="text-[13px] text-espresso/35">—</span>
                  )}

                  <span className="text-[14px] leading-relaxed text-espresso/70">{row.detail}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : (
          <Reveal className="mx-auto mt-14 max-w-[760px] rounded-2xl border border-espresso/10 bg-ivory/60 p-7 sm:p-9">
            <RichText value={whatsInside} />
          </Reveal>
        )}

        <p className="mx-auto mt-6 max-w-[760px] text-center text-[12px] text-espresso/45">
          Third-party tested for purity, potency and heavy metals. Certificates of analysis
          available on request.
        </p>
      </div>
    </section>
  );
}
