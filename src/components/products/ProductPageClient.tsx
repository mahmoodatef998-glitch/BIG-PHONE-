'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { fmt } from '@/lib/i18n';
import type { Product } from '@/types';

export function ProductBreadcrumb({
  brandName,
  brandSlug,
  model,
}: {
  brandName?: string;
  brandSlug?: string;
  model: string;
}) {
  const { t } = useLanguage();

  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #DDE3EA', padding: '0.75rem 0' }}>
      <div className="container-site">
        <nav style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', gap: '0.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#0066FF', textDecoration: 'none' }}>{t.common.home}</Link>
          <span style={{ color: '#CBD5E1' }}>›</span>
          <Link href="/inventory" style={{ color: '#0066FF', textDecoration: 'none' }}>{t.productPage.inventory}</Link>
          {brandName && brandSlug && (
            <>
              <span style={{ color: '#CBD5E1' }}>›</span>
              <Link href={`/brands/${brandSlug}`} style={{ color: '#0066FF', textDecoration: 'none' }}>{brandName}</Link>
            </>
          )}
          <span style={{ color: '#CBD5E1' }}>›</span>
          <span style={{ color: '#374151' }}>{model}</span>
        </nav>
      </div>
    </div>
  );
}

export function ProductSpecsSection({
  specifications,
}: {
  specifications: Record<string, string | number | boolean>;
}) {
  const { t } = useLanguage();

  if (!specifications || Object.keys(specifications).length === 0) return null;

  return (
    <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '0.875rem 1.125rem', borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0B1829', margin: 0 }}>{t.common.specifications}</h3>
      </div>
      <div>
        {Object.entries(specifications).map(([key, val]) => (
          <div key={key} style={{
            display: 'flex', padding: '0.5625rem 1.125rem',
            borderBottom: '1px solid #F1F5F9', fontSize: '0.8125rem',
          }}>
            <span style={{ flex: '0 0 40%', color: '#64748B', fontWeight: 500 }}>{key}</span>
            <span style={{ color: '#111827' }}>{String(val)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductRelatedSection({
  related,
  currentId,
  brandName,
  brandSlug,
}: {
  related: Product[];
  currentId: string;
  brandName?: string;
  brandSlug?: string;
}) {
  const { t } = useLanguage();
  const items = related.filter(p => p.id !== currentId).slice(0, 4);

  if (items.length === 0) return null;

  return (
    <div style={{ marginTop: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0B1829', margin: 0 }}>
            {brandName ? fmt(t.common.moreFrom, { brand: brandName }) : t.inventory.title}
          </h2>
        </div>
        {brandSlug && (
          <Link href={`/brands/${brandSlug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', fontWeight: 600, color: '#0066FF', textDecoration: 'none' }}>
            {t.common.viewAll} <ArrowRight size={13} />
          </Link>
        )}
      </div>
      <div className="related-grid">
        {items.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
