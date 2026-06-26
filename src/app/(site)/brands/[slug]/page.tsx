import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { getBrandBySlug, getProducts, getBrands } from '@/lib/data';

export const revalidate = 60;
export const dynamicParams = true;

type BrandPageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map(b => ({ slug: b.slug }));
}

export async function generateMetadata(props: BrandPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: 'Brand Not Found' };
  return {
    title: `${brand.name} Wholesale Inventory | BIG PHONE`,
    description: `Buy ${brand.name} smartphones and devices wholesale from Dubai. ${brand.description ?? ''}`,
  };
}

const BRAND_GRADIENT: Record<string, [string, string]> = {
  apple:   ['#1C1C1E', '#3A3A3C'],
  samsung: ['#1428A0', '#2F4FE0'],
  xiaomi:  ['#FF6900', '#FF8C00'],
  huawei:  ['#CF0A2C', '#E83048'],
  oppo:    ['#1D3461', '#3B5998'],
  vivo:    ['#415FFF', '#6B7FFF'],
};

export default async function BrandPage(props: BrandPageProps) {
  const { slug } = await props.params;
  const [brand, products] = await Promise.all([
    getBrandBySlug(slug),
    getProducts({ brand: slug }),
  ]);

  if (!brand) notFound();

  const [bg1, bg2] = BRAND_GRADIENT[slug] ?? ['#1A2332', '#2D3748'];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Brand hero */}
      <div style={{ background: `linear-gradient(135deg, ${bg1}, ${bg2})`, padding: '2.5rem 0 2rem' }}>
        <div className="container-site">
          <Link
            href="/inventory"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', textDecoration: 'none', marginBottom: '1.25rem' }}
          >
            <ChevronLeft size={14} /> Back to Inventory
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '1.375rem', fontWeight: 800, color: '#fff' }}>{brand.name[0]}</span>
            </div>
            <div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>
                {brand.name}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>
                {products.length} products in wholesale stock
              </p>
            </div>
          </div>
          {brand.description && (
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem', marginTop: '1.25rem', maxWidth: '480px', lineHeight: 1.6, margin: '1.25rem 0 0' }}>
              {brand.description}
            </p>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #DDE3EA', padding: '0.75rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#0066FF', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#CBD5E1' }}>›</span>
            <Link href="/inventory" style={{ color: '#0066FF', textDecoration: 'none' }}>Inventory</Link>
            <span style={{ color: '#CBD5E1' }}>›</span>
            <span style={{ color: '#374151' }}>{brand.name}</span>
          </nav>
        </div>
      </div>

      {/* Products */}
      <div className="container-site" style={{ padding: '1.5rem 1rem 4rem' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#fff', borderRadius: '12px', border: '1px solid #DDE3EA' }}>
            <p style={{ color: '#64748B', marginBottom: '1rem' }}>No products currently available for {brand.name}.</p>
            <Link href="/inventory" style={{ color: '#0066FF', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>Browse all inventory</Link>
          </div>
        ) : (
          <div className="brand-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .brand-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem;
        }
        @media (min-width: 640px)  { .brand-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .brand-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1280px) { .brand-grid { grid-template-columns: repeat(5, 1fr); } }
      `}</style>
    </div>
  );
}
