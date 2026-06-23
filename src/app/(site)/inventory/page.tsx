import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';
import { Suspense } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import InventoryFilters from '@/components/inventory/InventoryFilters';
import { getProducts, getBrands, getProductsGroupedByBrand } from '@/lib/data';
import type { Brand, Product } from '@/types';

export const dynamic = 'force-dynamic';

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
  searchParams: Promise<{ search?: string; brand?: string; condition?: string; category?: string }>;
}) {
  const sp        = await props.searchParams;
  const search    = sp.search    ?? '';
  const brand     = sp.brand     ?? '';
  const condition = sp.condition ?? '';
  const category  = sp.category  ?? '';

  const brands    = await getBrands();
  const isFiltered = !!(search || brand || condition || category);

  const [filteredProducts, groupedBrands] = await Promise.all([
    isFiltered
      ? getProducts({
          ...(brand     && { brand }),
          ...(condition && { condition }),
          ...(search    && { search }),
          ...(category  && { category }),
        })
      : Promise.resolve([] as Product[]),
    !isFiltered
      ? getProductsGroupedByBrand()
      : Promise.resolve([] as { brand: Brand; products: Product[]; total: number }[]),
  ]);

  const displayCount = isFiltered
    ? filteredProducts.length
    : groupedBrands.reduce((s, g) => s + g.total, 0);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Page header */}
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
          <form style={{ position: 'relative', maxWidth: '520px' }}>
            <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            <input
              type="search" name="search" defaultValue={search}
              placeholder="Search iPhone 15, Galaxy S24, Xiaomi 14..."
              className="form-input"
              style={{ paddingLeft: '2.5rem', background: '#F8FAFC' }}
            />
            {brand     && <input type="hidden" name="brand"     value={brand} />}
            {condition && <input type="hidden" name="condition" value={condition} />}
            {category  && <input type="hidden" name="category"  value={category} />}
          </form>
        </div>
      </div>

      {/* Brand tabs */}
      <div style={{ background: '#fff', borderBottom: '1px solid #DDE3EA' }}>
        <div className="container-site" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', minWidth: 'max-content' }}>
            {[{ slug: '', name: 'All Brands' }, ...brands].map(tab => {
              const isActive = brand === tab.slug;
              const accent   = BRAND_ACCENT[tab.slug] ?? '#0066FF';
              const params   = new URLSearchParams();
              if (tab.slug) params.set('brand', tab.slug);
              if (condition) params.set('condition', condition);
              if (category)  params.set('category',  category);
              if (search)    params.set('search',     search);
              return (
                <Link
                  key={tab.slug}
                  href={`/inventory${params.toString() ? `?${params.toString()}` : ''}`}
                  style={{
                    display: 'flex', alignItems: 'center',
                    padding: '0.75rem 1rem',
                    fontSize: '0.8125rem', fontWeight: 600,
                    color: isActive ? accent : '#64748B',
                    borderBottom: `2px solid ${isActive ? accent : 'transparent'}`,
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Condition / category filter bar */}
      <Suspense>
        <InventoryFilters count={displayCount} />
      </Suspense>

      {/* Content */}
      <div className="container-site" style={{ padding: '1.5rem 1rem 4rem' }}>

        {/* Filtered: flat grid */}
        {isFiltered && (
          filteredProducts.length === 0
            ? <EmptyState search={search} />
            : (
              <>
                {brand && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: '3px', height: '22px', background: BRAND_ACCENT[brand] ?? '#0066FF', borderRadius: '2px' }} />
                    <span style={{ fontWeight: 700, color: '#0B1829' }}>
                      {brands.find(b => b.slug === brand)?.name}
                    </span>
                    <span style={{ color: '#94A3B8', fontSize: '0.8125rem' }}>· {filteredProducts.length} products</span>
                  </div>
                )}
                <div className="inv-grid">
                  {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </>
            )
        )}

        {/* Unfiltered: brand sections */}
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
