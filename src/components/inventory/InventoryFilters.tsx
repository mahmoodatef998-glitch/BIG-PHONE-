'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import { inventoryHref } from '@/lib/inventory-url';

const BRAND_ACCENT: Record<string, string> = {
  apple:   '#1C1C1E',
  samsung: '#1428A0',
  xiaomi:  '#FF6900',
  huawei:  '#CF0A2C',
  oppo:    '#1D3461',
  vivo:    '#415FFF',
};

const CATEGORIES = [
  { value: 'smartphone', label: 'Smartphones' },
  { value: 'tablet',     label: 'Tablets' },
  { value: 'airpods',    label: 'Audio' },
  { value: 'accessory',  label: 'Accessories' },
];

const CONDITION_OPTIONS = [
  { value: '',                      label: 'All conditions' },
  { value: 'brand-new',             label: 'Brand New' },
  { value: 'refurbished',           label: 'All Refurbished' },
  { value: 'certified-refurbished', label: 'Certified Refurbished' },
  { value: 'refurbished-grade-a',   label: 'Grade A' },
  { value: 'refurbished-grade-b',   label: 'Grade B' },
];

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest first' },
  { value: 'stock-high', label: 'Most stock' },
  { value: 'stock-low',  label: 'Least stock' },
  { value: 'brand',      label: 'Brand A–Z' },
];

type BrandTab = { slug: string; name: string };

type Props = {
  count: number;
  brands: BrandTab[];
};

const selectStyle: React.CSSProperties = {
  border: '1.5px solid #DDE3EA',
  borderRadius: '8px',
  padding: '0.45rem 2rem 0.45rem 0.75rem',
  minHeight: '40px',
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: '#374151',
  background: "#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='%234B5563' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\") no-repeat right 0.625rem center",
  appearance: 'none',
  cursor: 'pointer',
  width: '100%',
};

export default function InventoryFilters({ count, brands }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushParams = useCallback((updates: Record<string, string | null | undefined>) => {
    router.push(inventoryHref(searchParams, updates), { scroll: false });
  }, [router, searchParams]);

  const clearAll = () => router.push(pathname, { scroll: false });

  const brand       = searchParams.get('brand') ?? '';
  const category    = searchParams.get('category') ?? '';
  const condition   = searchParams.get('condition') ?? '';
  const refurbished = searchParams.get('refurbished') === '1' || searchParams.get('refurbished') === 'true';
  const featured    = searchParams.get('featured') === 'true';
  const inStock     = searchParams.get('inStock') === '1' || searchParams.get('inStock') === 'true';
  const excludeBrand = searchParams.get('excludeBrand') ?? '';
  const searchQ     = searchParams.get('search') ?? '';
  const collection  = searchParams.get('collection') ?? '';
  const sort        = searchParams.get('sort') ?? 'newest';

  const conditionSelectValue = refurbished ? 'refurbished' : condition;

  const hasFilters = !!(
    brand || category || condition || refurbished || featured || inStock ||
    excludeBrand || searchQ || collection
  );

  const brandName = useMemo(
    () => brands.find(b => b.slug === brand)?.name ?? (brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : ''),
    [brands, brand],
  );

  const activeFilters: { key: string; label: string; clear: Record<string, null> }[] = [];
  if (featured) activeFilters.push({ key: 'featured', label: 'Featured', clear: { featured: null } });
  if (inStock) activeFilters.push({ key: 'inStock', label: 'In stock', clear: { inStock: null } });
  if (refurbished) activeFilters.push({ key: 'refurbished', label: 'Refurbished', clear: { refurbished: null } });
  if (category) {
    activeFilters.push({
      key: 'category',
      label: CATEGORIES.find(c => c.value === category)?.label ?? category,
      clear: { category: null },
    });
  }
  if (brand) activeFilters.push({ key: 'brand', label: brandName, clear: { brand: null } });
  if (excludeBrand) {
    activeFilters.push({
      key: 'excludeBrand',
      label: `Excl. ${excludeBrand.charAt(0).toUpperCase()}${excludeBrand.slice(1)}`,
      clear: { excludeBrand: null },
    });
  }
  if (condition) {
    activeFilters.push({
      key: 'condition',
      label: CONDITION_OPTIONS.find(c => c.value === condition)?.label ?? condition,
      clear: { condition: null },
    });
  }
  if (searchQ) activeFilters.push({ key: 'search', label: `"${searchQ}"`, clear: { search: null } });
  if (collection) activeFilters.push({ key: 'collection', label: 'Collection', clear: { collection: null } });

  const toggleBool = (key: 'featured' | 'inStock' | 'refurbished', active: boolean) => {
    if (key === 'refurbished') {
      pushParams({ refurbished: active ? null : '1', condition: null });
      return;
    }
    pushParams({ [key]: active ? null : key === 'featured' ? 'true' : '1' });
  };

  const handleConditionChange = (value: string) => {
    if (!value) {
      pushParams({ condition: null, refurbished: null });
    } else if (value === 'refurbished') {
      pushParams({ refurbished: '1', condition: null });
    } else {
      pushParams({ condition: value, refurbished: null });
    }
  };

  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #DDE3EA' }}>
      <div className="container-site" style={{ padding: '0.875rem 0 0.625rem' }}>

        {/* Brand — single place to pick manufacturer */}
        <FilterSection label="Brand">
          <div className="inv-brand-row">
            <button
              type="button"
              onClick={() => pushParams({ brand: null })}
              className={`inv-brand-tab${!brand ? ' inv-brand-tab-on' : ''}`}
            >
              All
            </button>
            {brands.map(tab => {
              const isActive = brand === tab.slug;
              const accent = BRAND_ACCENT[tab.slug] ?? '#0066FF';
              return (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => pushParams({ brand: isActive ? null : tab.slug })}
                  className={`inv-brand-tab${isActive ? ' inv-brand-tab-on' : ''}`}
                  style={isActive ? { color: accent, borderBottomColor: accent } : undefined}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Quick toggles — one tap, obvious meaning */}
        <FilterSection label="Show">
          <div className="inv-pill-row">
            <TogglePill
              label="Featured"
              active={featured}
              onClick={() => toggleBool('featured', featured)}
            />
            <TogglePill
              label="In stock"
              active={inStock}
              onClick={() => toggleBool('inStock', inStock)}
            />
            <TogglePill
              label="Refurbished"
              active={refurbished}
              onClick={() => toggleBool('refurbished', refurbished)}
            />
          </div>
        </FilterSection>

        {/* Type + condition + sort — one compact row */}
        <div className="inv-refine-row">
          <FilterSection label="Type" compact>
            <div className="inv-pill-row">
              {CATEGORIES.map(cat => (
                <TogglePill
                  key={cat.value}
                  label={cat.label}
                  active={category === cat.value}
                  onClick={() => pushParams({ category: category === cat.value ? null : cat.value })}
                  size="sm"
                />
              ))}
            </div>
          </FilterSection>

          <div className="inv-refine-controls">
            <FilterSection label="Condition" compact>
              <select
                value={conditionSelectValue}
                onChange={e => handleConditionChange(e.target.value)}
                style={selectStyle}
                aria-label="Filter by condition"
              >
                {CONDITION_OPTIONS.map(o => (
                  <option key={o.value || 'all'} value={o.value}>{o.label}</option>
                ))}
              </select>
            </FilterSection>

            <FilterSection label="Sort" compact>
              <select
                value={sort}
                onChange={e => pushParams({ sort: e.target.value === 'newest' ? null : e.target.value })}
                style={selectStyle}
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </FilterSection>
          </div>
        </div>

        {/* Active filters summary */}
        <div className="inv-meta-row">
          <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 500 }}>
            {count} {count === 1 ? 'product' : 'products'}
          </span>

          {activeFilters.map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => pushParams(f.clear)}
              className="inv-active-tag"
            >
              {f.label} <X size={11} />
            </button>
          ))}

          {hasFilters && (
            <button type="button" onClick={clearAll} className="inv-clear-all">
              Clear all
            </button>
          )}
        </div>
      </div>

      <style>{`
        .inv-brand-row {
          display: flex;
          gap: 0.25rem;
          overflow-x: auto;
          scrollbar-width: none;
          border-bottom: 1px solid #F1F5F9;
          margin: 0 -0.25rem;
          padding: 0 0.25rem;
        }
        .inv-brand-row::-webkit-scrollbar { display: none; }
        .inv-brand-tab {
          flex-shrink: 0;
          padding: 0.5rem 0.875rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #64748B;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .inv-brand-tab:hover { color: #0066FF; }
        .inv-brand-tab-on { color: #0066FF !important; border-bottom-color: #0066FF !important; }

        .inv-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .inv-refine-row {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        @media (min-width: 768px) {
          .inv-refine-row {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: 1rem;
          }
        }
        .inv-refine-controls {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          width: 100%;
        }
        @media (min-width: 768px) {
          .inv-refine-controls {
            width: auto;
            min-width: 320px;
            flex-shrink: 0;
          }
        }

        .inv-meta-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          border-top: 1px solid #F1F5F9;
          margin-top: 0.75rem;
          padding-top: 0.625rem;
        }
        .inv-active-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.2rem 0.625rem;
          border-radius: 9999px;
          background: #0B1829;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }
        .inv-clear-all {
          font-size: 0.75rem;
          font-weight: 600;
          color: #dc2626;
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 0.125rem;
        }
      `}</style>
    </div>
  );
}

function FilterSection({
  label,
  children,
  compact = false,
}: {
  label: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div style={{ marginBottom: compact ? 0 : '0.75rem', minWidth: 0 }}>
      <div style={{
        fontSize: '0.6875rem',
        fontWeight: 700,
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '0.375rem',
      }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function TogglePill({
  label,
  active,
  onClick,
  size = 'md',
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  size?: 'sm' | 'md';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        padding: size === 'sm' ? '0.3rem 0.75rem' : '0.4rem 0.875rem',
        minHeight: size === 'sm' ? '36px' : '40px',
        borderRadius: '9999px',
        border: `1.5px solid ${active ? '#0066FF' : '#DDE3EA'}`,
        background: active ? '#E5F0FF' : '#fff',
        color: active ? '#0066FF' : '#4B5563',
        fontSize: '0.8125rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'border-color 0.15s, color 0.15s, background 0.15s',
      }}
    >
      {label}
    </button>
  );
}
