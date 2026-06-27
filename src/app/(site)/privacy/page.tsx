import type { Metadata } from 'next';
import { getServerLang } from '@/lib/server-lang';
import { privacyMetadata } from '@/lib/page-metadata';
import LegalPageContent from '@/components/legal/LegalPageContent';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return privacyMetadata(lang);
}

export default function PrivacyPage() {
  return <LegalPageContent variant="privacy" />;
}
