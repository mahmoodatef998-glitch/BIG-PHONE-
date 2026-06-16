import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Brand } from '@/types';

interface BrandsGridProps {
  brands: Brand[];
}

const BRAND_ICONS: Record<string, string> = {
  apple: '🍎',
  samsung: '📱',
  xiaomi: '📲',
  huawei: '🔷',
  oppo: '🟢',
  vivo: '🔵',
};

const EXTRA_CATEGORIES = [
  { name: 'Tablets', slug: 'tablets', icon: '📋', count: 48, href: '/inventory?category=tablet' },
  { name: 'Accessories', slug: 'accessories', icon: '🎧', count: 120, href: '/inventory?category=accessory' },
];

export default function BrandsGrid({ brands }: BrandsGridProps) {
  return (
    <section className="section" style={{ background: '#F8FAFC' }}>
      <div className="container-site">
        <div className="section-header">
          <div>
            <h2 className="section-title">Shop by Brand</h2>
            <p className="section-subtitle">Choose from the world's leading mobile manufacturers</p>
          </div>
          <Link href="/brands" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: '#2563EB', textDecoration: 'none', flexShrink: 0 }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.875rem',
        }}>
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="brand-card"
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                {BRAND_ICONS[brand.slug] ?? '📱'}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
                {brand.name}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748B' }}>{brand.product_count} Products</p>
            </Link>
          ))}

          {EXTRA_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="brand-card"
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>{cat.name}</h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748B' }}>{cat.count} Products</p>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 480px) { div > div:last-child { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 768px) { div > div:last-child { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
    </section>
  );
}
