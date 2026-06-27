import type { Metadata } from 'next';
import CustomersClient from './CustomersClient';
import { deriveCustomersFromRFQs } from '@/lib/admin/customers';
import { getRFQs } from '@/lib/data';

export const metadata: Metadata = { title: 'Customers | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const rfqs = await getRFQs();
  const customers = deriveCustomersFromRFQs(rfqs);

  return <CustomersClient customers={customers} />;
}
