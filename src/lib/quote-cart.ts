import type { Product, QuoteCartItem, RFQItem } from '@/types';
import { coercePrice, getProductPricing } from '@/lib/pricing';

export const QUOTE_CART_STORAGE_KEY = 'bp-quote-cart';
export const MAX_QUOTE_CART_ITEMS = 500;

export function cartItemFromProduct(product: Product, quantity?: number): QuoteCartItem {
  const pricing = getProductPricing(product);
  return {
    product_id: product.id,
    slug: product.slug,
    name: product.name,
    quantity: Math.max(product.moq, quantity ?? product.moq),
    moq: product.moq,
    storage: product.storage,
    color: product.color,
    brand_name: product.brand?.name ?? null,
    unit_price_aed: pricing.showPrice ? pricing.display : null,
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

export function getCartLineTotal(item: Pick<RFQItem, 'quantity' | 'unit_price_aed'>): number | null {
  const unit = coercePrice(item.unit_price_aed);
  if (unit == null) return null;
  return Math.round(unit * item.quantity * 100) / 100;
}

export function computeCartEstimatedTotal(
  items: Pick<RFQItem, 'quantity' | 'unit_price_aed'>[],
): number | null {
  let total = 0;
  let hasAnyPrice = false;

  for (const item of items) {
    const lineTotal = getCartLineTotal(item);
    if (lineTotal == null) continue;
    hasAnyPrice = true;
    total += lineTotal;
  }

  return hasAnyPrice ? Math.round(total * 100) / 100 : null;
}

export function countPricedCartItems(items: Pick<RFQItem, 'unit_price_aed'>[]): number {
  return items.filter(i => coercePrice(i.unit_price_aed) != null).length;
}

type ProductPricingInput = Pick<Product, 'slug' | 'price_aed' | 'sale_price_aed' | 'show_price'>;

export function enrichItemsWithPricing(
  items: RFQItem[],
  products: ProductPricingInput[],
): { items: RFQItem[]; estimated_total_aed: number | null } {
  const bySlug = new Map(products.map(p => [p.slug, p]));

  const enriched = items.map(item => {
    const product = bySlug.get(item.slug);
    if (!product) return item;

    const pricing = getProductPricing(product);
    return {
      ...item,
      unit_price_aed: pricing.showPrice ? pricing.display : null,
    };
  });

  return {
    items: enriched,
    estimated_total_aed: computeCartEstimatedTotal(enriched),
  };
}

export function summarizeCartItems(items: RFQItem[]): {
  product_interest: string;
  quantity: number;
  estimated_total_aed: number | null;
} {
  const product_interest = items
    .map(i => `${formatCartItemLabel(i)} (×${i.quantity.toLocaleString('en-AE')})`)
    .join('; ');
  const quantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const estimated_total_aed = computeCartEstimatedTotal(items);

  return { product_interest, quantity, estimated_total_aed };
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
