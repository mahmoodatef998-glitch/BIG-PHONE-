import type { Metadata } from 'next';
import { fmt, translations, type Lang } from './i18n';
import type { Product } from '@/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bigphone.ae';

export function rootMetadata(lang: Lang): Metadata {
  const m = translations[lang].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: m.siteDefault,
      template: `%s | BIG PHONE`,
    },
    description: m.siteDescription,
    keywords: lang === 'ar'
      ? ['جملة هواتف', 'هواتف مجددة', 'جملة موبايل الإمارات', 'iPhone جملة', 'Samsung جملة']
      : ['wholesale phones', 'refurbished smartphones', 'bulk mobile phones', 'B2B phones UAE', 'iPhone wholesale', 'Samsung wholesale'],
    openGraph: {
      type: 'website',
      locale: lang === 'ar' ? 'ar_AE' : 'en_AE',
      siteName: 'BIG PHONE',
      title: m.siteDefault,
      description: m.siteDescription,
    },
    robots: { index: true, follow: true },
  };
}

export function inventoryMetadata(lang: Lang): Metadata {
  const m = translations[lang].meta;
  return { title: m.inventoryTitle, description: m.inventoryDescription };
}

export function brandsMetadata(lang: Lang): Metadata {
  const m = translations[lang].meta;
  return { title: m.brandsTitle, description: m.brandsDescription };
}

export function aboutMetadata(lang: Lang): Metadata {
  const m = translations[lang].meta;
  return { title: m.aboutTitle, description: m.aboutDescription };
}

export function contactMetadata(lang: Lang): Metadata {
  const m = translations[lang].meta;
  return { title: m.contactTitle, description: m.contactDescription };
}

export function rfqMetadata(lang: Lang): Metadata {
  const m = translations[lang].meta;
  return { title: m.rfqTitle, description: m.rfqDescription };
}

export function privacyMetadata(lang: Lang): Metadata {
  const m = translations[lang].meta;
  return { title: m.privacyTitle, description: m.privacyDescription };
}

export function termsMetadata(lang: Lang): Metadata {
  const m = translations[lang].meta;
  return { title: m.termsTitle, description: m.termsDescription };
}

export function productMetadata(lang: Lang, product: Product): Metadata {
  const m = translations[lang].meta;
  const condition = product.condition === 'brand-new'
    ? translations[lang].conditions.brandNew
    : translations[lang].conditions.gradeA;
  const desc = fmt(m.productDescription, {
    name: product.name,
    condition,
    stock: product.stock_quantity,
    moq: product.moq,
  });
  const title = `${product.name}${m.productWholesaleSuffix}`;
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
      type: 'website',
    },
  };
}

export function productNotFoundMetadata(lang: Lang): Metadata {
  return { title: translations[lang].meta.productNotFound };
}

export function brandMetadata(lang: Lang, brandName: string): Metadata {
  const m = translations[lang].meta;
  return {
    title: fmt(m.brandTitle, { brand: brandName }),
    description: fmt(m.brandDescription, { brand: brandName }),
  };
}

export function brandNotFoundMetadata(lang: Lang): Metadata {
  return { title: translations[lang].meta.brandNotFound };
}
