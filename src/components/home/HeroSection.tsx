import Link from 'next/link';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function HeroSection() {
  const waMessage = encodeURIComponent('Hi BIG PHONE, I want to inquire about wholesale mobile devices.');

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 50%, #0F172A 100%)',
      minHeight: '65vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(37,99,235,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.08) 0%, transparent 40%)',
        pointerEvents: 'none',
      }} />

      <div className="container-site" style={{ position: 'relative', zIndex: 1, padding: '4rem 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Text content */}
          <div>
            {/* Eyebrow label */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: '9999px',
              padding: '0.375rem 0.875rem',
              marginBottom: '1.5rem',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#F59E0B', letterSpacing: '0.04em' }}>
                B2B Wholesale Supplier — UAE
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}>
              Premium Mobile Devices<br />
              <span style={{ color: '#F59E0B' }}>For Wholesale Buyers</span>
            </h1>

            <p style={{ fontSize: '1.0625rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px' }}>
              Refurbished &bull; Brand New &bull; Accessories<br />
              iPhones, Samsung, Xiaomi &amp; more — ready for bulk export.
            </p>

            {/* Trust bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              {['Grade A & Certified Refurbished Stock', 'MOQ from 5 units — Global Shipping', '500+ Products — Updated Daily'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <CheckCircle2 size={15} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/inventory" className="btn btn-primary btn-lg" style={{ gap: '0.5rem' }}>
                Browse Inventory
                <ArrowRight size={16} />
              </Link>
              <Link href="/rfq" className="btn btn-outline-white btn-lg">
                Request Quotation
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Visual side — placeholder for product image */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div style={{
              width: '280px', height: '280px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{
                fontSize: '8rem',
                filter: 'drop-shadow(0 0 40px rgba(37,99,235,0.3))',
                userSelect: 'none',
              }}>📱</div>

              {/* Floating stats */}
              {[
                { top: '10%', left: '-10%', label: '500+ Products', sub: 'In Stock' },
                { bottom: '10%', right: '-10%', label: '50+ Countries', sub: 'Exported To' },
              ].map((stat, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  top: stat.top, left: stat.left, bottom: stat.bottom, right: stat.right,
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  whiteSpace: 'nowrap',
                }}>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff' }}>{stat.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          section > div > div { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
