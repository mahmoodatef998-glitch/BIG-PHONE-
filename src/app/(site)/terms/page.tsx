import type { Metadata } from 'next';
import LegalPageContent from '@/components/legal/LegalPageContent';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'BIG PHONE terms of service for B2B wholesale buyers.',
};

export default function TermsPage() {
  return <LegalPageContent variant="terms" />;
}
