'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

type Variant = 'privacy' | 'terms';

export default function LegalPageContent({ variant }: { variant: Variant }) {
  const { t } = useLanguage();
  const legal = t.legal;
  const title = variant === 'privacy' ? legal.privacyTitle : legal.termsTitle;
  const sections = variant === 'privacy' ? legal.privacySections : legal.termsSections;

  return (
    <div>
      <div className="legal-page-hero" style={{ background: '#F8FAFC', borderBottom: '1px solid #EAEAEA', padding: '2.5rem 0' }}>
        <div className="container-site">
          <nav className="inv-breadcrumb">
            <Link href="/">{t.common.home}</Link>
            <span style={{ margin: '0 0.375rem', color: '#D1D5DB' }}>›</span>
            <span>{title}</span>
          </nav>
          <h1 className="inv-page-title">{title}</h1>
          <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '0.5rem' }}>{legal.lastUpdated}</p>
        </div>
      </div>

      <section className="section-sm">
        <div className="container-site" style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {sections.map(section => (
              <article key={section.heading}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                  {section.heading}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {section.body.map((para, i) => (
                    <p key={i} style={{ fontSize: '0.9375rem', color: '#374151', lineHeight: 1.75, margin: 0 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
