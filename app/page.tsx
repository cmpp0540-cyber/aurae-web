import TrustBar from '@/components/layout/TrustBar';
import BundlesSection from '@/components/landing/BundlesSection';
import FaqSection from '@/components/landing/FaqSection';
import Hero from '@/components/landing/Hero';
import InsideSection from '@/components/landing/InsideSection';
import Newsletter from '@/components/landing/Newsletter';
import ProductsSection from '@/components/landing/ProductsSection';
import ScienceSection from '@/components/landing/ScienceSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import { getCatalog } from '@/lib/products';

/** Revalidate the catalog every 30 minutes. */
export const revalidate = 1800;

export default async function HomePage() {
  const { products, bundles, source } = await getCatalog();

  return (
    <>
      <Hero />
      <TrustBar />
      <ProductsSection products={products} />
      <BundlesSection bundles={bundles} />
      <InsideSection />
      <ScienceSection />
      <TestimonialsSection />
      <FaqSection />
      <Newsletter />

      {process.env.NODE_ENV === 'development' ? (
        <p className="shell py-3 text-center text-[10px] uppercase tracking-[0.15em] text-espresso/30">
          data source: {source} · {products.length} products · {bundles.length} bundles
        </p>
      ) : null}
    </>
  );
}
