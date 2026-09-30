import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-[linear-gradient(135deg,#FFE5D9_0%,#FFF8F0_60%,#FFD66B_160%)]">
      <div className="shell flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
        <span aria-hidden className="animate-twinkle text-[26px] text-coral">
          ✦
        </span>
        <h1 className="mt-5 font-display text-display-lg font-extrabold">
          Nothing <span className="u-italic">here.</span>
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-espresso/70">
          This page has dissolved. The five formulas are still exactly where you left them.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Link href="/#shop" className="btn-primary">
            Shop the ritual
          </Link>
          <Link href="/" className="btn-underline">
            Back home →
          </Link>
        </div>
      </div>
    </section>
  );
}
