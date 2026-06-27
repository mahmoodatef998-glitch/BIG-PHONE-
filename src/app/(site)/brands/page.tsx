import type { Metadata } from 'next';
import BrandsPageContent from '@/components/pages/BrandsPageContent';
import { getBrands } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Mobile Phone Brands',
  description: 'Shop by brand — Apple, Samsung, Xiaomi, Huawei, Oppo, Vivo wholesale devices.',
};

export default async function BrandsPage() {
  const brands = await getBrands();
  return <BrandsPageContent brands={brands} />;
}
