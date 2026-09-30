import { SITE } from '@/content/site';

export default function AnnouncementBar() {
  return (
    <div className="bg-espresso px-5 py-[11px] text-center text-[11px] uppercase tracking-[0.13em] text-ivory sm:text-[12px]">
      {SITE.announcement}
    </div>
  );
}
