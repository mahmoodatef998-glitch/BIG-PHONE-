import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { getBrandBySlug, getProducts } from '@/lib/data';

type BrandPageProps = {
  params: Promise<{ brand: string }>;
};

export async function generateMetadata(props: BrandPageProps): Promise<Metadata> {
  const { brand } = await props.params;
  const brandData = await getBrandBySlug(brand);
  if (!brandData) return { title: 'Brand Not Found' };
  return {
    title: `${brandData.name} Wholesale Devices`,
    description: `Buy ${brandData.name} smartphones and devices wholesale. ${brandData.description}`,
  };
}

const BRAND_ICONS: Record<string, string> = {
  apple: '🍎', samsung: '📱', xiaomi: '📲', huawei: '🔷', oppo: '🟢', vivo: '🔵',
};

const APPLE_SUBCATEGORIES = [
  { label: 'iPhone', icon: '📱', href: '/inventory?brand=apple&category=smartphone' },
  { label: 'iPad', icon: '📋', href: '/inventory?brand=apple&category=tablet' },
  { label: 'Apple Watch', icon: '⌚', href: '/inventory?brand=apple&category=smartwatch' },
  { label: 'AirPods', icon: '🎧', href: '/inventory?brand=apple&category=airpods' },
];

const APPLE_IPHONE_SERIES = [
  'iPhone 16 Series', 'iPhone 15 Series', 'iPhone 14 Series', 'iPhone 13 Series', 'Older Models',
];

export default async function BrandPage(props: BrandPageProps) {
  const { brand: brandSlug } = await props.params;
  const brandData = await getBrandBySlug(brandSlug);
  if (!brandData) notFound();

  const products = await getProducts({ brand: brandSlug });
  const isApple = brandSlug === 'apple';

  return (
    <div>
      {/* Brand hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
        padding: '3rem 0',
      }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '1.25rem' }}>
            <Link href="/" style={{ color: '#94a3b8' }}>Home</Link>
            {' / '}
            <Link href="/brands" style={{ color: '#94a3b8' }}>Brands</Link>
            {' / '}
            <span style={{ color: '#fff' }}>{brandData.name}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '72px', height: '72px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem',
            }}>
              {BRAND_ICONS[brandSlug] ?? '📱'}
            </div>
            <div>
              <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '0.375rem' }}>
                {brandData.name}
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.9375rem' }}>{brandData.description}</p>
              <p style={{ color: '#F59E0B', fontSize: '0.875rem', fontWeight: 600, marginTop: '0.375rem' }}>
                {brandData.product_count} Products Available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apple subcategories */}
      {isApple && (
        <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '1.5rem 0' }}>
          <div className="container-site">
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginRight: '0.25rem' }}>Category:</span>
              {APPLE_SUBCATEGORIES.map(cat => (
                <Link key={cat.label} href={cat.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.5rem 0.875rem',
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    color: '#374151',
                    fontWeight: 500,
                    transition: 'all 0.15s',
                    textDecoration: 'none',
                  }}
                >
                  {cat.icon} {cat.label}
                </Link>
              ))}
            </div>

            {/* iPhone series */}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginRight: '0.25rem' }}>iPhone Series:</span>
              {APPLE_IPHONE_SERIES.map(series => (
                <button key={series}
                  style={{
                    padding: '0.375rem 0.75rem',
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: '9999px',
                    fontSize: '0.8125rem',
                    color: '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >{series}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <section className="section">
        <div className="container-site">
          <div className="section-header">
            <div>
              <h2 className="section-title">{brandData.name} Inventory</h2>
              <p className="section-subtitle">{products.length} products available wholesale</p>
            </div>
            <Link href="/rfq" className="btn btn-primary btn-sm">Request Bulk Quote</Link>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: '#64748B' }}>No products available for this brand at the moment.</p>
              <Link href="/inventory" className="btn btn-outline" style={{ marginTop: '1rem', display: 'inline-flex' }}>Browse All Inventory</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.875rem' }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (min-width: 640px) { .brand-products { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 1024px) { .brand-products { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
    </div>
  );
}
