import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BrandPageContent from '@/components/pages/BrandPageContent';
import { getBrandBySlug, getProducts, getBrands } from '@/lib/data';
import { getServerLang } from '@/lib/server-lang';
import { brandMetadata, brandNotFoundMetadata } from '@/lib/page-metadata';

export const revalidate = 60;
export const dynamicParams = true;

type BrandPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map(b => ({ slug: b.slug }));
}

export async function generateMetadata(props: BrandPageProps): Promise<Metadata> {
  const lang = await getServerLang();
  const { slug } = await props.params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return brandNotFoundMetadata(lang);
  return brandMetadata(lang, brand.name);
}

export default async function BrandPage(props: BrandPageProps) {
  const { slug } = await props.params;
  const [brand, products] = await Promise.all([
    getBrandBySlug(slug),
    getProducts({ brand: slug }),
  ]);

  if (!brand) notFound();

  return <BrandPageContent brand={brand} products={products} />;
}
