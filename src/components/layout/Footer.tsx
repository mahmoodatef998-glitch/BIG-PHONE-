import Link from 'next/link';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#94a3b8', marginTop: 'auto' }}>
      <div className="container-site" style={{ padding: '3.5rem 1rem 2rem' }}>
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px', height: '32px',
                background: '#0B1829', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#0066FF', fontWeight: 800, fontSize: '14px' }}>B</span>
              </div>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.0625rem', letterSpacing: '-0.02em' }}>BIG PHONE</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '280px', color: '#94a3b8' }}>
              Leading B2B wholesale supplier of refurbished and brand new smartphones, tablets and accessories.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href="mailto:info@bigphone.ae"
                className="btn btn-sm footer-email-btn"
              >
                <Mail size={14} /> Email Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-col-heading">Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { href: '/inventory', label: 'Browse Inventory' },
                { href: '/brands',    label: 'Shop by Brand' },
                { href: '/rfq',       label: 'Request Quotation' },
                { href: '/about',     label: 'About Us' },
                { href: '/contact',   label: 'Contact' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="footer-col-heading">Top Brands</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Oppo', 'Vivo'].map(brand => (
                <li key={brand}>
                  <Link href={`/brands/${brand.toLowerCase()}`} className="footer-link">{brand} Devices</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-col-heading">Contact</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                <MapPin size={15} style={{ color: '#0066FF', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.875rem' }}>Dubai, United Arab Emirates</span>
              </li>
              <li style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                <Phone size={15} style={{ color: '#0066FF', flexShrink: 0 }} />
                <a href={`tel:+${WHATSAPP}`} className="footer-link">+{WHATSAPP}</a>
              </li>
              <li style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                <Mail size={15} style={{ color: '#0066FF', flexShrink: 0 }} />
                <a href="mailto:info@bigphone.ae" className="footer-link">info@bigphone.ae</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: '2.5rem', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>
            © {new Date().getFullYear()} BIG PHONE. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <span key={t} style={{ fontSize: '0.8125rem', color: '#64748B' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem 3rem; }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr; }
        }
        .footer-col-heading {
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 1rem;
        }
        .footer-link {
          font-size: 0.875rem;
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.15s;
        }
        .footer-link:hover { color: #fff; }
        .footer-email-btn {
          background: rgba(255,255,255,0.08) !important;
          color: #fff !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
        }
      `}</style>
    </footer>
  );
}
