import type { ProductContent } from '@/content/products';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

type Props = { science: ProductContent['science'] };

/** The science / evidence block: mechanism explained, then the stat rail. */
export default function EvidenceSection({ science }: Props) {
  return (
    <section className="section-y bg-espresso text-ivory">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="u-eyebrow">The Science</p>
            <h2 className="mt-4 font-display text-display-lg font-bold balance">
              {science.headline}
            </h2>
            <div className="mt-6 space-y-4">
              {science.body.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-relaxed text-ivory/70">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            {/* Stat rail */}
            <ul className="grid grid-cols-3 gap-4 border-b border-ivory/15 pb-8">
              {science.stats.map((stat) => (
                <li key={stat.label}>
                  <p className="font-display text-[22px] font-bold leading-tight text-sun sm:text-[26px]">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-snug text-ivory/55">{stat.label}</p>
                </li>
              ))}
            </ul>

            {/* Evidence list */}
            <ul className="mt-8 space-y-6">
              {science.evidence.map((item, index) => (
                <Reveal key={item.claim} as="li" delay={index * 80} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-1 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border border-sun/40 text-[11px] text-sun"
                  >
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-display text-[16px] font-semibold text-ivory">
                      {item.claim}
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-relaxed text-ivory/60">
                      {item.detail}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-[11px] leading-relaxed text-ivory/30">
          Mechanistic summaries reflect published research on the individual ingredients and are not
          claims about this finished product. Not evaluated by the FDA; not intended to diagnose,
          treat, cure or prevent any disease.
        </p>
      </div>
    </section>
  );
}
