import Link from 'next/link';
import { Search, FileText, Mail, CheckCircle } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Browse Inventory',
    description: 'Explore our extensive catalog of smartphones, tablets and accessories.',
    color: '#2563EB',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Request Quotation',
    description: 'Submit your RFQ with product, quantity and destination details.',
    color: '#F59E0B',
  },
  {
    step: '03',
    icon: Mail,
    title: 'Receive Offer',
    description: 'Get a detailed price offer within 2 hours via email or WhatsApp.',
    color: '#8b5cf6',
  },
  {
    step: '04',
    icon: CheckCircle,
    title: 'Confirm & Ship',
    description: 'Confirm the order, make payment, and we handle shipping worldwide.',
    color: '#22c55e',
  },
];

export default function ProcessSection() {
  return (
    <section className="section">
      <div className="container-site">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple 4-step wholesale process — get your devices in days</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          position: 'relative',
        }}>
          {steps.map((step, index) => (
            <div key={step.step} style={{
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'flex-start',
            }}>
              {/* Step indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: '52px', height: '52px',
                  borderRadius: '50%',
                  background: step.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 12px ${step.color}33`,
                }}>
                  <step.icon size={22} style={{ color: '#fff' }} />
                </div>
                {index < steps.length - 1 && (
                  <div style={{ width: '2px', height: '2rem', background: '#E2E8F0', marginTop: '0.5rem' }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingTop: '0.625rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: step.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                  Step {step.step}
                </div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.375rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/rfq" className="btn btn-primary btn-xl">
            Start Your Order →
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          section > div > div:nth-child(2) {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 1rem !important;
          }
          section > div > div:nth-child(2) > div {
            flex-direction: column !important;
            gap: 0.75rem !important;
            align-items: center !important;
            text-align: center !important;
          }
          section > div > div:nth-child(2) > div > div:first-child {
            align-items: center !important;
          }
          section > div > div:nth-child(2) > div > div:first-child > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
