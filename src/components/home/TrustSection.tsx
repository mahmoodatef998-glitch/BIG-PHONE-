import { ShieldCheck, BadgeCheck, Truck, Wrench, Star, Lock } from 'lucide-react';

const CARDS = [
  { icon: ShieldCheck, title: 'Secure Payments',    desc: 'Every transaction is protected with bank-grade encryption.',         color: '#FF6B00', bg: '#FFF3E8' },
  { icon: BadgeCheck,  title: 'Verified Suppliers', desc: 'All suppliers pass strict identity and quality verification.',         color: '#10B981', bg: '#ECFDF5' },
  { icon: Truck,       title: 'Fast Delivery',       desc: 'Global shipping to 50+ countries with real-time tracking.',           color: '#3B82F6', bg: '#EFF6FF' },
  { icon: Wrench,      title: 'Warranty Support',    desc: 'Devices covered with manufacturer or seller warranty.',               color: '#F59E0B', bg: '#FFFBEB' },
  { icon: Star,        title: 'Quality Checked',     desc: 'Every product graded and inspected before listing.',                 color: '#EF4444', bg: '#FEF2F2' },
  { icon: Lock,        title: 'Buyer Protection',    desc: 'Dispute resolution and full refund guarantee on all orders.',         color: '#8B5CF6', bg: '#F5F3FF' },
];

export default function TrustSection() {
  return (
    <>
      <section className="section section-bg">
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FF6B00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Why Trust Us</p>
            <h2 className="section-title">Built for Serious Buyers</h2>
            <p className="section-subtitle">Everything you need to trade wholesale electronics with confidence.</p>
          </div>

          <div className="trust-grid">
            {CARDS.map(card => (
              <div key={card.title} className="trust-card">
                <div style={{ width: '44px', height: '44px', background: card.bg, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <card.icon size={20} style={{ color: card.color }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', marginBottom: '0.375rem' }}>{card.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1rem;
        }
        .trust-card {
          background: #fff;
          border-radius: 1rem;
          border: 1.5px solid #EAEAEA;
          padding: 1.5rem;
          display: flex;
          gap: 1rem;
          transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
        }
        .trust-card:hover {
          border-color: #FFB366;
          box-shadow: 0 6px 20px rgba(255,107,0,0.10);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
