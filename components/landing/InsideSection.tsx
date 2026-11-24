import { LANDING } from '@/content/site';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import InsideCarousel from './InsideCarousel';

const { inside } = LANDING;

const CALLOUT_REST =
  'We don’t believe in sprinkles. Compare our formulas to typical drugstore brands and you’ll see why our women feel the difference.';

export default function InsideSection() {
  return (
    <section
      id="inside"
      className="section-y scroll-mt-24 bg-[linear-gradient(180deg,#FFE5D9_0%,#FFFCF8_100%)]"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={inside.eyebrow}
          lead={inside.titleLead}
          italic={inside.titleItalic}
        />

        <InsideCarousel />

        <Reveal className="mx-auto mt-9 max-w-[760px] text-center">
          <p className="font-display text-[19px] italic leading-relaxed sm:text-[22px]">
            {inside.summary.lead}{' '}
            <strong className="font-bold not-italic text-coral">{inside.summary.emphasis}</strong>
          </p>
        </Reveal>

        {/* The pull quote closes the section now: the cards make the case
            product by product, the summary line names the stake, and this
            is the argument stated outright. Ahead of the cards it was
            asking the reader to take the claim on trust before seeing a
            single number. */}
        <Reveal className="relative mx-auto mt-9 max-w-[900px] rounded-r-2xl border-l-[5px] border-coral bg-cream px-8 py-9 shadow-soft sm:px-11">
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
            <strong className="font-bold not-italic text-coral">{inside.callout.emphasis2}</strong>{' '}
            {CALLOUT_REST}
          </p>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-coral">
            {inside.callout.signature}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
