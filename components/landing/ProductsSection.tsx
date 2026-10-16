import { Fragment } from 'react';
import { LANDING } from '@/content/site';
import type { AuraeProduct } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from './ProductCard';

export default function ProductsSection({ products }: { products: AuraeProduct[] }) {
  return (
    <section id="shop" className="section-y scroll-mt-24 bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow={LANDING.products.eyebrow}
          lead={LANDING.products.titleLead}
          italic={LANDING.products.titleItalic}
          subtitle={
            <>
              {/*
                Uppercased in CSS rather than in the copy, so the same strings
                stay sentence case everywhere else they are used.

                Each phrase is its own nowrap span with its separator attached,
                so a narrow screen breaks between phrases and never inside one
                ("Radiant / skin") and never leaves a lone "·" starting a line.
              */}
              <span className="balance block text-[13px] font-semibold uppercase tracking-[0.16em] text-[#C93A66] sm:text-[15px]">
                {LANDING.products.pillars.map((pillar, index) => {
                  const isLast = index === LANDING.products.pillars.length - 1;
                  return (
                    <Fragment key={pillar}>
                      <span className="whitespace-nowrap">{isLast ? pillar : `${pillar} ·`}</span>
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

        {/* "Lit from within": a short brand statement on espresso */}
        <div className="mx-auto mt-10 max-w-[900px] rounded-2xl bg-espresso px-7 py-10 text-left sm:px-12 sm:py-12">
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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-[760px] text-center text-[12px] leading-relaxed text-espresso/50">
          *These statements have not been evaluated by the Food and Drug Administration. This
          product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </section>
  );
}
