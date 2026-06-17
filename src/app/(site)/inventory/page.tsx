import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Suspense } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import InventoryFilters from '@/components/inventory/InventoryFilters';
import { getProducts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Wholesale Mobile Phone Inventory',
  description: 'Browse our complete inventory of refurbished and brand new iPhones, Samsung, Xiaomi and more. Filter by brand, condition, storage and availability.',
};

export default async function InventoryPage(props: {
  searchParams: Promise<{ search?: string; brand?: string; condition?: string; storage?: string; sort?: string; category?: string }>;
}) {
  const sp = await props.searchParams;
  const search = sp.search ?? '';
  const brand = sp.brand ?? '';
  const condition = sp.condition ?? '';
  const category = sp.category ?? '';

  const products = await getProducts({
    ...(brand && { brand }),
    ...(condition && { condition }),
    ...(search && { search }),
    ...(category && { category }),
  });

  return (
    <div>
      {/* Header bar */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '1.5rem 0' }}>
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <nav style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '0.25rem' }}>
                <Link href="/" style={{ color: '#2563EB' }}>Home</Link> / Inventory
              </nav>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>
                Mobile Inventory
              </h1>
            </div>
            <span style={{ fontSize: '0.875rem', color: '#64748B', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.375rem', padding: '0.375rem 0.75rem' }}>
              {products.length} products
            </span>
          </div>

          {/* Search bar */}
          <div style={{ marginTop: '1rem', position: 'relative', maxWidth: '480px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <form>
              <input
                type="search"
                name="search"
                defaultValue={search}
                placeholder="Search iPhone 15, Galaxy S24, Xiaomi 14..."
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              {brand && <input type="hidden" name="brand" value={brand} />}
              {condition && <input type="hidden" name="condition" value={condition} />}
            </form>
          </div>
        </div>
      </div>

      <div className="container-site" style={{ padding: '2rem 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          alignItems: 'start',
        }}>
          {/* Filters sidebar */}
          <aside style={{
            background: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '0.75rem',
            padding: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <SlidersHorizontal size={16} style={{ color: '#374151' }} />
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>Filters</h3>
            </div>
            <Suspense>
              <InventoryFilters />
            </Suspense>
          </aside>

          {/* Product grid */}
          <main>
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>No products found</h3>
                <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>Try adjusting your filters or search term.</p>
                <Link href="/inventory" className="btn btn-outline">Clear Filters</Link>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.875rem',
              }}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .inventory-layout { grid-template-columns: 240px 1fr !important; }
          .inventory-layout > main > div { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .inventory-layout { grid-template-columns: 260px 1fr !important; }
          .inventory-layout > main > div { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
