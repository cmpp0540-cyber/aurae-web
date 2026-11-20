import { Fragment } from 'react';
import { LANDING } from '@/content/site';
import type { AuraeProduct } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCarousel from './ProductCarousel';

export default function ProductsSection({ products }: { products: AuraeProduct[] }) {
  // No top padding: the espresso band opens the section and runs flush
  // against whatever sits above it. `section-y`'s bottom spacing is spelled
  // out here instead so the band keeps its edge.
  return (
    <section id="shop" className="scroll-mt-24 bg-cream pb-16 sm:pb-20 lg:pb-[100px]">
      {/*
        "Lit from within": the brand statement opens the section.

        This band runs edge to edge, so it sits OUTSIDE the page shell and
        carries its own shell inside to keep the copy on the same left margin
        as the heading and product grid below it. Moving it back inside the
        outer shell would turn it into a card again.
      */}
      <div className="bg-espresso py-14 sm:py-16 lg:py-20">
        <div className="shell text-left">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.22em] text-sun">
            The Aurae Glow
          </p>
          <h3
            className="mt-3 font-display font-bold leading-[1.08] text-cream"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
          >
            Lit from <em className="italic text-coral">within.</em>
          </h3>
          <p className="mt-5 max-w-[640px] font-display text-[19px] italic leading-[1.6] text-cream/90 sm:text-[22px]">
            {LANDING.products.subtitle}
          </p>
        </div>
      </div>

      <div className="shell">
        <SectionHeading
          className="mt-16 sm:mt-20"
          eyebrow={LANDING.products.eyebrow}
          lead={LANDING.products.titleLead}
          italic={LANDING.products.titleItalic}
          subtitle={
            <>
              {/*
                Small letterspaced caps in the body sans: the wide tracking
                and light weight keep it a spec line rather than a second
                headline, which is what bold magenta caps turned it into.

                Each phrase is its own nowrap span with its separator attached,
                so a narrow screen breaks between phrases and never inside one
                ("Radiant / skin") and never leaves a lone "·" starting a line.
              */}
              {/* Tighter tracking on a phone: at 0.22em these eight phrases
                  took seven lines on a 390px screen. */}
              <span className="balance block text-[11px] font-medium uppercase leading-[2.1] tracking-[0.14em] text-espresso sm:text-[13px] sm:leading-[2.3] sm:tracking-[0.22em]">
                {LANDING.products.pillars.map((pillar, index) => {
                  const isLast = index === LANDING.products.pillars.length - 1;
                  return (
                    <Fragment key={pillar}>
                      <span className="whitespace-nowrap">
                        {pillar}
                        {isLast ? null : <span className="text-coral/75"> ·</span>}
                      </span>
                      {/* The break opportunity has to sit OUTSIDE the nowrap
                          span — inside it, there is nowhere for the line to
                          break and the whole row overflows on a phone. */}
                      {isLast ? null : ' '}
                    </Fragment>
                  );
                })}
              </span>
            </>
          }
        />

        <ProductCarousel products={products} />

        <p className="mx-auto mt-8 max-w-[760px] text-center text-[12px] leading-relaxed text-espresso/50">
          *These statements have not been evaluated by the Food and Drug Administration. This
          product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </section>
  );
}
