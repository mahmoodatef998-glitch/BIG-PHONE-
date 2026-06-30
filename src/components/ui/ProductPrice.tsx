'use client';

import { formatPriceAed, getProductPricing } from '@/lib/pricing';
import { useLanguage } from '@/contexts/LanguageContext';

type Props = {
  price_aed?: number | null;
  sale_price_aed?: number | null;
  show_price?: boolean;
  size?: 'card' | 'detail' | 'compact';
  showPerUnit?: boolean;
};

export default function ProductPrice({
  price_aed,
  sale_price_aed,
  show_price,
  size = 'card',
  showPerUnit = true,
}: Props) {
  const { t } = useLanguage();
  const pricing = getProductPricing({ price_aed, sale_price_aed, show_price });

  if (!pricing.showPrice) {
    return (
      <span style={{
        fontSize: size === 'detail' ? '0.9375rem' : '0.8125rem',
        color: '#9CA3AF',
        fontStyle: 'italic',
      }}>
        {t.product.priceOnRequest}
      </span>
    );
  }

  const mainSize = size === 'detail' ? '1.625rem' : size === 'compact' ? '0.875rem' : '1.0625rem';
  const originalSize = size === 'detail' ? '1rem' : '0.8125rem';
  const badgeSize = size === 'detail' ? '0.75rem' : '0.6875rem';

  if (pricing.hasDiscount && pricing.original != null && pricing.display != null) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: size === 'card' ? '0.125rem' : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: originalSize,
            color: '#9CA3AF',
            textDecoration: 'line-through',
            fontWeight: 600,
          }}>
            AED {formatPriceAed(pricing.original)}
          </span>
          {pricing.discountPercent != null && pricing.discountPercent > 0 && (
            <span style={{
              fontSize: badgeSize,
              fontWeight: 800,
              color: '#fff',
              background: '#EF4444',
              padding: '0.125rem 0.4rem',
              borderRadius: '9999px',
              letterSpacing: '0.02em',
            }}>
              -{pricing.discountPercent}%
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
          <span style={{
            fontSize: mainSize,
            fontWeight: 800,
            color: size === 'detail' ? '#0066FF' : '#FF6B00',
            letterSpacing: '-0.02em',
          }}>
            AED {formatPriceAed(pricing.display)}
          </span>
          {showPerUnit && (
            <span style={{ fontSize: size === 'detail' ? '0.875rem' : '0.75rem', color: '#9CA3AF', fontWeight: 500 }}>
              {t.common.perUnit}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginTop: size === 'card' ? '0.125rem' : 0 }}>
      <span style={{
        fontSize: mainSize,
        fontWeight: 800,
        color: size === 'detail' ? '#0066FF' : '#FF6B00',
        letterSpacing: '-0.02em',
      }}>
        AED {formatPriceAed(pricing.display)}
      </span>
      {showPerUnit && (
        <span style={{ fontSize: size === 'detail' ? '0.875rem' : '0.75rem', color: '#9CA3AF', fontWeight: 500 }}>
          {t.common.perUnit}
        </span>
      )}
    </div>
  );
}
