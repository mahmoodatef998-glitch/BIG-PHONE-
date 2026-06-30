'use client';

import Link from 'next/link';
import { Trash2, ShoppingCart, Package } from 'lucide-react';
import { useQuoteCart } from '@/contexts/QuoteCartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { fmt } from '@/lib/i18n';
import { formatCartItemLabel } from '@/lib/quote-cart';

type Props = {
  compact?: boolean;
  showEmptyHint?: boolean;
};

export default function QuoteCartPanel({ compact = false, showEmptyHint = true }: Props) {
  const { t } = useLanguage();
  const { items, count, totalUnits, updateQuantity, removeItem, clearCart } = useQuoteCart();

  if (count === 0) {
    if (!showEmptyHint) return null;
    return (
      <div style={{
        background: '#F8FAFC',
        border: '1.5px dashed #CBD5E1',
        borderRadius: '0.875rem',
        padding: compact ? '1.25rem' : '1.5rem',
        textAlign: 'center',
      }}>
        <ShoppingCart size={28} style={{ color: '#94A3B8', marginBottom: '0.75rem' }} />
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.9375rem', fontWeight: 700, color: '#374151' }}>
          {t.cart.emptyTitle}
        </p>
        <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.6 }}>
          {t.cart.emptySub}
        </p>
        <Link href="/inventory" className="btn btn-primary btn-sm">
          {t.cart.browseInventory}
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      background: '#FFF7ED',
      border: '1.5px solid #FED7AA',
      borderRadius: '0.875rem',
      overflow: 'hidden',
      marginBottom: compact ? '1.25rem' : 0,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        padding: '0.875rem 1rem',
        background: '#FFEDD5',
        borderBottom: '1px solid #FED7AA',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingCart size={16} style={{ color: '#C2410C' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#9A3412' }}>
            {fmt(t.cart.itemsCount, { n: count })}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9A3412' }}>
            {fmt(t.cart.totalUnits, { n: totalUnits.toLocaleString('en-AE') })}
          </span>
          <button
            type="button"
            onClick={clearCart}
            style={{
              background: 'none',
              border: 'none',
              color: '#C2410C',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            {t.cart.clearAll}
          </button>
        </div>
      </div>

      <div style={{ maxHeight: compact ? '280px' : '420px', overflowY: 'auto' }}>
        {items.map(item => (
          <div
            key={item.slug}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              gap: '0.625rem',
              alignItems: 'center',
              padding: '0.875rem 1rem',
              borderBottom: '1px solid #FFEDD5',
              background: '#fff',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#111827',
                lineHeight: 1.35,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {formatCartItemLabel(item)}
              </div>
              {item.brand_name && (
                <div style={{ fontSize: '0.6875rem', color: '#64748B', marginTop: '0.125rem' }}>
                  {item.brand_name} · {t.product.moq} {item.moq}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Package size={12} style={{ color: '#94A3B8', flexShrink: 0 }} />
              <input
                type="number"
                min={item.moq}
                max={1000000}
                value={item.quantity}
                onChange={e => updateQuantity(item.slug, Number(e.target.value))}
                aria-label={`${t.rfq.quantity} — ${item.name}`}
                style={{
                  width: '72px',
                  padding: '0.375rem 0.5rem',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.375rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
                dir="ltr"
              />
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.slug)}
              aria-label={t.cart.removeItem}
              style={{
                width: '32px',
                height: '32px',
                border: '1px solid #FECACA',
                background: '#FEF2F2',
                color: '#DC2626',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
