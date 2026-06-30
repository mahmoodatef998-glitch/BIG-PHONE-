import type { Metadata } from 'next';
import { getRFQs, getProductsAdmin } from '@/lib/data';
import RFQsClient from './RFQsClient';

export const metadata: Metadata = { title: 'RFQ Requests | Admin' };
export const dynamic = 'force-dynamic';

export default async function RFQsAdminPage(props: {
  searchParams: Promise<{ email?: string }>;
}) {
  const sp = await props.searchParams;
  const [rfqs, products] = await Promise.all([getRFQs(), getProductsAdmin()]);
  return <RFQsClient rfqs={rfqs} products={products} initialEmail={sp.email ?? ''} />;
}
