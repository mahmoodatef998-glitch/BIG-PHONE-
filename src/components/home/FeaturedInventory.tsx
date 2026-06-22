'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import type { Product } from '@/types';

const FILTERS = [
  { key: '',             label: 'All' },
  { key: 'new',         label: 'New' },
  { key: 'used',        label: 'Used' },
  { key: 'refurbished', label: 'Refurbished' },
  { key: 'wholesale',   label: 'Wholesale' },
];

export default function FeaturedInventory({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');

  const visible = filter
    ? products.filter(p => p.condition === filter)
    : products;

  return (
    <section className="section">
      <div className="container-site">
        <div className="section-header">
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#6C5CE7', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>Featured</p>
            <h2 className="section-title">Popular Listings</h2>
          </div>
          <Link href="/inventory" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6C5CE7', textDecoration: 'none', whiteSpace: 'nowrap' }}>View All →</Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`filter-chip${filter === f.key ? ' filter-chip-active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF', fontSize: '0.875rem' }}>
            No products in this category yet.
          </div>
        ) : (
          <div className="inv-grid">
            {visible.slice(0, 12).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/inventory" className="btn btn-outline btn-lg btn-pill">
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
