import type { Metadata } from 'next';
import ContactPageContent from '@/components/pages/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with BIG PHONE wholesale team.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
