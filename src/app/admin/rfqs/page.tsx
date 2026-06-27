import type { Metadata } from 'next';
import { getRFQs } from '@/lib/data';
import RFQsClient from './RFQsClient';

export const metadata: Metadata = { title: 'RFQ Requests | Admin' };
export const dynamic = 'force-dynamic';

export default async function RFQsAdminPage(props: {
  searchParams: Promise<{ email?: string }>;
}) {
  const sp = await props.searchParams;
  const rfqs = await getRFQs();
  return <RFQsClient rfqs={rfqs} initialEmail={sp.email ?? ''} />;
}
