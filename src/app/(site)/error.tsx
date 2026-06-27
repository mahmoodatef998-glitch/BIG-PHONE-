'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Error({ reset }: { reset: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="container-site section" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>{t.errors.errorTitle}</h1>
      <p style={{ color: '#6B7280', marginBottom: '2rem', lineHeight: 1.6 }}>{t.errors.errorMsg}</p>
      <button type="button" onClick={reset} className="btn btn-primary btn-pill">{t.errors.tryAgain}</button>
    </div>
  );
}
