import type { Metadata } from 'next';
import { getServerLang } from '@/lib/server-lang';
import { inventoryMetadata } from '@/lib/page-metadata';
import { Suspense } from 'react';
import InventoryFilters from '@/components/inventory/InventoryFilters';
import {
  InventoryPageHeader,
  InventoryResultsHeading,
  InventoryBrandSection,
  InventoryEmptyState,
  InventoryProductGrid,
} from '@/components/inventory/InventoryPageClient';
import { getProducts, getBrands, getProductsGroupedByBrand } from '@/lib/data';
import { parseProductFilters } from '@/lib/product-filters';
import type { Brand, Product } from '@/types';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return inventoryMetadata(lang);
}

function sortHeadingKey(sort?: string): 'newArrivals' | 'stockHigh' | 'stockLow' | 'brandSort' | null {
  switch (sort) {
    case 'newest': return 'newArrivals';
    case 'stock-high': return 'stockHigh';
    case 'stock-low': return 'stockLow';
    case 'brand': return 'brandSort';
    default: return null;
  }
}

export default async function InventoryPage(props: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await props.searchParams;
  const filters = parseProductFilters(sp);
  const search = filters.search ?? '';
  const brand = filters.brand ?? '';
  const refurbished = filters.refurbished ?? false;
  const excludeBrand = filters.excludeBrand ?? '';
  const featured = filters.featured ?? false;
  const inStock = filters.inStock ?? false;
  const collection = sp.collection ?? '';
  const explicitSort = sp.sort;

  const brands = await getBrands();
  const isFiltered = !!(
    search || brand || filters.condition || filters.category ||
    refurbished || excludeBrand || featured || inStock || collection || explicitSort
  );

  const [filteredProducts, groupedBrands] = await Promise.all([
    isFiltered ? getProducts(filters) : Promise.resolve([] as Product[]),
    !isFiltered
      ? getProductsGroupedByBrand()
      : Promise.resolve([] as { brand: Brand; products: Product[]; total: number }[]),
  ]);

  const displayCount = isFiltered
    ? filteredProducts.length
    : groupedBrands.reduce((s, g) => s + g.total, 0);

  const brandTabs = brands.map(b => ({ slug: b.slug, name: b.name }));
  const brandRecord = brand ? brands.find(b => b.slug === brand) : undefined;

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      <InventoryPageHeader
        search={search}
        displayCount={displayCount}
        filterFields={{
          brand: brand || undefined,
          condition: filters.condition,
          category: filters.category,
          refurbished: refurbished || undefined,
          excludeBrand: excludeBrand || undefined,
          featured: featured || undefined,
          inStock: inStock || undefined,
          collection: collection || undefined,
          explicitSort,
        }}
      />

      <Suspense>
        <InventoryFilters count={displayCount} brands={brandTabs} />
      </Suspense>

      <div className="container-site section-sm">
        {isFiltered && (
          filteredProducts.length === 0
            ? <InventoryEmptyState search={search} />
            : (
              <>
                {featured && (
                  <InventoryResultsHeading titleKey="featured" count={filteredProducts.length} />
                )}
                {!featured && brand && (
                  <InventoryResultsHeading
                    title={brandRecord?.name ?? brand}
                    count={filteredProducts.length}
                  />
                )}
                {!featured && !brand && explicitSort && sortHeadingKey(explicitSort) && (
                  <InventoryResultsHeading
                    titleKey={sortHeadingKey(explicitSort)!}
                    count={filteredProducts.length}
                  />
                )}
                <InventoryProductGrid products={filteredProducts} />
              </>
            )
        )}

        {!isFiltered && (
          groupedBrands.length === 0
            ? <InventoryEmptyState search="" />
            : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem' }}>
                {groupedBrands.map(({ brand: b, products, total }) => (
                  <InventoryBrandSection key={b.slug} brand={b} products={products} total={total} />
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
}
