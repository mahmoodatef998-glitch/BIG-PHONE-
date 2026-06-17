import Link from 'next/link';
import type { Product } from '@/types';

interface Props {
  products: Product[];
}

const BRAND_CONFIG: Record<string, { color: string; accent: string }> = {
  apple:   { color: '#1C1C1E', accent: '#3A3A3C' },
  samsung: { color: '#1428A0', accent: '#2F4FE0' },
  xiaomi:  { color: '#FF6900', accent: '#FF8C00' },
  huawei:  { color: '#CF0A2C', accent: '#E83048' },
  oppo:    { color: '#1D3461', accent: '#3B5998' },
  vivo:    { color: '#415FFF', accent: '#6B7FFF' },
};

const CONDITION_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  'brand-new':            { label: 'Brand New',  color: '#065F46', bg: '#D1FAE5' },
  'refurbished-grade-a':  { label: 'Grade A',    color: '#1D4ED8', bg: '#DBEAFE' },
  'refurbished-grade-b':  { label: 'Grade B',    color: '#92400E', bg: '#FEF3C7' },
  'certified-refurbished':{ label: 'Certified',  color: '#5B21B6', bg: '#EDE9FE' },
};

function groupByBrand(products: Product[]) {
  const groups: Record<string, { brandName: string; brandSlug: string; items: Product[] }> = {};
  for (const p of products) {
    if (!p.brand || !p.is_active) continue;
    const slug = p.brand.slug;
    if (slug === 'oem') continue;
    if (!groups[slug]) groups[slug] = { brandName: p.brand.name, brandSlug: slug, items: [] };
    groups[slug].items.push(p);
  }
  const ORDER = ['apple', 'samsung', 'xiaomi', 'huawei', 'oppo', 'vivo'];
  return ORDER.filter(s => groups[s]).map(s => groups[s]);
}

export default function BrandShowcase({ products }: Props) {
  const brandGroups = groupByBrand(products);

  return (
    <section style={{ background: '#F8FAFC', padding: '4rem 0' }}>
      <div className="container-site">
        {/* Section header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{
            fontSize: '0.8125rem', fontWeight: 600, color: '#0066FF',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem',
          }}>Shop by Brand</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800,
              color: '#0B1829', letterSpacing: '-0.025em', margin: 0,
            }}>Browse by Manufacturer</h2>
            <Link href="/inventory" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0066FF', textDecoration: 'none' }}>
              View All Inventory →
            </Link>
          </div>
        </div>

        {/* Brand rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {brandGroups.map(({ brandName, brandSlug, items }) => {
            const cfg = BRAND_CONFIG[brandSlug] ?? { color: '#0B1829', accent: '#1A2332' };
            return (
              <div key={brandSlug}>
                {/* Brand row header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: cfg.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ color: '#fff', fontWeight: 900, fontSize: '14px' }}>{brandName[0]}</span>
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0B1829' }}>{brandName}</h3>
                      <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{items.length} products in stock</span>
                    </div>
                  </div>
                  <Link href={`/brands/${brandSlug}`} className="showcase-view-all">
                    View All {brandName} →
                  </Link>
                </div>

                {/* Horizontal scroll */}
                <div className="showcase-row">
                  {items.map(product => {
                    const cond = CONDITION_LABELS[product.condition] ?? { label: product.condition, color: '#374151', bg: '#F3F4F6' };
                    const isTablet = product.category === 'tablet';
                    const isAudio  = product.category === 'airpods' || product.subcategory?.includes('buds') || product.subcategory?.includes('airpods');
                    return (
                      <Link key={product.id} href={`/inventory/${product.slug}`} className="showcase-card">
                        {/* Device visual */}
                        <div style={{
                          background: `linear-gradient(135deg, ${cfg.color}, ${cfg.accent})`,
                          borderRadius: '8px', height: '116px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginBottom: '0.75rem', position: 'relative', overflow: 'hidden',
                        }}>
                          {isAudio ? (
                            /* Earbuds silhouette */
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {[0, 1].map(i => (
                                <div key={i} style={{
                                  width: '20px', height: '34px',
                                  background: 'rgba(255,255,255,0.18)',
                                  border: '1.5px solid rgba(255,255,255,0.4)',
                                  borderRadius: '10px',
                                }} />
                              ))}
                            </div>
                          ) : isTablet ? (
                            /* Tablet silhouette */
                            <div style={{
                              width: '72px', height: '82px',
                              background: 'rgba(255,255,255,0.12)',
                              border: '2px solid rgba(255,255,255,0.4)',
                              borderRadius: '6px',
                            }} />
                          ) : (
                            /* Phone silhouette */
                            <div style={{
                              width: '42px', height: '78px',
                              background: 'rgba(255,255,255,0.12)',
                              border: '2px solid rgba(255,255,255,0.4)',
                              borderRadius: '8px', position: 'relative',
                            }}>
                              <div style={{
                                position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)',
                                width: '14px', height: '3px',
                                background: 'rgba(255,255,255,0.5)', borderRadius: '9999px',
                              }} />
                              <div style={{
                                position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)',
                                width: '13px', height: '13px',
                                border: '1.5px solid rgba(255,255,255,0.45)', borderRadius: '50%',
                              }} />
                            </div>
                          )}

                          {/* Stock badge */}
                          <div style={{
                            position: 'absolute', top: '7px', right: '7px',
                            background: 'rgba(0,0,0,0.5)', borderRadius: '4px',
                            padding: '2px 5px', fontSize: '10px', fontWeight: 600, color: '#fff',
                          }}>
                            {product.stock_quantity >= 100 ? '100+' : product.stock_quantity} in stock
                          </div>
                        </div>

                        {/* Info */}
                        <span style={{
                          fontSize: '10px', fontWeight: 700,
                          color: cond.color, background: cond.bg,
                          padding: '2px 6px', borderRadius: '4px',
                          display: 'inline-block', marginBottom: '0.375rem',
                        }}>{cond.label}</span>
                        <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0B1829', lineHeight: 1.35, margin: '0 0 0.25rem' }}>
                          {product.model}{product.storage ? ` · ${product.storage}` : ''}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: 0 }}>MOQ: {product.moq} units</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .showcase-view-all {
          font-size: 0.8125rem; font-weight: 600; color: #0066FF;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          padding: 0.375rem 0.75rem;
          border: 1.5px solid #DDE3EA; border-radius: 6px;
          transition: border-color 0.15s, background 0.15s;
        }
        .showcase-view-all:hover { border-color: #0066FF; background: #E5F0FF; }
        .showcase-row {
          display: flex; gap: 0.75rem;
          overflow-x: auto; padding-bottom: 0.5rem;
          scrollbar-width: none;
        }
        .showcase-row::-webkit-scrollbar { display: none; }
        .showcase-card {
          flex-shrink: 0; width: 155px;
          background: #fff;
          border: 1.5px solid #DDE3EA;
          border-radius: 12px; padding: 0.75rem;
          text-decoration: none;
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .showcase-card:hover {
          border-color: #0066FF;
          box-shadow: 0 4px 18px rgba(0,102,255,0.1);
          transform: translateY(-2px);
        }
        @media (min-width: 768px) {
          .showcase-card { width: 175px; }
        }
      `}</style>
    </section>
  );
}
