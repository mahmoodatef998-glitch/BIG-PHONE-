'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Smartphone, Tablet, Headphones, Layers } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import type { Product } from '@/types';

interface FeaturedInventoryProps {
  products: Product[];
}

const TABS = [
  { label: 'All Products', value: 'all', icon: Layers },
  { label: 'Smartphones', value: 'smartphone', icon: Smartphone },
  { label: 'Tablets', value: 'tablet', icon: Tablet },
  { label: 'Accessories & Audio', value: 'accessories', icon: Headphones },
];

function tabCount(products: Product[], value: string) {
  if (value === 'all') return products.length;
  if (value === 'accessories') return products.filter(p => p.category === 'accessory' || p.category === 'airpods').length;
  return products.filter(p => p.category === value).length;
}

export default function FeaturedInventory({ products }: FeaturedInventoryProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = products.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'accessories') return p.category === 'accessory' || p.category === 'airpods';
    return p.category === activeTab;
  });

  return (
    <section className="section" style={{ background: '#F0F4F8' }}>
      <div className="container-site">

        {/* Section header */}
        <div className="section-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Featured Inventory</h2>
              <span style={{
                background: '#ECFDF5', color: '#059669',
                border: '1px solid #A7F3D0',
                fontSize: '0.6875rem', fontWeight: 700,
                padding: '0.125rem 0.5rem', borderRadius: '9999px',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                flexShrink: 0,
              }}>
                Daily Updated
              </span>
            </div>
            <p className="section-subtitle">
              Handpicked wholesale stock &mdash; smartphones, tablets &amp; accessories
            </p>
          </div>
          <Link href="/inventory" style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            fontSize: '0.875rem', fontWeight: 600,
            color: '#0066FF', textDecoration: 'none', flexShrink: 0,
          }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {TABS.map(tab => {
            const count = tabCount(products, tab.value);
            const Icon = tab.icon;
            const active = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.5rem 1rem', borderRadius: '9999px',
                  border: `1.5px solid ${active ? '#0066FF' : '#DDE3EA'}`,
                  background: active ? '#0066FF' : '#fff',
                  color: active ? '#fff' : '#4B5563',
                  fontSize: '0.8125rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={14} />
                {tab.label}
                <span style={{
                  background: active ? 'rgba(255,255,255,0.2)' : '#E8EDF3',
                  color: active ? '#fff' : '#6B7280',
                  fontSize: '0.6875rem', fontWeight: 700,
                  padding: '0.125rem 0.4rem', borderRadius: '9999px',
                  minWidth: '20px', textAlign: 'center',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.875rem' }}
            className="featured-grid"
          >
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
            No products in this category yet &mdash; check back soon.
          </div>
        )}

        {/* View All CTA */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/inventory" className="btn btn-outline btn-lg" style={{ gap: '0.5rem' }}>
            View Full Inventory
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px)  { .featured-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 1024px) { .featured-grid { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
    </section>
  );
}
