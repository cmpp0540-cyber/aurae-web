import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

type Props = { items: { title: string; text: string }[] };

export default function SustainabilitySection({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="section-y bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="Our values"
          lead="Sourcing,"
          italic="packaging, proof."
          subtitle="Short version: we would rather show you the paperwork than talk about it."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delay={index * 80}
              className="rounded-2xl border border-espresso/10 bg-ivory/50 p-7"
            >
              <span aria-hidden className="text-[20px] text-coral">
                ✦
              </span>
              <h3 className="mt-3 font-display text-[17px] font-semibold">{item.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-espresso/70">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
