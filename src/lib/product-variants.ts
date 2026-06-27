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

export function variantGroupKey(product: Pick<Product, 'brand_id' | 'model' | 'condition'>): string {
  return `${product.brand_id}|${product.model}|${product.condition}`;
}

export function buildStorageVariants(products: Product[]): StorageVariant[] {
  return products
    .filter(p => p.storage && p.is_active)
    .map(productToStorageVariant)
    .sort(sortByStorage);
}
