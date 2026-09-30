import { SITE } from '@/content/site';

export default function TrustBar() {
  return (
    <div className="bg-sun">
      {/* Scrolls horizontally on phones, spreads out from tablet up. */}
      <ul className="shell no-scrollbar flex items-center gap-7 overflow-x-auto py-4 md:justify-between md:gap-4">
        {SITE.trustBar.map((item) => (
          <li
            key={item}
            className="flex flex-shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-espresso sm:text-[11px]"
          >
            <span aria-hidden className="text-coral">
              ✦
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
