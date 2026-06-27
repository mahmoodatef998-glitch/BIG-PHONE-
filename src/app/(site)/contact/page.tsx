import type { Metadata } from 'next';
import { getServerLang } from '@/lib/server-lang';
import { contactMetadata } from '@/lib/page-metadata';
import ContactPageContent from '@/components/pages/ContactPageContent';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return contactMetadata(lang);
}

export default function ContactPage() {
  return <ContactPageContent />;
}
