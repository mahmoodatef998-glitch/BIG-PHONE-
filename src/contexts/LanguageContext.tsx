'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Lang, type Translations } from '@/lib/i18n';
import { setLangCookie } from '@/lib/lang';

interface LangCtx {
  lang: Lang;
  t: Translations;
  toggle: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LangCtx>({
  lang: 'en',
  t: translations.en,
  toggle: () => {},
  isRTL: false,
});

export function LanguageProvider({
  children,
  initialLang = 'en',
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    applyLang(lang);
    localStorage.setItem('bp-lang', lang);
    setLangCookie(lang);
  }, [lang]);

  const toggle = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

function applyLang(lang: Lang) {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  if (lang === 'ar') {
    if (!document.getElementById('arabic-font')) {
      const link = document.createElement('link');
      link.id = 'arabic-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap';
      document.head.appendChild(link);
    }
    root.style.fontFamily = "'Tajawal', 'Segoe UI', Tahoma, sans-serif";
  } else {
    root.style.fontFamily = '';
  }
}

export const useLanguage = () => useContext(LanguageContext);
