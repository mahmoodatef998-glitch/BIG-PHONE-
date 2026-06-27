import type { Product } from '@/types';

export interface StorageVariant {
  slug: string;
  storage: string;
  price_aed: number | null;
  show_price: boolean;
  stock_quantity: number;
  moq: number;
  name: string;
  color: string | null;
}

export interface ColorVariant {
  slug: string;
  color: string;
  price_aed: number | null;
  show_price: boolean;
  stock_quantity: number;
  moq: number;
  name: string;
  storage: string | null;
}

export function parseStorageGb(storage: string | null | undefined): number {
  if (!storage) return 0;
  const match = storage.match(/(\d+(?:\.\d+)?)\s*(TB|GB|MB)/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  if (unit === 'TB') return value * 1024;
  if (unit === 'GB') return value;
  if (unit === 'MB') return value / 1024;
  return 0;
}

export function sortByStorage(a: StorageVariant, b: StorageVariant): number {
  return parseStorageGb(a.storage) - parseStorageGb(b.storage);
}

export function productToStorageVariant(product: Product): StorageVariant {
  return {
    slug: product.slug,
    storage: product.storage ?? '',
    price_aed: product.price_aed ?? null,
    show_price: product.show_price ?? true,
    stock_quantity: product.stock_quantity,
    moq: product.moq,
    name: product.name,
    color: product.color,
  };
}

export function productToColorVariant(product: Product): ColorVariant {
  return {
    slug: product.slug,
    color: product.color ?? '',
    price_aed: product.price_aed ?? null,
    show_price: product.show_price ?? true,
    stock_quantity: product.stock_quantity,
    moq: product.moq,
    name: product.name,
    storage: product.storage,
  };
}

export function variantGroupKey(product: Pick<Product, 'brand_id' | 'model' | 'condition'>): string {
  return `${product.brand_id}|${product.model}|${product.condition}`;
}

/** One entry per storage size; prefers slug matching `preferColor` when set. */
export function buildStorageVariants(products: Product[], preferColor?: string | null): StorageVariant[] {
  const byStorage = new Map<string, Product>();

  for (const product of products) {
    if (!product.storage || !product.is_active) continue;
    const key = product.storage;
    const existing = byStorage.get(key);
    if (!existing) {
      byStorage.set(key, product);
      continue;
    }
    if (preferColor && product.color === preferColor && existing.color !== preferColor) {
      byStorage.set(key, product);
    }
  }

  return Array.from(byStorage.values())
    .map(productToStorageVariant)
    .sort(sortByStorage);
}

/** Unique colors for the same model/condition/storage group. */
export function buildColorVariants(products: Product[], storage?: string | null): ColorVariant[] {
  const byColor = new Map<string, Product>();

  for (const product of products) {
    if (!product.color || !product.is_active) continue;
    if (storage && product.storage !== storage) continue;
    if (!byColor.has(product.color)) {
      byColor.set(product.color, product);
    }
  }

  return Array.from(byColor.values())
    .map(productToColorVariant)
    .sort((a, b) => a.color.localeCompare(b.color));
}

export function findSiblingSlug(
  products: Product[],
  opts: { model: string; condition: string; brand_id: string; storage?: string | null; color?: string | null },
): string | null {
  const match = products.find(p =>
    p.is_active &&
    p.brand_id === opts.brand_id &&
    p.model === opts.model &&
    p.condition === opts.condition &&
    (opts.storage == null || p.storage === opts.storage) &&
    (opts.color == null || p.color === opts.color),
  );
  return match?.slug ?? null;
}
