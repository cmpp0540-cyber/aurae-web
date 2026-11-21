import Link from 'next/link';
import { SITE } from '@/content/site';

/**
 * The single bar above the header.
 *
 * This was two stacked bars, coral over espresso. Two is one too many: they
 * take the most valuable strip on the page — above the logo, first thing
 * anyone sees — and split attention, so neither gets read. One message does.
 *
 * Free shipping is the one that earns the space. It competes with nothing,
 * and it is the fact shoppers hunt for before they reach the cart. The
 * newsletter keeps the 15% offer to itself, so there are never two discounts
 * on screen leaving someone unsure which one applies to them.
 *
 * It links to the products, because an offer with nowhere to go wastes the
 * impulse it just created.
 */
export default function AnnouncementBar() {
  return (
    <Link
      href="/#products"
      className="block bg-[#FCE4EA] px-5 py-[11px] text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-espresso transition-colors duration-300 hover:bg-[#FBD9E2] sm:text-[12px]"
    >
      <span aria-hidden className="mr-2.5 text-coral">
        ✦
      </span>
      {SITE.announcement}
      <span aria-hidden className="ml-2.5 text-coral">
        ✦
      </span>
    </Link>
  );
}
