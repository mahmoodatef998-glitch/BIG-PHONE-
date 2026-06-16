import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function WhatsAppCTA() {
  const waMessage = encodeURIComponent('Hi BIG PHONE, I need a bulk quote for mobile devices. Can you help?');

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
      padding: '4rem 0',
    }}>
      <div className="container-site">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem',
        }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'rgba(37,211,102,0.12)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(37,211,102,0.3)',
          }}>
            <MessageCircle size={28} style={{ color: '#25D366' }} />
          </div>

          <div>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.025em',
              marginBottom: '0.75rem',
            }}>
              Need Bulk Devices?
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#94a3b8', maxWidth: '440px' }}>
              Chat directly with our wholesale team on WhatsApp or request a formal quotation — we respond within 2 hours.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-xl"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <Link href="/rfq" className="btn btn-outline-white btn-xl">
              Request Quotation
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '0.5rem',
          }}>
            {[
              { value: '500+', label: 'Products in Stock' },
              { value: '< 2h', label: 'Response Time' },
              { value: '50+', label: 'Countries Served' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F59E0B' }}>{stat.value}</div>
                <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
