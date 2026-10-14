import Link from 'next/link';

/**
 * "Our story": a short brand statement on solid coral, closing the page
 * before the FAQ. Edit the copy here.
 */
const STORY = {
  eyebrow: 'Our Story',
  titleLead: 'Beauty starts',
  titleItalic: 'in the cell.',
  quote:
    'Aurae was born from a simple belief: real beauty isn’t applied — it’s grown. Every formula is clean, third-party tested, and made to feel less like a vitamin and more like a ritual.',
  cta: 'Read our story',
  href: '#science',
};

export default function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="section-y relative scroll-mt-24 overflow-hidden bg-coral"
    >
      {/* Soft decorative sparkles */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[14%] animate-twinkle text-[22px] text-sun/80"
      >
        ✦
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[12%] right-[18%] hidden animate-twinkle text-[14px] text-cream/60 sm:block"
      >
        ✦
      </span>

      <div className="shell">
        <div className="max-w-[820px]">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-sun">
            {STORY.eyebrow}
          </p>

          <h2
            id="story-title"
            className="mt-4 font-display font-bold leading-[1.08] text-cream"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
          >
            {STORY.titleLead}
            <br />
            <em className="italic text-sun">{STORY.titleItalic}</em>
          </h2>

          <blockquote className="mt-8 font-display text-[22px] font-normal italic leading-[1.55] text-cream/95 sm:text-[26px] lg:text-[30px]">
            “{STORY.quote}”
          </blockquote>

          <Link href={STORY.href} className="btn-cream mt-10 inline-flex">
            {STORY.cta} <span aria-hidden className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
