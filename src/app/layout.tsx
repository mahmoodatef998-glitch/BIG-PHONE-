import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { parseLang, LANG_COOKIE } from '@/lib/lang';
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
  description: 'Wholesale mobile devices from Dubai — brand new and refurbished iPhones, Samsung, Xiaomi and more. MOQ from 5 units, global export.',
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
