import type { Metadata } from 'next';
import { getRFQs } from '@/lib/data';
import RFQsClient from './RFQsClient';

export const metadata: Metadata = { title: 'RFQ Requests | Admin' };
export const dynamic = 'force-dynamic';

export default async function RFQsAdminPage() {
  const rfqs = await getRFQs();
  return <RFQsClient rfqs={rfqs} />;
}
