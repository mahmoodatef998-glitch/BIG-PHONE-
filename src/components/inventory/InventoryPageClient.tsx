'use client';

import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { fmt } from '@/lib/i18n';
import type { Brand, Product } from '@/types';

type FilterFields = {
  brand?: string;
  condition?: string;
  category?: string;
  refurbished?: boolean;
  excludeBrand?: string;
  featured?: boolean;
  inStock?: boolean;
  collection?: string;
  sortBy?: string;
  explicitSort?: string;
};

export function InventoryPageHeader({
  search,
  displayCount,
  filterFields,
}: {
  search: string;
  displayCount: number;
  filterFields: FilterFields;
}) {
  const { t } = useLanguage();

  return (
    <div className="inv-page-header">
      <div className="container-site">
        <nav className="inv-breadcrumb">
          <Link href="/">{t.common.home}</Link>
          <span style={{ margin: '0 0.375rem', color: '#D1D5DB' }}>›</span>
          <span>{t.inventory.breadcrumb}</span>
        </nav>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h1 className="inv-page-title">{t.inventory.title}</h1>
          <span style={{ fontSize: '0.875rem', color: '#9CA3AF', fontWeight: 500 }}>
            {displayCount} {t.common.products}
          </span>
        </div>
        <form action="/inventory" method="get" className="inv-search-form">
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.875rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
              pointerEvents: 'none',
            }}
          />
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder={t.inventory.searchPlaceholder}
            className="form-input"
          />
          <button type="submit" className="btn btn-primary btn-sm inv-search-btn">
            {t.common.search}
          </button>
          {filterFields.brand && <input type="hidden" name="brand" value={filterFields.brand} />}
          {filterFields.condition && <input type="hidden" name="condition" value={filterFields.condition} />}
          {filterFields.category && <input type="hidden" name="category" value={filterFields.category} />}
          {filterFields.refurbished && <input type="hidden" name="refurbished" value="1" />}
          {filterFields.excludeBrand && <input type="hidden" name="excludeBrand" value={filterFields.excludeBrand} />}
          {filterFields.featured && <input type="hidden" name="featured" value="true" />}
          {filterFields.inStock && <input type="hidden" name="inStock" value="1" />}
          {filterFields.collection && <input type="hidden" name="collection" value={filterFields.collection} />}
          {filterFields.explicitSort && (
            <input type="hidden" name="sort" value={filterFields.explicitSort} />
          )}
        </form>
      </div>
    </div>
  );
}

export function InventoryResultsHeading({
  title,
  titleKey,
  count,
}: {
  title?: string;
  titleKey?: 'featured' | 'newArrivals' | 'stockHigh' | 'stockLow' | 'brandSort';
  count: number;
}) {
  const { t } = useLanguage();
  const heading = title ?? (
    titleKey === 'featured' ? t.inventory.featuredHeading
      : titleKey === 'newArrivals' ? t.inventory.newArrivalsHeading
        : titleKey === 'stockHigh' ? t.inventory.sortStockHigh
          : titleKey === 'stockLow' ? t.inventory.sortStockLow
            : titleKey === 'brandSort' ? t.inventory.sortBrand
              : t.inventory.title
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
      <div style={{ width: '4px', height: '24px', background: '#FF6B00', borderRadius: '2px', flexShrink: 0 }} />
      <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
        {heading}
      </h2>
      <span style={{ color: '#9CA3AF', fontSize: '0.8125rem', fontWeight: 500 }}>
        · {count} {t.common.products}
      </span>
    </div>
  );
}

export function InventoryBrandSection({ brand, products, total }: { brand: Brand; products: Product[]; total: number }) {
  const { t } = useLanguage();
  const preview = products.slice(0, 4);

  return (
    <section aria-label={`${brand.name} products`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '4px', height: '32px', background: '#FF6B00', borderRadius: '2px', flexShrink: 0 }} />
          <div>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
              {brand.name}
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: '2px 0 0' }}>
              {total} {total === 1 ? t.common.product : t.common.products} {t.inventory.productsAvailable}
            </p>
          </div>
        </div>
        {total > 4 && (
          <Link
            href={`/inventory?brand=${brand.slug}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#FF6B00',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            {t.common.viewAllCount} {total} <ChevronRight size={14} />
          </Link>
        )}
      </div>
      <div className="inv-grid">
        {preview.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export function InventoryEmptyState({ search }: { search: string }) {
  const { t } = useLanguage();

  return (
    <div className="card" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
      <div style={{
        width: '56px',
        height: '56px',
        background: '#FFF3E8',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.25rem',
      }}>
        <Search size={24} style={{ color: '#FF6B00' }} />
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
        {t.inventory.noProducts}
      </h3>
      <p style={{ color: '#6B7280', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
        {search ? fmt(t.inventory.noSearchResults, { q: search }) : t.common.tryAdjusting}
      </p>
      <Link href="/inventory" className="btn btn-outline btn-pill">
        {t.common.clearFilters}
      </Link>
    </div>
  );
}

export function InventoryProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="inv-grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
