import Link from 'next/link';
import { Search, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

const POPULAR = [
  { label: 'iPhone 16 Pro Max', href: '/inventory?search=iPhone+16+Pro' },
  { label: 'Samsung S25 Ultra', href: '/inventory?search=Samsung+S25' },
  { label: 'AirPods Pro 2', href: '/inventory?search=AirPods+Pro' },
  { label: 'iPad Pro M4', href: '/inventory?search=iPad+Pro' },
  { label: 'Grade A iPhones', href: '/inventory?search=iPhone&condition=refurbished-grade-a' },
  { label: 'Accessories', href: '/inventory?category=accessory' },
];

const STATS = [
  { value: '500+', label: 'Products in Stock' },
  { value: '50+', label: 'Countries Exported' },
  { value: '< 2h', label: 'Response Time' },
  { value: '10K+', label: 'B2B Clients' },
];

const TRUST = [
  'Grade A & Certified Stock',
  'MOQ from 5 Units',
  'Export Documentation',
  '24/7 WhatsApp Support',
];

const CATEGORIES = [
  { label: 'All Devices', value: '' },
  { label: 'Smartphones', value: 'smartphone' },
  { label: 'Tablets', value: 'tablet' },
  { label: 'Accessories', value: 'accessory' },
  { label: 'Earbuds & Audio', value: 'airpods' },
];

export default function HeroSection() {
  const waMsg = encodeURIComponent('Hi BIG PHONE, I want to inquire about wholesale mobile devices.');

  return (
    <section style={{
      background: 'linear-gradient(160deg, #0B1829 0%, #0D2040 60%, #0B1829 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(ellipse at 50% -10%, rgba(0,102,255,0.2) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 90%, rgba(0,60,160,0.12) 0%, transparent 50%)
        `,
      }} />

      {/* Main content */}
      <div className="container-site" style={{ position: 'relative', zIndex: 1, padding: '3.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: '740px', margin: '0 auto', textAlign: 'center' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(0,102,255,0.15)',
            border: '1px solid rgba(0,102,255,0.35)',
            borderRadius: '9999px',
            padding: '0.375rem 1rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4D94FF', display: 'inline-block' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>
              B2B Wholesale Supplier &middot; Dubai, UAE
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontSize: 'clamp(1.875rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '0.875rem',
          }}>
            Source Premium Mobile Devices<br />
            <span style={{ color: '#4D94FF' }}>At Wholesale Prices</span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.65,
            marginBottom: '2rem',
          }}>
            iPhones &bull; Samsung &bull; Tablets &bull; Accessories &bull; Earbuds<br />
            Grade A, Certified Refurbished &amp; Brand New &mdash; bulk export ready
          </p>

          {/* Search bar */}
          <form action="/inventory" method="GET" style={{ marginBottom: '1rem' }}>
            <div style={{
              display: 'flex',
              background: '#fff',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              border: '2px solid rgba(77,148,255,0.2)',
            }}>
              {/* Category select */}
              <select
                name="category"
                aria-label="Select category"
                style={{
                  border: 'none',
                  borderRight: '1.5px solid #DDE3EA',
                  background: '#F8FAFC',
                  color: '#374151',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  padding: '0 0.875rem',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: '140px',
                  flexShrink: 0,
                }}
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>

              {/* Search input */}
              <input
                type="search"
                name="search"
                placeholder="Search iPhone 16, Galaxy S25, AirPods Pro..."
                aria-label="Search products"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  padding: '0.9375rem 1rem',
                  fontSize: '0.9375rem',
                  color: '#1A2332',
                  background: 'transparent',
                  minWidth: 0,
                }}
              />

              {/* Search button */}
              <button
                type="submit"
                style={{
                  background: '#0066FF',
                  color: '#fff',
                  border: 'none',
                  padding: '0 1.25rem',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexShrink: 0,
                  transition: 'background 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                <Search size={16} />
                <span className="search-label">Search</span>
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
            justifyContent: 'center', marginBottom: '2rem',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
              Popular:
            </span>
            {POPULAR.map(p => (
              <Link
                key={p.label}
                href={p.href}
                style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '9999px',
                  padding: '0.3125rem 0.875rem',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
              >
                {p.label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{
            display: 'flex', gap: '0.75rem',
            justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: '3rem',
          }}>
            <Link href="/rfq" className="btn btn-primary btn-lg" style={{ gap: '0.5rem' }}>
              Request a Quote
              <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg"
              style={{ background: '#00A850', color: '#fff', gap: '0.5rem' }}
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>

          {/* Stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
          }} className="stats-grid">
            {STATS.map((stat, i) => (
              <div key={stat.value} style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '1.125rem 0.75rem',
                textAlign: 'center',
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.1,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '0.25rem',
                  fontWeight: 500,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '0.875rem 0',
        position: 'relative', zIndex: 1,
      }}>
        <div className="container-site">
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '1.5rem', flexWrap: 'wrap',
          }}>
            {TRUST.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                <CheckCircle size={14} style={{ color: '#4ADE80', flexShrink: 0 }} />
                <span style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(255,255,255,0.8)',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .search-label { display: none; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div:nth-child(2n+1) { border-left: none !important; }
          .stats-grid > div:nth-child(3),
          .stats-grid > div:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.08); }
        }
      `}</style>
    </section>
  );
}
