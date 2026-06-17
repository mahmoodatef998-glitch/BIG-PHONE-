import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { ConditionBadge } from './Badge';
import type { Product } from '@/types';
import { cloudinaryUrl } from '@/lib/cloudinary';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

const BRAND_GRADIENT: Record<string, [string, string]> = {
  apple:   ['#1C1C1E', '#3A3A3C'],
  samsung: ['#1428A0', '#2F4FE0'],
  xiaomi:  ['#FF6900', '#FF8C00'],
  huawei:  ['#CF0A2C', '#E83048'],
  oppo:    ['#1D3461', '#3B5998'],
  vivo:    ['#415FFF', '#6B7FFF'],
};

function DevicePlaceholder({ category, brandSlug }: { category: string; brandSlug?: string }) {
  const [from, to] = BRAND_GRADIENT[brandSlug ?? ''] ?? ['#0B1829', '#1A2D47'];
  const isTablet    = category === 'tablet';
  const isAudio     = category === 'airpods';
  const isAccessory = category === 'accessory';

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(135deg, ${from}, ${to})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {isAudio ? (
        <div style={{ display: 'flex', gap: '7px', alignItems: 'flex-end' }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              width: '16px', height: '30px',
              background: 'rgba(255,255,255,0.18)',
              border: '1.5px solid rgba(255,255,255,0.38)',
              borderRadius: '8px',
            }} />
          ))}
        </div>
      ) : isTablet ? (
        <div style={{
          width: '58px', height: '70px',
          background: 'rgba(255,255,255,0.12)',
          border: '2px solid rgba(255,255,255,0.35)',
          borderRadius: '6px',
        }} />
      ) : isAccessory ? (
        <div style={{
          width: '46px', height: '46px',
          background: 'rgba(255,255,255,0.12)',
          border: '2px solid rgba(255,255,255,0.35)',
          borderRadius: '10px',
        }} />
      ) : (
        <div style={{
          width: '34px', height: '60px',
          background: 'rgba(255,255,255,0.12)',
          border: '2px solid rgba(255,255,255,0.35)',
          borderRadius: '6px', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)',
            width: '11px', height: '2px',
            background: 'rgba(255,255,255,0.45)', borderRadius: '9999px',
          }} />
          <div style={{
            position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)',
            width: '10px', height: '10px',
            border: '1.5px solid rgba(255,255,255,0.38)', borderRadius: '50%',
          }} />
        </div>
      )}
    </div>
  );
}

function StockDot({ qty }: { qty: number }) {
  const cfg =
    qty === 0   ? { color: '#DC2626', label: 'Out of stock' } :
    qty <= 20   ? { color: '#EA580C', label: `Only ${qty} left` } :
                  { color: '#16A34A', label: `${qty >= 100 ? '100+' : qty} in stock` };
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600, color: cfg.color }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cfg.color, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const waMsg = encodeURIComponent(`Hi, I'm interested in ${product.name}. Please share wholesale pricing.`);
  const imgSrc = product.images[0]
    ? cloudinaryUrl(product.images[0], { width: 400, quality: 85 })
    : null;

  return (
    <div className="pcard">
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        style={{ display: 'block', position: 'relative', paddingBottom: '75%', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
            style={{ objectFit: 'contain', padding: '1rem' }}
          />
        ) : (
          <DevicePlaceholder category={product.category} brandSlug={product.brand?.slug} />
        )}

        {/* Condition badge */}
        <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 2 }}>
          <ConditionBadge condition={product.condition} />
        </div>

        {/* Stock count badge */}
        {product.stock_quantity > 0 && (
          <div style={{
            position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 2,
            background: 'rgba(0,0,0,0.55)', borderRadius: '4px',
            padding: '2px 6px', fontSize: '0.6875rem', fontWeight: 700, color: '#fff',
          }}>
            {product.stock_quantity >= 100 ? '100+' : product.stock_quantity}
          </div>
        )}
      </Link>

      {/* Content */}
      <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1 }}>

        {/* Brand pill */}
        {product.brand && (
          <span style={{
            display: 'inline-block', alignSelf: 'flex-start',
            fontSize: '0.6875rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.07em',
            color: '#0066FF', background: '#E5F0FF',
            padding: '0.1rem 0.45rem', borderRadius: '4px',
          }}>{product.brand.name}</span>
        )}

        {/* Model */}
        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0B1829', lineHeight: 1.3, margin: 0 }}>
            {product.model}{product.storage ? ` ${product.storage}` : ''}
          </h3>
        </Link>

        {/* Meta chips */}
        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
          {product.color && (
            <span className="meta-chip">{product.color}</span>
          )}
          {product.battery_health && (
            <span className="meta-chip">{product.battery_health}% batt</span>
          )}
          {product.warranty && (
            <span className="meta-chip">{product.warranty}</span>
          )}
        </div>

        {/* Stock + MOQ */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.2rem' }}>
          <StockDot qty={product.stock_quantity} />
          <span style={{
            fontSize: '0.6875rem', fontWeight: 700,
            color: '#B45309', background: '#FEF3C7',
            padding: '0.125rem 0.45rem', borderRadius: '4px',
          }}>MOQ {product.moq}</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.375rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
          <Link
            href={`/rfq?product=${encodeURIComponent(product.name)}`}
            className="btn btn-primary"
            style={{ flex: 1, fontSize: '0.75rem', height: '34px', padding: '0 0.625rem' }}
          >
            Get Quote
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="btn"
            style={{ background: '#DCFCE7', color: '#16A34A', border: '1.5px solid #BBF7D0', width: '34px', height: '34px', padding: 0, flexShrink: 0 }}
            aria-label="WhatsApp inquiry"
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
          display: flex;
          flex-direction: column;
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
          cursor: pointer;
          height: 100%;
        }
        .pcard:hover {
          border-color: #0066FF;
          box-shadow: 0 4px 20px rgba(0,102,255,0.1);
          transform: translateY(-2px);
        }
        .meta-chip {
          font-size: 0.6875rem;
          color: #64748B;
          background: #F1F5F9;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
