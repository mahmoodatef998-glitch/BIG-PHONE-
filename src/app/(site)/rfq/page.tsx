import type { Metadata } from 'next';
import RFQPageContent from '@/components/pages/RFQPageContent';

export const metadata: Metadata = {
  title: 'Request Quotation | BIG PHONE B2B',
  description: 'Submit a wholesale quotation request for iPhones, Samsung, Xiaomi and other mobile devices. Get pricing within 2 hours.',
};

export default async function RFQPage(props: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: defaultProduct = '' } = await props.searchParams;
  return <RFQPageContent defaultProduct={defaultProduct} />;
}
