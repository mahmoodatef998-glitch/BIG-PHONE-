import { fmt, translations, type Lang } from './i18n';

import { getWhatsAppNumber } from '@/lib/site-config';

const DEFAULT_NUMBER = getWhatsAppNumber();

export function buildWhatsAppLink(
  lang: Lang,
  kind: 'productInquiry' | 'productQuote' | 'generalQuote',
  vars: Record<string, string> = {},
  number = DEFAULT_NUMBER,
): string {
  const template = translations[lang].whatsapp[kind];
  const text = fmt(template, vars);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
