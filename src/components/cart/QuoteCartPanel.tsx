'use client';

import Link from 'next/link';
import { Trash2, ShoppingCart, Package, FileDown } from 'lucide-react';
import { useQuoteCart } from '@/contexts/QuoteCartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { fmt } from '@/lib/i18n';
import { formatCartItemLabel, getCartLineTotal } from '@/lib/quote-cart';
import { formatPriceAed } from '@/lib/pricing';
import { openQuotePdf } from '@/lib/quote-pdf';
import { getCompanyEmail, getWhatsAppNumber } from '@/lib/site-config';

const WHATSAPP = getWhatsAppNumber();
const COMPANY_EMAIL = getCompanyEmail();
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bigphone.ae';

type Props = {
  compact?: boolean;
  showEmptyHint?: boolean;
};

export default function QuoteCartPanel({ compact = false, showEmptyHint = true }: Props) {
  const { t } = useLanguage();
  const {
    items,
    count,
    totalUnits,
    estimatedTotal,
    pricedCount,
    updateQuantity,
    removeItem,
    clearCart,
  } = useQuoteCart();

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

  const hasPartialPricing = pricedCount > 0 && pricedCount < count;

  return (
    <div style={{
      background: '#FFF7ED',
      border: '1.5px solid #FED7AA',
      borderRadius: '0.875rem',
      overflow: 'hidden',
      marginBottom: compact ? '1.25rem' : 0,
    }}>
      <div
        className="quote-cart-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          padding: '0.875rem 1rem',
          background: '#FFEDD5',
          borderBottom: '1px solid #FED7AA',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingCart size={16} style={{ color: '#C2410C' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#9A3412' }}>
            {fmt(t.cart.itemsCount, { n: count })}
          </span>
        </div>
        <div className="quote-cart-header-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
        {items.map(item => {
          const lineTotal = getCartLineTotal(item);
          return (
            <div
              key={item.slug}
              className="quote-cart-row"
              style={{
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
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }} dir="ltr">
                  {item.unit_price_aed != null ? (
                    <>
                      AED {formatPriceAed(item.unit_price_aed)} × {item.quantity.toLocaleString('en-AE')}
                      {lineTotal != null && (
                        <span style={{ fontWeight: 700, color: '#111827', marginLeft: '0.375rem' }}>
                          = AED {formatPriceAed(lineTotal)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span style={{ fontStyle: 'italic' }}>{t.cart.priceOnRequest}</span>
                  )}
                </div>
              </div>

              <div className="quote-cart-row-actions">
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
                    flexShrink: 0,
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {estimatedTotal != null && (
        <div style={{
          padding: '0.875rem 1rem',
          background: '#FFEDD5',
          borderTop: '1px solid #FED7AA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9A3412', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {t.cart.estimatedTotal}
            </div>
            {hasPartialPricing && (
              <div style={{ fontSize: '0.6875rem', color: '#C2410C', marginTop: '0.125rem' }}>
                {t.cart.partialPricingNote}
              </div>
            )}
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#9A3412' }} dir="ltr">
            AED {formatPriceAed(estimatedTotal)}
          </div>
        </div>
      )}

      <div style={{ padding: '0.875rem 1rem', borderTop: '1px solid #F1F5F9' }}>
        <button
          type="button"
          onClick={() => openQuotePdf(items, {
            whatsapp: WHATSAPP, email: COMPANY_EMAIL, siteUrl: SITE_URL,
            estimatedTotal, totalUnits,
          })}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            width: '100%', padding: '0.75rem',
            background: '#fff', color: '#0B1829',
            border: '1.5px solid #CBD5E1', borderRadius: '0.625rem',
            fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <FileDown size={16} /> {t.cart.downloadPdf}
        </button>
      </div>
    </div>
  );
}
