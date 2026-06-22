import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bigphone.ae"),
  title: {
    default: "Big Phone — The Ultimate Mobile Marketplace",
    template: "%s | Big Phone",
  },
  description: "Buy & sell new, used and refurbished smartphones, tablets, and accessories. Trusted by 50K+ buyers worldwide.",
  keywords: ["wholesale phones", "refurbished smartphones", "bulk mobile phones", "B2B phones UAE", "iPhone wholesale", "Samsung wholesale"],
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: "Big Phone",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
