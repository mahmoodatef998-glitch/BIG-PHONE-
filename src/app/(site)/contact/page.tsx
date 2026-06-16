import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';
import RFQForm from '@/components/rfq/RFQForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with BIG PHONE wholesale team. WhatsApp, email or fill the contact form.',
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '2.5rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: '#2563EB' }}>Home</Link> / Contact
          </nav>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1rem', color: '#64748B', marginTop: '0.5rem' }}>
            Our wholesale team is ready to help with pricing, stock and shipping.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* WhatsApp — primary */}
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.15s',
                }}
              >
                <div style={{
                  width: '48px', height: '48px',
                  background: '#25D366',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <MessageCircle size={22} style={{ color: '#fff' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9375rem' }}>WhatsApp (Preferred)</div>
                  <div style={{ fontSize: '0.875rem', color: '#16a34a', marginTop: '0.125rem' }}>Fastest response — chat now</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '0.25rem' }}>+{WHATSAPP}</div>
                </div>
              </a>

              {/* Contact details */}
              {[
                { icon: Mail, label: 'Email', value: 'info@bigphone.ae', href: 'mailto:info@bigphone.ae', color: '#2563EB' },
                { icon: Phone, label: 'Phone', value: `+${WHATSAPP}`, href: `tel:+${WHATSAPP}`, color: '#8b5cf6' },
                { icon: MapPin, label: 'Location', value: 'Dubai, United Arab Emirates', href: null, color: '#F59E0B' },
                { icon: Clock, label: 'Business Hours', value: 'Mon – Sat: 9:00 AM – 7:00 PM (GST)', href: null, color: '#22c55e' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} style={{
                  display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                }}>
                  <div style={{
                    width: '40px', height: '40px',
                    background: `${color}15`,
                    borderRadius: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{label}</div>
                    {href ? (
                      <a href={href} style={{ fontSize: '0.9375rem', color: '#0F172A', fontWeight: 500 }}>{value}</a>
                    ) : (
                      <span style={{ fontSize: '0.9375rem', color: '#0F172A', fontWeight: 500 }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.5rem' }}>
                Send Us a Wholesale Inquiry
              </h2>
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <RFQForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          section > div > div { grid-template-columns: 1fr 1.2fr !important; }
        }
      `}</style>
    </div>
  );
}
