import type { Metadata } from 'next';
import { Tag, Package } from 'lucide-react';
import { getBrands, getProducts } from '@/lib/data';

export const metadata: Metadata = { title: 'Brands | Admin' };
export const dynamic = 'force-dynamic';

const BRAND_COLORS: Record<string, { from: string; to: string }> = {
  apple:   { from: '#1C1C1E', to: '#3A3A3C' },
  samsung: { from: '#1428A0', to: '#2F4FE0' },
  xiaomi:  { from: '#FF6900', to: '#FF8C00' },
  huawei:  { from: '#CF0A2C', to: '#E83048' },
  oppo:    { from: '#1D3461', to: '#3B5998' },
  vivo:    { from: '#415FFF', to: '#6B7FFF' },
};

export default async function AdminBrandsPage() {
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);

  const productCountByBrand = products.reduce<Record<string, number>>((acc, p) => {
    const key = p.brand?.slug ?? 'unknown';
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const stockByBrand = products.reduce<Record<string, number>>((acc, p) => {
    const key = p.brand?.slug ?? 'unknown';
    acc[key] = (acc[key] ?? 0) + p.stock_quantity;
    return acc;
  }, {});

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Brands</h1>
        <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>{brands.length} brands in catalog</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {brands.map(brand => {
          const cfg = BRAND_COLORS[brand.slug] ?? { from: '#0B1829', to: '#1A2332' };
          const productCount = productCountByBrand[brand.slug] ?? 0;
          const totalStock = stockByBrand[brand.slug] ?? 0;

          return (
            <div key={brand.id} style={{
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              overflow: 'hidden',
            }}>
              {/* Brand header with gradient */}
              <div style={{
                background: `linear-gradient(135deg, ${cfg.from} 0%, ${cfg.to} 100%)`,
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
              }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.25rem' }}>
                    {brand.name[0]}
                  </span>
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.0625rem' }}>{brand.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginTop: '0.125rem' }}>/{brand.slug}</div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Package size={14} style={{ color: '#64748B' }} />
                  <span style={{ fontSize: '0.875rem', color: '#374151' }}><strong>{productCount}</strong> products</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Tag size={14} style={{ color: '#64748B' }} />
                  <span style={{ fontSize: '0.875rem', color: '#374151' }}><strong>{totalStock}</strong> units</span>
                </div>
              </div>

              {/* Description */}
              {brand.description && (
                <div style={{ padding: '0 1.25rem 1rem', borderTop: '1px solid #F1F5F9' }}>
                  <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: '0.75rem 0 0', lineHeight: 1.5 }}>
                    {brand.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '0.5rem' }}>
                <a
                  href={`/brands/${brand.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1, textAlign: 'center',
                    padding: '0.5rem',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.375rem',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#374151',
                    textDecoration: 'none',
                  }}
                >
                  View Page
                </a>
                <a
                  href={`/inventory?brand=${brand.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1, textAlign: 'center',
                    padding: '0.5rem',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '0.375rem',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#2563EB',
                    textDecoration: 'none',
                  }}
                >
                  Products →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
