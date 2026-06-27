'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import { inventoryHref } from '@/lib/inventory-url';

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

export default function InventoryFilters({ count, brands }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushParams = useCallback((updates: Record<string, string | null | undefined>) => {
    router.push(inventoryHref(searchParams, updates), { scroll: false });
  }, [router, searchParams]);

  const clearAll = () => router.push(pathname, { scroll: false });

  const brand        = searchParams.get('brand') ?? '';
  const category     = searchParams.get('category') ?? '';
  const condition    = searchParams.get('condition') ?? '';
  const refurbished  = searchParams.get('refurbished') === '1' || searchParams.get('refurbished') === 'true';
  const featured     = searchParams.get('featured') === 'true';
  const inStock      = searchParams.get('inStock') === '1' || searchParams.get('inStock') === 'true';
  const excludeBrand = searchParams.get('excludeBrand') ?? '';
  const searchQ      = searchParams.get('search') ?? '';
  const collection   = searchParams.get('collection') ?? '';
  const sort         = searchParams.get('sort') ?? 'newest';

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

  const chipClass = (active: boolean) => `filter-chip${active ? ' filter-chip-active' : ''}`;

  return (
    <div className="inv-toolbar">
      <div className="container-site inv-toolbar-inner">

        {/* Brand */}
        <div className="inv-filter-block">
          <p className="inv-filter-heading">Brand</p>
          <div className="inv-chip-scroll">
            <button
              type="button"
              onClick={() => pushParams({ brand: null })}
              className={chipClass(!brand)}
            >
              All brands
            </button>
            {brands.map(tab => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => pushParams({ brand: brand === tab.slug ? null : tab.slug })}
                className={chipClass(brand === tab.slug)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick filters + categories */}
        <div className="inv-filter-block">
          <p className="inv-filter-heading">Quick filters</p>
          <div className="inv-filter-row">
            <button type="button" onClick={() => toggleBool('featured', featured)} className={chipClass(featured)}>
              Featured
            </button>
            <button type="button" onClick={() => toggleBool('inStock', inStock)} className={chipClass(inStock)}>
              In stock
            </button>
            <button type="button" onClick={() => toggleBool('refurbished', refurbished)} className={chipClass(refurbished)}>
              Refurbished
            </button>
          </div>
        </div>

        <div className="inv-filter-block">
          <p className="inv-filter-heading">Product type</p>
          <div className="inv-chip-scroll">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                type="button"
                onClick={() => pushParams({ category: category === cat.value ? null : cat.value })}
                className={chipClass(category === cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Condition + sort */}
        <div className="inv-filter-controls">
          <div className="inv-select-wrap">
            <label htmlFor="inv-condition">Condition</label>
            <select
              id="inv-condition"
              value={conditionSelectValue}
              onChange={e => handleConditionChange(e.target.value)}
              className="inv-select"
            >
              {CONDITION_OPTIONS.map(o => (
                <option key={o.value || 'all'} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="inv-select-wrap">
            <label htmlFor="inv-sort">Sort by</label>
            <select
              id="inv-sort"
              value={sort}
              onChange={e => pushParams({ sort: e.target.value === 'newest' ? null : e.target.value })}
              className="inv-select"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results bar */}
        <div className="inv-results-bar">
          <p className="inv-results-count">
            {count} <span>{count === 1 ? 'product' : 'products'}</span>
          </p>

          {activeFilters.map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => pushParams(f.clear)}
              className="inv-tag"
            >
              {f.label}
              <X size={12} strokeWidth={2.5} />
            </button>
          ))}

          {hasFilters && (
            <button type="button" onClick={clearAll} className="inv-clear">
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
