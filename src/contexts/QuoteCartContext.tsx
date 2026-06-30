'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product, QuoteCartItem } from '@/types';
import {
  QUOTE_CART_STORAGE_KEY,
  MAX_QUOTE_CART_ITEMS,
  cartItemFromProduct,
  cartItemKey,
  parseStoredCart,
  computeCartEstimatedTotal,
  countPricedCartItems,
} from '@/lib/quote-cart';

interface QuoteCartCtx {
  items: QuoteCartItem[];
  count: number;
  totalUnits: number;
  estimatedTotal: number | null;
  pricedCount: number;
  addItem: (product: Product, quantity?: number) => boolean;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  hasItem: (slug: string) => boolean;
}

const QuoteCartContext = createContext<QuoteCartCtx>({
  items: [],
  count: 0,
  totalUnits: 0,
  estimatedTotal: null,
  pricedCount: 0,
  addItem: () => false,
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  hasItem: () => false,
});

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(parseStoredCart(localStorage.getItem(QUOTE_CART_STORAGE_KEY)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(QUOTE_CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity?: number) => {
    const next = cartItemFromProduct(product, quantity);
    let added = false;

    setItems(prev => {
      if (prev.length >= MAX_QUOTE_CART_ITEMS && !prev.some(i => i.slug === next.slug)) {
        return prev;
      }
      const key = cartItemKey(next);
      const existing = prev.find(i => cartItemKey(i) === key);
      if (existing) {
        added = true;
        return prev.map(i =>
          cartItemKey(i) === key
            ? {
                ...i,
                quantity: Math.max(i.moq, i.quantity + next.quantity),
                unit_price_aed: next.unit_price_aed,
              }
            : i,
        );
      }
      added = true;
      return [...prev, next];
    });

    return added;
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setItems(prev =>
      prev.map(i => {
        if (i.slug !== slug) return i;
        const qty = Math.max(i.moq, Math.min(1_000_000, Math.floor(quantity) || i.moq));
        return { ...i, quantity: qty };
      }),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems(prev => prev.filter(i => i.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const hasItem = useCallback(
    (slug: string) => items.some(i => i.slug === slug),
    [items],
  );

  const totalUnits = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const estimatedTotal = useMemo(() => computeCartEstimatedTotal(items), [items]);
  const pricedCount = useMemo(() => countPricedCartItems(items), [items]);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      totalUnits,
      estimatedTotal,
      pricedCount,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      hasItem,
    }),
    [items, totalUnits, estimatedTotal, pricedCount, addItem, updateQuantity, removeItem, clearCart, hasItem],
  );

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
    </QuoteCartContext.Provider>
  );
}

export const useQuoteCart = () => useContext(QuoteCartContext);
