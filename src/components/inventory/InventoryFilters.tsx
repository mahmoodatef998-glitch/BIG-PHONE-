'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { X } from 'lucide-react';

const CATEGORIES = [
  { value: '',            label: 'All Products' },
  { value: 'smartphone', label: 'Smartphones' },
  { value: 'tablet',     label: 'Tablets' },
  { value: 'airpods',    label: 'Audio' },
  { value: 'accessory',  label: 'Accessories' },
];

const BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Oppo', 'Vivo'];

const CONDITIONS = [
  { value: 'brand-new',             label: 'Brand New' },
  { value: 'certified-refurbished', label: 'Certified' },
  { value: 'refurbished-grade-a',   label: 'Grade A' },
  { value: 'refurbished-grade-b',   label: 'Grade B' },
];

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'stock-high', label: 'Most Stock' },
  { value: 'stock-low',  label: 'Least Stock' },
  { value: 'brand',      label: 'Brand A–Z' },
];

export default function InventoryFilters({ count }: { count: number }) {
  const router   = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const clearAll = () => router.push(pathname, { scroll: false });

  const category  = searchParams.get('category') ?? '';
  const brand     = searchParams.get('brand')    ?? '';
  const condition = searchParams.get('condition') ?? '';
  const sort      = searchParams.get('sort')      ?? 'newest';
  const hasFilters = !!(category || brand || condition);

  const activeFilters: { key: string; label: string }[] = [];
  if (category)  activeFilters.push({ key: 'category',  label: CATEGORIES.find(c => c.value === category)?.label  ?? category });
  if (brand)     activeFilters.push({ key: 'brand',     label: brand.charAt(0).toUpperCase() + brand.slice(1) });
  if (condition) activeFilters.push({ key: 'condition', label: CONDITIONS.find(c => c.value === condition)?.label ?? condition });

  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #DDE3EA' }}>
      <div className="container-site">

        {/* ── Main chip row ─────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0' }}>

          {/* Scrollable chips area */}
          <div className="inv-chip-row">

            {/* Category group */}
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => updateParam('category', cat.value || null)}
                className={`inv-chip${category === cat.value ? ' inv-chip-on' : ''}`}
              >
                {cat.label}
              </button>
            ))}

            <span className="inv-sep" />

            {/* Brand group */}
            {BRANDS.map(b => (
              <button
                key={b}
                onClick={() => updateParam('brand', brand === b.toLowerCase() ? null : b.toLowerCase())}
                className={`inv-chip${brand === b.toLowerCase() ? ' inv-chip-on' : ''}`}
              >
                {b}
              </button>
            ))}

            <span className="inv-sep" />

            {/* Condition group */}
            {CONDITIONS.map(c => (
              <button
                key={c.value}
                onClick={() => updateParam('condition', condition === c.value ? null : c.value)}
                className={`inv-chip${condition === c.value ? ' inv-chip-on' : ''}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sort select — pinned right */}
          <div style={{ flexShrink: 0 }}>
            <select
              value={sort}
              onChange={e => updateParam('sort', e.target.value)}
              style={{
                border: '1.5px solid #DDE3EA',
                borderRadius: '8px',
                padding: '0.4rem 2.25rem 0.4rem 0.75rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#374151',
                background: "#fff url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='%234B5563' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\") no-repeat right 0.625rem center",
                appearance: 'none',
                cursor: 'pointer',
                minWidth: '140px',
              }}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Results meta row ──────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          flexWrap: 'wrap',
          borderTop: '1px solid #F1F5F9',
          padding: '0.375rem 0 0.625rem',
        }}>
          <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 500 }}>
            {count} {count === 1 ? 'product' : 'products'}
          </span>

          {activeFilters.map(f => (
            <button
              key={f.key}
              onClick={() => updateParam(f.key, null)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.2rem 0.625rem', borderRadius: '9999px',
                background: '#0B1829', color: '#fff',
                fontSize: '0.75rem', fontWeight: 600,
                border: 'none', cursor: 'pointer', transition: 'background 0.15s',
              }}
            >
              {f.label} <X size={11} />
            </button>
          ))}

          {hasFilters && (
            <button
              onClick={clearAll}
              style={{
                fontSize: '0.75rem', fontWeight: 600, color: '#dc2626',
                background: 'none', border: 'none', cursor: 'pointer', marginLeft: '0.25rem',
              }}
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <style>{`
        .inv-chip-row {
          display: flex;
          gap: 0.375rem;
          overflow-x: auto;
          flex: 1;
          align-items: center;
          scrollbar-width: none;
          padding-bottom: 2px;
        }
        .inv-chip-row::-webkit-scrollbar { display: none; }
        .inv-sep {
          display: inline-block;
          width: 1px; height: 18px;
          background: #DDE3EA;
          flex-shrink: 0;
          margin: 0 0.25rem;
        }
        .inv-chip {
          display: inline-flex; align-items: center;
          white-space: nowrap;
          padding: 0.375rem 0.875rem;
          border-radius: 9999px;
          border: 1.5px solid #DDE3EA;
          background: #fff; color: #4B5563;
          font-size: 0.8125rem; font-weight: 600;
          cursor: pointer; flex-shrink: 0;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .inv-chip:hover { border-color: #0066FF; color: #0066FF; }
        .inv-chip-on {
          border-color: #0066FF !important;
          background: #E5F0FF !important;
          color: #0066FF !important;
        }
      `}</style>
    </div>
  );
}
