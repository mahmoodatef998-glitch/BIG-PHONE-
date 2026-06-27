'use client';

import Link from 'next/link';
import { ArrowRight, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fmt } from '@/lib/i18n';
import type { Brand } from '@/types';

const BRAND_STYLE: Record<string, { bg: string; color: string; letter: string }> = {
  apple:   { bg: '#1A1A1A', color: '#fff', letter: 'A' },
  samsung: { bg: '#1428A0', color: '#fff', letter: 'S' },
  xiaomi:  { bg: '#FF6900', color: '#fff', letter: 'X' },
  huawei:  { bg: '#CF0A2C', color: '#fff', letter: 'H' },
  oppo:    { bg: '#1D3461', color: '#fff', letter: 'O' },
  vivo:    { bg: '#415FFF', color: '#fff', letter: 'V' },
};

export default function BrandsPageContent({ brands }: { brands: Brand[] }) {
  const { t } = useLanguage();

  return (
    <div>
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '2.5rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: '#2563EB' }}>{t.common.home}</Link> / {t.brands.breadcrumb}
          </nav>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: '#0F172A' }}>
            {t.brands.pageTitle}
          </h1>
          <p style={{ color: '#64748B', marginTop: '0.5rem' }}>{t.brands.pageSub}</p>
        </div>
      </div>

      <section className="section">
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }} className="brands-page-grid">
            {brands.map(brand => {
              const style = BRAND_STYLE[brand.slug];
              return (
                <Link key={brand.id} href={`/brands/${brand.slug}`} className="brand-card">
                  <div style={{
                    width: '56px', height: '56px',
                    borderRadius: '14px',
                    background: style?.bg ?? '#1A2332',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 0.875rem',
                  }}>
                    {style ? (
                      <span style={{ fontSize: '1.5rem', fontWeight: 800, color: style.color, letterSpacing: '-0.02em' }}>
                        {style.letter}
                      </span>
                    ) : (
                      <Smartphone size={24} style={{ color: '#fff' }} />
                    )}
                  </div>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>{brand.name}</h2>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '0.875rem' }}>{brand.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#2563EB' }}>
                      {fmt(t.brands.productsCount, { n: brand.product_count })}
                    </span>
                    <ArrowRight size={14} style={{ color: '#2563EB' }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 480px) { .brands-page-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 1024px) { .brands-page-grid { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
    </div>
  );
}
