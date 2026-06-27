import type { Metadata } from 'next';
import { getServerLang } from '@/lib/server-lang';
import { termsMetadata } from '@/lib/page-metadata';
import LegalPageContent from '@/components/legal/LegalPageContent';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return termsMetadata(lang);
}

export default function TermsPage() {
  return <LegalPageContent variant="terms" />;
}
