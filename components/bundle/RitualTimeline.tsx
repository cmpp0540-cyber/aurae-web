import Link from 'next/link';
import type { BundleContent } from '@/content/bundles';
import { PRODUCT_CARD } from '@/content/site';
import { accentFor } from '@/lib/accents';
import type { AuraeProduct } from '@/lib/types';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import SmartImage from '@/components/ui/SmartImage';

type Props = {
  ritual: BundleContent['ritual'];
  /** Resolved Shopify products, for names and thumbnails. */
  contents: AuraeProduct[];
  accent: BundleContent['accent'];
};

/** The bundle as a timed daily ritual: what to take, when, at what dose. */
export default function RitualTimeline({ ritual, contents, accent }: Props) {
  const palette = accentFor(accent);
  const byHandle = new Map(contents.map((product) => [product.handle, product]));

  return (
    <section className={['section-y', palette.sectionGradient].join(' ')}>
      <div className="shell">
        <SectionHeading
          eyebrow="How to use the ritual"
          lead={ritual.headline.replace(/,.*$/, ',')}
          italic={ritual.headline.includes(',') ? ritual.headline.split(',').slice(1).join(',').trim() : undefined}
          subtitle={ritual.note}
        />

        <ol className="relative mx-auto mt-14 max-w-[880px]">
          <span
            aria-hidden
            className="absolute left-[27px] top-3 h-[calc(100%-3rem)] w-px bg-coral/25"
          />

          <div className="space-y-8">
            {ritual.slots.map((slot, index) => {
              const product = byHandle.get(slot.handle);
              const itemAccent = accentFor(PRODUCT_CARD[slot.handle]?.accent);
              const image = product?.images[0];

              return (
                <Reveal key={`${slot.time}-${slot.handle}`} as="li" delay={index * 90} className="relative pl-[70px]">
                  <span className="absolute left-0 top-0 grid h-[54px] w-[54px] place-items-center rounded-full border-2 border-coral/25 bg-cream font-display text-[16px] font-bold text-coral">
                    {index + 1}
                  </span>

                  <div className="rounded-2xl bg-cream p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      {image && product ? (
                        <Link
                          href={`/product/${product.handle}`}
                          className={[
                            'relative h-[64px] w-[64px] flex-shrink-0 overflow-hidden rounded-lg',
                            itemAccent.imageGradient,
                          ].join(' ')}
                        >
                          <SmartImage
                            src={image.url}
                            alt={image.altText ?? product.title}
                            accent={PRODUCT_CARD[slot.handle]?.accent}
                            fill
                            quality={60}
                            sizes="64px"
                            shimmer={false}
                            imgClassName="object-cover"
                          />
                        </Link>
                      ) : null}

                      <div className="min-w-0 flex-1">
                        <p className="u-eyebrow">{slot.time}</p>
                        <h3 className="mt-1.5 font-display text-[18px] font-bold">
                          {product ? (
                            <Link
                              href={`/product/${product.handle}`}
                              className="uppercase tracking-[0.1em] transition-colors duration-300 hover:text-coral"
                            >
                              {product.title}
                            </Link>
                          ) : (
                            slot.handle
                          )}
                          <span className="ml-3 font-sans text-[12px] font-semibold normal-case tracking-normal text-coral">
                            {slot.dose}
                          </span>
                        </h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-espresso/70">
                          {slot.why}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </ol>
      </div>
    </section>
  );
}
