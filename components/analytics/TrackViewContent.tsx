'use client';

import { useEffect } from 'react';
import { track } from '@/lib/meta-pixel';

/** Records that someone looked at a product or bundle page. Renders nothing. */
export default function TrackViewContent({
  contentId,
  name,
  value,
  currency,
}: {
  contentId: string;
  name: string;
  value: number;
  currency: string;
}) {
  useEffect(() => {
    track('ViewContent', {
      content_ids: [contentId],
      content_name: name,
      content_type: 'product',
      value,
      currency,
    });
  }, [contentId, name, value, currency]);

  return null;
}
