/** Coerce Supabase numeric / form strings to a stable 2-decimal AED amount. */
export function coercePrice(value: number | string | null | undefined): number | null {
  if (value == null || value === '') return null;
  const n = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, ''));
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100) / 100;
}

/** Format AED amounts consistently (fixes float drift like 2499.999 → 2,500). */
export function formatPriceAed(value: number | string | null | undefined): string {
  const n = coercePrice(value);
  if (n == null) return '';
  const isWhole = Math.abs(n - Math.round(n)) < 0.001;
  return n.toLocaleString('en-AE', {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function parsePriceInput(value: string): number | null {
  return coercePrice(value.trim());
}

export interface ProductPricing {
  original: number | null;
  sale: number | null;
  display: number | null;
  hasDiscount: boolean;
  discountPercent: number | null;
  showPrice: boolean;
}

export function getProductPricing(input: {
  price_aed?: number | null;
  sale_price_aed?: number | null;
  show_price?: boolean;
}): ProductPricing {
  const original = coercePrice(input.price_aed);
  const sale = coercePrice(input.sale_price_aed);
  const showPriceFlag = input.show_price !== false;
  const hasDiscount = Boolean(
    showPriceFlag &&
    original != null &&
    sale != null &&
    sale > 0 &&
    sale < original,
  );
  const display = hasDiscount ? sale : (original ?? sale);
  const showPrice = showPriceFlag && display != null && display > 0;

  let discountPercent: number | null = null;
  if (hasDiscount && original != null && sale != null) {
    discountPercent = Math.round(((original - sale) / original) * 100);
  }

  return { original, sale, display, hasDiscount, discountPercent, showPrice };
}
