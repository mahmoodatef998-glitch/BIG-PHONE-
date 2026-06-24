import type { Metadata } from 'next';
import { getCollectionsAdmin, getProductsAdmin } from '@/lib/data';
import CollectionsClient from './CollectionsClient';

export const metadata: Metadata = { title: 'Sections | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminCollectionsPage() {
  const [collections, products] = await Promise.all([
    getCollectionsAdmin(),
    getProductsAdmin(),
  ]);

  const productCountByCollection: Record<string, number> = {};
  for (const p of products) {
    if (p.collection_id) {
      productCountByCollection[p.collection_id] =
        (productCountByCollection[p.collection_id] ?? 0) + 1;
    }
  }

  return (
    <CollectionsClient
      collections={collections}
      productCountByCollection={productCountByCollection}
    />
  );
}
