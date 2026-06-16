import { ShieldCheck, DollarSign, Globe, FlaskConical, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Certified Refurbished Devices',
    description: 'Every device is tested, graded, and certified. We never compromise on quality.',
    color: '#2563EB',
  },
  {
    icon: DollarSign,
    title: 'Competitive Wholesale Pricing',
    description: 'Direct-from-supplier pricing with volume discounts for bulk orders.',
    color: '#22c55e',
  },
  {
    icon: Globe,
    title: 'Global Export Support',
    description: 'We export to 50+ countries with full documentation and logistics support.',
    color: '#F59E0B',
  },
  {
    icon: FlaskConical,
    title: 'Quality Tested Products',
    description: '100-point quality check on all refurbished devices before shipping.',
    color: '#8b5cf6',
  },
  {
    icon: Zap,
    title: 'Fast Response Time',
    description: 'Receive your quotation within 2 hours. We respond fast, every time.',
    color: '#ef4444',
  },
  {
    icon: Users,
    title: 'Dedicated B2B Support',
    description: 'Personal account manager for resellers, distributors and exporters.',
    color: '#0ea5e9',
  },
];

export default function WhyBuySection() {
  return (
    <section className="section" style={{ background: '#F8FAFC' }}>
      <div className="container-site">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="section-title">Why Wholesale Buyers Choose Us</h2>
          <p className="section-subtitle">Trusted by mobile shops, resellers, and distributors worldwide</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem',
        }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '44px', height: '44px',
                borderRadius: '0.625rem',
                background: `${f.color}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <f.icon size={22} style={{ color: f.color }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.375rem' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { section div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { section div > div:last-child { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}
