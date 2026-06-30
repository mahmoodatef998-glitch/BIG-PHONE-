import type { Product, QuoteCartItem, RFQItem } from '@/types';

export const QUOTE_CART_STORAGE_KEY = 'bp-quote-cart';
export const MAX_QUOTE_CART_ITEMS = 500;

export function cartItemFromProduct(product: Product, quantity?: number): QuoteCartItem {
  return {
    product_id: product.id,
    slug: product.slug,
    name: product.name,
    quantity: Math.max(product.moq, quantity ?? product.moq),
    moq: product.moq,
    storage: product.storage,
    color: product.color,
    brand_name: product.brand?.name ?? null,
  };
}

export function cartItemKey(item: Pick<QuoteCartItem, 'slug'>): string {
  return item.slug;
}

export function formatCartItemLabel(item: Pick<RFQItem, 'name' | 'storage' | 'color'>): string {
  const parts = [item.name];
  if (item.storage && !item.name.includes(item.storage)) parts.push(item.storage);
  if (item.color && !item.name.includes(item.color)) parts.push(item.color);
  return parts.join(' · ');
}

export function summarizeCartItems(items: RFQItem[]): { product_interest: string; quantity: number } {
  const product_interest = items
    .map(i => `${formatCartItemLabel(i)} (×${i.quantity.toLocaleString('en-AE')})`)
    .join('; ');
  const quantity = items.reduce((sum, i) => sum + i.quantity, 0);
  return { product_interest, quantity };
}

export function parseStoredCart(raw: string | null): QuoteCartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((i): i is QuoteCartItem =>
        i != null &&
        typeof i === 'object' &&
        typeof (i as QuoteCartItem).slug === 'string' &&
        typeof (i as QuoteCartItem).name === 'string' &&
        typeof (i as QuoteCartItem).quantity === 'number',
      )
      .slice(0, MAX_QUOTE_CART_ITEMS);
  } catch {
    return [];
  }
}
