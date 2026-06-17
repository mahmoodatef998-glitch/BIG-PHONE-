import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { getBrandBySlug, getProducts } from '@/lib/data';

export const dynamic = 'force-dynamic';

type BrandPageProps = {
  params: Promise<{ brand: string }>;
};

export async function generateMetadata(props: BrandPageProps): Promise<Metadata> {
  const { brand } = await props.params;
  const brandData = await getBrandBySlug(brand);
  if (!brandData) return { title: 'Brand Not Found' };
  return {
    title: `${brandData.name} Wholesale Devices | BIG PHONE`,
    description: `Buy ${brandData.name} smartphones and devices wholesale. ${brandData.description}`,
  };
}

const BRAND_CONFIG: Record<string, { from: string; to: string }> = {
  apple:   { from: '#1C1C1E', to: '#3A3A3C' },
  samsung: { from: '#1428A0', to: '#2F4FE0' },
  xiaomi:  { from: '#FF6900', to: '#FF8C00' },
  huawei:  { from: '#CF0A2C', to: '#E83048' },
  oppo:    { from: '#1D3461', to: '#3B5998' },
  vivo:    { from: '#415FFF', to: '#6B7FFF' },
};

const APPLE_CATS = [
  { label: 'iPhone',      href: '/inventory?brand=apple&category=smartphone' },
  { label: 'iPad',        href: '/inventory?brand=apple&category=tablet' },
  { label: 'AirPods',     href: '/inventory?brand=apple&category=airpods' },
  { label: 'Accessories', href: '/inventory?brand=apple&category=accessory' },
];

const APPLE_SERIES = [
  'iPhone 16 Series', 'iPhone 15 Series', 'iPhone 14 Series', 'iPhone 13 Series', 'Older Models',
];

export default async function BrandPage(props: BrandPageProps) {
  const { brand: brandSlug } = await props.params;
  const brandData = await getBrandBySlug(brandSlug);
  if (!brandData) notFound();

  const products = await getProducts({ brand: brandSlug });
  const isApple = brandSlug === 'apple';
  const cfg = BRAND_CONFIG[brandSlug] ?? { from: '#0B1829', to: '#1A2332' };

  return (
    <div>
      {/* Brand hero */}
      <div style={{
        background: `linear-gradient(135deg, ${cfg.from} 0%, ${cfg.to} 100%)`,
        padding: '3rem 0',
      }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.375rem' }}>›</span>
            <Link href="/brands" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Brands</Link>
            <span style={{ margin: '0 0.375rem' }}>›</span>
            <span style={{ color: '#fff' }}>{brandData.name}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '64px', height: '64px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem' }}>
                {brandData.name[0]}
              </span>
            </div>
            <div>
              <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '0.375rem', letterSpacing: '-0.025em' }}>
                {brandData.name}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', margin: 0 }}>
                {brandData.description}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', fontWeight: 600, marginTop: '0.375rem' }}>
                {products.length} products available wholesale
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apple subcategories */}
      {isApple && (
        <div style={{ background: '#F8FAFC', borderBottom: '1px solid #DDE3EA', padding: '1rem 0' }}>
          <div className="container-site">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', marginRight: '0.25rem' }}>Category:</span>
              {APPLE_CATS.map(cat => (
                <Link key={cat.label} href={cat.href} className="brand-cat-chip">
                  {cat.label}
                </Link>
              ))}
            </div>

            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', marginRight: '0.25rem' }}>iPhone Series:</span>
              {APPLE_SERIES.map(series => (
                <Link
                  key={series}
                  href={`/inventory?brand=apple&search=${encodeURIComponent(series.split(' ')[1])}`}
                  className="brand-cat-chip"
                >
                  {series}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <section style={{ background: '#F8FAFC', padding: '2rem 0 4rem' }}>
        <div className="container-site">
          <div className="section-header" style={{ marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B1829', margin: 0 }}>
                {brandData.name} Inventory
              </h2>
              <p style={{ color: '#64748B', margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
                {products.length} products available for wholesale
              </p>
            </div>
            <Link href="/rfq" className="btn btn-primary btn-sm">Request Bulk Quote</Link>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: '#64748B' }}>No products available for this brand yet — check back soon.</p>
              <Link href="/inventory" className="btn btn-outline" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                Browse All Inventory
              </Link>
            </div>
          ) : (
            <div className="brand-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .brand-cat-chip {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          background: #fff;
          border: 1.5px solid #DDE3EA;
          border-radius: 9999px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
        }
        .brand-cat-chip:hover { border-color: #0066FF; color: #0066FF; }
        .brand-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem;
        }
        @media (min-width: 640px)  { .brand-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .brand-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>
    </div>
  );
}
