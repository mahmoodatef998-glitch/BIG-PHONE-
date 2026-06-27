import type { Lang } from './lang';

export type Country = { value: string; ar: string };

export const COUNTRIES: Country[] = [
  { value: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة' },
  { value: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
  { value: 'Qatar', ar: 'قطر' },
  { value: 'Kuwait', ar: 'الكويت' },
  { value: 'Bahrain', ar: 'البحرين' },
  { value: 'Oman', ar: 'عُمان' },
  { value: 'Egypt', ar: 'مصر' },
  { value: 'Jordan', ar: 'الأردن' },
  { value: 'Lebanon', ar: 'لبنان' },
  { value: 'Iraq', ar: 'العراق' },
  { value: 'Pakistan', ar: 'باكستان' },
  { value: 'India', ar: 'الهند' },
  { value: 'Bangladesh', ar: 'بنغلاديش' },
  { value: 'Nigeria', ar: 'نيجيريا' },
  { value: 'Ghana', ar: 'غانا' },
  { value: 'Kenya', ar: 'كينيا' },
  { value: 'South Africa', ar: 'جنوب أفريقيا' },
  { value: 'United Kingdom', ar: 'المملكة المتحدة' },
  { value: 'Germany', ar: 'ألمانيا' },
  { value: 'France', ar: 'فرنسا' },
  { value: 'Turkey', ar: 'تركيا' },
  { value: 'China', ar: 'الصين' },
  { value: 'Other', ar: 'أخرى' },
];

export function countryLabel(value: string, lang: Lang): string {
  const match = COUNTRIES.find(c => c.value === value);
  if (!match) return value;
  return lang === 'ar' ? match.ar : match.value;
}
