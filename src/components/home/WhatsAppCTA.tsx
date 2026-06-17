import Link from 'next/link';
import { MessageCircle, ArrowRight, Package, Clock, Globe } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

const stats = [
  { icon: Package, value: '500+', label: 'Products in Stock' },
  { icon: Clock, value: '< 2h', label: 'Response Time' },
  { icon: Globe, value: '50+', label: 'Countries Served' },
];

export default function WhatsAppCTA() {
  const waMessage = encodeURIComponent('Hi BIG PHONE, I need a bulk quote for mobile devices. Can you help?');

  return (
    <section style={{ background: '#0066FF', padding: '3.5rem 0' }}>
      <div className="container-site">
        <div className="cta-grid">

          <div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <stat.icon size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
                  <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff' }}>{stat.value}</span>
                  <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)' }}>{stat.label}</span>
                </div>
              ))}
            </div>

            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 800, color: '#fff',
              letterSpacing: '-0.025em', marginBottom: '0.75rem', lineHeight: 1.2,
            }}>
              Need Bulk Devices?<br />
              <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600, fontSize: '0.85em' }}>
                We respond within 2 hours.
              </span>
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', maxWidth: '440px', lineHeight: 1.65 }}>
              Chat directly with our wholesale team on WhatsApp or request a formal quotation from our B2B portal.
            </p>
          </div>

          {/* Center phone — desktop only */}
          <div className="cta-phone" aria-hidden="true">
            <div style={{ position: 'relative', width: '148px', margin: '0 auto' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80"
                alt=""
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  borderRadius: '22px',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.18)',
                  transform: 'rotate(-4deg)',
                  display: 'block',
                }}
              />
              {/* WhatsApp badge */}
              <div style={{
                position: 'absolute', bottom: '-12px', right: '-14px',
                background: '#25D366',
                borderRadius: '50%',
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}>
                <MessageCircle size={20} style={{ color: '#fff' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }} className="cta-actions">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-wa-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                background: '#fff', color: '#00A850',
                fontWeight: 700, fontSize: '1rem',
                padding: '0.875rem 1.75rem', borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                width: '100%', justifyContent: 'center',
              }}
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
            <Link
              href="/rfq"
              className="cta-rfq-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: 'transparent', color: '#fff',
                border: '2px solid rgba(255,255,255,0.6)',
                fontWeight: 600, fontSize: '1rem',
                padding: '0.875rem 1.75rem', borderRadius: '0.5rem',
                textDecoration: 'none', transition: 'all 0.15s', width: '100%',
              }}
            >
              Request Quotation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .cta-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .cta-phone { display: none; }
        @media (min-width: 768px) {
          .cta-grid { grid-template-columns: 1fr auto 1fr; }
          .cta-phone { display: flex; align-items: center; justify-content: center; padding: 1.5rem 0; }
          .cta-actions { align-items: stretch !important; }
        }
        .cta-wa-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(0,0,0,0.2) !important; }
        .cta-rfq-btn:hover { background: rgba(255,255,255,0.12) !important; border-color: #fff !important; }
      `}</style>
    </section>
  );
}
