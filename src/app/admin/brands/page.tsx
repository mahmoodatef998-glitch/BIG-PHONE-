import type { Metadata } from 'next';
import { getBrandsAdmin, getProductsAdmin } from '@/lib/data';
import BrandsClient from './BrandsClient';

export const metadata: Metadata = { title: 'Brands | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminBrandsPage() {
  const [brands, products] = await Promise.all([getBrandsAdmin(), getProductsAdmin()]);

  const productCountByBrand = products.reduce<Record<string, number>>((acc, p) => {
    const key = p.brand?.slug ?? 'unknown';
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const stockByBrand = products.reduce<Record<string, number>>((acc, p) => {
    const key = p.brand?.slug ?? 'unknown';
    acc[key] = (acc[key] ?? 0) + p.stock_quantity;
    return acc;
  }, {});

  return (
    <BrandsClient
      brands={brands}
      productCountByBrand={productCountByBrand}
      stockByBrand={stockByBrand}
    />
  );
}
