import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Clock, Users, Globe } from 'lucide-react';
import RFQForm from '@/components/rfq/RFQForm';

export const metadata: Metadata = {
  title: 'Request Quotation',
  description: 'Submit a wholesale quotation request for iPhones, Samsung, Xiaomi and other mobile devices. Get pricing within 2 hours.',
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function RFQPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '2.5rem 0' }}>
        <div className="container-site">
          <div style={{ maxWidth: '640px' }}>
            <nav style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '1rem' }}>
              <Link href="/" style={{ color: '#2563EB' }}>Home</Link> / Request Quotation
            </nav>
            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
              Request a Wholesale Quotation
            </h1>
            <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.7 }}>
              Fill in the form below and our B2B team will send you pricing, stock availability and shipping details within 2 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container-site section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'start',
        }}>
          {/* Form */}
          <div style={{
            background: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '0.75rem',
            padding: '2rem',
          }}>
            <RFQForm />
          </div>

          {/* Info sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Why RFQ */}
            <div style={{
              background: '#0F172A',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              color: '#94a3b8',
            }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>
                What happens next?
              </h3>
              {[
                { icon: Clock, text: 'Response within 2 hours (business hours)', color: '#F59E0B' },
                { icon: Users, text: 'Dedicated wholesale account manager', color: '#2563EB' },
                { icon: Globe, text: 'Export documentation available', color: '#22c55e' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                  <Icon size={16} style={{ color, flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.875rem' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp alternative */}
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              textAlign: 'center',
            }}>
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Prefer WhatsApp?</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1rem' }}>
                Chat directly with our team for faster response.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi, I want a wholesale quote for mobile devices.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Trust stats */}
            <div style={{
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              textAlign: 'center',
            }}>
              {[
                { value: '500+', label: 'Products' },
                { value: '< 2h', label: 'Response' },
                { value: '50+', label: 'Countries' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0F172A' }}>{s.value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .rfq-grid { grid-template-columns: 1.4fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
