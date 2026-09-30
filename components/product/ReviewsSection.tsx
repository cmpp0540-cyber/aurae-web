import type { Testimonial } from '@/content/products';
import { accentFor, type AccentKey } from '@/lib/accents';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Stars from '@/components/ui/Stars';

type Props = {
  testimonials: Testimonial[];
  productTitle: string;
  accent: AccentKey;
};

export default function ReviewsSection({ testimonials, productTitle, accent }: Props) {
  if (!testimonials.length) return null;

  const palette = accentFor(accent);
  const average =
    testimonials.reduce((total, item) => total + item.stars, 0) / testimonials.length;

  return (
    <section className={['section-y', palette.sectionGradient].join(' ')}>
      <div className="shell">
        <SectionHeading
          eyebrow={`${productTitle} reviews`}
          lead="What women say"
          italic="about this one."
          subtitle={
            <span className="inline-flex flex-wrap items-center justify-center gap-3">
              <Stars count={average} />
              <span>
                {average.toFixed(1)} average from {testimonials.length} verified{' '}
                {testimonials.length === 1 ? 'review' : 'reviews'}
              </span>
            </span>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal
              key={item.author}
              as="article"
              delay={index * 80}
              className="flex flex-col rounded-2xl bg-cream p-7"
            >
              <Stars count={item.stars} />
              <p className="mt-3 font-display text-[18px] font-semibold leading-snug">
                &ldquo;{item.headline}&rdquo;
              </p>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-espresso/70">{item.body}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
