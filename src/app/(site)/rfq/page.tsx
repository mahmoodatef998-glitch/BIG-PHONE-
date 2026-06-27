import type { Metadata } from 'next';
import { getServerLang } from '@/lib/server-lang';
import { rfqMetadata } from '@/lib/page-metadata';
import RFQPageContent from '@/components/pages/RFQPageContent';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return rfqMetadata(lang);
}

export default async function RFQPage(props: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: defaultProduct = '' } = await props.searchParams;
  return <RFQPageContent defaultProduct={defaultProduct} />;
}
