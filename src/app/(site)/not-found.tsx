'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="container-site section" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
      <p style={{ fontSize: '4rem', fontWeight: 800, color: '#FF6B00', margin: '0 0 0.5rem', lineHeight: 1 }}>404</p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>{t.errors.notFoundTitle}</h1>
      <p style={{ color: '#6B7280', marginBottom: '2rem', lineHeight: 1.6 }}>{t.errors.notFoundMsg}</p>
      <Link href="/" className="btn btn-primary btn-pill">{t.errors.backHome}</Link>
    </div>
  );
}
