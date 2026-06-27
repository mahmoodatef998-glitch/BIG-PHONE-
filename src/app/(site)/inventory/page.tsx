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

const BRAND_ACCENT: Record<string, string> = {
  apple:   '#1C1C1E',
  samsung: '#1428A0',
  xiaomi:  '#FF6900',
  huawei:  '#CF0A2C',
  oppo:    '#1D3461',
  vivo:    '#415FFF',
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
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      <div style={{ background: '#fff', borderBottom: '1px solid #DDE3EA', padding: '1.25rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: '#0066FF', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.375rem', color: '#CBD5E1' }}>›</span>
            <span>Inventory</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0B1829', letterSpacing: '-0.025em', margin: 0 }}>
              Wholesale Inventory
            </h1>
            <span style={{ fontSize: '0.8125rem', color: '#94A3B8', fontWeight: 500 }}>{displayCount} products</span>
          </div>
          <form action="/inventory" method="get" style={{ position: 'relative', maxWidth: '520px' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            <input
              type="search" name="search" defaultValue={search}
              placeholder="Search model or product name..."
              className="form-input"
              style={{ paddingLeft: '2.5rem', paddingRight: '5rem', background: '#F8FAFC' }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute', right: '0.375rem', top: '50%', transform: 'translateY(-50%)',
                padding: '0.375rem 0.75rem', borderRadius: '0.375rem', border: 'none',
                background: '#0066FF', color: '#fff', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
              }}
            >
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

      <div className="container-site" style={{ padding: '1.5rem 1rem 4rem' }}>

        {isFiltered && (
          filteredProducts.length === 0
            ? <EmptyState search={search} />
            : (
              <>
                {featured && (
                  <ResultsHeading accent="#FF6B00" title="Featured Products" count={filteredProducts.length} />
                )}
                {brand && !featured && (
                  <ResultsHeading
                    accent={BRAND_ACCENT[brand] ?? '#0066FF'}
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

      <style>{`
        .inv-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem;
        }
        @media (min-width: 640px)  { .inv-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .inv-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1280px) { .inv-grid { grid-template-columns: repeat(5, 1fr); } }
      `}</style>
    </div>
  );
}

function ResultsHeading({ accent, title, count }: { accent: string; title: string; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
      <div style={{ width: '3px', height: '22px', background: accent, borderRadius: '2px' }} />
      <span style={{ fontWeight: 700, color: '#0B1829' }}>{title}</span>
      <span style={{ color: '#94A3B8', fontSize: '0.8125rem' }}>· {count} products</span>
    </div>
  );
}

function BrandSection({ brand, products, total }: { brand: Brand; products: Product[]; total: number }) {
  const accent  = BRAND_ACCENT[brand.slug] ?? '#0066FF';
  const preview = products.slice(0, 4);
  return (
    <section aria-label={`${brand.name} products`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '4px', height: '32px', background: accent, borderRadius: '2px', flexShrink: 0 }} />
          <div>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0B1829', margin: 0, letterSpacing: '-0.02em' }}>{brand.name}</h2>
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '2px 0 0' }}>{total} {total === 1 ? 'product' : 'products'} available</p>
          </div>
        </div>
        {total > 4 && (
          <Link
            href={`/inventory?brand=${brand.slug}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', fontWeight: 600, color: accent, textDecoration: 'none', flexShrink: 0 }}
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
    <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#fff', borderRadius: '12px', border: '1px solid #DDE3EA' }}>
      <div style={{ width: '56px', height: '56px', background: '#F1F5F9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
        <Search size={24} style={{ color: '#94a3b8' }} />
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0B1829', marginBottom: '0.5rem' }}>No products found</h3>
      <p style={{ color: '#64748B', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
        {search ? `No results for "${search}". Try different keywords.` : 'Try adjusting your filters.'}
      </p>
      <Link href="/inventory" className="btn btn-outline">Clear Filters</Link>
    </div>
  );
}
