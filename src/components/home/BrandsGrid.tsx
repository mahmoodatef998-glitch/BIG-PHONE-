import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Brand } from '@/types';

interface BrandsGridProps {
  brands: Brand[];
}

const BRAND_CHIPS: Record<string, { bg: string; color: string; letter: string }> = {
  apple:   { bg: '#1A1A1A', color: '#fff', letter: 'A' },
  samsung: { bg: '#1428A0', color: '#fff', letter: 'S' },
  xiaomi:  { bg: '#FF6900', color: '#fff', letter: 'X' },
  huawei:  { bg: '#CF0A2C', color: '#fff', letter: 'H' },
  oppo:    { bg: '#1F1F1F', color: '#fff', letter: 'O' },
  vivo:    { bg: '#415FFF', color: '#fff', letter: 'V' },
};

const EXTRA_CHIPS: Record<string, { bg: string; color: string; letter: string }> = {
  tablets:     { bg: '#0066FF', color: '#fff', letter: 'T' },
  accessories: { bg: '#B45309', color: '#fff', letter: '+' },
};

const EXTRA_CATEGORIES = [
  { name: 'Tablets',     slug: 'tablets',     count: 48,  href: '/inventory?category=tablet' },
  { name: 'Accessories', slug: 'accessories', count: 120, href: '/inventory?category=accessory' },
];

function ChipBadge({ chip }: { chip: { bg: string; color: string; letter: string } }) {
  return (
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
  );
}

export default function BrandsGrid({ brands }: BrandsGridProps) {
  return (
    <section style={{ background: '#fff', padding: '1.25rem 0', borderBottom: '1px solid #DDE3EA' }}>
      <div className="container-site">
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.875rem', gap: '1rem',
        }}>
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A2332', letterSpacing: '-0.01em' }}>
            Shop by Brand
          </h2>
          <Link href="/brands" style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            fontSize: '0.8125rem', fontWeight: 600,
            color: '#0066FF', textDecoration: 'none', flexShrink: 0,
          }}>
            View All <ArrowRight size={12} />
          </Link>
        </div>

        <div
          style={{
            display: 'flex', gap: '0.5rem',
            overflowX: 'auto', scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '0.125rem',
          }}
          className="brands-scroll"
        >
          {brands.map((brand) => {
            const chip = BRAND_CHIPS[brand.slug];
            return (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="brand-pill"
              >
                {chip && <ChipBadge chip={chip} />}
                <span>{brand.name}</span>
                <span className="brand-count">{brand.product_count}</span>
              </Link>
            );
          })}

          {EXTRA_CATEGORIES.map((cat) => {
            const chip = EXTRA_CHIPS[cat.slug];
            return (
              <Link key={cat.slug} href={cat.href} className="brand-pill">
                {chip && <ChipBadge chip={chip} />}
                <span>{cat.name}</span>
                <span className="brand-count">{cat.count}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .brands-scroll::-webkit-scrollbar { display: none; }
        .brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #F0F4F8;
          border: 1.5px solid #DDE3EA;
          border-radius: 9999px;
          padding: 0.5625rem 1.125rem;
          white-space: nowrap;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1A2332;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          flex-shrink: 0;
          cursor: pointer;
        }
        .brand-pill:hover {
          background: #E5F0FF;
          border-color: #0066FF;
          color: #0066FF;
        }
        .brand-count {
          color: #8B9DB5;
          font-size: 0.8125rem;
          font-weight: 500;
          transition: color 0.15s;
        }
        .brand-pill:hover .brand-count { color: #60A5FA; }
      `}</style>
    </section>
  );
}
