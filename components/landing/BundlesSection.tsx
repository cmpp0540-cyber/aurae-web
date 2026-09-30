import { LANDING } from '@/content/site';
import type { AuraeProduct } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';
import BundleCard from './BundleCard';

export default function BundlesSection({ bundles }: { bundles: AuraeProduct[] }) {
  if (!bundles.length) return null;

  return (
    <section
      id="rituals"
      className="section-y scroll-mt-24 bg-[linear-gradient(180deg,#FFE5D9_0%,#FFF8F0_100%)]"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={LANDING.bundles.eyebrow}
          lead={LANDING.bundles.titleLead}
          italic={LANDING.bundles.titleItalic}
          subtitle={LANDING.bundles.subtitle}
        />

        <div className="mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle, index) => (
            <BundleCard key={bundle.id} bundle={bundle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
