import type { Metadata } from 'next';
import LegalPageContent from '@/components/legal/LegalPageContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'BIG PHONE privacy policy — how we collect and use business inquiry data.',
};

export default function PrivacyPage() {
  return <LegalPageContent variant="privacy" />;
}
