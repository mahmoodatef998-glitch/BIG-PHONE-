import Link from 'next/link';
import Image from 'next/image';
import { Package, MessageCircle } from 'lucide-react';
import { ConditionBadge } from './Badge';
import type { Product } from '@/types';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

interface ProductCardProps {
  product: Product;
}

function StockIndicator({ quantity }: { quantity: number }) {
  if (quantity === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#DC2626', flexShrink: 0 }} />
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#DC2626' }}>Out of Stock</span>
      </div>
    );
  }
  if (quantity <= 20) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F97316', flexShrink: 0 }} />
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F97316' }}>Only {quantity} left</span>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00A850', flexShrink: 0 }} />
      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#00A850' }}>{quantity} units</span>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const waMessage = encodeURIComponent(`Hi, I'm interested in ${product.name}. Can you provide pricing for wholesale quantity?`);
  const waLink = `https://wa.me/${WHATSAPP}?text=${waMessage}`;

  return (
    <div className="product-card" style={{ height: '100%' }}>
      {/* Image area — 4:3 ratio */}
      <Link href={`/products/${product.slug}`} style={{ display: 'block', position: 'relative' }}>
        <div style={{
          width: '100%',
          paddingBottom: '75%',
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
              background: '#F8FAFC',
            }}>
              <Package size={32} style={{ color: '#C5CDD8' }} />
              <span style={{ fontSize: '0.75rem', color: '#8B9DB5' }}>No Image</span>
            </div>
          )}

          {/* Condition badge — top left overlay */}
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 1 }}>
            <ConditionBadge condition={product.condition} />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>

        {/* Brand chip */}
        {product.brand && (
          <div>
            <span style={{
              display: 'inline-block',
              background: '#E5F0FF',
              color: '#0066FF',
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0.125rem 0.5rem',
              borderRadius: '4px',
            }}>
              {product.brand.name}
            </span>
          </div>
        )}

        {/* Model name */}
        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontSize: '0.9375rem',
            fontWeight: 700,
            color: '#1A2332',
            lineHeight: 1.3,
            margin: 0,
          }}>
            {product.model}
            {product.storage && ` ${product.storage}`}
          </h3>
        </Link>

        {/* Color variant */}
        {product.color && (
          <p style={{ fontSize: '0.8125rem', color: '#8B9DB5', margin: 0 }}>{product.color}</p>
        )}

        {/* Spec pills */}
        {(product.storage || product.battery_health) && (
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {product.storage && (
              <span style={{
                background: '#F0F4F8', color: '#4B5563',
                fontSize: '0.75rem', fontWeight: 500,
                padding: '0.1875rem 0.5rem', borderRadius: '4px',
              }}>
                {product.storage}
              </span>
            )}
            {product.battery_health && (
              <span style={{
                background: '#F0F4F8', color: '#4B5563',
                fontSize: '0.75rem', fontWeight: 500,
                padding: '0.1875rem 0.5rem', borderRadius: '4px',
              }}>
                {product.battery_health}% 🔋
              </span>
            )}
            {product.country_of_origin && (
              <span style={{
                background: '#F0F4F8', color: '#4B5563',
                fontSize: '0.75rem', fontWeight: 500,
                padding: '0.1875rem 0.5rem', borderRadius: '4px',
              }}>
                {product.country_of_origin}
              </span>
            )}
          </div>
        )}

        {/* Stock row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '0.125rem',
        }}>
          <StockIndicator quantity={product.stock_quantity} />
          <span style={{
            background: '#FFF7E6',
            color: '#B45309',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.125rem 0.5rem',
            borderRadius: '4px',
          }}>
            MOQ: {product.moq}
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.375rem' }}>
          <Link
            href={`/rfq?product=${encodeURIComponent(product.name)}`}
            className="btn btn-primary"
            style={{
              flex: 1,
              fontSize: '0.8125rem',
              height: '36px',
              padding: '0 0.75rem',
            }}
          >
            Request Quote
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: '#ECFDF5',
              color: '#00A850',
              border: '1.5px solid #BBF7D0',
              width: '36px',
              height: '36px',
              padding: 0,
              flexShrink: 0,
            }}
            aria-label="WhatsApp"
          >
            <MessageCircle size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
