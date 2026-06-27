'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Product, Condition } from '@/types';

const REFURB: Condition[] = ['refurbished-grade-a', 'refurbished-grade-b', 'certified-refurbished'];

export default function FeaturedInventory({ products }: { products: Product[] }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('');

  const FILTERS: { key: string; label: string; test: (p: Product) => boolean }[] = [
    { key: '',           label: t.home.filterAll,   test: ()  => true },
    { key: 'brand-new',  label: t.home.filterNew,   test: (p) => p.condition === 'brand-new' },
    { key: 'refurb',     label: t.home.filterRefurb, test: (p) => REFURB.includes(p.condition) },
  ];

  const visible = FILTERS.find(f => f.key === filter)?.test
    ? products.filter(FILTERS.find(f => f.key === filter)!.test)
    : products;

  const viewAllHref =
    filter === 'brand-new' ? '/inventory?condition=brand-new'
    : filter === 'refurb' ? '/inventory?refurbished=1'
    : '/inventory?featured=true';

  return (
    <section className="section">
      <div className="container-site">
        <div className="section-header">
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FF6B00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>{t.home.featuredEyebrow}</p>
            <h2 className="section-title">{t.home.featuredTitle}</h2>
          </div>
          <Link href={viewAllHref} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FF6B00', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.common.viewAll} →</Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`filter-chip${filter === f.key ? ' filter-chip-active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF', fontSize: '0.875rem' }}>
            {t.home.noProductsCategory}
          </div>
        ) : (
          <div className="inv-grid">
            {visible.slice(0, 12).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href={viewAllHref} className="btn btn-outline btn-lg btn-pill">
            {t.home.browseAllProducts}
          </Link>
        </div>
      </div>
    </section>
  );
}
