'use client';

import Link from 'next/link';
import { MessageCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';
import RFQForm from '@/components/rfq/RFQForm';
import { useLanguage } from '@/contexts/LanguageContext';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function ContactPageContent() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <div>
      <div style={{ background: '#FAFAFA', borderBottom: '1px solid #EAEAEA', padding: '2.5rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: '#FF6B00' }}>{t.common.home}</Link>
            <span style={{ margin: '0 0.375rem' }}>/</span>
            <span>{c.breadcrumb}</span>
          </nav>
          <h1 className="inv-page-title">{c.title}</h1>
          <p style={{ fontSize: '1rem', color: '#6B7280', marginTop: '0.5rem' }}>{c.heroSub}</p>
        </div>
      </div>

      <section className="section">
        <div className="container-site">
          <div className="contact-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', gap: '1rem', alignItems: 'center',
                background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1.25rem', textDecoration: 'none',
              }}>
                <div style={{ width: '48px', height: '48px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={22} style={{ color: '#fff' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.9375rem' }}>{c.whatsappPreferred}</div>
                  <div style={{ fontSize: '0.875rem', color: '#16a34a', marginTop: '0.125rem' }}>{c.whatsappFast}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: '0.25rem' }}>+{WHATSAPP}</div>
                </div>
              </a>

              {[
                { icon: Mail, label: c.email, value: 'info@bigphone.ae', href: 'mailto:info@bigphone.ae', color: '#FF6B00' },
                { icon: Phone, label: c.phone, value: `+${WHATSAPP}`, href: `tel:+${WHATSAPP}`, color: '#8B5CF6' },
                { icon: MapPin, label: c.location, value: t.footer.location, href: null, color: '#F59E0B' },
                { icon: Clock, label: c.hours, value: c.hoursValue, href: null, color: '#10B981' },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', background: '#fff', border: '1px solid #EAEAEA', borderRadius: '0.75rem', padding: '1.25rem' }}>
                  <div style={{ width: '40px', height: '40px', background: `${color}15`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>{label}</div>
                    {href ? (
                      <a href={href} style={{ fontSize: '0.9375rem', color: '#111827', fontWeight: 500 }}>{value}</a>
                    ) : (
                      <span style={{ fontSize: '0.9375rem', color: '#111827', fontWeight: 500 }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1.5rem' }}>{c.formTitle}</h2>
              <div className="card" style={{ padding: '1.5rem' }}>
                <RFQForm compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        @media (min-width: 768px) { .contact-grid { grid-template-columns: 1fr 1.2fr; } }
      `}</style>
    </div>
  );
}
