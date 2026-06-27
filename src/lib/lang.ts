export type Lang = 'en' | 'ar';

export const LANG_COOKIE = 'bp-lang';

export function parseLang(value?: string | null): Lang {
  return value === 'ar' ? 'ar' : 'en';
}

export function setLangCookie(lang: Lang) {
  if (typeof document === 'undefined') return;
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;SameSite=Lax`;
}
