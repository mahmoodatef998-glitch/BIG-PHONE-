import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';
import { Suspense } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import InventoryFilters from '@/components/inventory/InventoryFilters';
import { getProducts, getBrands, getProductsGroupedByBrand } from '@/lib/data';
import { parseProductFilters } from '@/lib/product-filters';
import type { Brand, Product } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Wholesale Mobile Phone Inventory | BIG PHONE',
  description: 'Browse wholesale inventory of brand new and refurbished iPhones, Samsung Galaxy, Xiaomi and more.',
};

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

  const brands = await getBrands();
  const isFiltered = !!(
    search || brand || filters.condition || filters.category ||
    refurbished || excludeBrand || featured || inStock || collection
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

  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>

      <div className="inv-page-header">
        <div className="container-site">
          <nav className="inv-breadcrumb">
            <Link href="/">Home</Link>
            <span style={{ margin: '0 0.375rem', color: '#D1D5DB' }}>›</span>
            <span>Inventory</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
            <h1 className="inv-page-title">Wholesale Inventory</h1>
            <span style={{ fontSize: '0.875rem', color: '#9CA3AF', fontWeight: 500 }}>
              {displayCount} products
            </span>
          </div>
          <form action="/inventory" method="get" className="inv-search-form">
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '0.875rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9CA3AF',
                pointerEvents: 'none',
              }}
            />
            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Search model or product name..."
              className="form-input"
            />
            <button type="submit" className="btn btn-primary btn-sm inv-search-btn">
              Search
            </button>
            {brand && <input type="hidden" name="brand" value={brand} />}
            {filters.condition && <input type="hidden" name="condition" value={filters.condition} />}
            {filters.category && <input type="hidden" name="category" value={filters.category} />}
            {refurbished && <input type="hidden" name="refurbished" value="1" />}
            {excludeBrand && <input type="hidden" name="excludeBrand" value={excludeBrand} />}
            {featured && <input type="hidden" name="featured" value="true" />}
            {inStock && <input type="hidden" name="inStock" value="1" />}
            {collection && <input type="hidden" name="collection" value={collection} />}
            {filters.sortBy && filters.sortBy !== 'newest' && (
              <input type="hidden" name="sort" value={filters.sortBy} />
            )}
          </form>
        </div>
      </div>

      <Suspense>
        <InventoryFilters count={displayCount} brands={brandTabs} />
      </Suspense>

      <div className="container-site section-sm">

        {isFiltered && (
          filteredProducts.length === 0
            ? <EmptyState search={search} />
            : (
              <>
                {featured && (
                  <ResultsHeading title="Featured Products" count={filteredProducts.length} />
                )}
                {brand && !featured && (
                  <ResultsHeading
                    title={brands.find(b => b.slug === brand)?.name ?? brand}
                    count={filteredProducts.length}
                  />
                )}
                <div className="inv-grid">
                  {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </>
            )
        )}

        {!isFiltered && (
          groupedBrands.length === 0
            ? <EmptyState search="" />
            : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem' }}>
                {groupedBrands.map(({ brand: b, products, total }) => (
                  <BrandSection key={b.slug} brand={b} products={products} total={total} />
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
}

function ResultsHeading({ title, count }: { title: string; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
      <div style={{ width: '4px', height: '24px', background: '#FF6B00', borderRadius: '2px', flexShrink: 0 }} />
      <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      <span style={{ color: '#9CA3AF', fontSize: '0.8125rem', fontWeight: 500 }}>
        · {count} products
      </span>
    </div>
  );
}

function BrandSection({ brand, products, total }: { brand: Brand; products: Product[]; total: number }) {
  const preview = products.slice(0, 4);
  return (
    <section aria-label={`${brand.name} products`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '4px', height: '32px', background: '#FF6B00', borderRadius: '2px', flexShrink: 0 }} />
          <div>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
              {brand.name}
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#9CA3AF', margin: '2px 0 0' }}>
              {total} {total === 1 ? 'product' : 'products'} available
            </p>
          </div>
        </div>
        {total > 4 && (
          <Link
            href={`/inventory?brand=${brand.slug}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#FF6B00',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            View all {total} <ChevronRight size={14} />
          </Link>
        )}
      </div>
      <div className="inv-grid">
        {preview.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function EmptyState({ search }: { search: string }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
      <div style={{
        width: '56px',
        height: '56px',
        background: '#FFF3E8',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.25rem',
      }}>
        <Search size={24} style={{ color: '#FF6B00' }} />
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
        No products found
      </h3>
      <p style={{ color: '#6B7280', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
        {search ? `No results for "${search}". Try different keywords.` : 'Try adjusting your filters.'}
      </p>
      <Link href="/inventory" className="btn btn-outline btn-pill">
        Clear filters
      </Link>
    </div>
  );
}
