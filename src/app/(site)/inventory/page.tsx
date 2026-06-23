import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Suspense } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import InventoryFilters from '@/components/inventory/InventoryFilters';
import { getProducts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Wholesale Mobile Phone Inventory | BIG PHONE',
  description: 'Browse wholesale inventory of brand new and refurbished iPhones, Samsung Galaxy, Xiaomi and more.',
};

export default async function InventoryPage(props: {
  searchParams: Promise<{ search?: string; brand?: string; condition?: string; category?: string; sort?: string }>;
}) {
  const sp        = await props.searchParams;
  const search    = sp.search    ?? '';
  const brand     = sp.brand     ?? '';
  const condition = sp.condition ?? '';
  const category  = sp.category  ?? '';

  const products = await getProducts({
    ...(brand     && { brand }),
    ...(condition && { condition }),
    ...(search    && { search }),
    ...(category  && { category }),
  });

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #DDE3EA', padding: '1.25rem 0' }}>
        <div className="container-site">
          <div style={{ marginBottom: '1rem' }}>
            <nav style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
              <Link href="/" style={{ color: '#0066FF', textDecoration: 'none' }}>Home</Link>
              <span style={{ margin: '0 0.375rem', color: '#CBD5E1' }}>›</span>
              <span>Inventory</span>
            </nav>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0B1829', letterSpacing: '-0.025em', margin: 0 }}>
              Wholesale Inventory
            </h1>
          </div>

          {/* Search */}
          <form style={{ position: 'relative', maxWidth: '520px' }}>
            <Search size={15} style={{
              position: 'absolute', left: '0.875rem', top: '50%',
              transform: 'translateY(-50%)', color: '#94a3b8',
            }} />
            <input
              type="search" name="search"
              defaultValue={search}
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

      {/* Horizontal filter bar */}
      <Suspense>
        <InventoryFilters count={products.length} />
      </Suspense>

      {/* Product grid */}
      <div className="container-site" style={{ padding: '1.5rem 1rem 4rem' }}>
        {products.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '5rem 1rem',
            background: '#fff', borderRadius: '12px',
            border: '1px solid #DDE3EA',
          }}>
            <div style={{
              width: '56px', height: '56px',
              background: '#F1F5F9', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}>
              <Search size={24} style={{ color: '#94a3b8' }} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0B1829', marginBottom: '0.5rem' }}>
              No products found
            </h3>
            <p style={{ color: '#64748B', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
              Try adjusting your filters or search term.
            </p>
            <Link href="/inventory" className="btn btn-outline">Clear Filters</Link>
          </div>
        ) : (
          <div className="inv-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
