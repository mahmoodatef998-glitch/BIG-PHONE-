import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import { getBrandBySlug, getProducts } from '@/lib/data';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ brand: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { brand } = await props.params;
  const b = await getBrandBySlug(brand);
  if (!b) return { title: 'Brand Not Found' };
  return {
    title: `${b.name} Wholesale Devices | BIG PHONE`,
    description: `Buy ${b.name} smartphones and devices wholesale. ${b.description}`,
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

export default async function BrandPage(props: Props) {
  const { brand: slug } = await props.params;
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  const products = await getProducts({ brand: slug });
  const cfg = BRAND_CONFIG[slug] ?? { from: '#0B1829', to: '#1A2D47' };

  return (
    <div>
      {/* Brand hero */}
      <div style={{ background: `linear-gradient(135deg, ${cfg.from} 0%, ${cfg.to} 100%)`, padding: '3rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.375rem' }}>›</span>
            <Link href="/brands" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Brands</Link>
            <span style={{ margin: '0 0.375rem' }}>›</span>
            <span style={{ color: '#fff' }}>{brand.name}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Brand logo chip */}
            <div style={{
              width: '72px', height: '72px',
              background: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.04em' }}>
                {brand.name[0]}
              </span>
            </div>
            <div>
              <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '0.375rem', letterSpacing: '-0.03em' }}>
                {brand.name}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9375rem' }}>{brand.description}</p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem' }}>
                <span style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 700 }}>
                  {products.length} products in stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apple category strip */}
      {slug === 'apple' && (
        <div style={{ background: '#F8FAFC', borderBottom: '1px solid #DDE3EA', padding: '1rem 0' }}>
          <div className="container-site">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginRight: '0.25rem' }}>Category:</span>
              {APPLE_CATS.map(cat => (
                <Link key={cat.label} href={cat.href} style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '0.375rem 0.875rem',
                  background: '#fff', border: '1.5px solid #DDE3EA',
                  borderRadius: '9999px', fontSize: '0.8125rem',
                  color: '#374151', fontWeight: 600,
                  transition: 'all 0.15s', textDecoration: 'none',
                }} className="brand-cat-chip">
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <section style={{ padding: '2.5rem 0 4rem', background: '#F8FAFC' }}>
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0B1829', letterSpacing: '-0.025em', margin: 0 }}>
                {brand.name} Inventory
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {products.length} products available wholesale
              </p>
            </div>
            <Link href="/rfq" className="btn btn-primary btn-sm">Request Bulk Quote</Link>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: '12px', border: '1px solid #DDE3EA' }}>
              <p style={{ color: '#64748B', marginBottom: '1rem' }}>No products available for this brand right now.</p>
              <Link href="/inventory" className="btn btn-outline">Browse All Inventory</Link>
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
        .brand-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem;
        }
        @media (min-width: 640px)  { .brand-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .brand-grid { grid-template-columns: repeat(4, 1fr); } }
        .brand-cat-chip:hover { border-color: #0066FF !important; color: #0066FF !important; background: #E5F0FF !important; }
      `}</style>
    </div>
  );
}
