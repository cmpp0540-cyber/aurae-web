import { Fragment } from 'react';
import { LANDING } from '@/content/site';
import type { AuraeProduct } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductCarousel from './ProductCarousel';

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

        <p className="mx-auto mt-5 max-w-[760px] text-center text-[12px] leading-relaxed text-espresso/50">
          *These statements have not been evaluated by the Food and Drug Administration. This
          product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </section>
  );
}
