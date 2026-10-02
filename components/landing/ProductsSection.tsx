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
              <span className="mt-4 block">{LANDING.products.subtitle}</span>
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
