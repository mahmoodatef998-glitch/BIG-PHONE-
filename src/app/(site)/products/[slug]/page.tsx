import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MessageCircle, Package, MapPin, Shield, ArrowRight } from 'lucide-react';
import { ConditionBadge, StockBadge } from '@/components/ui/Badge';
import ProductCard from '@/components/ui/ProductCard';
import RFQForm from '@/components/rfq/RFQForm';
import { formatCondition } from '@/lib/utils';
import { getProductBySlug as fetchProduct, getProducts as fetchProducts } from '@/lib/data';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await fetchProduct(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — Wholesale`,
    description: `Buy ${product.name} wholesale. ${product.condition === 'brand-new' ? 'Brand new' : 'Refurbished'} | Stock: ${product.stock_quantity} units | MOQ: ${product.moq}`,
  };
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default async function ProductPage(props: ProductPageProps) {
  const { slug } = await props.params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const related = await fetchProducts({ brand: product.brand?.slug, limit: 5 });
  const waMessage = encodeURIComponent(`Hi, I'd like a wholesale quote for: ${product.name} (${product.storage ?? ''}). Quantity: `);

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '0.875rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#64748B', display: 'flex', gap: '0.375rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#2563EB' }}>Home</Link>
            <span>/</span>
            <Link href="/inventory" style={{ color: '#2563EB' }}>Inventory</Link>
            {product.brand && (
              <>
                <span>/</span>
                <Link href={`/brands/${product.brand.slug}`} style={{ color: '#2563EB' }}>{product.brand.name}</Link>
              </>
            )}
            <span>/</span>
            <span style={{ color: '#374151' }}>{product.model}</span>
          </nav>
        </div>
      </div>

      <div className="container-site section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Left: Image + Specs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Image */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'relative', paddingBottom: '75%' }}>
                {product.images[0] ? (
                  <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'contain', padding: '2rem' }} />
                ) : (
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.75rem',
                  }}>
                    <Package size={48} style={{ color: '#CBD5E1' }} />
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Image Coming Soon</span>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>Specifications</h3>
                </div>
                <div style={{ padding: '0.5rem 0' }}>
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} style={{
                      display: 'flex', padding: '0.625rem 1.25rem',
                      borderBottom: '1px solid #F1F5F9',
                    }}>
                      <span style={{ flex: '0 0 40%', fontSize: '0.8125rem', color: '#64748B', fontWeight: 500 }}>{key}</span>
                      <span style={{ fontSize: '0.8125rem', color: '#111827' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Info + RFQ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Product info */}
            <div>
              {product.brand && (
                <Link href={`/brands/${product.brand.slug}`} style={{
                  display: 'inline-block', fontSize: '0.8125rem', fontWeight: 700, color: '#2563EB',
                  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem',
                }}>
                  {product.brand.name}
                </Link>
              )}
              <h1 style={{ fontSize: 'clamp(1.375rem, 3vw, 1.875rem)', fontWeight: 800, color: '#0F172A', marginBottom: '0.875rem', lineHeight: 1.2 }}>
                {product.name}
              </h1>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <ConditionBadge condition={product.condition} />
                <StockBadge quantity={product.stock_quantity} />
              </div>

              {/* Key details grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {[
                  { label: 'Condition', value: formatCondition(product.condition) },
                  { label: 'Storage', value: product.storage ?? 'N/A' },
                  { label: 'Color', value: product.color ?? 'Various' },
                  { label: 'Battery', value: product.battery_health ? `${product.battery_health}%` : 'N/A' },
                  { label: 'Warranty', value: product.warranty ?? 'As-is' },
                  { label: 'MOQ', value: `${product.moq} units` },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '0.5rem',
                    padding: '0.625rem 0.875rem',
                  }}>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0F172A' }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.25rem' }}>
                <MapPin size={14} style={{ color: '#94a3b8' }} />
                <span style={{ fontSize: '0.875rem', color: '#64748B' }}>Origin: {product.country_of_origin}</span>
                <Shield size={14} style={{ color: '#94a3b8', marginLeft: '0.5rem' }} />
                <span style={{ fontSize: '0.875rem', color: '#64748B' }}>Verified Stock</span>
              </div>

              {/* Quick CTA */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                >
                  <MessageCircle size={16} /> WhatsApp Inquiry
                </a>
              </div>
            </div>

            {/* RFQ Form */}
            <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
              <div style={{ background: '#0F172A', padding: '1rem 1.25rem' }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.9375rem' }}>Request Wholesale Quote</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.8125rem', marginTop: '0.25rem' }}>Get pricing &amp; availability in under 2 hours</p>
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
            <div className="section-header">
              <div>
                <h2 className="section-title" style={{ fontSize: '1.375rem' }}>Related Products</h2>
                <p className="section-subtitle">More from {product.brand?.name}</p>
              </div>
              {product.brand && (
                <Link href={`/brands/${product.brand.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: '#2563EB' }}>
                  View All <ArrowRight size={14} />
                </Link>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.875rem' }}>
              {related.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr 1fr !important; }
          .related-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
