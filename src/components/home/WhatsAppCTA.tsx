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
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'center',
        }} className="cta-grid">

          {/* Left: text content */}
          <div>
            {/* Stats row */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}>
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
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.025em',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
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

          {/* Right: action buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'flex-start',
          }} className="cta-actions">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                background: '#fff',
                color: '#00A850',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '0.875rem 1.75rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                width: '100%',
                justifyContent: 'center',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
              }}
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
            <Link
              href="/rfq"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: '#fff',
                border: '2px solid rgba(255,255,255,0.6)',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '0.875rem 1.75rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.15s',
                width: '100%',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#fff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.6)';
              }}
            >
              Request Quotation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .cta-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-actions { align-items: stretch !important; }
        }
      `}</style>
    </section>
  );
}
