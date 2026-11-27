import { LANDING } from '@/content/site';
import type { AuraeProduct } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';
import FdaNote from '@/components/ui/FdaNote';
import BundleCard from './BundleCard';

export default function BundlesSection({ bundles }: { bundles: AuraeProduct[] }) {
  if (!bundles.length) return null;

  return (
    <section
      id="rituals"
      className="section-y scroll-mt-24 bg-[linear-gradient(180deg,#FFF1E8_0%,#FFE5D9_100%)]"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={LANDING.bundles.eyebrow}
          lead={LANDING.bundles.titleLead}
          italic={LANDING.bundles.titleItalic}
          subtitle={LANDING.bundles.subtitle}
        />

        {/* Four across from `lg`: at three columns each card ran ~380px wide
            while the product image inside is capped at 240, so the row was
            mostly air — and a fourth bundle would have orphaned itself on a
            second line. At four the card width matches its own image and
            the section holds to one row. */}
        <div className="mx-auto mt-9 grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {bundles.map((bundle, index) => (
            <BundleCard key={bundle.id} bundle={bundle} index={index} />
          ))}
        </div>

        <FdaNote className="mt-8" />
      </div>
    </section>
  );
}
