import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Brand } from '@/types';

interface BrandsGridProps {
  brands: Brand[];
}

const BRAND_ICONS: Record<string, string> = {
  apple: '🍎',
  samsung: '📱',
  xiaomi: '📲',
  huawei: '🔷',
  oppo: '🟢',
  vivo: '🔵',
};

const BRAND_CHIPS: Record<string, { bg: string; color: string; letter: string }> = {
  apple:   { bg: '#1A1A1A', color: '#fff', letter: 'A' },
  samsung: { bg: '#1428A0', color: '#fff', letter: 'S' },
  xiaomi:  { bg: '#FF6900', color: '#fff', letter: 'X' },
  huawei:  { bg: '#CF0A2C', color: '#fff', letter: 'H' },
  oppo:    { bg: '#1F1F1F', color: '#fff', letter: 'O' },
  vivo:    { bg: '#415FFF', color: '#fff', letter: 'V' },
};

const EXTRA_CATEGORIES = [
  { name: 'Tablets', slug: 'tablets', icon: '📋', count: 48, href: '/inventory?category=tablet' },
  { name: 'Accessories', slug: 'accessories', icon: '🎧', count: 120, href: '/inventory?category=accessory' },
];

export default function BrandsGrid({ brands }: BrandsGridProps) {
  return (
    <section style={{ background: '#fff', padding: '1.5rem 0', borderBottom: '1px solid #DDE3EA' }}>
      <div className="container-site">
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          gap: '1rem',
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1A2332', letterSpacing: '-0.01em' }}>
            Shop by Brand
          </h2>
          <Link
            href="/brands"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              fontSize: '0.8125rem', fontWeight: 600,
              color: '#0066FF', textDecoration: 'none', flexShrink: 0,
            }}
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {/* Pills scroll row */}
        <div style={{
          display: 'flex',
          gap: '0.625rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '0.25rem',
        }} className="brands-scroll">
          {brands.map((brand) => {
            const chip = BRAND_CHIPS[brand.slug];
            return (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#F0F4F8',
                  border: '1.5px solid #DDE3EA',
                  borderRadius: '9999px',
                  padding: '0.625rem 1.25rem',
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#1A2332',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#E5F0FF';
                  e.currentTarget.style.borderColor = '#0066FF';
                  e.currentTarget.style.color = '#0066FF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#F0F4F8';
                  e.currentTarget.style.borderColor = '#DDE3EA';
                  e.currentTarget.style.color = '#1A2332';
                }}
              >
                {chip ? (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px', height: '20px',
                    background: chip.bg,
                    color: chip.color,
                    borderRadius: '4px',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    flexShrink: 0,
                  }}>
                    {chip.letter}
                  </span>
                ) : (
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{BRAND_ICONS[brand.slug] ?? '📱'}</span>
                )}
                <span>{brand.name}</span>
                <span style={{ color: '#8B9DB5', fontSize: '0.8125rem', fontWeight: 500 }}>
                  {brand.product_count}
                </span>
              </Link>
            );
          })}

          {EXTRA_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#F0F4F8',
                border: '1.5px solid #DDE3EA',
                borderRadius: '9999px',
                padding: '0.625rem 1.25rem',
                whiteSpace: 'nowrap',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#1A2332',
                textDecoration: 'none',
                transition: 'all 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#E5F0FF';
                e.currentTarget.style.borderColor = '#0066FF';
                e.currentTarget.style.color = '#0066FF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F0F4F8';
                e.currentTarget.style.borderColor = '#DDE3EA';
                e.currentTarget.style.color = '#1A2332';
              }}
            >
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{cat.icon}</span>
              <span>{cat.name}</span>
              <span style={{ color: '#8B9DB5', fontSize: '0.8125rem', fontWeight: 500 }}>
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .brands-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
