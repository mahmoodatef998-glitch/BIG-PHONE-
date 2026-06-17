import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getBrands } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Mobile Phone Brands',
  description: 'Shop by brand — Apple, Samsung, Xiaomi, Huawei, Oppo, Vivo wholesale devices.',
};

const BRAND_ICONS: Record<string, string> = {
  apple: '🍎', samsung: '📱', xiaomi: '📲', huawei: '🔷', oppo: '🟢', vivo: '🔵',
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div>
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '2.5rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '0.5rem' }}>
            <Link href="/" style={{ color: '#2563EB' }}>Home</Link> / Brands
          </nav>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: '#0F172A' }}>
            Shop by Brand
          </h1>
          <p style={{ color: '#64748B', marginTop: '0.5rem' }}>Choose from the world&apos;s leading mobile manufacturers</p>
        </div>
      </div>

      <section className="section">
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}>
            {brands.map(brand => (
              <Link key={brand.id} href={`/brands/${brand.slug}`} className="brand-card">
                <div style={{ fontSize: '3rem', marginBottom: '0.875rem' }}>{BRAND_ICONS[brand.slug] ?? '📱'}</div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.375rem' }}>{brand.name}</h2>
                <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '0.875rem' }}>{brand.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#2563EB' }}>{brand.product_count} Products</span>
                  <ArrowRight size={14} style={{ color: '#2563EB' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 480px) { .brands-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 768px) { .brands-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 1024px) { .brands-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </div>
  );
}
