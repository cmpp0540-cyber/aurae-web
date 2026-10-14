import { SITE } from '@/content/site';

/** Two stacked bars: coral promo on top, espresso shipping note below. */
export default function AnnouncementBar() {
  return (
    <div>
      <div className="bg-coral px-5 py-[10px] text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[12px]">
        <span aria-hidden className="mr-2">
          ✦
        </span>
        Subscribe &amp; Save 10%
        <span aria-hidden className="ml-2">
          ✦
        </span>
      </div>
      <div className="bg-espresso px-5 py-[11px] text-center text-[11px] uppercase tracking-[0.13em] text-ivory sm:text-[12px]">
        {SITE.announcement}
      </div>
    </div>
  );
}
