import { LANDING, SCIENCE_CARDS } from '@/content/site';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ScienceSection() {
  return (
    <section id="science" className="section-y scroll-mt-24 bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow={LANDING.science.eyebrow}
          lead={LANDING.science.titleLead}
          italic={LANDING.science.titleItalic}
          subtitle={LANDING.science.subtitle}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SCIENCE_CARDS.map((card, index) => (
            <Reveal
              key={card.title}
              as="article"
              delay={index * 70}
              className="card card-hover flex flex-col p-7"
            >
              <span aria-hidden className="text-[26px] leading-none text-coral">
                {card.glyph}
              </span>
              <h3 className="mt-4 font-display text-[19px] font-semibold leading-snug">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-espresso/70">{card.body}</p>
              <div className="mt-6 border-t border-espresso/10 pt-4">
                <p className="font-display text-[26px] font-bold text-coral">{card.stat}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-espresso/50">
                  {card.statLabel}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-12 max-w-[900px] rounded-2xl bg-[linear-gradient(135deg,#FFE5D9,#FFF8F0)] p-8 text-center sm:p-11">
          <h3 className="font-display text-display-md font-bold balance">
            {LANDING.science.research.title}
          </h3>
          <p className="mx-auto mt-4 max-w-[680px] text-[15px] leading-relaxed text-espresso/75">
            {LANDING.science.research.body}
          </p>
          <ul className="mt-7 flex flex-wrap justify-center gap-3">
            {LANDING.science.research.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full bg-cream px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-espresso/70"
              >
                {badge}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
