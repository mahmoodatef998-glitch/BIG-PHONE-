import { ShieldCheck, RotateCcw, Truck, BadgeCheck } from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck, label: 'Verified Stock',   sub: 'Live inventory counts' },
  { icon: RotateCcw,   label: 'Grade A/B/Cert', sub: 'Professional grading' },
  { icon: Truck,       label: 'Global Export',  sub: '50+ countries served' },
  { icon: BadgeCheck,  label: 'MOQ from 5',     sub: 'Flexible wholesale lots' },
];

export default function TrustBar() {
  return (
    <section style={{ background: '#FFF3E8', borderTop: '1px solid #FFD0A0', borderBottom: '1px solid #FFD0A0', padding: '1.5rem 0' }}>
      <div className="container-site">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }} className="trust-bar-grid">
          {ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(255,107,0,0.12)' }}>
                <Icon size={20} color="#FF6B00" />
              </div>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>{label}</div>
                <div style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: '0.125rem' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (min-width: 640px) { .trust-bar-grid { grid-template-columns: repeat(4, 1fr) !important; } }
      `}</style>
    </section>
  );
}
