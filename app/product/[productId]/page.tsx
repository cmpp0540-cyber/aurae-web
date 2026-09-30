import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { productContent } from '@/content/products';
import { getCrossSell, getProduct, getProductParams } from '@/lib/products';
import { shortDescription } from '@/lib/format';
import TrustBar from '@/components/layout/TrustBar';
import BenefitsSection from '@/components/product/BenefitsSection';
import CrossSellSection from '@/components/product/CrossSellSection';
import EvidenceSection from '@/components/product/EvidenceSection';
import FinalCta from '@/components/product/FinalCta';
import IngredientsSection from '@/components/product/IngredientsSection';
import ProductFaqs from '@/components/product/ProductFaqs';
import ProductHero from '@/components/product/ProductHero';
import ReviewsSection from '@/components/product/ReviewsSection';
import RitualSection from '@/components/product/RitualSection';
import SustainabilitySection from '@/components/product/SustainabilitySection';

export const revalidate = 1800;

/** Next 15 hands route params in as a promise. */
type Params = { params: Promise<{ productId: string }> };

export async function generateStaticParams() {
  return getProductParams();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProduct(productId);
  if (!product) return { title: 'Product not found' };

  const content = productContent(product.handle);
  const description = content?.intro ?? shortDescription(product.description, 2);

  return {
    title: `${product.title} — ${product.metafields.cardIngredient ?? product.productType}`,
    description,
    openGraph: {
      title: `${product.title} · Aurae`,
      description,
      images: product.images[0] ? [{ url: product.images[0].url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { productId } = await params;
  const product = await getProduct(productId);
  if (!product) notFound();

  // A bundle reached through /product/... belongs on the bundle route.
  if (product.isBundle) redirect(`/bundle/${product.handle}`);

  const content = productContent(product.handle);
  const crossSell = await getCrossSell(product.handle, content?.crossSell.handles ?? [], 3);

  return (
    <>
      <ProductHero product={product} content={content} />
      <TrustBar />

      {content ? (
        <>
          <BenefitsSection
            benefits={content.benefits}
            accent={content.accent}
            productTitle={product.title}
          />
          <RitualSection
            ritual={content.ritual}
            accent={content.accent}
            howToUse={product.metafields.howToUse}
          />
        </>
      ) : null}

      <IngredientsSection
        whatsInside={product.metafields.whatsInside}
        accent={content?.accent ?? 'glow'}
      />

      {content ? (
        <>
          <ReviewsSection
            testimonials={content.testimonials}
            productTitle={product.title}
            accent={content.accent}
          />
          <EvidenceSection science={content.science} />
          <ProductFaqs faqs={content.faqs} productTitle={product.title} />
          <SustainabilitySection items={content.sustainability} />
        </>
      ) : null}

      <CrossSellSection
        products={crossSell}
        intro={content?.crossSell.intro ?? 'Layer your ritual with the rest of the range.'}
      />

      <FinalCta
        product={product}
        headline={content?.finalCta.headline ?? `Ready to start with ${product.title}?`}
        sub={content?.finalCta.sub ?? 'Free shipping over $50. Cancel anytime.'}
      />
    </>
  );
}
