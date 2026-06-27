import type { Metadata } from 'next';
import { getServerLang } from '@/lib/server-lang';
import { brandsMetadata } from '@/lib/page-metadata';
import BrandsPageContent from '@/components/pages/BrandsPageContent';
import { getBrands } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return brandsMetadata(lang);
}

export default async function BrandsPage() {
  const brands = await getBrands();
  return <BrandsPageContent brands={brands} />;
}
