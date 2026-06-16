'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import type { Product } from '@/types';

interface FeaturedInventoryProps {
  products: Product[];
}

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Brand New', value: 'new' },
  { label: 'Grade A', value: 'grade_a' },
  { label: 'Certified', value: 'certified' },
];

export default function FeaturedInventory({ products }: FeaturedInventoryProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? products
    : products.filter(p => {
        if (activeTab === 'new') return p.condition === 'new';
        if (activeTab === 'grade_a') return p.condition === 'grade_a' || p.condition === 'excellent';
        if (activeTab === 'certified') return p.condition === 'certified';
        return true;
      });

  return (
    <section className="section" style={{ background: '#F0F4F8' }}>
      <div className="container-site">
        {/* Section header */}
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Inventory</h2>
            <p className="section-subtitle">Latest stock available for wholesale — updated daily</p>
          </div>
          <Link
            href="/inventory"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              fontSize: '0.875rem', fontWeight: 600,
              color: '#0066FF', textDecoration: 'none', flexShrink: 0,
            }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tab filter bar */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.375rem 1rem',
                borderRadius: '9999px',
                border: `1.5px solid ${activeTab === tab.value ? '#0066FF' : '#DDE3EA'}`,
                background: activeTab === tab.value ? '#0066FF' : '#fff',
                color: activeTab === tab.value ? '#fff' : '#4B5563',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.875rem',
        }} className="featured-grid">
          {filtered.map((product) => (
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
        @media (min-width: 640px) { .featured-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 1024px) { .featured-grid { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
    </section>
  );
}
