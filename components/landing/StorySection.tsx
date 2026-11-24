/**
 * "Our story": a short brand statement, closing the page before the FAQ.
 * Edit the copy here.
 */
const STORY = {
  eyebrow: 'Our Story',
  titleLead: 'Beauty starts',
  titleItalic: 'in the cell.',
  quote:
    'Aurae was born from a simple belief: real beauty isn’t applied — it’s grown. Every formula is clean, science-backed, and made to feel less like a vitamin and more like a ritual.',
};

export default function StorySection() {
  return (
    /*
      A coral-to-rose gradient rather than the flat coral this used to be: the
      hero is already a wide field of flat coral, and repeating it here made
      the page feel like it had looped back on itself. The gradient keeps the
      warmth and the weight while reading as its own moment.
    */
    <section
      id="story"
      aria-labelledby="story-title"
      className="section-y relative scroll-mt-24 overflow-hidden bg-[linear-gradient(135deg,#E8705F_0%,#DC5A6B_52%,#BE4A72_100%)]"
    >
      {/* A soft bloom in the upper right keeps the gradient from reading flat */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(255,227,234,0.28),transparent_70%)] blur-2xl"
      />

      <div className="shell relative">
        <div className="max-w-[820px]">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-cream/70">
            {STORY.eyebrow}
          </p>

          <h2
            id="story-title"
            className="mt-4 font-display font-bold leading-[1.08] text-cream"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
          >
            {STORY.titleLead}
            <br />
            {/* Blush rather than the old yellow: the same italic the hero
                uses, so the two ends of the page rhyme. */}
            <em className="italic text-[#FFE3EA]">{STORY.titleItalic}</em>
          </h2>

          <blockquote className="mt-8 max-w-[720px] font-display text-[21px] font-normal italic leading-[1.6] text-cream/90 sm:text-[24px] lg:text-[27px]">
            “{STORY.quote}”
          </blockquote>
        </div>
      </div>
    </section>
  );
}
