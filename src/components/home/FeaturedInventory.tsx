import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import type { Product } from '@/types';

interface FeaturedInventoryProps {
  products: Product[];
}

export default function FeaturedInventory({ products }: FeaturedInventoryProps) {
  return (
    <section className="section">
      <div className="container-site">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Inventory</h2>
            <p className="section-subtitle">Latest stock available for wholesale — updated daily</p>
          </div>
          <Link href="/inventory" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: '#2563EB', textDecoration: 'none', flexShrink: 0 }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.875rem',
        }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/inventory" className="btn btn-outline btn-lg">
            View All Inventory
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { div > div:nth-child(2) { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 1024px) { div > div:nth-child(2) { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
    </section>
  );
}
