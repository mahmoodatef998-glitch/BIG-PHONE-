'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import { inventoryHref } from '@/lib/inventory-url';
import { useLanguage } from '@/contexts/LanguageContext';

type BrandTab = { slug: string; name: string };

type Props = {
  count: number;
  brands: BrandTab[];
};

export default function InventoryFilters({ count, brands }: Props) {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const CATEGORIES = useMemo(() => [
    { value: 'smartphone', label: t.inventory.typeSmartphones },
    { value: 'tablet',     label: t.inventory.typeTablets },
    { value: 'airpods',    label: t.inventory.typeAudio },
    { value: 'accessory',  label: t.inventory.typeAccessories },
  ], [t]);

  const CONDITION_OPTIONS = useMemo(() => [
    { value: '',                      label: t.conditions.allConditions },
    { value: 'brand-new',             label: t.conditions.brandNew },
    { value: 'refurbished',           label: t.conditions.allRefurbished },
    { value: 'certified-refurbished', label: t.conditions.certified },
    { value: 'refurbished-grade-a',   label: t.conditions.gradeA },
    { value: 'refurbished-grade-b',   label: t.conditions.gradeB },
  ], [t]);

  const SORT_OPTIONS = useMemo(() => [
    { value: 'newest',     label: t.inventory.sortNewest },
    { value: 'stock-high', label: t.inventory.sortStockHigh },
    { value: 'stock-low',  label: t.inventory.sortStockLow },
    { value: 'brand',      label: t.inventory.sortBrand },
  ], [t]);

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
  if (featured) activeFilters.push({ key: 'featured', label: t.inventory.featured, clear: { featured: null } });
  if (inStock) activeFilters.push({ key: 'inStock', label: t.inventory.inStock, clear: { inStock: null } });
  if (refurbished) activeFilters.push({ key: 'refurbished', label: t.inventory.refurbished, clear: { refurbished: null } });
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
          <p className="inv-filter-heading">{t.inventory.brand}</p>
          <div className="inv-chip-scroll">
            <button
              type="button"
              onClick={() => pushParams({ brand: null })}
              className={chipClass(!brand)}
            >
              {t.inventory.allBrands}
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
          <p className="inv-filter-heading">{t.inventory.quickFilters}</p>
          <div className="inv-filter-row">
            <button type="button" onClick={() => toggleBool('featured', featured)} className={chipClass(featured)}>
              {t.inventory.featured}
            </button>
            <button type="button" onClick={() => toggleBool('inStock', inStock)} className={chipClass(inStock)}>
              {t.inventory.inStock}
            </button>
            <button type="button" onClick={() => toggleBool('refurbished', refurbished)} className={chipClass(refurbished)}>
              {t.inventory.refurbished}
            </button>
          </div>
        </div>

        <div className="inv-filter-block">
          <p className="inv-filter-heading">{t.inventory.productType}</p>
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
            <label htmlFor="inv-condition">{t.inventory.condition}</label>
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
            <label htmlFor="inv-sort">{t.inventory.sortBy}</label>
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
            {count} <span>{count === 1 ? t.common.product : t.common.products}</span>
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
              {t.common.clearAll}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
