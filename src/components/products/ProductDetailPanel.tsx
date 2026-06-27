'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageCircle, MapPin, Shield } from 'lucide-react';
import { ConditionBadge, StockBadge } from '@/components/ui/Badge';
import RFQForm from '@/components/rfq/RFQForm';
import { formatCondition } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Product } from '@/types';
import type { StorageVariant } from '@/lib/product-variants';
import { productToStorageVariant } from '@/lib/product-variants';

interface Props {
  product: Product;
  variants: StorageVariant[];
  whatsappNumber: string;
}

function findVariant(variants: StorageVariant[], slug: string, fallback: StorageVariant): StorageVariant {
  return variants.find(v => v.slug === slug) ?? fallback;
}

export default function ProductDetailPanel({ product, variants, whatsappNumber }: Props) {
  const { t } = useLanguage();
  const router = useRouter();
  const initial = useMemo(
    () => findVariant(variants, product.slug, productToStorageVariant(product)),
    [variants, product],
  );
  const [selected, setSelected] = useState<StorageVariant>(initial);
  const hasVariants = variants.length > 1;

  const handleStorageSelect = (variant: StorageVariant) => {
    setSelected(variant);
    if (variant.slug !== product.slug) {
      router.replace(`/products/${variant.slug}`, { scroll: false });
    }
  };

  const waMessage = encodeURIComponent(
    `Hi, I'd like a wholesale quote for: ${selected.name}${selected.storage ? ` ${selected.storage}` : ''}. Quantity: `,
  );

  const showPrice = selected.show_price !== false && selected.price_aed != null && selected.price_aed > 0;
  const isOutOfStock = selected.stock_quantity === 0;

  const specRows = [
    { label: t.product.condition, value: formatCondition(product.condition) },
    { label: t.product.storage, value: selected.storage || product.storage || 'N/A' },
    { label: t.product.color, value: selected.color ?? product.color ?? 'Various' },
    { label: t.product.battery, value: product.battery_health ? `${product.battery_health}%` : 'N/A' },
    { label: t.product.warranty, value: product.warranty ?? 'As-is' },
    {
      label: t.product.available,
      value: isOutOfStock ? t.product.outOfStock : `${selected.stock_quantity} ${t.common.units}`,
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
          {hasVariants ? product.model : product.name}
        </h1>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <ConditionBadge condition={product.condition} />
          <StockBadge quantity={selected.stock_quantity} />
        </div>

        {hasVariants && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              {t.product.storage}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {variants.map(variant => {
                const active = variant.slug === selected.slug;
                const out = variant.stock_quantity === 0;
                return (
                  <button
                    key={variant.slug}
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
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem', marginBottom: '1.25rem', padding: '0.875rem 1rem', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px' }}>
            <span style={{ fontSize: '1.625rem', fontWeight: 800, color: '#0066FF', letterSpacing: '-0.03em' }}>
              AED {selected.price_aed!.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500 }}>{t.common.perUnit} · {t.product.moq} {selected.moq}</span>
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

        <a
          href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
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
            {t.rfq.subtitle}
          </p>
        </div>
        <div style={{ padding: '1.25rem' }}>
          <RFQForm key={selected.slug} defaultProduct={selected.name} compact />
        </div>
      </div>
    </>
  );
}
