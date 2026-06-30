'use client';

import { useState } from 'react';
import { ShoppingCart, Check, Plus } from 'lucide-react';
import { useQuoteCart } from '@/contexts/QuoteCartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Product } from '@/types';

type Props = {
  product: Product;
  quantity?: number;
  variant?: 'card' | 'detail' | 'compact';
  className?: string;
};

export default function AddToQuoteButton({ product, quantity, variant = 'card', className }: Props) {
  const { t } = useLanguage();
  const { addItem, hasItem } = useQuoteCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = hasItem(product.slug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = addItem(product, quantity);
    if (ok) {
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1800);
    }
  };

  if (variant === 'card') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={className ?? 'pcard-quote-btn'}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.375rem',
          padding: '0.625rem',
          borderRadius: '8px',
          background: justAdded ? '#059669' : inCart ? '#111827' : '#FF6B00',
          color: '#fff',
          fontSize: '0.8125rem',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
          minHeight: '40px',
          transition: 'background 0.15s',
        }}
      >
        {justAdded ? <><Check size={15} /> {t.cart.added}</> : inCart ? <><ShoppingCart size={15} /> {t.cart.addMore}</> : <><Plus size={15} /> {t.cart.addToQuote}</>}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="btn btn-outline btn-sm"
        style={{ width: '100%' }}
      >
        {justAdded ? t.cart.added : inCart ? t.cart.addMore : t.cart.addToQuote}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '100%',
        padding: '0.75rem',
        background: justAdded ? '#059669' : inCart ? '#111827' : '#FF6B00',
        color: '#fff',
        borderRadius: '10px',
        fontWeight: 700,
        fontSize: '0.9375rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      {justAdded ? <><Check size={18} /> {t.cart.added}</> : inCart ? <><ShoppingCart size={18} /> {t.cart.addMore}</> : <><ShoppingCart size={18} /> {t.cart.addToQuote}</>}
    </button>
  );
}
