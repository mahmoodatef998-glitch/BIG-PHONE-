import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

const statTiles = [
  { value: '500+', label: 'Products', sub: 'in Stock' },
  { value: '< 2h', label: 'Response', sub: 'Time' },
  { value: '50+', label: 'Countries', sub: 'Exported' },
  { value: 'A Grade', label: 'Certified', sub: 'Quality' },
];

const trustItems = [
  '500+ Products in Stock',
  'Grade A Certified',
  'Response < 2 Hours',
  'Export to 50+ Countries',
];

export default function HeroSection() {
  const waMessage = encodeURIComponent('Hi BIG PHONE, I want to inquire about wholesale mobile devices.');

  return (
    <section style={{
      background: '#0B1829',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(0,102,255,0.12) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(0,102,255,0.07) 0%, transparent 45%)',
        pointerEvents: 'none',
      }} />

      {/* Main hero content */}
      <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
          padding: '3rem 0',
        }} className="hero-grid">

          {/* Text content */}
          <div>
            {/* Eyebrow badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(0,102,255,0.15)',
              border: '1px solid rgba(0,102,255,0.35)',
              borderRadius: '9999px',
              padding: '0.375rem 0.875rem',
              marginBottom: '1.5rem',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0066FF', display: 'inline-block' }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>
                B2B Wholesale Supplier — Dubai, UAE
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}>
              Premium Mobile Devices<br />
              <span style={{ color: '#0066FF' }}>For Wholesale Buyers</span>
            </h1>

            <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px' }}>
              Refurbished &bull; Brand New &bull; Accessories<br />
              iPhones, Samsung, Xiaomi &amp; more — ready for bulk export.
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/inventory" className="btn btn-primary btn-lg" style={{ gap: '0.5rem' }}>
                Browse Inventory
                <ArrowRight size={16} />
              </Link>
              <Link href="/rfq" className="btn btn-outline-white btn-lg">
                Request Quote
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg"
                style={{
                  background: '#00A850',
                  color: '#fff',
                  gap: '0.5rem',
                }}
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Stat tiles — shown on desktop */}
          <div style={{ display: 'none' }} className="hero-stats">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.875rem',
            }}>
              {statTiles.map((tile) => (
                <div key={tile.value} style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '0.25rem' }}>
                    {tile.value}
                  </div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{tile.label}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.125rem' }}>{tile.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div style={{
        background: 'rgba(255,255,255,0.06)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '1rem 0',
        position: 'relative',
        zIndex: 1,
      }}>
        <div className="container-site">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}>
            {trustItems.map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                {i > 0 && (
                  <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.2)', marginRight: '0.5rem', flexShrink: 0 }} />
                )}
                <span style={{ color: '#0066FF', fontWeight: 700, fontSize: '0.875rem' }}>✓</span>
                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; padding: 5rem 0 !important; }
          .hero-stats { display: block !important; }
        }
        .hero-grid div:first-child + .hero-stats + div { display: none; }
        .container-site > div > div:last-child::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
