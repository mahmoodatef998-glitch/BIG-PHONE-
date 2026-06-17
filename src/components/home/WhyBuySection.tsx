import { ShieldCheck, DollarSign, Globe, Microscope, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Certified Refurbished Devices',
    description: 'Every device is tested, graded, and certified. We never compromise on quality.',
    color: '#60A5FA',
    bg: 'rgba(96,165,250,0.12)',
  },
  {
    icon: DollarSign,
    title: 'Competitive Wholesale Pricing',
    description: 'Direct-from-supplier pricing with volume discounts for bulk orders.',
    color: '#4ADE80',
    bg: 'rgba(74,222,128,0.12)',
  },
  {
    icon: Globe,
    title: 'Global Export Support',
    description: 'We export to 50+ countries with full documentation and logistics support.',
    color: '#FBBF24',
    bg: 'rgba(251,191,36,0.12)',
  },
  {
    icon: Microscope,
    title: 'Quality Tested Products',
    description: '100-point quality check on all refurbished devices before shipping.',
    color: '#C084FC',
    bg: 'rgba(192,132,252,0.12)',
  },
  {
    icon: Zap,
    title: 'Fast Response Time',
    description: 'Receive your quotation within 2 hours. We respond fast, every time.',
    color: '#FB923C',
    bg: 'rgba(251,146,60,0.12)',
  },
  {
    icon: Users,
    title: 'Dedicated B2B Support',
    description: 'Personal account manager for resellers, distributors and exporters.',
    color: '#22D3EE',
    bg: 'rgba(34,211,238,0.12)',
  },
];

export default function WhyBuySection() {
  return (
    <section style={{ background: '#0B1829', padding: '4.5rem 0' }}>
      <div className="container-site">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(0,102,255,0.15)',
            border: '1px solid rgba(0,102,255,0.3)',
            borderRadius: '9999px',
            padding: '0.375rem 0.875rem',
            marginBottom: '1rem',
          }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>
              Trusted by 200+ wholesale buyers worldwide
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.025em',
            marginBottom: '0.75rem',
          }}>
            Why Wholesale Buyers Choose Us
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '0 auto' }}>
            Trusted by mobile shops, resellers, and distributors worldwide
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }} className="why-grid">
          {features.map((f) => (
            <div key={f.title} className="why-card" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '44px', height: '44px',
                borderRadius: '10px',
                background: f.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <f.icon size={22} style={{ color: f.color }} aria-hidden="true" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.375rem' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px)  { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .why-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        .why-card { transition: background 0.2s, border-color 0.2s; }
        .why-card:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.16) !important;
        }
      `}</style>
    </section>
  );
}
