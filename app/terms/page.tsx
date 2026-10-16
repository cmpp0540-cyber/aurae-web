import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { TERMS } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that apply to using auraevital.com and buying from Aurae.',
};

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
