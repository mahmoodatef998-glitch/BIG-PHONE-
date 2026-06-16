'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { X } from 'lucide-react';

const BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Oppo', 'Vivo'];
const CONDITIONS = [
  { value: 'brand-new', label: 'Brand New' },
  { value: 'certified-refurbished', label: 'Certified Refurbished' },
  { value: 'refurbished-grade-a', label: 'Grade A' },
  { value: 'refurbished-grade-b', label: 'Grade B' },
];
const STORAGE = ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'stock-high', label: 'Most Stock' },
  { value: 'stock-low', label: 'Least Stock' },
  { value: 'brand', label: 'Brand A–Z' },
  { value: 'model', label: 'Model A–Z' },
];

export default function InventoryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const toggleArrayParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key)?.split(',').filter(Boolean) ?? [];
    const idx = current.indexOf(value);
    if (idx > -1) current.splice(idx, 1);
    else current.push(value);
    if (current.length) params.set(key, current.join(','));
    else params.delete(key);
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const clearAll = () => router.push(pathname, { scroll: false });

  const brand = searchParams.get('brand') ?? '';
  const condition = searchParams.get('condition')?.split(',').filter(Boolean) ?? [];
  const storage = searchParams.get('storage')?.split(',').filter(Boolean) ?? [];
  const sort = searchParams.get('sort') ?? 'newest';
  const hasFilters = brand || condition.length || storage.length;

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '1.5rem' }}>
      <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.625rem' }}>{title}</h4>
      {children}
    </div>
  );

  return (
    <div style={{ position: 'sticky', top: '80px' }}>
      {/* Sort - shown on top on mobile */}
      <FilterSection title="Sort By">
        <select
          value={sort}
          onChange={e => updateParam('sort', e.target.value)}
          className="form-input"
          style={{ fontSize: '0.8125rem' }}
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </FilterSection>

      {/* Active filters */}
      {hasFilters && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>Active Filters</span>
            <button onClick={clearAll} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={12} /> Clear All
            </button>
          </div>
        </div>
      )}

      <div style={{ height: '1px', background: '#E2E8F0', marginBottom: '1.25rem' }} />

      {/* Brand */}
      <FilterSection title="Brand">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {BRANDS.map(b => (
            <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', padding: '0.25rem 0' }}>
              <input
                type="radio"
                name="brand"
                checked={brand === b.toLowerCase()}
                onChange={() => updateParam('brand', brand === b.toLowerCase() ? null : b.toLowerCase())}
                style={{ accentColor: '#2563EB', width: '14px', height: '14px' }}
              />
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>{b}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div style={{ height: '1px', background: '#E2E8F0', marginBottom: '1.25rem' }} />

      {/* Condition */}
      <FilterSection title="Condition">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {CONDITIONS.map(c => (
            <label key={c.value} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', padding: '0.25rem 0' }}>
              <input
                type="checkbox"
                checked={condition.includes(c.value)}
                onChange={() => toggleArrayParam('condition', c.value)}
                style={{ accentColor: '#2563EB', width: '14px', height: '14px' }}
              />
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>{c.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div style={{ height: '1px', background: '#E2E8F0', marginBottom: '1.25rem' }} />

      {/* Storage */}
      <FilterSection title="Storage">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {STORAGE.map(s => (
            <button
              key={s}
              onClick={() => toggleArrayParam('storage', s)}
              className={storage.includes(s) ? 'filter-chip filter-chip-active' : 'filter-chip'}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}
