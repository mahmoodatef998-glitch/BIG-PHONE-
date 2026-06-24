'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Search, ChevronDown, AlertTriangle, Copy } from 'lucide-react';
import type { Product, Brand, Collection } from '@/types';
import { ConditionBadge, StockBadge } from '@/components/ui/Badge';
import ProductEditDrawer from './ProductEditDrawer';

interface Props {
  products: Product[];
  brands: Brand[];
  collections: Collection[];
}

const CONDITION_LABELS: Record<string, string> = {
  'brand-new': 'Brand New',
  'refurbished-grade-a': 'Grade A',
  'refurbished-grade-b': 'Grade B',
  'certified-refurbished': 'Certified',
};

function makeEmpty(brands: Brand[]): Product {
  return {
    id: '__new__',
    brand_id: brands[0]?.id ?? '',
    brand: brands[0],
    name: '',
    slug: '',
    model: '',
    category: 'smartphone',
    subcategory: null,
    condition: 'brand-new',
    storage: null,
    color: null,
    battery_health: null,
    warranty: '12 Months',
    stock_quantity: 0,
    moq: 1,
    country_of_origin: 'UAE',
    description: null,
    specifications: null,
    images: [],
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export default function ProductsClient({ products, brands, collections }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [collectionFilter, setCollectionFilter] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [editingStockValue, setEditingStockValue] = useState('');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || p.model.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
      const matchBrand = !brandFilter || p.brand?.slug === brandFilter;
      const matchCond = !conditionFilter || p.condition === conditionFilter;
      const matchCollection = !collectionFilter || (p as Product & { collection_id?: string | null }).collection_id === collectionFilter;
      return matchSearch && matchBrand && matchCond && matchCollection;
    });
  }, [products, search, brandFilter, conditionFilter, collectionFilter]);

  const lowStockCount = products.filter(p => p.stock_quantity > 0 && p.stock_quantity < p.moq).length;

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setDeletingId(id);
    const res = await fetch('/api/admin/products/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert('Delete failed: ' + (j.error ?? 'Unknown error'));
    }
    router.refresh();
    setDeletingId(null);
  };

  const handleDuplicate = async (product: Product) => {
    setDuplicatingId(product.id);
    const res = await fetch('/api/admin/products/duplicate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert('Duplicate failed: ' + (j.error ?? 'Unknown error'));
    }
    router.refresh();
    setDuplicatingId(null);
  };

  const saveStock = async (productId: string) => {
    const val = parseInt(editingStockValue);
    if (!isNaN(val) && val >= 0) {
      const res = await fetch('/api/admin/products/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId, stock_quantity: val }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert('Stock update failed: ' + (j.error ?? 'Unknown error'));
      }
      router.refresh();
    }
    setEditingStockId(null);
  };

  return (
    <>
      <div style={{ padding: '2rem' }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>Products</h1>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {filtered.length} of {products.length} products
              {lowStockCount > 0 && (
                <span style={{ marginLeft: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#c2410c', fontWeight: 600, fontSize: '0.8125rem' }}>
                  <AlertTriangle size={12} /> {lowStockCount} low stock
                </span>
              )}
            </p>
          </div>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.625rem 1.125rem',
              background: '#FF6B00', color: '#fff',
              border: 'none', borderRadius: '0.5rem', fontWeight: 700,
              fontSize: '0.875rem', cursor: 'pointer', flexShrink: 0,
              boxShadow: '0 2px 8px rgba(255,107,0,0.3)',
            }}
            onClick={() => setEditingProduct(makeEmpty(brands))}
          >
            <Plus size={15} /> Add Product
          </button>
        </div>

        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem',
          padding: '0.875rem 1.25rem', marginBottom: '1.25rem',
          display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
            <input
              type="search" placeholder="Search by model or name…" value={search}
              onChange={e => setSearch(e.target.value)} aria-label="Search products"
              style={{ width: '100%', padding: '0.5rem 0.875rem 0.5rem 2.25rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', color: '#111827' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} aria-label="Filter by brand"
              style={{ padding: '0.5rem 2rem 0.5rem 0.875rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#374151', appearance: 'none', cursor: 'pointer', outline: 'none', background: '#fff' }}>
              <option value="">All Brands</option>
              {brands.map(b => <option key={b.id} value={b.slug}>{b.name}</option>)}
            </select>
            <ChevronDown size={13} style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <select value={conditionFilter} onChange={e => setConditionFilter(e.target.value)} aria-label="Filter by condition"
              style={{ padding: '0.5rem 2rem 0.5rem 0.875rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#374151', appearance: 'none', cursor: 'pointer', outline: 'none', background: '#fff' }}>
              <option value="">All Conditions</option>
              {Object.entries(CONDITION_LABELS).map(([val, lbl]) => (
                <option key={val} value={val}>{lbl}</option>
              ))}
            </select>
            <ChevronDown size={13} style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <select value={collectionFilter} onChange={e => setCollectionFilter(e.target.value)} aria-label="Filter by section"
              style={{ padding: '0.5rem 2rem 0.5rem 0.875rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#374151', appearance: 'none', cursor: 'pointer', outline: 'none', background: '#fff' }}>
              <option value="">All Sections</option>
              {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <ChevronDown size={13} style={{ position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }} />
          </div>
          {(search || brandFilter || conditionFilter || collectionFilter) && (
            <button onClick={() => { setSearch(''); setBrandFilter(''); setConditionFilter(''); setCollectionFilter(''); }}
              style={{ fontSize: '0.8125rem', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
              Clear
            </button>
          )}
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                  {['Product', 'Brand', 'Condition', 'Storage', 'Stock', 'MOQ', 'Featured', ''].map(col => (
                    <th key={col} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>No products match your filters.</td></tr>
                ) : filtered.map((product, i) => {
                  const isLow = product.stock_quantity > 0 && product.stock_quantity < product.moq;
                  const isOut = product.stock_quantity === 0;
                  return (
                    <tr key={product.id}
                      style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none', borderLeft: isLow ? '3px solid #f97316' : isOut ? '3px solid #ef4444' : '3px solid transparent' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '0.375rem', overflow: 'hidden', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                            {product.images[0] ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={product.images[0]} alt={product.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '18px' }}>□</div>
                            )}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.model}</div>
                            <Link href={`/products/${product.slug}`} target="_blank" style={{ fontSize: '0.75rem', color: '#FF6B00', textDecoration: 'none' }}>View →</Link>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{product.brand?.name ?? '—'}</td>
                      <td style={{ padding: '0.75rem 1rem' }}><ConditionBadge condition={product.condition} /></td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{product.storage ?? '—'}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        {editingStockId === product.id ? (
                          <input type="number" autoFocus min="0" value={editingStockValue}
                            onChange={e => setEditingStockValue(e.target.value)}
                            onBlur={() => saveStock(product.id)}
                            onKeyDown={e => { if (e.key === 'Enter') saveStock(product.id); if (e.key === 'Escape') setEditingStockId(null); }}
                            style={{ width: '72px', padding: '0.25rem 0.5rem', border: '2px solid #FF6B00', borderRadius: '0.375rem', fontSize: '0.875rem', outline: 'none' }}
                          />
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'text' }}
                            onClick={() => { setEditingStockId(product.id); setEditingStockValue(product.stock_quantity.toString()); }}>
                            <StockBadge quantity={product.stock_quantity} />
                            {isLow && <AlertTriangle size={12} color="#f97316" />}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{product.moq}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: product.is_featured ? '#16a34a' : '#94a3b8' }}>{product.is_featured ? 'Yes' : 'No'}</span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => handleDuplicate(product)} aria-label={`Duplicate ${product.model}`} disabled={duplicatingId === product.id}
                            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', color: '#6B7280', border: '1px solid #E2E8F0', borderRadius: '0.375rem', cursor: 'pointer', opacity: duplicatingId === product.id ? 0.5 : 1 }}>
                            <Copy size={13} />
                          </button>
                          <button onClick={() => setEditingProduct(product)} aria-label={`Edit ${product.model}`}
                            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF0E0', color: '#FF6B00', border: '1px solid #FFD0A0', borderRadius: '0.375rem', cursor: 'pointer' }}>
                            <Edit2 size={13} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} aria-label={`Delete ${product.model}`} disabled={deletingId === product.id}
                            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: '0.375rem', cursor: 'pointer', opacity: deletingId === product.id ? 0.5 : 1 }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Click stock to edit inline · Click edit for full details</span>
          </div>
        </div>
      </div>

      <ProductEditDrawer
        product={editingProduct}
        brands={brands}
        collections={collections}
        isNew={editingProduct?.id === '__new__'}
        onClose={() => setEditingProduct(null)}
      />
    </>
  );
}
