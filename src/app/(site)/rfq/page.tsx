import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Clock, Users, Globe, FileText } from 'lucide-react';
import RFQForm from '@/components/rfq/RFQForm';

export const metadata: Metadata = {
  title: 'Request Quotation | BIG PHONE B2B',
  description: 'Submit a wholesale quotation request for iPhones, Samsung, Xiaomi and other mobile devices. Get pricing within 2 hours.',
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default async function RFQPage(props: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: defaultProduct = '' } = await props.searchParams;
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
        borderBottom: '1px solid #374151',
        padding: '2.5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orange accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #FF6B00, #FF8C33)' }} />
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#6B7280', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#D1D5DB' }}>Request Quotation</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '44px', height: '44px', background: 'rgba(255,107,0,0.15)', borderRadius: '10px', border: '1px solid rgba(255,107,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText size={20} style={{ color: '#FF6B00' }} />
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', margin: 0 }}>
              Request a Wholesale Quotation
            </h1>
          </div>
          <p style={{ fontSize: '1rem', color: '#9CA3AF', lineHeight: 1.7, maxWidth: '560px' }}>
            Fill in the form and our B2B team will send you pricing, stock availability
            and shipping details <strong style={{ color: '#FF6B00' }}>within 2 hours</strong>.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container-site section">
        <div className="rfq-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'start' }}>

          {/* ── Form card ── */}
          <div style={{
            background: '#fff',
            border: '1.5px solid #E5E7EB',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          }}>
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #F3F4F6' }}>
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#111827', margin: '0 0 0.25rem' }}>Your Quotation Details</h2>
              <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', margin: 0 }}>All fields marked * are required</p>
            </div>
            <RFQForm key={defaultProduct} defaultProduct={defaultProduct} />
          </div>

          {/* ── Sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* What happens next */}
            <div style={{
              background: '#111827',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '8px', height: '8px', background: '#FF6B00', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: 0 }}>What happens next?</h3>
              </div>
              {[
                { Icon: Clock, text: 'Response within 2 hours (business hours)', color: '#F59E0B' },
                { Icon: Users, text: 'Dedicated wholesale account manager', color: '#3B82F6' },
                { Icon: Globe, text: 'Export documentation available', color: '#10B981' },
              ].map(({ Icon, text, color }) => (
                <div key={text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                  <div style={{ width: '28px', height: '28px', background: `${color}18`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    <Icon size={14} style={{ color }} />
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#9CA3AF', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <div style={{
              background: '#F0FDF4',
              border: '1.5px solid #BBF7D0',
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>💬</div>
              <h3 style={{ fontWeight: 700, color: '#111827', marginBottom: '0.375rem', fontSize: '0.9375rem' }}>Prefer WhatsApp?</h3>
              <p style={{ fontSize: '0.8125rem', color: '#6B7280', marginBottom: '1rem', lineHeight: 1.5 }}>
                Chat directly with our team for the fastest response.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi, I want a wholesale quote for mobile devices.')}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%', padding: '0.75rem',
                  background: '#22C55E', color: '#fff',
                  borderRadius: '0.625rem', fontWeight: 700, fontSize: '0.9375rem',
                  textDecoration: 'none', transition: 'background 0.15s',
                }}
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>

            {/* Trust stats */}
            <div style={{
              background: '#fff',
              border: '1.5px solid #E5E7EB',
              borderRadius: '1rem',
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              textAlign: 'center',
            }}>
              {[
                { value: '10K+', label: 'Products' },
                { value: '< 2h', label: 'Response' },
                { value: '50+',  label: 'Countries' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FF6B00', letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ fontSize: '0.6875rem', color: '#9CA3AF', fontWeight: 500, marginTop: '1px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @media (min-width: 768px) {
          .rfq-grid { grid-template-columns: 1.5fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
