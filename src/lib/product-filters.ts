import type { Product } from '@/types';

export const REFURB_CONDITIONS = [
  'refurbished-grade-a',
  'refurbished-grade-b',
  'certified-refurbished',
] as const;

export type ProductQueryFilters = {
  brand?: string;
  excludeBrand?: string;
  condition?: string;
  conditions?: string[];
  refurbished?: boolean;
  category?: string;
  collection?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
  sortBy?: 'newest' | 'stock-high' | 'stock-low' | 'brand' | 'model';
};

export function applyProductSort(
  products: Product[],
  sortBy: ProductQueryFilters['sortBy'] = 'newest',
): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case 'stock-high':
      return sorted.sort((a, b) => b.stock_quantity - a.stock_quantity);
    case 'stock-low':
      return sorted.sort((a, b) => a.stock_quantity - b.stock_quantity);
    case 'brand':
      return sorted.sort((a, b) =>
        (a.brand?.name ?? '').localeCompare(b.brand?.name ?? '') ||
        a.model.localeCompare(b.model),
      );
    case 'model':
      return sorted.sort((a, b) => a.model.localeCompare(b.model));
    default:
      return sorted;
  }
}

export function parseProductFilters(
  params: URLSearchParams | Record<string, string | undefined>,
): ProductQueryFilters {
  const get = (key: string) => {
    if (params instanceof URLSearchParams) return params.get(key) ?? undefined;
    return params[key] || undefined;
  };

  const conditionsRaw = get('conditions');
  const conditions = conditionsRaw
    ? conditionsRaw.split(',').map(s => s.trim()).filter(Boolean)
    : undefined;

  const refurbishedVal = get('refurbished');
  const refurbished = refurbishedVal === '1' || refurbishedVal === 'true';

  const limitRaw = get('limit');
  const limit = limitRaw ? Math.min(Math.max(1, Number(limitRaw)), 100) : undefined;

  const sortRaw = get('sort');
  const validSort = ['newest', 'stock-high', 'stock-low', 'brand', 'model'] as const;
  const sortBy: ProductQueryFilters['sortBy'] =
    sortRaw && (validSort as readonly string[]).includes(sortRaw)
      ? (sortRaw as ProductQueryFilters['sortBy'])
      : 'newest';

  return {
    brand: get('brand'),
    excludeBrand: get('excludeBrand'),
    condition: get('condition'),
    conditions,
    refurbished: refurbished || undefined,
    category: get('category'),
    collection: get('collection'),
    featured: get('featured') === 'true' ? true : undefined,
    search: get('search'),
    limit: Number.isFinite(limit) ? limit : undefined,
    sortBy,
  };
}

export function applyProductFilters(products: Product[], filters: ProductQueryFilters): Product[] {
  let result = products.filter(p => p.is_active);

  if (filters.brand) {
    result = result.filter(p => p.brand?.slug === filters.brand);
  }
  if (filters.excludeBrand) {
    result = result.filter(p => p.brand?.slug !== filters.excludeBrand);
  }
  if (filters.refurbished) {
    result = result.filter(p => REFURB_CONDITIONS.includes(p.condition as typeof REFURB_CONDITIONS[number]));
  } else if (filters.conditions?.length) {
    result = result.filter(p => filters.conditions!.includes(p.condition));
  } else if (filters.condition) {
    result = result.filter(p => p.condition === filters.condition);
  }
  if (filters.category) {
    result = result.filter(p => p.category === filters.category);
  }
  if (filters.collection) {
    result = result.filter(p => p.collection_id === filters.collection);
  }
  if (filters.featured) {
    result = result.filter(p => p.is_featured);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      (p.brand?.name.toLowerCase().includes(q) ?? false),
    );
  }

  result = applyProductSort(result, filters.sortBy);
  if (filters.limit) result = result.slice(0, filters.limit);
  return result;
}
