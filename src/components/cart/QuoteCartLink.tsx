'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useQuoteCart } from '@/contexts/QuoteCartContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function QuoteCartLink() {
  const { count } = useQuoteCart();
  const { t } = useLanguage();

  const label = count > 0
    ? `${t.cart.cartLabel} (${count})`
    : t.cart.cartLabel;

  return (
    <Link
      href="/rfq"
      aria-label={label}
      title={label}
      className="hdr-icon-btn"
      style={{
        position: 'relative',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ShoppingCart size={18} strokeWidth={2.25} />
      {count > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            minWidth: '18px',
            height: '18px',
            padding: '0 5px',
            borderRadius: '9999px',
            background: '#FF6B00',
            color: '#fff',
            fontSize: '0.625rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
            border: '2px solid #fff',
            boxShadow: '0 1px 4px rgba(255,107,0,0.35)',
          }}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
