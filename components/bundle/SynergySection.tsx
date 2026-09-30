import type { BundleContent } from '@/content/bundles';
import Reveal from '@/components/ui/Reveal';

type Props = { synergy: BundleContent['synergy'] };

/** Why the products are better together than apart. */
export default function SynergySection({ synergy }: Props) {
  return (
    <section className="section-y bg-espresso text-ivory">
      <div className="shell">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="u-eyebrow">The synergy</p>
          <h2 className="mt-4 font-display text-display-lg font-bold balance">{synergy.headline}</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ivory/70">{synergy.body}</p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {synergy.points.map((point, index) => (
            <Reveal
              key={point.title}
              as="li"
              delay={index * 80}
              className="rounded-2xl border border-ivory/12 bg-ivory/[0.04] p-7"
            >
              <span className="font-display text-[13px] font-bold uppercase tracking-[0.2em] text-sun">
                {String(index + 1).padStart(2, '0')} · {point.title}
              </span>
              <p className="mt-3 text-[14px] leading-relaxed text-ivory/70">{point.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
