import { LANDING } from '@/content/site';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const { inside } = LANDING;

export default function InsideSection() {
  return (
    <section
      id="inside"
      className="section-y scroll-mt-24 bg-[linear-gradient(180deg,#FFF8F0_0%,#FFE5D9_100%)]"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={inside.eyebrow}
          lead={inside.titleLead}
          italic={inside.titleItalic}
          subtitle={inside.subtitle}
        />

        {/* Pull quote */}
        <Reveal className="relative mx-auto mt-14 max-w-[900px] rounded-r-2xl border-l-[5px] border-coral bg-cream px-8 py-9 shadow-soft sm:px-11">
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-[-10px] font-display text-[90px] leading-none text-coral/25"
          >
            &ldquo;
          </span>
          <p className="relative font-display text-[19px] italic leading-relaxed sm:text-[22px]">
            {inside.callout.leadIn}{' '}
            <strong className="font-bold not-italic text-coral">{inside.callout.emphasis}</strong>{' '}
            {inside.callout.middle}{' '}
            <strong className="font-bold not-italic text-coral">{inside.callout.emphasis2}</strong>
          </p>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-coral">
            {inside.callout.signature}
          </p>
        </Reveal>

        {/* Comparison */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-2xl border-2 border-coral/25 bg-cream p-7 sm:p-9">
            <span className="u-eyebrow">{inside.us.label}</span>
            <h3 className="mt-3 font-display text-display-md font-bold">{inside.us.title}</h3>
            <p className="mt-2 text-[13px] text-espresso/65">{inside.us.note}</p>
            <ul className="mt-6 space-y-3">
              {inside.us.items.map((item) => (
                <li key={item.lead} className="flex gap-3 text-[14px] leading-relaxed">
                  <span aria-hidden className="mt-0.5 flex-shrink-0 text-coral">
                    ✦
                  </span>
                  <span>
                    <strong className="font-semibold">{item.lead}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={120}
            className="rounded-2xl border border-espresso/10 bg-ivory/60 p-7 sm:p-9"
          >
            <span className="text-eyebrow font-semibold uppercase text-espresso/45">
              {inside.them.label}
            </span>
            <h3 className="mt-3 font-display text-display-md font-bold text-espresso/70">
              {inside.them.title}
            </h3>
            <p className="mt-2 text-[13px] text-espresso/50">{inside.them.note}</p>
            <ul className="mt-6 space-y-3">
              {inside.them.items.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-espresso/55">
                  <span aria-hidden className="mt-0.5 flex-shrink-0 text-espresso/30">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-10 max-w-[760px] text-center">
          <p className="font-display text-[19px] italic leading-relaxed sm:text-[22px]">
            {inside.summary.lead}{' '}
            <strong className="font-bold not-italic text-coral">{inside.summary.emphasis}</strong>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
