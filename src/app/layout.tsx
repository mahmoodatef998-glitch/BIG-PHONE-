import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bigphone.ae"),
  title: {
    default: "BIG PHONE — Wholesale Mobile Devices | B2B Supplier UAE",
    template: "%s | BIG PHONE Wholesale",
  },
  description: "Leading wholesale supplier of refurbished and brand new smartphones, tablets, and mobile accessories. Grade A, Grade B, and Certified Refurbished devices. Request quotation today.",
  keywords: ["wholesale phones", "refurbished smartphones", "bulk mobile phones", "B2B phones UAE", "iPhone wholesale", "Samsung wholesale", "mobile devices supplier"],
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: "BIG PHONE",
    title: "BIG PHONE — Wholesale Mobile Devices Supplier",
    description: "B2B wholesale supplier of refurbished & brand new smartphones, tablets and accessories. Serving mobile shops, resellers & distributors globally.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIG PHONE — Wholesale Mobile Devices",
    description: "B2B wholesale supplier of refurbished & brand new smartphones, tablets and accessories.",
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
