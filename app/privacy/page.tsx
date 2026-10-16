import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { PRIVACY } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Aurae collects, uses and protects your personal information.',
};

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
