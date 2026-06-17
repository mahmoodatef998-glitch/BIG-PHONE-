'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Search, ChevronDown } from 'lucide-react';
import type { Product, Brand } from '@/types';
import { ConditionBadge, StockBadge } from '@/components/ui/Badge';
import { createClient } from '@/lib/supabase/client';
import ProductEditDrawer from './ProductEditDrawer';

interface Props {
  products: Product[];
  brands: Brand[];
}

const CONDITION_LABELS: Record<string, string> = {
  'brand-new': 'Brand New',
  'refurbished-grade-a': 'Grade A',
  'refurbished-grade-b': 'Grade B',
  'certified-refurbished': 'Certified',
};

export default function ProductsClient({ products, brands }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || p.model.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
      const matchBrand = !brandFilter || p.brand?.slug === brandFilter;
      const matchCond = !conditionFilter || p.condition === conditionFilter;
      return matchSearch && matchBrand && matchCond;
    });
  }, [products, search, brandFilter, conditionFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from('products').delete().eq('id', id);
    router.refresh();
    setDeletingId(null);
  };

  return (
    <>
      <div style={{ padding: '2rem' }}>

        {/* ── Page header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Products</h1>
            <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {filtered.length} of {products.length} products
            </p>
          </div>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.625rem 1.125rem', background: '#2563EB', color: '#fff',
              border: 'none', borderRadius: '0.5rem', fontWeight: 600,
              fontSize: '0.875rem', cursor: 'pointer', flexShrink: 0,
              transition: 'background 0.15s',
            }}
            onClick={() => alert('Add product form coming soon')}
          >
            <Plus size={15} /> Add Product
          </button>
        </div>

        {/* ── Filter bar ── */}
        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem',
          padding: '0.875rem 1.25rem', marginBottom: '1.25rem',
          display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            <input
              type="search"
              placeholder="Search by model or name…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search products"
              style={{
                width: '100%', padding: '0.5rem 0.875rem 0.5rem 2.25rem',
                border: '1px solid #E2E8F0', borderRadius: '0.5rem',
                fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
                color: '#0F172A',
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <select
              value={brandFilter}
              onChange={e => setBrandFilter(e.target.value)}
              aria-label="Filter by brand"
              style={{ padding: '0.5rem 2rem 0.5rem 0.875rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#374151', appearance: 'none', cursor: 'pointer', outline: 'none', background: '#fff' }}
            >
              <option value="">All Brands</option>
              {brands.map(b => <option key={b.id} value={b.slug}>{b.name}</option>)}
            </select>
            <ChevronDown size={13} style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
          </div>

          <div style={{ position: 'relative' }}>
            <select
              value={conditionFilter}
              onChange={e => setConditionFilter(e.target.value)}
              aria-label="Filter by condition"
              style={{ padding: '0.5rem 2rem 0.5rem 0.875rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#374151', appearance: 'none', cursor: 'pointer', outline: 'none', background: '#fff' }}
            >
              <option value="">All Conditions</option>
              {Object.entries(CONDITION_LABELS).map(([val, lbl]) => (
                <option key={val} value={val}>{lbl}</option>
              ))}
            </select>
            <ChevronDown size={13} style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
          </div>

          {(search || brandFilter || conditionFilter) && (
            <button
              onClick={() => { setSearch(''); setBrandFilter(''); setConditionFilter(''); }}
              style={{ fontSize: '0.8125rem', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            >
              Clear
            </button>
          )}
        </div>

        {/* ── Products table ── */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                  {['Product', 'Brand', 'Condition', 'Storage', 'Stock', 'MOQ', 'Featured', ''].map(col => (
                    <th key={col} style={{
                      padding: '0.75rem 1rem', textAlign: 'left',
                      fontSize: '0.6875rem', fontWeight: 700, color: '#64748B',
                      textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap',
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
                      No products match your filters.
                    </td>
                  </tr>
                ) : filtered.map((product, i) => (
                  <tr
                    key={product.id}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Product name + thumbnail */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '40px', height: '40px', flexShrink: 0,
                          borderRadius: '0.375rem', overflow: 'hidden',
                          border: '1px solid #E2E8F0', background: '#F8FAFC',
                        }}>
                          {product.images[0] ? (
                            <img src={product.images[0]} alt={product.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '18px' }}>□</div>
                          )}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {product.model}
                          </div>
                          <Link href={`/products/${product.slug}`} target="_blank" style={{ fontSize: '0.75rem', color: '#2563EB', textDecoration: 'none' }}>
                            View →
                          </Link>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>
                      {product.brand?.name ?? '—'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <ConditionBadge condition={product.condition} />
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                      {product.storage ?? '—'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <StockBadge quantity={product.stock_quantity} />
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                      {product.moq}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center',
                        fontSize: '0.75rem', fontWeight: 600,
                        color: product.is_featured ? '#16a34a' : '#94a3b8',
                      }}>
                        {product.is_featured ? 'Yes' : 'No'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setEditingProduct(product)}
                          aria-label={`Edit ${product.model}`}
                          style={{
                            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: '#eff6ff', color: '#2563EB', border: '1px solid #bfdbfe',
                            borderRadius: '0.375rem', cursor: 'pointer', transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#dbeafe')}
                          onMouseLeave={e => (e.currentTarget.style.background = '#eff6ff')}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          aria-label={`Delete ${product.model}`}
                          disabled={deletingId === product.id}
                          style={{
                            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
                            borderRadius: '0.375rem', cursor: 'pointer', transition: 'background 0.15s',
                            opacity: deletingId === product.id ? 0.5 : 1,
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#fee2e2')}
                          onMouseLeave={e => (e.currentTarget.style.background = '#fef2f2')}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
              Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Click edit to manage images and details
            </span>
          </div>
        </div>
      </div>

      {/* Edit Drawer */}
      <ProductEditDrawer
        product={editingProduct}
        brands={brands}
        onClose={() => setEditingProduct(null)}
      />
    </>
  );
}
