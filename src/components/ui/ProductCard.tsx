import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Package, MessageCircle } from 'lucide-react';
import { ConditionBadge, StockBadge } from './Badge';
import type { Product } from '@/types';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const waMessage = encodeURIComponent(`Hi, I'm interested in ${product.name}. Can you provide pricing for wholesale quantity?`);
  const waLink = `https://wa.me/${WHATSAPP}?text=${waMessage}`;

  return (
    <div className="product-card" style={{ height: '100%' }}>
      {/* Image */}
      <Link href={`/products/${product.slug}`} style={{ display: 'block', position: 'relative' }}>
        <div style={{
          width: '100%',
          paddingBottom: '66.67%',
          position: 'relative',
          background: '#F8FAFC',
          overflow: 'hidden',
        }}>
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ objectFit: 'contain', padding: '1rem' }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '0.5rem',
            }}>
              <Package size={32} style={{ color: '#CBD5E1' }} />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No Image</span>
            </div>
          )}
          {/* Condition badge overlay */}
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}>
            <ConditionBadge condition={product.condition} />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {/* Brand + Model */}
        <div>
          {product.brand && (
            <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
              {product.brand.name}
            </p>
          )}
          <Link href={`/products/${product.slug}`}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', lineHeight: 1.35, marginBottom: '0.375rem' }}>
              {product.model}
              {product.storage && ` ${product.storage}`}
            </h3>
          </Link>
        </div>

        {/* Specs row */}
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {product.storage && (
            <span style={{ fontSize: '0.75rem', color: '#64748B', background: '#F1F5F9', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>{product.storage}</span>
          )}
          {product.color && (
            <span style={{ fontSize: '0.75rem', color: '#64748B', background: '#F1F5F9', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>{product.color}</span>
          )}
          {product.battery_health && (
            <span style={{ fontSize: '0.75rem', color: '#64748B', background: '#F1F5F9', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>{product.battery_health}% Battery</span>
          )}
        </div>

        {/* Stock & MOQ */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
          <StockBadge quantity={product.stock_quantity} />
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>MOQ: {product.moq} units</span>
        </div>

        {/* Country */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <MapPin size={12} style={{ color: '#94a3b8' }} />
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{product.country_of_origin}</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <Link
            href={`/rfq?product=${encodeURIComponent(product.name)}`}
            className="btn btn-primary btn-sm"
            style={{ flex: 1, fontSize: '0.75rem' }}
          >
            Request Quote
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
            style={{
              background: '#F0FDF4',
              color: '#16A34A',
              border: '1px solid #BBF7D0',
              padding: '0.5rem 0.625rem',
              flexShrink: 0,
            }}
            aria-label="WhatsApp"
          >
            <MessageCircle size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
