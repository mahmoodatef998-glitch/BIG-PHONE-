'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useQuoteCart } from '@/contexts/QuoteCartContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function QuoteCartLink({ compact = false }: { compact?: boolean }) {
  const { count } = useQuoteCart();
  const { t } = useLanguage();

  return (
    <Link
      href="/rfq"
      aria-label={count > 0 ? `${t.cart.viewQuoteList} (${count})` : t.cart.viewQuoteList}
      className="hdr-icon-btn"
      style={{ position: 'relative', textDecoration: 'none', minWidth: compact ? '38px' : 'auto', padding: compact ? 0 : '0 0.625rem', gap: '0.375rem', display: 'inline-flex' }}
    >
      <ShoppingCart size={17} />
      {!compact && count > 0 && (
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>
          {t.cart.shortLabel}
        </span>
      )}
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          minWidth: '18px',
          height: '18px',
          padding: '0 4px',
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
        }}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}
