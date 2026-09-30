import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { bundleContent } from '@/content/bundles';
import { getBundleContents, getBundleParams, getProduct } from '@/lib/products';
import TrustBar from '@/components/layout/TrustBar';
import BundleHero from '@/components/bundle/BundleHero';
import BundleIncludes from '@/components/bundle/BundleIncludes';
import RitualTimeline from '@/components/bundle/RitualTimeline';
import SynergySection from '@/components/bundle/SynergySection';
import FinalCta from '@/components/product/FinalCta';
import ReviewsSection from '@/components/product/ReviewsSection';

export const revalidate = 1800;

/** Next 15 hands route params in as a promise. */
type Params = { params: Promise<{ bundleId: string }> };

export async function generateStaticParams() {
  return getBundleParams();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { bundleId } = await params;
  const bundle = await getProduct(bundleId);
  if (!bundle) return { title: 'Bundle not found' };

  const content = bundleContent(bundle.handle);
  const description = content?.intro ?? bundle.description;

  return {
    title: bundle.title,
    description,
    openGraph: {
      title: `${bundle.title} · Aurae`,
      description,
      images: bundle.images[0] ? [{ url: bundle.images[0].url }] : undefined,
    },
  };
}

export default async function BundlePage({ params }: Params) {
  const { bundleId } = await params;
  const bundle = await getProduct(bundleId);
  if (!bundle) notFound();

  // An individual product reached through /bundle/... belongs on the product route.
  if (!bundle.isBundle) redirect(`/product/${bundle.handle}`);

  const content = bundleContent(bundle.handle);
  const contents = await getBundleContents(content?.contains ?? []);

  return (
    <>
      <BundleHero bundle={bundle} content={content} />
      <TrustBar />

      <BundleIncludes
        contents={contents}
        bundlePrice={bundle.price}
        currency={bundle.currency}
      />

      {content ? (
        <>
          <SynergySection synergy={content.synergy} />
          <RitualTimeline ritual={content.ritual} contents={contents} accent={content.accent} />
          <ReviewsSection
            testimonials={content.testimonials}
            productTitle={bundle.title}
            accent={content.accent}
          />
        </>
      ) : null}

      <FinalCta
        product={bundle}
        label="Add Bundle to Cart"
        headline={content?.finalCta.headline ?? `Ready for ${bundle.title}?`}
        sub={content?.finalCta.sub ?? 'Free shipping. Cancel anytime.'}
      />
    </>
  );
}
