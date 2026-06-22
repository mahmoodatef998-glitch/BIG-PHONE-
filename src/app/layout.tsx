import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bigphone.ae'),
  title: {
    default: 'BIG PHONE — UAE\'s Trusted B2B Mobile Marketplace',
    template: '%s | BIG PHONE',
  },
  description: 'Buy and sell new, used, refurbished, and wholesale mobile devices from trusted suppliers across the UAE. 10K+ products, 500+ verified suppliers.',
  keywords: ['wholesale phones', 'refurbished smartphones', 'bulk mobile phones', 'B2B phones UAE', 'iPhone wholesale', 'Samsung wholesale', 'mobile marketplace UAE'],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: 'BIG PHONE',
    title: 'BIG PHONE — UAE\'s Trusted B2B Mobile Marketplace',
    description: 'Buy and sell new, used, refurbished, and wholesale mobile devices from trusted suppliers across the UAE.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
