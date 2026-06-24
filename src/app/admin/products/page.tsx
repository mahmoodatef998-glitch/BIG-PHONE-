import type { Metadata } from 'next';
import { getProductsAdmin, getBrandsAdmin, getCollectionsAdmin } from '@/lib/data';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = { title: 'Products | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const [products, brands, collections] = await Promise.all([
    getProductsAdmin(), getBrandsAdmin(), getCollectionsAdmin(),
  ]);
  return <ProductsClient products={products} brands={brands} collections={collections} />;
}
