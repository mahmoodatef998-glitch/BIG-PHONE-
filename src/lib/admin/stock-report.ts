import type { Collection, Product } from '@/types';
import { formatPriceAed, getProductPricing } from '@/lib/pricing';
import { formatCondition } from '@/lib/utils';
import { downloadCsv } from '@/lib/admin/export-csv';

function stockStatus(product: Product): string {
  if (product.stock_quantity === 0) return 'Out of Stock';
  if (product.stock_quantity < product.moq) return 'Low Stock';
  return 'In Stock';
}

function sectionName(product: Product, collections: Collection[]): string {
  const collectionId = (product as Product & { collection_id?: string | null }).collection_id;
  if (!collectionId) return '';
  return collections.find(c => c.id === collectionId)?.name ?? '';
}

export function buildStockReportRows(products: Product[], collections: Collection[]): unknown[][] {
  return products.map(p => {
    const pricing = getProductPricing(p);
    const displayPrice = pricing.display;
    const stockValue = displayPrice != null ? p.stock_quantity * displayPrice : null;

    return [
      p.id,
      p.slug,
      p.name,
      p.model,
      p.brand?.name ?? '',
      p.category,
      p.subcategory ?? '',
      sectionName(p, collections),
      formatCondition(p.condition),
      p.storage ?? '',
      p.color ?? '',
      p.stock_quantity,
      p.moq,
      stockStatus(p),
      p.battery_health ?? '',
      p.warranty ?? '',
      p.country_of_origin,
      pricing.original != null ? formatPriceAed(pricing.original) : '',
      pricing.hasDiscount && pricing.sale != null ? formatPriceAed(pricing.sale) : '',
      stockValue != null ? formatPriceAed(stockValue) : '',
      p.is_featured ? 'Yes' : 'No',
      p.is_active ? 'Yes' : 'No',
      new Date(p.updated_at).toLocaleString('en-AE', { dateStyle: 'medium', timeStyle: 'short' }),
    ];
  });
}

const STOCK_REPORT_HEADERS = [
  'Product ID',
  'Slug',
  'Name',
  'Model',
  'Brand',
  'Category',
  'Subcategory',
  'Section',
  'Condition',
  'Storage',
  'Color',
  'Stock Qty',
  'MOQ',
  'Stock Status',
  'Battery Health %',
  'Warranty',
  'Country of Origin',
  'Price (AED)',
  'Sale Price (AED)',
  'Stock Value (AED)',
  'Featured',
  'Active',
  'Last Updated',
];

export function exportStockReportCsv(
  products: Product[],
  collections: Collection[],
  filenamePrefix = 'stock-report',
): void {
  const date = new Date().toISOString().split('T')[0];
  downloadCsv(
    `${filenamePrefix}-${date}.csv`,
    STOCK_REPORT_HEADERS,
    buildStockReportRows(products, collections),
  );
}
