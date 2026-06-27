import { cookies } from 'next/headers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { parseLang, LANG_COOKIE } from '@/lib/lang';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const initialLang = parseLang(cookieStore.get(LANG_COOKIE)?.value);

  return (
    <LanguageProvider initialLang={initialLang}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main className="mobile-nav-spacer" style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
