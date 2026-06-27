import { fmt, translations, type Lang } from './i18n';

const DEFAULT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

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
