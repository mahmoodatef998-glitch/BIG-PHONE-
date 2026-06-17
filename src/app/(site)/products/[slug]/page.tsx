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

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await fetchProduct(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — Wholesale | BIG PHONE`,
    description: `Buy ${product.name} wholesale. ${product.condition === 'brand-new' ? 'Brand new' : 'Refurbished'} | Stock: ${product.stock_quantity} units | MOQ: ${product.moq}`,
  };
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

const BRAND_GRADIENT: Record<string, [string, string]> = {
  apple:   ['#1C1C1E', '#3A3A3C'],
  samsung: ['#1428A0', '#2F4FE0'],
  xiaomi:  ['#FF6900', '#FF8C00'],
  huawei:  ['#CF0A2C', '#E83048'],
  oppo:    ['#1D3461', '#3B5998'],
  vivo:    ['#415FFF', '#6B7FFF'],
};

export default async function ProductPage(props: ProductPageProps) {
  const { slug } = await props.params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const related = await fetchProducts({ brand: product.brand?.slug, limit: 5 });
  const waMessage = encodeURIComponent(`Hi, I'd like a wholesale quote for: ${product.name}${product.storage ? ` ${product.storage}` : ''}. Quantity: `);
  const imgSrc = product.images[0] ? cloudinaryUrl(product.images[0], { width: 800, quality: 85 }) : null;
  const [bg1, bg2] = BRAND_GRADIENT[product.brand?.slug ?? ''] ?? ['#1A2332', '#2D3748'];
  const isTablet = product.category === 'tablet';
  const isAudio  = product.category === 'airpods';

  return (
    <div style={{ background: '#F8FAFC' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #DDE3EA', padding: '0.75rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', gap: '0.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
            {/* Image area */}
            <div style={{
              background: '#fff',
              border: '1.5px solid #DDE3EA',
              borderRadius: '14px',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'relative', paddingBottom: '80%' }}>
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'contain', padding: '2rem', background: '#fff' }}
                  />
                ) : (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(135deg, ${bg1}, ${bg2})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {isAudio ? (
                      <div style={{ display: 'flex', gap: '16px' }}>
                        {[0, 1].map(i => (
                          <div key={i} style={{
                            width: '28px', height: '52px',
                            background: 'rgba(255,255,255,0.15)',
                            border: '2px solid rgba(255,255,255,0.4)',
                            borderRadius: '14px',
                          }} />
                        ))}
                      </div>
                    ) : isTablet ? (
                      <div style={{
                        width: '110px', height: '140px',
                        background: 'rgba(255,255,255,0.12)',
                        border: '3px solid rgba(255,255,255,0.4)',
                        borderRadius: '10px',
                      }} />
                    ) : (
                      <div style={{
                        width: '56px', height: '100px',
                        background: 'rgba(255,255,255,0.12)',
                        border: '3px solid rgba(255,255,255,0.4)',
                        borderRadius: '12px', position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
                          width: '18px', height: '3px',
                          background: 'rgba(255,255,255,0.5)', borderRadius: '9999px',
                        }} />
                        <div style={{
                          position: 'absolute', bottom: '7px', left: '50%', transform: 'translateX(-50%)',
                          width: '18px', height: '18px',
                          border: '2px solid rgba(255,255,255,0.45)', borderRadius: '50%',
                        }} />
                      </div>
                    )}
                    <div style={{
                      position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
                      color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}>
                      Image coming soon
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '0.875rem 1.125rem', borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0B1829', margin: 0 }}>Specifications</h3>
                </div>
                <div>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} style={{
                      display: 'flex', padding: '0.5625rem 1.125rem',
                      borderBottom: '1px solid #F1F5F9', fontSize: '0.8125rem',
                    }}>
                      <span style={{ flex: '0 0 40%', color: '#64748B', fontWeight: 500 }}>{key}</span>
                      <span style={{ color: '#111827' }}>{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Info + RFQ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '14px', padding: '1.5rem' }}>
              {product.brand && (
                <Link href={`/brands/${product.brand.slug}`} style={{
                  display: 'inline-block', fontSize: '0.6875rem', fontWeight: 700, color: '#0066FF',
                  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem',
                  background: '#E5F0FF', padding: '0.125rem 0.5rem', borderRadius: '4px',
                  textDecoration: 'none',
                }}>
                  {product.brand.name}
                </Link>
              )}
              <h1 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800, color: '#0B1829', marginBottom: '0.75rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                {product.name}
              </h1>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <ConditionBadge condition={product.condition} />
                <StockBadge quantity={product.stock_quantity} />
              </div>

              {/* Key details */}
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
                    background: '#F8FAFC',
                    border: '1px solid #DDE3EA',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                  }}>
                    <div style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>{label}</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0B1829' }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={13} style={{ color: '#94a3b8' }} />
                  <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>Origin: {product.country_of_origin}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Shield size={13} style={{ color: '#00A850' }} />
                  <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>Verified Stock</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%', padding: '0.75rem',
                  background: '#00A850', color: '#fff',
                  borderRadius: '10px', fontWeight: 700, fontSize: '0.9375rem',
                  textDecoration: 'none', border: 'none',
                }}
              >
                <MessageCircle size={18} /> WhatsApp Inquiry
              </a>
            </div>

            {/* RFQ Form */}
            <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ background: '#0B1829', padding: '1rem 1.25rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.9375rem', margin: 0 }}>Request Wholesale Quote</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', marginTop: '0.25rem', marginBottom: 0 }}>
                  Get pricing &amp; availability in under 2 hours
                </p>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0B1829', margin: 0 }}>More from {product.brand?.name}</h2>
              </div>
              {product.brand && (
                <Link href={`/brands/${product.brand.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', fontWeight: 600, color: '#0066FF', textDecoration: 'none' }}>
                  View All <ArrowRight size={13} />
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
        .related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem;
        }
        @media (min-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr 1fr; }
          .related-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  );
}
