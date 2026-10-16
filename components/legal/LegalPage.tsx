import Link from 'next/link';
import type { LegalDoc } from '@/content/legal';

/** Shared layout for the Privacy and Terms pages. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <section className="bg-cream">
      <div className="shell py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[760px]">
          <p className="u-eyebrow mb-4">Legal</p>
          <h1 className="font-display text-display-lg font-bold">
            {doc.title} <span className="u-italic">{doc.italic}</span>
          </h1>
          <p className="mt-3 text-[13px] text-espresso/55">Last updated: {doc.updated}</p>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-espresso/75">
            {doc.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 space-y-12">
            {doc.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-display text-[22px] font-semibold leading-snug text-espresso">
                  <span className="mr-2 text-coral">{index + 1}.</span>
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-espresso/75">
                  {section.body.map((block, blockIndex) =>
                    typeof block === 'string' ? (
                      <p key={blockIndex}>{block}</p>
                    ) : (
                      <ul key={blockIndex} className="space-y-2">
                        {block.list.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden className="mt-[3px] flex-shrink-0 text-[11px] text-coral">
                              ✦
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-espresso/10 pt-8">
            <Link href="/" className="btn-underline">
              ← Back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
