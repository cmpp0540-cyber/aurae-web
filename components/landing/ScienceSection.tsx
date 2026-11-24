import { LANDING } from '@/content/site';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import ScienceAccordion from './ScienceAccordion';

export default function ScienceSection() {
  return (
    <section id="science" className="section-y scroll-mt-24 bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow={LANDING.science.eyebrow}
          lead={LANDING.science.titleLead}
          italic={LANDING.science.titleItalic}
          subtitle={
            // Smaller than the shared default, to match Real Women and
            // Transparency: the cards carry this section, and the line is
            // only a lead-in to them.
            <span className="block text-[13px] sm:text-[14px]">{LANDING.science.subtitle}</span>
          }
        />

        <ScienceAccordion />

        <Reveal className="mx-auto mt-10 max-w-[900px] rounded-2xl bg-[linear-gradient(135deg,#FFE5D9,#FFF8F0)] p-8 text-center sm:p-11">
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
