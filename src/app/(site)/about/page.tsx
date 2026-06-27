import type { Metadata } from 'next';
import AboutPageContent from '@/components/pages/AboutPageContent';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about BIG PHONE — UAE-based B2B wholesale supplier of mobile devices.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
