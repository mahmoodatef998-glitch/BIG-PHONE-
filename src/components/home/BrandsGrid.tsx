import Link from 'next/link';
import type { Brand } from '@/types';

const BRAND_COLORS: Record<string, string> = {
  apple:   '#1C1C1E',
  samsung: '#1428A0',
  xiaomi:  '#FF6900',
  huawei:  '#CF0A2C',
  oppo:    '#1D3461',
  vivo:    '#415FFF',
};

export default function BrandsGrid({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null;
  return (
    <>
      <section className="section-sm" style={{ borderTop: '1px solid #EAEAEA', borderBottom: '1px solid #EAEAEA' }}>
        <div className="container-site">
          <p style={{ textAlign: 'center', fontSize: '0.8125rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            Trusted Brands Available
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            {brands.map(brand => {
              const color = BRAND_COLORS[brand.slug] ?? '#FF6B00';
              return (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="brand-pill"
                  style={{ '--brand-color': color } as React.CSSProperties}
                >
                  <span className="brand-dot" style={{ background: color }} />
                  {brand.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .brand-pill {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1.125rem;
          border-radius: 9999px;
          border: 1.5px solid #EAEAEA;
          background: #fff;
          text-decoration: none;
          transition: all 0.18s;
          font-size: 0.875rem; font-weight: 700; color: #374151;
          cursor: pointer;
        }
        .brand-pill:hover {
          border-color: var(--brand-color);
          color: var(--brand-color);
          background: #FAFAFA;
        }
        .brand-dot {
          width: 8px; height: 8px;
          border-radius: 50%; flex-shrink: 0;
        }
      `}</style>
    </>
  );
}
