import { ShieldCheck, BadgeCheck, Truck, Wrench, Star, Lock } from 'lucide-react';

const CARDS = [
  { icon: ShieldCheck, title: 'Buyer Protection',  desc: 'Full purchase protection on every order. Your money is safe.', color: '#6C5CE7', bg: '#EDE9FE' },
  { icon: BadgeCheck,  title: 'Verified Sellers',  desc: 'All sellers are ID-verified and rated by real buyers.',         color: '#10B981', bg: '#ECFDF5' },
  { icon: Truck,       title: 'Fast Shipping',     desc: 'Same-day dispatch for orders placed before 2pm.',               color: '#0EA5E9', bg: '#F0F9FF' },
  { icon: Wrench,      title: 'Grade A Quality',   desc: 'Every device graded and tested before listing.',                color: '#F59E0B', bg: '#FFFBEB' },
  { icon: Star,        title: 'Rated 4.9/5',       desc: 'Trusted by 50,000+ buyers across 50+ countries.',               color: '#EC4899', bg: '#FFF0F7' },
  { icon: Lock,        title: 'Secure Checkout',   desc: '256-bit SSL encryption on every transaction.',                  color: '#EF4444', bg: '#FFF1F2' },
];

export default function TrustSection() {
  return (
    <section style={{ padding: '4rem 0', background: '#F9FAFB' }}>
      <div className="container-site">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>
            Why Buyers Trust Big Phone
          </h2>
          <p style={{ fontSize: '1rem', color: '#6B7280', margin: 0 }}>Every purchase is backed by our guarantee</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem' }} className="trust-sec-grid">
          {CARDS.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="trust-sec-card" style={{ '--tc': color } as React.CSSProperties}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: bg, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={22} color={color} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>{title}</div>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (min-width: 640px)  { .trust-sec-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .trust-sec-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        .trust-sec-card {
          display: flex; gap: 1rem; align-items: flex-start;
          padding: 1.25rem; background: #fff;
          border: 1.5px solid #EAEAEA; border-radius: 16px;
          transition: all 0.2s;
        }
        .trust-sec-card:hover {
          border-color: var(--tc, #6C5CE7);
          box-shadow: 0 4px 20px rgba(108,92,231,0.08);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
