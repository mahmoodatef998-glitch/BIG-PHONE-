import Link from 'next/link';
import Image from 'next/image';
import { cloudinaryUrl } from '@/lib/cloudinary';
import type { Product, Condition } from '@/types';

const BRAND_COLORS: Record<string, string> = {
  apple:   '#1C1C1E',
  samsung: '#1428A0',
  xiaomi:  '#FF6900',
  huawei:  '#CF0A2C',
  oppo:    '#1D3461',
  vivo:    '#415FFF',
};

const REFURB_CONDITIONS: Condition[] = [
  'refurbished-grade-a',
  'refurbished-grade-b',
  'certified-refurbished',
];

function conditionLabel(cond: Condition): string {
  switch (cond) {
    case 'refurbished-grade-a':   return 'Grade A';
    case 'refurbished-grade-b':   return 'Grade B';
    case 'certified-refurbished': return 'Certified';
    default:                      return '';
  }
}

function getIphoneNum(name: string) {
  const m = name.match(/iphone\s*(\d+)/i);
  return m ? parseInt(m[1]) : 0;
}

function MiniCard({ product }: { product: Product }) {
  const imgSrc = product.images[0]
    ? cloudinaryUrl(product.images[0], { width: 220, quality: 80 })
    : null;
  const brandColor = BRAND_COLORS[product.brand?.slug ?? ''] ?? '#FF6B00';
  const isRefurb = REFURB_CONDITIONS.includes(product.condition);
  const label = conditionLabel(product.condition);

  return (
    <Link href={`/products/${product.slug}`} className="pop-card">
      <div className="pop-card-img">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="180px"
            style={{ objectFit: 'contain', padding: '8px' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${brandColor}18, ${brandColor}38)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '44px', height: '78px',
              background: brandColor + '28',
              border: `2px solid ${brandColor}50`,
              borderRadius: '8px',
            }} />
          </div>
        )}
        {isRefurb && label && (
          <span style={{
            position: 'absolute', top: '6px', left: '6px',
            fontSize: '0.5625rem', fontWeight: 700,
            padding: '2px 6px', borderRadius: '4px',
            background: product.condition === 'certified-refurbished' ? '#ECFDF5' : '#FFF7ED',
            color: product.condition === 'certified-refurbished' ? '#059669' : '#C2410C',
          }}>{label}</span>
        )}
      </div>
      <div className="pop-card-info">
        {product.brand && (
          <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: brandColor, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            {product.brand.name}
          </span>
        )}
        <h4 className="pop-card-name">{product.name}</h4>
        {product.price_aed && product.show_price !== false ? (
          <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#FF6B00', letterSpacing: '-0.01em' }}>
            AED {product.price_aed.toLocaleString()}
          </span>
        ) : (
          <span style={{ fontSize: '0.6875rem', color: '#9CA3AF', fontStyle: 'italic' }}>Price on Request</span>
        )}
      </div>
    </Link>
  );
}

interface SectionProps {
  title: string;
  subtitle: string;
  accentColor: string;
  accentBg: string;
  products: Product[];
  href: string;
  featured?: boolean;
}

function ListingSection({ title, subtitle, accentColor, accentBg, products, href, featured }: SectionProps) {
  if (products.length === 0) return null;
  return (
    <div className="pop-section" style={{
      borderLeft: `4px solid ${accentColor}`,
      background: featured ? accentBg : '#fff',
    }}>
      <div className="pop-section-header">
        <div>
          <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#111827', margin: '0 0 0.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: accentColor, borderRadius: '50%', flexShrink: 0 }} />
            {title}
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0 }}>{subtitle}</p>
        </div>
        <Link href={href} style={{ fontSize: '0.8125rem', fontWeight: 600, color: accentColor, whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0 }}>
          View All →
        </Link>
      </div>
      <div className="pop-scroll">
        {products.map(p => <MiniCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}

export default function PopularListings({ products }: { products: Product[] }) {
  const accessories = products
    .filter(p => p.category === 'accessory')
    .slice(0, 10);

  const refurbishedPhones = products
    .filter(p =>
      REFURB_CONDITIONS.includes(p.condition) &&
      (p.brand?.slug === 'apple' || p.name.toLowerCase().includes('iphone'))
    )
    .sort((a, b) => getIphoneNum(a.name) - getIphoneNum(b.name))
    .slice(0, 14);

  const newPhones = products
    .filter(p => p.condition === 'brand-new' && p.brand?.slug !== 'apple')
    .sort((a, b) => (b.price_aed ?? 0) - (a.price_aed ?? 0))
    .slice(0, 12);

  if (!accessories.length && !refurbishedPhones.length && !newPhones.length) return null;

  return (
    <>
      <section className="section">
        <div className="container-site">
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FF6B00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>Curated For You</p>
            <h2 className="section-title">Popular Listings</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <ListingSection
              featured
              title="Accessories"
              subtitle="Cases, chargers, earbuds & more — top picks"
              accentColor="#FF6B00"
              accentBg="#FFF7F0"
              products={accessories}
              href="/inventory?category=accessory"
            />
            <ListingSection
              title="Refurbished iPhones"
              subtitle="iPhone 11 Pro Max → 17 Pro Max — certified & graded"
              accentColor="#10B981"
              accentBg="#F0FDF4"
              products={refurbishedPhones}
              href="/inventory?brand=apple&category=smartphone&refurbished=1"
            />
            <ListingSection
              title="New Phones"
              subtitle="Samsung, Xiaomi, Huawei & more — latest models"
              accentColor="#3B82F6"
              accentBg="#EFF6FF"
              products={newPhones}
              href="/inventory?condition=brand-new&excludeBrand=apple"
            />
          </div>
        </div>
      </section>

      <style>{`
        .pop-section {
          padding: 1.375rem 1.5rem;
          border-radius: 1.125rem;
          border: 1.5px solid #EAEAEA;
        }
        .pop-section-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 1rem;
          margin-bottom: 1.125rem;
        }
        .pop-scroll {
          display: flex; gap: 0.75rem;
          overflow-x: auto; padding-bottom: 0.375rem;
          scrollbar-width: none;
        }
        .pop-scroll::-webkit-scrollbar { display: none; }
        @media (min-width: 640px) {
          .pop-scroll {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow-x: unset; gap: 0.875rem;
          }
        }
        @media (min-width: 1024px) {
          .pop-scroll { grid-template-columns: repeat(6, 1fr); }
        }
        .pop-card {
          flex-shrink: 0; min-width: 152px; width: 152px;
          background: #fff; border-radius: 0.875rem;
          border: 1.5px solid #EAEAEA; overflow: hidden;
          text-decoration: none; display: flex; flex-direction: column;
          transition: all 0.18s;
        }
        @media (min-width: 640px) { .pop-card { width: auto; min-width: unset; } }
        .pop-card:hover {
          border-color: #FFB366;
          box-shadow: 0 6px 20px rgba(255,107,0,0.10);
          transform: translateY(-2px);
        }
        .pop-card-img {
          width: 100%; padding-bottom: 82%;
          position: relative; background: #F9FAFB;
        }
        .pop-card-info {
          padding: 0.5rem 0.625rem 0.625rem;
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .pop-card-name {
          font-size: 0.8125rem; font-weight: 700;
          color: #111827; line-height: 1.3; margin: 0;
          overflow: hidden; display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
      `}</style>
    </>
  );
}
