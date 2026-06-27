import type { Metadata } from 'next';
import { getServerLang } from '@/lib/server-lang';
import { aboutMetadata } from '@/lib/page-metadata';
import AboutPageContent from '@/components/pages/AboutPageContent';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return aboutMetadata(lang);
}

export default function AboutPage() {
  return <AboutPageContent />;
}
