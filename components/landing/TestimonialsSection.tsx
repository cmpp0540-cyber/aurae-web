import { LANDING, LANDING_TESTIMONIALS } from '@/content/site';
import { accentFor } from '@/lib/accents';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Stars from '@/components/ui/Stars';

export default function TestimonialsSection() {
  const { testimonials } = LANDING;

  return (
    <section
      id="reviews"
      className="section-y scroll-mt-24 bg-[linear-gradient(180deg,#FFF8F0_0%,#FFE5D9_100%)]"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          lead={testimonials.titleLead}
          italic={testimonials.titleItalic}
          subtitle={testimonials.subtitle}
        />

        {/* Rating summary */}
        <Reveal className="mx-auto mt-12 flex max-w-[860px] flex-col items-center gap-8 rounded-2xl bg-cream p-8 sm:flex-row sm:justify-center sm:gap-12 sm:p-10">
          <div className="text-center">
            <p className="font-display text-[56px] font-bold leading-none text-coral">
              {testimonials.rating.score}
            </p>
            <Stars size="lg" className="mt-2 block" />
            <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-espresso/55">
              {testimonials.rating.label}
            </p>
          </div>

          <span aria-hidden className="hidden h-20 w-px bg-espresso/10 sm:block" />

          <ul className="grid flex-1 grid-cols-3 gap-6 text-center">
            {testimonials.stats.map((stat) => (
              <li key={stat.label}>
                <p className="font-display text-[22px] font-bold sm:text-[26px]">{stat.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-espresso/55">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_TESTIMONIALS.map((item, index) => {
            const accent = accentFor(item.accent);
            return (
              <Reveal
                key={item.author}
                as="article"
                delay={index * 70}
                className="flex flex-col rounded-2xl bg-cream p-7"
              >
                <span
                  className={[
                    'inline-block self-start rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em]',
                    accent.chip,
                  ].join(' ')}
                >
                  {item.tag}
                </span>
                <Stars count={item.stars} className="mt-4 block" />
                <p className="mt-3 font-display text-[18px] font-semibold leading-snug">
                  &ldquo;{item.headline}&rdquo;
                </p>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-espresso/70">
                  {item.body}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-espresso/10 pt-4">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-blush font-display text-[15px] font-bold text-coral">
                    {item.author.charAt(0)}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[13px] font-semibold">{item.author}</span>
                    <span className="block text-[11px] text-espresso/50">{item.location}</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-coral">
                    Verified
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
