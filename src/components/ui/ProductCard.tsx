import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { ConditionBadge } from './Badge';
import { cloudinaryUrl } from '@/lib/cloudinary';
import type { Product } from '@/types';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

const BRAND_GRADIENT: Record<string, [string, string]> = {
  apple:   ['#1C1C1E', '#3A3A3C'],
  samsung: ['#1428A0', '#2F4FE0'],
  xiaomi:  ['#FF6900', '#FF8C00'],
  huawei:  ['#CF0A2C', '#E83048'],
  oppo:    ['#1D3461', '#3B5998'],
  vivo:    ['#415FFF', '#6B7FFF'],
};

function DevicePlaceholder({ brandSlug, category }: { brandSlug?: string; category?: string }) {
  const [c1, c2] = BRAND_GRADIENT[brandSlug ?? ''] ?? ['#1A2332', '#2D3748'];
  const isTablet = category === 'tablet';
  const isAudio  = category === 'airpods';

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(135deg, ${c1}, ${c2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {isAudio ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              width: '16px', height: '28px',
              background: 'rgba(255,255,255,0.18)',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: '8px',
            }} />
          ))}
        </div>
      ) : isTablet ? (
        <div style={{
          width: '56px', height: '68px',
          background: 'rgba(255,255,255,0.12)',
          border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: '5px',
        }} />
      ) : (
        <div style={{
          width: '34px', height: '62px',
          background: 'rgba(255,255,255,0.12)',
          border: '2px solid rgba(255,255,255,0.4)',
          borderRadius: '7px', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)',
            width: '10px', height: '2px',
            background: 'rgba(255,255,255,0.5)', borderRadius: '9999px',
          }} />
          <div style={{
            position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)',
            width: '10px', height: '10px',
            border: '1.5px solid rgba(255,255,255,0.45)', borderRadius: '50%',
          }} />
        </div>
      )}
    </div>
  );
}

function StockDot({ quantity }: { quantity: number }) {
  if (quantity === 0) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', flexShrink: 0 }} />
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#DC2626' }}>Out of Stock</span>
    </div>
  );
  if (quantity <= 20) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F97316', flexShrink: 0 }} />
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F97316' }}>Only {quantity} left</span>
    </div>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00A850', flexShrink: 0 }} />
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#00A850' }}>{quantity} units</span>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const waMessage = encodeURIComponent(`Hi, I'm interested in ${product.name}. Can you provide pricing for wholesale quantity?`);
  const waLink = `https://wa.me/${WHATSAPP}?text=${waMessage}`;
  const imgSrc = product.images[0] ? cloudinaryUrl(product.images[0], { width: 400, quality: 85 }) : null;

  return (
    <div className="pcard">
      <Link href={`/products/${product.slug}`} style={{ display: 'block', position: 'relative' }}>
        <div style={{ width: '100%', paddingBottom: '75%', position: 'relative', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ objectFit: 'contain', padding: '1rem', background: '#F8FAFC' }}
            />
          ) : (
            <DevicePlaceholder brandSlug={product.brand?.slug} category={product.category} />
          )}
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 1 }}>
            <ConditionBadge condition={product.condition} />
          </div>
          {product.stock_quantity > 0 && product.stock_quantity <= 15 && (
            <div style={{
              position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 1,
              background: 'rgba(249,115,22,0.9)', color: '#fff',
              fontSize: '10px', fontWeight: 700,
              padding: '2px 6px', borderRadius: '4px',
            }}>
              Only {product.stock_quantity} left
            </div>
          )}
        </div>
      </Link>

      <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {product.brand && (
          <span style={{
            display: 'inline-block', background: '#E5F0FF', color: '#0066FF',
            fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', padding: '0.125rem 0.4rem', borderRadius: '3px',
          }}>
            {product.brand.name}
          </span>
        )}

        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A2332', lineHeight: 1.3, margin: 0 }}>
            {product.model}{product.storage && ` ${product.storage}`}
          </h3>
        </Link>

        {product.color && (
          <p style={{ fontSize: '0.75rem', color: '#8B9DB5', margin: 0 }}>{product.color}</p>
        )}

        {product.battery_health && (
          <span style={{ background: '#F0F4F8', color: '#4B5563', fontSize: '0.6875rem', fontWeight: 500, padding: '0.125rem 0.4rem', borderRadius: '3px', alignSelf: 'flex-start' }}>
            {product.battery_health}% batt
          </span>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.125rem' }}>
          <StockDot quantity={product.stock_quantity} />
          <span style={{ background: '#FFF7E6', color: '#B45309', fontSize: '0.6875rem', fontWeight: 600, padding: '0.125rem 0.4rem', borderRadius: '3px' }}>
            MOQ: {product.moq}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.375rem', marginTop: 'auto', paddingTop: '0.25rem' }}>
          <Link
            href={`/rfq?product=${encodeURIComponent(product.name)}`}
            className="btn btn-primary"
            style={{ flex: 1, fontSize: '0.75rem', height: '34px', padding: '0 0.625rem' }}
          >
            Request Quote
          </Link>
          <a
            href={waLink}
            target="_blank" rel="noopener noreferrer"
            className="btn"
            style={{ background: '#ECFDF5', color: '#00A850', border: '1.5px solid #BBF7D0', width: '34px', height: '34px', padding: 0, flexShrink: 0 }}
            aria-label="WhatsApp"
          >
            <MessageCircle size={14} />
          </a>
        </div>
      </div>

      <style>{`
        .pcard {
          background: #fff;
          border: 1.5px solid #DDE3EA;
          border-radius: 12px;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
          cursor: pointer;
        }
        .pcard:hover {
          border-color: #0066FF;
          box-shadow: 0 6px 24px rgba(0,102,255,0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
