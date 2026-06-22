import { Zap, Globe, Headphones, TrendingUp, Shield, Clock } from 'lucide-react';

const FEATURES = [
  { icon: Zap,        title: 'Lightning Fast',  desc: 'Instant price comparison across all sellers' },
  { icon: Globe,      title: 'Global Reach',    desc: 'Ship to 50+ countries worldwide' },
  { icon: Headphones, title: '24/7 Support',    desc: 'Expert help whenever you need it' },
  { icon: TrendingUp, title: 'Best Prices',     desc: 'Guaranteed competitive wholesale pricing' },
  { icon: Shield,     title: 'Buyer Protection',desc: '100% money-back guarantee' },
  { icon: Clock,      title: 'Quick Delivery',  desc: 'Same-day dispatch available' },
];

export default function WhyChooseUs() {
  return (
    <section style={{ padding: '4rem 0', background: '#fff' }}>
      <div className="container-site">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="why-layout">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              background: '#EDE9FE', borderRadius: '9999px',
              padding: '0.375rem 0.875rem', marginBottom: '1rem',
            }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#6C5CE7' }}>Why Choose Us</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.625rem, 3vw, 2.25rem)', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>
              Everything you need<br />in one marketplace
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
              Big Phone connects buyers with verified sellers across the UAE and beyond.
              Whether you&apos;re buying one device or a thousand, we&apos;ve got you covered.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="why-features">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: '#EDE9FE', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color="#6C5CE7" />
                </div>
                <div>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>{title}</div>
                  <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 900px) {
          .why-layout { grid-template-columns: 1fr 1.4fr !important; }
        }
        @media (min-width: 1024px) {
          .why-features { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
