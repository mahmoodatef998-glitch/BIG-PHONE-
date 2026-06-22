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
    <section className="section-sm" style={{ borderTop: '1px solid #EAEAEA', borderBottom: '1px solid #EAEAEA' }}>
      <div className="container-site">
        <p style={{ textAlign: 'center', fontSize: '0.8125rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Trusted Brands Available
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          {brands.map(brand => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1.125rem', borderRadius: '9999px',
                border: '1.5px solid #EAEAEA', background: '#fff',
                textDecoration: 'none', transition: 'all 0.18s',
                fontSize: '0.875rem', fontWeight: 700, color: '#374151',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                const c = BRAND_COLORS[brand.slug] ?? '#6C5CE7';
                el.style.borderColor = c; el.style.color = c;
                el.style.background = '#FAFAFA';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = '#EAEAEA'; el.style.color = '#374151';
                el.style.background = '#fff';
              }}
            >
              <span style={{ width: '8px', height: '8px', background: BRAND_COLORS[brand.slug] ?? '#6C5CE7', borderRadius: '50%', flexShrink: 0 }} />
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
