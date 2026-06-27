'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Search, ChevronDown, AlertTriangle, Copy, CheckSquare, Square, Layers } from 'lucide-react';
import type { Product, Brand, Collection } from '@/types';
import { ConditionBadge, StockBadge } from '@/components/ui/Badge';
import ProductEditDrawer from './ProductEditDrawer';
import { useAdminToast } from '@/components/admin/AdminToast';
import AdminPagination from '@/components/admin/AdminPagination';
import { usePagination } from '@/lib/admin/pagination';

const PAGE_SIZE = 25;

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
  const { error: toastError, success: toastSuccess } = useAdminToast();
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [collectionFilter, setCollectionFilter] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [editingStockValue, setEditingStockValue] = useState('');

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkSectionId, setBulkSectionId] = useState('');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || p.model.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
      const matchBrand = !brandFilter || p.brand?.slug === brandFilter;
      const matchCond = !conditionFilter || p.condition === conditionFilter;
      const matchCollection = !collectionFilter || (p as Product & { collection_id?: string | null }).collection_id === collectionFilter;
      return matchSearch && matchBrand && matchCond && matchCollection;
    });
  }, [products, search, brandFilter, conditionFilter, collectionFilter]);

  const paginationKey = `${search}|${brandFilter}|${conditionFilter}|${collectionFilter}`;
  const { paginated, page, setPage, totalPages, total, pageSize, hasMultiplePages } = usePagination(filtered, PAGE_SIZE, paginationKey);

  const lowStockCount = products.filter(p => p.stock_quantity > 0 && p.stock_quantity < p.moq).length;

  const allFilteredSelected = filtered.length > 0 && filtered.every(p => selectedIds.has(p.id));
  const someSelected = selectedIds.size > 0;

  const toggleAll = () => {
    if (allFilteredSelected) {
      const next = new Set(selectedIds);
      filtered.forEach(p => next.delete(p.id));
      setSelectedIds(next);
    } else {
      const next = new Set(selectedIds);
      filtered.forEach(p => next.add(p.id));
      setSelectedIds(next);
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
  };

  const handleBulkAction = async (action: string, payload?: Record<string, unknown>) => {
    if (!selectedIds.size) return;
    if (action === 'delete' && !confirm(`Delete ${selectedIds.size} product(s)? This cannot be undone.`)) return;
    setBulkLoading(true);
    try {
      const res = await fetch('/api/admin/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ids: Array.from(selectedIds), payload }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toastError('Bulk action failed: ' + (j.error ?? 'Unknown error'));
      } else {
        setSelectedIds(new Set());
        const labels: Record<string, string> = {
          delete: `${selectedIds.size} product(s) deleted`,
          activate: `${selectedIds.size} product(s) activated`,
          deactivate: `${selectedIds.size} product(s) hidden`,
          assign_section: `${selectedIds.size} product(s) assigned to section`,
        };
        toastSuccess(labels[action] ?? 'Bulk action completed');
        router.refresh();
      }
    } finally {
      setBulkLoading(false);
    }
  };

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
      toastError('Delete failed: ' + (j.error ?? 'Unknown error'));
    } else {
      toastSuccess('Product deleted');
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
      toastError('Duplicate failed: ' + (j.error ?? 'Unknown error'));
    } else {
      toastSuccess(`"${product.model}" duplicated`);
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
        toastError('Stock update failed: ' + (j.error ?? 'Unknown error'));
      } else {
        toastSuccess('Stock updated');
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

        {/* Bulk action bar */}
        {someSelected && (
          <div style={{
            position: 'sticky', top: '1rem', zIndex: 30,
            background: '#1E293B', color: '#fff',
            borderRadius: '0.75rem', padding: '0.75rem 1.25rem',
            marginBottom: '0.75rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, marginRight: '0.25rem' }}>
              {selectedIds.size} selected
            </span>
            <div style={{ width: '1px', height: '20px', background: '#334155' }} />
            <button
              disabled={bulkLoading}
              onClick={() => handleBulkAction('activate')}
              style={{ padding: '0.375rem 0.875rem', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '0.375rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', opacity: bulkLoading ? 0.6 : 1 }}>
              Activate
            </button>
            <button
              disabled={bulkLoading}
              onClick={() => handleBulkAction('deactivate')}
              style={{ padding: '0.375rem 0.875rem', background: '#64748b', color: '#fff', border: 'none', borderRadius: '0.375rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', opacity: bulkLoading ? 0.6 : 1 }}>
              Deactivate
            </button>
            {collections.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Layers size={13} color="#94a3b8" />
                <select
                  value={bulkSectionId}
                  onChange={e => setBulkSectionId(e.target.value)}
                  style={{ padding: '0.375rem 0.5rem', background: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '0.375rem', fontSize: '0.8125rem', cursor: 'pointer', outline: 'none' }}
                  aria-label="Move to section">
                  <option value="">Move to section…</option>
                  {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  <option value="__none__">Remove from section</option>
                </select>
                {bulkSectionId && (
                  <button
                    disabled={bulkLoading}
                    onClick={() => {
                      handleBulkAction('set-collection', { collection_id: bulkSectionId === '__none__' ? null : bulkSectionId });
                      setBulkSectionId('');
                    }}
                    style={{ padding: '0.375rem 0.75rem', background: '#FF6B00', color: '#fff', border: 'none', borderRadius: '0.375rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', opacity: bulkLoading ? 0.6 : 1 }}>
                    Apply
                  </button>
                )}
              </div>
            )}
            <div style={{ flex: 1 }} />
            <button
              disabled={bulkLoading}
              onClick={() => handleBulkAction('delete')}
              style={{ padding: '0.375rem 0.875rem', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '0.375rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', opacity: bulkLoading ? 0.6 : 1 }}>
              Delete
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              style={{ padding: '0.375rem 0.5rem', background: 'transparent', color: '#94a3b8', border: '1px solid #334155', borderRadius: '0.375rem', fontSize: '0.8125rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        )}

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ padding: '0.75rem 0.75rem 0.75rem 1rem', width: '40px' }}>
                    <button
                      onClick={toggleAll}
                      aria-label={allFilteredSelected ? 'Deselect all' : 'Select all'}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: allFilteredSelected ? '#FF6B00' : '#94a3b8' }}>
                      {allFilteredSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                    </button>
                  </th>
                  {['Product', 'Brand', 'Condition', 'Storage', 'Stock', 'MOQ', 'Featured', ''].map(col => (
                    <th key={col} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>No products match your filters.</td></tr>
                ) : paginated.map((product, i) => {
                  const isLow = product.stock_quantity > 0 && product.stock_quantity < product.moq;
                  const isOut = product.stock_quantity === 0;
                  const isSelected = selectedIds.has(product.id);
                  return (
                    <tr key={product.id}
                      className="products-row"
                      style={{
                        borderBottom: i < paginated.length - 1 ? '1px solid #F1F5F9' : 'none',
                        borderLeft: isSelected ? '3px solid #FF6B00' : isLow ? '3px solid #f97316' : isOut ? '3px solid #ef4444' : '3px solid transparent',
                        background: isSelected ? '#FFF8F3' : 'transparent',
                        transition: 'background 0.1s',
                      }}>
                      <td style={{ padding: '0.75rem 0.75rem 0.75rem 1rem' }}>
                        <button
                          onClick={() => toggleOne(product.id)}
                          aria-label={isSelected ? `Deselect ${product.model}` : `Select ${product.model}`}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: isSelected ? '#FF6B00' : '#94a3b8' }}>
                          {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                        </button>
                      </td>
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
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
                {hasMultiplePages
                  ? `${total} product${total !== 1 ? 's' : ''} total`
                  : `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
                {someSelected && <span style={{ marginLeft: '0.5rem', color: '#FF6B00', fontWeight: 600 }}>· {selectedIds.size} selected</span>}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Click stock to edit inline · Click edit for full details</span>
            </div>
            <AdminPagination
              page={page}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>

      <style>{`
        .products-row:hover { background: #FAFAFA !important; }
        tr.products-row[style*="FFF8F3"]:hover { background: #FFF8F3 !important; }
      `}</style>

      {editingProduct && (
        <ProductEditDrawer
          key={editingProduct.id}
          product={editingProduct}
          brands={brands}
          collections={collections}
          isNew={editingProduct.id === '__new__'}
          onClose={() => setEditingProduct(null)}
          onSaved={toastSuccess}
        />
      )}
    </>
  );
}
