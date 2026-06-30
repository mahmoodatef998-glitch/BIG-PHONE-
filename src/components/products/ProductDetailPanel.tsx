'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageCircle, MapPin, Shield } from 'lucide-react';
import { ConditionBadge, StockBadge } from '@/components/ui/Badge';
import ProductPrice from '@/components/ui/ProductPrice';
import RFQForm from '@/components/rfq/RFQForm';
import QuoteCartPanel from '@/components/cart/QuoteCartPanel';
import AddToQuoteButton from '@/components/cart/AddToQuoteButton';
import { useQuoteCart } from '@/contexts/QuoteCartContext';
import { conditionLabel } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { colorSwatchHex } from '@/lib/iphone-catalog';
import { getProductPricing } from '@/lib/pricing';
import type { Product } from '@/types';
import type { StorageVariant, ColorVariant } from '@/lib/product-variants';
import { productToStorageVariant, productToColorVariant } from '@/lib/product-variants';

interface Props {
  product: Product;
  storageVariants: StorageVariant[];
  colorVariants: ColorVariant[];
  whatsappNumber: string;
}

function findStorageVariant(variants: StorageVariant[], slug: string, fallback: StorageVariant): StorageVariant {
  return variants.find(v => v.slug === slug) ?? fallback;
}

function findColorVariant(variants: ColorVariant[], slug: string, fallback: ColorVariant): ColorVariant {
  return variants.find(v => v.slug === slug) ?? fallback;
}

export default function ProductDetailPanel({ product, storageVariants, colorVariants, whatsappNumber }: Props) {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const { count } = useQuoteCart();
  const [quoteQty, setQuoteQty] = useState(product.moq);

  const storageFallback = useMemo(() => productToStorageVariant(product), [product]);
  const colorFallback = useMemo(() => productToColorVariant(product), [product]);

  const initialStorage = useMemo(
    () => findStorageVariant(storageVariants, product.slug, storageFallback),
    [storageVariants, product.slug, storageFallback],
  );
  const initialColor = useMemo(
    () => findColorVariant(colorVariants, product.slug, colorFallback),
    [colorVariants, product.slug, colorFallback],
  );

  const [selectedStorage, setSelectedStorage] = useState<StorageVariant>(initialStorage);
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(initialColor);

  const hasStorageVariants = storageVariants.length > 1;
  const hasColorVariants = colorVariants.length > 1;

  const activeVariant = useMemo(() => {
    const colorMatch = colorVariants.find(v => v.slug === product.slug);
    const storageMatch = storageVariants.find(v => v.slug === product.slug);
    if (colorMatch) return colorMatch;
    if (storageMatch) return { ...storageMatch, color: selectedColor.color };
    return {
      slug: product.slug,
      price_aed: product.price_aed ?? null,
      sale_price_aed: product.sale_price_aed ?? null,
      show_price: product.show_price ?? true,
      stock_quantity: product.stock_quantity,
      moq: product.moq,
      name: product.name,
      color: product.color ?? '',
      storage: product.storage,
    } as ColorVariant;
  }, [product, colorVariants, storageVariants, selectedColor.color]);

  const quoteProduct = useMemo<Product>(() => ({
    ...product,
    slug: activeVariant.slug,
    name: activeVariant.name,
    stock_quantity: activeVariant.stock_quantity,
    moq: activeVariant.moq,
    color: activeVariant.color || product.color,
    storage: activeVariant.storage ?? product.storage,
  }), [product, activeVariant]);

  const navigateTo = (slug: string) => {
    if (slug !== product.slug) {
      router.replace(`/products/${slug}`, { scroll: false });
    }
  };

  const handleColorSelect = (variant: ColorVariant) => {
    setSelectedColor(variant);
    navigateTo(variant.slug);
  };

  const handleStorageSelect = (variant: StorageVariant) => {
    setSelectedStorage(variant);
    navigateTo(variant.slug);
  };

  const displayName = hasStorageVariants || hasColorVariants ? product.model : product.name;
  const waLink = buildWhatsAppLink(
    lang,
    'productQuote',
    {
      name: `${activeVariant.name}${selectedStorage.storage ? ` ${selectedStorage.storage}` : ''}${selectedColor.color ? ` ${selectedColor.color}` : ''}`,
    },
    whatsappNumber,
  );

  const pricing = getProductPricing({
    price_aed: activeVariant.price_aed,
    sale_price_aed: activeVariant.sale_price_aed,
    show_price: activeVariant.show_price,
  });
  const showPrice = pricing.showPrice;
  const isOutOfStock = activeVariant.stock_quantity === 0;

  useEffect(() => {
    setQuoteQty(Math.max(activeVariant.moq, product.moq));
  }, [activeVariant.slug, activeVariant.moq, product.moq]);

  const specRows = [
    { label: t.product.condition, value: conditionLabel(product.condition, t) },
    { label: t.product.storage, value: selectedStorage.storage || product.storage || t.product.na },
    { label: t.product.color, value: selectedColor.color || product.color || t.product.various },
    { label: t.product.battery, value: product.battery_health ? `${product.battery_health}%` : t.product.na },
    { label: t.product.warranty, value: product.warranty ?? t.product.asIs },
    {
      label: t.product.available,
      value: isOutOfStock ? t.product.outOfStock : `${activeVariant.stock_quantity} ${t.common.units}`,
    },
  ];

  return (
    <>
      <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '14px', padding: '1.5rem' }}>
        {product.brand && (
          <Link href={`/brands/${product.brand.slug}`} style={{
            display: 'inline-block', fontSize: '0.6875rem', fontWeight: 700, color: '#0066FF',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem',
            background: '#E5F0FF', padding: '0.125rem 0.5rem', borderRadius: '4px',
            textDecoration: 'none',
          }}>
            {product.brand.name}
          </Link>
        )}

        <h1 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800, color: '#0B1829', marginBottom: '0.75rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {displayName}
        </h1>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <ConditionBadge condition={product.condition} />
          <StockBadge quantity={activeVariant.stock_quantity} />
        </div>

        {hasColorVariants && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              {t.product.color}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {colorVariants.map(variant => {
                const active = variant.slug === product.slug || variant.color === selectedColor.color;
                const out = variant.stock_quantity === 0;
                const swatch = colorSwatchHex(variant.color);
                return (
                  <button
                    key={variant.slug}
                    type="button"
                    aria-pressed={active}
                    title={variant.color}
                    onClick={() => handleColorSelect(variant)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: active ? '2px solid #0066FF' : '1.5px solid #DDE3EA',
                      background: active ? '#EFF6FF' : '#fff',
                      color: active ? '#0066FF' : out ? '#94A3B8' : '#374151',
                      opacity: out && !active ? 0.75 : 1,
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                  >
                    <span style={{
                      width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0,
                      background: swatch,
                      border: '1px solid rgba(0,0,0,0.12)',
                    }} />
                    {variant.color}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {hasStorageVariants && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              {t.product.storage}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {storageVariants.map(variant => {
                const active = variant.slug === product.slug || variant.storage === selectedStorage.storage;
                const out = variant.stock_quantity === 0;
                return (
                  <button
                    key={`${variant.storage}-${variant.slug}`}
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleStorageSelect(variant)}
                    style={{
                      padding: '0.5rem 0.875rem',
                      borderRadius: '8px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: active ? '2px solid #0066FF' : '1.5px solid #DDE3EA',
                      background: active ? '#EFF6FF' : '#fff',
                      color: active ? '#0066FF' : out ? '#94A3B8' : '#374151',
                      opacity: out && !active ? 0.75 : 1,
                      minWidth: '72px',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                  >
                    {variant.storage}
                    {out && <span style={{ display: 'block', fontSize: '0.625rem', fontWeight: 600, color: '#EF4444', marginTop: '0.125rem' }}>{t.product.outOfStock}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {showPrice ? (
          <div style={{ marginBottom: '1.25rem', padding: '0.875rem 1rem', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px' }}>
            <ProductPrice
              price_aed={activeVariant.price_aed}
              sale_price_aed={activeVariant.sale_price_aed}
              show_price={activeVariant.show_price}
              size="detail"
            />
            <span style={{ display: 'block', marginTop: '0.375rem', fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>
              {t.product.moq} {activeVariant.moq}
            </span>
          </div>
        ) : (
          <div style={{ marginBottom: '1.25rem', padding: '0.75rem 1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
            <span style={{ fontSize: '0.9375rem', color: '#64748B', fontStyle: 'italic' }}>{t.product.priceOnRequest}</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem', marginBottom: '1.25rem' }}>
          {specRows.map(({ label, value }) => (
            <div key={label} style={{
              background: '#F8FAFC',
              border: '1px solid #DDE3EA',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
            }}>
              <div style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>{label}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: isOutOfStock && label === t.product.available ? '#DC2626' : '#0B1829' }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={13} style={{ color: '#94a3b8' }} />
            <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>{t.product.origin}: {product.country_of_origin}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Shield size={13} style={{ color: '#00A850' }} />
            <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>{t.product.verifiedStock}</span>
          </div>
        </div>

        <div style={{ marginBottom: '1rem', padding: '0.875rem', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '10px' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#C2410C', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
            {t.cart.addToQuote}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.625rem' }}>
            <label htmlFor="quote-qty" style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600, whiteSpace: 'nowrap' }}>
              {t.rfq.quantity}
            </label>
            <input
              id="quote-qty"
              type="number"
              min={quoteProduct.moq}
              value={quoteQty}
              onChange={e => setQuoteQty(Math.max(quoteProduct.moq, Number(e.target.value) || quoteProduct.moq))}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #E2E8F0',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 700,
              }}
              dir="ltr"
            />
          </div>
          <AddToQuoteButton product={quoteProduct} quantity={quoteQty} variant="detail" />
          {count > 0 && (
            <Link
              href="/rfq"
              style={{
                display: 'block',
                marginTop: '0.625rem',
                textAlign: 'center',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#C2410C',
                textDecoration: 'none',
              }}
            >
              {t.cart.cartLabel} ({count})
            </Link>
          )}
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={isOutOfStock}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            width: '100%', padding: '0.75rem',
            background: isOutOfStock ? '#94A3B8' : '#00A850',
            color: '#fff',
            borderRadius: '10px', fontWeight: 700, fontSize: '0.9375rem',
            textDecoration: 'none', border: 'none',
            pointerEvents: isOutOfStock ? 'none' : 'auto',
            opacity: isOutOfStock ? 0.7 : 1,
          }}
        >
          <MessageCircle size={18} />
          {isOutOfStock ? t.product.outOfStock : t.product.whatsappInquiry}
        </a>
      </div>

      <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ background: '#0B1829', padding: '1rem 1.25rem' }}>
          <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.9375rem', margin: 0 }}>{t.rfq.title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', marginTop: '0.25rem', marginBottom: 0 }}>
            {count > 0 ? t.cart.submitAllHint : t.rfq.subtitle}
          </p>
        </div>
        <div style={{ padding: '1.25rem' }}>
          <QuoteCartPanel compact showEmptyHint={false} />
          <RFQForm key={`${product.slug}-${count}`} defaultProduct={activeVariant.name} compact hideCartPanel />
        </div>
      </div>
    </>
  );
}
