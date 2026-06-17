import Link from 'next/link';
import { Search, FileText, Mail, CheckCircle } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Browse Inventory',
    description: 'Explore our extensive catalog of smartphones, tablets and accessories.',
    color: '#2563EB',
    img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Request Quotation',
    description: 'Submit your RFQ with product, quantity and destination details.',
    color: '#F59E0B',
    img: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80',
  },
  {
    step: '03',
    icon: Mail,
    title: 'Receive Offer',
    description: 'Get a detailed price offer within 2 hours via email or WhatsApp.',
    color: '#8b5cf6',
    img: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80',
  },
  {
    step: '04',
    icon: CheckCircle,
    title: 'Confirm & Ship',
    description: 'Confirm the order, make payment, and we handle shipping worldwide.',
    color: '#22c55e',
    img: 'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=400&q=80',
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

        {/* Mobile: vertical list */}
        <div className="process-mobile">
          {steps.map((step, index) => (
            <div key={step.step} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
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

        {/* Desktop: 4-column cards with images */}
        <div className="process-desktop">
          {steps.map((step) => (
            <div key={step.step} className="process-card">
              <div style={{
                borderRadius: '10px',
                overflow: 'hidden',
                height: '140px',
                marginBottom: '1rem',
                position: 'relative',
                background: '#F1F5F9',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.38) 100%)',
                }} />
                <div style={{
                  position: 'absolute', top: '10px', left: '10px',
                  background: step.color,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}>
                  {step.step}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '32px', height: '32px',
                  borderRadius: '8px',
                  background: `${step.color}1a`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <step.icon size={16} style={{ color: step.color }} />
                </div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  {step.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
                {step.description}
              </p>
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
        .process-mobile {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .process-desktop { display: none; }
        @media (min-width: 768px) {
          .process-mobile { display: none; }
          .process-desktop {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
          }
        }
        .process-card {
          background: #fff;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          padding: 1rem;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .process-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
          border-color: #CBD5E1;
        }
      `}</style>
    </section>
  );
}
