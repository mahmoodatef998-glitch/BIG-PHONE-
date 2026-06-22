import Link from 'next/link';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function Footer() {
  return (
    <footer style={{ background: '#111827', color: '#9CA3AF', marginTop: 'auto' }}>
      <div className="container-site" style={{ padding: '3.5rem 1rem 2rem' }}>
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px', height: '32px', background: '#6C5CE7',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '14px' }}>B</span>
              </div>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.0625rem', letterSpacing: '-0.02em' }}>Big Phone</span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '280px', color: '#9CA3AF' }}>
              The ultimate mobile marketplace. Buy and sell new, used &amp; refurbished devices with confidence.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a href="mailto:info@bigphone.ae" className="footer-email-btn">
                <Mail size={14} /> Email Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-col-heading">Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { href: '/inventory', label: 'Browse Marketplace' },
                { href: '/brands',    label: 'All Stores' },
                { href: '/rfq',       label: 'Request Quotation' },
                { href: '/about',     label: 'About Us' },
                { href: '/contact',   label: 'Contact' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Top Brands */}
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
                <MapPin size={15} style={{ color: '#6C5CE7', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.875rem' }}>Dubai, United Arab Emirates</span>
              </li>
              <li style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                <Phone size={15} style={{ color: '#6C5CE7', flexShrink: 0 }} />
                <a href={`tel:+${WHATSAPP}`} className="footer-link">+{WHATSAPP}</a>
              </li>
              <li style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                <Mail size={15} style={{ color: '#6C5CE7', flexShrink: 0 }} />
                <a href="mailto:info@bigphone.ae" className="footer-link">info@bigphone.ae</a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: '2.5rem', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0 }}>
            &copy; {new Date().getFullYear()} Big Phone. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <span key={t} style={{ fontSize: '0.8125rem', color: '#6B7280' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid; grid-template-columns: 1fr; gap: 2.5rem;
        }
        @media (min-width: 640px)  { .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem 3rem; } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr; } }
        .footer-col-heading {
          color: #fff; font-size: 0.875rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 1rem;
        }
        .footer-link {
          font-size: 0.875rem; color: #9CA3AF;
          text-decoration: none; transition: color 0.15s;
        }
        .footer-link:hover { color: #fff; }
        .footer-email-btn {
          display: inline-flex; align-items: center; gap: 0.375rem;
          padding: 0.5rem 1rem; border-radius: 6px;
          background: rgba(255,255,255,0.08);
          color: #fff; border: 1px solid rgba(255,255,255,0.15);
          font-size: 0.8125rem; font-weight: 600;
          text-decoration: none; transition: background 0.15s;
        }
        .footer-email-btn:hover { background: rgba(255,255,255,0.15); }
      `}</style>
    </footer>
  );
}
