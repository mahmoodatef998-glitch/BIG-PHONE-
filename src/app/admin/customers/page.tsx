import type { Metadata } from 'next';
import CustomersClient from './CustomersClient';
import { getCustomersAdmin } from '@/lib/data';

export const metadata: Metadata = { title: 'Customers | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const customers = await getCustomersAdmin();
  return <CustomersClient customers={customers} />;
}
