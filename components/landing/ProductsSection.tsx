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
              <span className="block font-semibold text-coral">
                {LANDING.products.pillars.join(' · ')}
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
