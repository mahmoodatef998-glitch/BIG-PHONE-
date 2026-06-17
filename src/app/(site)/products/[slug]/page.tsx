import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MessageCircle, MapPin, Shield, ArrowRight } from 'lucide-react';
import { ConditionBadge, StockBadge } from '@/components/ui/Badge';
import ProductCard from '@/components/ui/ProductCard';
import RFQForm from '@/components/rfq/RFQForm';
import { formatCondition } from '@/lib/utils';
import { cloudinaryUrl } from '@/lib/cloudinary';
import { getProductBySlug as fetchProduct, getProducts as fetchProducts } from '@/lib/data';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

const BRAND_GRADIENT: Record<string, [string, string]> = {
  apple:   ['#1C1C1E', '#3A3A3C'],
  samsung: ['#1428A0', '#2F4FE0'],
  xiaomi:  ['#FF6900', '#FF8C00'],
  huawei:  ['#CF0A2C', '#E83048'],
  oppo:    ['#1D3461', '#3B5998'],
  vivo:    ['#415FFF', '#6B7FFF'],
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const p = await fetchProduct(slug);
  if (!p) return { title: 'Product Not Found' };
  return {
    title: `${p.name} — Wholesale | BIG PHONE`,
    description: `Buy ${p.name} wholesale. ${p.condition === 'brand-new' ? 'Brand new' : 'Refurbished'} | Stock: ${p.stock_quantity} units | MOQ: ${p.moq}`,
  };
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default async function ProductPage(props: Props) {
  const { slug } = await props.params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const related = await fetchProducts({ brand: product.brand?.slug, limit: 5 });
  const waMsg = encodeURIComponent(`Hi, I'd like a wholesale quote for: ${product.name}${product.storage ? ` ${product.storage}` : ''}. Quantity: `);
  const [bgFrom, bgTo] = BRAND_GRADIENT[product.brand?.slug ?? ''] ?? ['#0B1829', '#1A2D47'];
  const imgSrc = product.images[0] ? cloudinaryUrl(product.images[0], { width: 800, quality: 90 }) : null;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #DDE3EA', padding: '0.875rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#94a3b8', display: 'flex', gap: '0.375rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#0066FF', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#CBD5E1' }}>›</span>
            <Link href="/inventory" style={{ color: '#0066FF', textDecoration: 'none' }}>Inventory</Link>
            {product.brand && (
              <>
                <span style={{ color: '#CBD5E1' }}>›</span>
                <Link href={`/brands/${product.brand.slug}`} style={{ color: '#0066FF', textDecoration: 'none' }}>{product.brand.name}</Link>
              </>
            )}
            <span style={{ color: '#CBD5E1' }}>›</span>
            <span style={{ color: '#374151' }}>{product.model}</span>
          </nav>
        </div>
      </div>

      <div className="container-site" style={{ padding: '2rem 1rem 4rem' }}>
        <div className="product-detail-grid">

          {/* Left: Image + Specs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Image */}
            <div style={{
              borderRadius: '12px', overflow: 'hidden',
              border: '1.5px solid #DDE3EA',
              background: '#fff',
            }}>
              <div style={{ position: 'relative', paddingBottom: '80%' }}>
                {imgSrc ? (
                  <Image src={imgSrc} alt={product.name} fill style={{ objectFit: 'contain', padding: '2rem' }} />
                ) : (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.75rem',
                  }}>
                    <div style={{
                      width: '56px', height: '100px',
                      background: 'rgba(255,255,255,0.15)',
                      border: '2.5px solid rgba(255,255,255,0.4)',
                      borderRadius: '10px', position: 'relative',
                    }}>
                      <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', width: '18px', height: '3px', background: 'rgba(255,255,255,0.5)', borderRadius: '9999px' }} />
                      <div style={{ position: 'absolute', bottom: '7px', left: '50%', transform: 'translateX(-50%)', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.45)', borderRadius: '50%' }} />
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', fontWeight: 600 }}>Image Coming Soon</span>
                  </div>
                )}
              </div>
            </div>

            {/* Specs */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #DDE3EA', background: '#F8FAFC' }}>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0B1829', margin: 0 }}>Specifications</h3>
                </div>
                <div>
                  {Object.entries(product.specifications).map(([key, val], i, arr) => (
                    <div key={key} style={{
                      display: 'flex', padding: '0.625rem 1.25rem',
                      borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
                    }}>
                      <span style={{ flex: '0 0 38%', fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>{key}</span>
                      <span style={{ fontSize: '0.8125rem', color: '#111827' }}>{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Info + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '12px', padding: '1.5rem' }}>
              {product.brand && (
                <Link href={`/brands/${product.brand.slug}`} style={{
                  display: 'inline-block', fontSize: '0.8125rem', fontWeight: 700,
                  color: '#0066FF', textTransform: 'uppercase', letterSpacing: '0.06em',
                  marginBottom: '0.625rem', textDecoration: 'none',
                }}>{product.brand.name}</Link>
              )}
              <h1 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800, color: '#0B1829', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                {product.name}
              </h1>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <ConditionBadge condition={product.condition} />
                <StockBadge quantity={product.stock_quantity} />
              </div>

              {/* Details grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem', marginBottom: '1.25rem' }}>
                {[
                  { label: 'Condition', value: formatCondition(product.condition) },
                  { label: 'Storage',   value: product.storage ?? 'N/A' },
                  { label: 'Color',     value: product.color ?? 'Various' },
                  { label: 'Battery',   value: product.battery_health ? `${product.battery_health}%` : 'N/A' },
                  { label: 'Warranty',  value: product.warranty ?? 'As-is' },
                  { label: 'MOQ',       value: `${product.moq} units` },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    background: '#F8FAFC', border: '1px solid #DDE3EA',
                    borderRadius: '8px', padding: '0.625rem 0.875rem',
                  }}>
                    <div style={{ fontSize: '0.6875rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>{label}</div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0B1829' }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <MapPin size={13} style={{ color: '#94a3b8' }} />
                  <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>Origin: {product.country_of_origin}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Shield size={13} style={{ color: '#94a3b8' }} />
                  <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>Verified Stock</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={16} /> WhatsApp Inquiry
              </a>
            </div>

            {/* RFQ panel */}
            <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: '#0B1829', padding: '1rem 1.25rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.9375rem', margin: 0 }}>Request Wholesale Quote</h3>
                <p style={{ color: '#64748B', fontSize: '0.8125rem', marginTop: '0.25rem' }}>Get pricing &amp; availability in under 2 hours</p>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <RFQForm defaultProduct={product.name} compact />
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.filter(p => p.id !== product.id).length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B1829', margin: 0, letterSpacing: '-0.02em' }}>More from {product.brand?.name}</h2>
              </div>
              {product.brand && (
                <Link href={`/brands/${product.brand.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: '#0066FF', textDecoration: 'none' }}>
                  View All <ArrowRight size={14} />
                </Link>
              )}
            </div>
            <div className="related-grid">
              {related.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (min-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem;
        }
        @media (min-width: 768px)  { .related-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>
    </div>
  );
}
