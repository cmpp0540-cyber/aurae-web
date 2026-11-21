import Link from 'next/link';
import { LANDING, SITE } from '@/content/site';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialCarousel from './TestimonialCarousel';

export default function TestimonialsSection() {
  const { testimonials } = LANDING;

  return (
    <section
      id="reviews"
      className="section-y scroll-mt-24 bg-[linear-gradient(180deg,#FFFCF8_0%,#FFF1E8_100%)]"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          lead={testimonials.titleLead}
          italic={testimonials.titleItalic}
          subtitle={
            // Smaller than the shared default: here the reviews carry the
            // section, and the line is just a lead-in to them.
            <span className="block text-[13px] sm:text-[14px]">{testimonials.subtitle}</span>
          }
        />

        <TestimonialCarousel />

        {/*
          The close: having just read the reviews, this is where someone is
          most ready to act — so the guarantee sits right under the button,
          answering the objection at the moment it comes up.
        */}
        <div className="mt-9 flex flex-col items-center">
          <Link href="#products" className="btn-dark">
            {SITE.hero.primaryCta}
          </Link>

          <p className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-espresso/60">
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="flex-shrink-0"
            >
              <path d="M8 1.7 3 3.8v3.5c0 3.1 2 5.9 5 6.9 3-1 5-3.8 5-6.9V3.8L8 1.7Z" />
              <path d="m5.9 7.9 1.5 1.5 2.8-3" />
            </svg>
            {testimonials.ctaNote}
          </p>
        </div>

        {/*
          Required wherever the reviews appear, not buried in a policy page.
          Kept quiet and set apart by a hairline so it reads as a footnote to
          the reviews rather than as part of the sales close above it.
        */}
        <p className="mx-auto mt-9 max-w-[620px] border-t border-espresso/10 pt-5 text-center text-[11px] leading-relaxed text-espresso/40">
          {testimonials.disclosure}
        </p>
      </div>
    </section>
  );
}
