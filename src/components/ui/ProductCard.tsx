'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';
import { ConditionBadge } from './Badge';
import ProductPrice from './ProductPrice';
import { productImageUrl } from '@/lib/cloudinary';
import { useLanguage } from '@/contexts/LanguageContext';
import { fmt } from '@/lib/i18n';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import AddToQuoteButton from '@/components/cart/AddToQuoteButton';
import type { Product } from '@/types';

import { getWhatsAppNumber } from '@/lib/site-config';

const WHATSAPP = getWhatsAppNumber();

const BRAND_GRADIENT: Record<string, [string, string]> = {
  apple:   ['#1C1C1E', '#3A3A3C'],
  samsung: ['#1428A0', '#2F4FE0'],
  xiaomi:  ['#FF6900', '#FF8C00'],
  huawei:  ['#CF0A2C', '#E83048'],
  oppo:    ['#1D3461', '#3B5998'],
  vivo:    ['#415FFF', '#6B7FFF'],
};

function DevicePlaceholder({ brandSlug, category }: { brandSlug?: string; category?: string }) {
  const [c1, c2] = BRAND_GRADIENT[brandSlug ?? ''] ?? ['#FF6B00', '#FF8C33'];
  const isTablet = category === 'tablet';
  const isAudio  = category === 'airpods';
  return (
    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${c1}, ${c2})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isAudio ? (
        <div style={{ display: 'flex', gap: '8px' }}>
          {[0, 1].map(i => <div key={i} style={{ width: '16px', height: '28px', background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.4)', borderRadius: '8px' }} />)}
        </div>
      ) : isTablet ? (
        <div style={{ width: '56px', height: '68px', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '5px' }} />
      ) : (
        <div style={{ width: '34px', height: '62px', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '7px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '2px', background: 'rgba(255,255,255,0.5)', borderRadius: '9999px' }} />
        </div>
      )}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useLanguage();
  const [imgFailed, setImgFailed] = useState(false);
  const [useDirectUrl, setUseDirectUrl] = useState(false);
  const waLink = buildWhatsAppLink(lang, 'productInquiry', { name: product.name }, WHATSAPP);
  const rawSrc = product.images[0] ?? '';
  const imgSrc = rawSrc
    ? productImageUrl(rawSrc, { width: 800, quality: 90 }, useDirectUrl)
    : null;
  const isInStock  = product.stock_quantity > 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 15;

  return (
    <div className="pcard">
      <Link href={`/products/${product.slug}`} style={{ display: 'block', position: 'relative' }}>
        <div style={{ width: '100%', paddingBottom: '80%', position: 'relative', overflow: 'hidden', borderRadius: '0.875rem 0.875rem 0 0', background: '#F9FAFB' }}>
          {imgSrc && !imgFailed ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              quality={90}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ objectFit: 'contain', padding: '0.75rem' }}
              onError={() => {
                if (!useDirectUrl && rawSrc) {
                  setUseDirectUrl(true);
                  return;
                }
                setImgFailed(true);
              }}
            />
          ) : (
            <DevicePlaceholder brandSlug={product.brand?.slug} category={product.category} />
          )}
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 1 }}>
            <ConditionBadge condition={product.condition} />
          </div>
          <button className="pcard-heart" aria-label="Save to wishlist" onClick={(e) => { e.preventDefault(); }}>
            <Heart size={14} />
          </button>
        </div>
      </Link>

      <div style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1 }}>
        {product.brand && (
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FF6B00' }}>
            {product.brand.name}
          </span>
        )}

        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827', lineHeight: 1.3, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.name}
          </h3>
        </Link>

        <ProductPrice
          price_aed={product.price_aed}
          sale_price_aed={product.sale_price_aed}
          show_price={product.show_price}
          size="card"
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.125rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0, background: isInStock ? (isLowStock ? '#F59E0B' : '#10B981') : '#EF4444' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isInStock ? (isLowStock ? '#D97706' : '#059669') : '#DC2626' }}>
              {isInStock
                ? (isLowStock ? fmt(t.common.onlyLeft, { n: product.stock_quantity }) : t.common.inStock)
                : t.product.outOfStock}
            </span>
          </div>
          <span style={{ background: '#FFF7ED', color: '#C2410C', fontSize: '0.6875rem', fontWeight: 600, padding: '0.125rem 0.4rem', borderRadius: '4px' }}>
            {t.product.moq}: {product.moq}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.375rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
          <AddToQuoteButton product={product} />
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="pcard-wa-btn" aria-label="WhatsApp">
            <MessageCircle size={15} />
          </a>
        </div>
      </div>

      <style>{`
        .pcard-heart {
          position: absolute; top: 0.5rem; right: 0.5rem; z-index: 1;
          width: 30px; height: 30px; border-radius: 50%;
          background: #fff; border: 1.5px solid #EAEAEA;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #9CA3AF;
          transition: all 0.15s; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .pcard-heart:hover { color: #EF4444; border-color: #FCA5A5; background: #FFF1F2; }
        .pcard-quote-btn {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 0.625rem; border-radius: 8px;
          background: #FF6B00; color: #fff;
          font-size: 0.8125rem; font-weight: 700;
          text-decoration: none; transition: background 0.15s; min-height: 40px;
        }
        .pcard-quote-btn:hover { background: #E55A00; }
        .pcard-wa-btn {
          width: 40px; height: 40px; border-radius: 8px;
          background: #ECFDF5; color: #10B981; border: 1.5px solid #A7F3D0;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; flex-shrink: 0; transition: all 0.15s;
        }
        .pcard-wa-btn:hover { background: #10B981; color: #fff; border-color: #10B981; }
      `}</style>
    </div>
  );
}
