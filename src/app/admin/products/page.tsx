import type { Metadata } from 'next';
import { getProductsAdmin, getBrands } from '@/lib/data';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = { title: 'Products | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const [products, brands] = await Promise.all([getProductsAdmin(), getBrands()]);
  return <ProductsClient products={products} brands={brands} />;
}
