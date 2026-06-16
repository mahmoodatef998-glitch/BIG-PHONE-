import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { getProducts } from '@/lib/data';
import { ConditionBadge, StockBadge } from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Products | Admin' };

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Products</h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>{products.length} total products</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.125rem',
          background: '#2563EB',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
        }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filter bar */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input placeholder="Search products..." style={{
          flex: 1, minWidth: '200px',
          padding: '0.5rem 0.875rem',
          border: '1px solid #E2E8F0',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          outline: 'none',
        }} />
        <select style={{ padding: '0.5rem 0.875rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
          <option>All Brands</option>
          <option>Apple</option>
          <option>Samsung</option>
          <option>Xiaomi</option>
        </select>
        <select style={{ padding: '0.5rem 0.875rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
          <option>All Conditions</option>
          <option>Brand New</option>
          <option>Grade A</option>
          <option>Grade B</option>
        </select>
      </div>

      {/* Products table */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Product', 'Brand', 'Condition', 'Storage', 'Stock', 'MOQ', 'Featured', 'Actions'].map(col => (
                  <th key={col} style={{
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap',
                  }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={product.id} style={{ borderBottom: i < products.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div style={{
                        width: '36px', height: '36px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '0.375rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Package size={16} style={{ color: '#94a3b8' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {product.model}
                        </div>
                        <Link href={`/products/${product.slug}`} style={{ fontSize: '0.75rem', color: '#2563EB' }}>View →</Link>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{product.brand?.name}</td>
                  <td style={{ padding: '0.875rem 1rem' }}><ConditionBadge condition={product.condition} /></td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{product.storage ?? '—'}</td>
                  <td style={{ padding: '0.875rem 1rem' }}><StockBadge quantity={product.stock_quantity} /></td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{product.moq}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: product.is_featured ? '#16a34a' : '#94a3b8' }}>
                      {product.is_featured ? '✓ Yes' : '—'}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <button style={{
                        width: '30px', height: '30px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: '#eff6ff',
                        color: '#2563EB',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                      }}><Edit size={13} /></button>
                      <button style={{
                        width: '30px', height: '30px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: '#fef2f2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                      }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
