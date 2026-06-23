import { Users, DollarSign, ShieldCheck, Zap, Search, Store } from 'lucide-react';

const FEATURES = [
  { icon: Users,        title: 'Verified Suppliers',    desc: 'Every seller on our platform is identity-verified and quality-approved.' },
  { icon: DollarSign,   title: 'Wholesale Prices',      desc: 'MOQ from 5 units. Best market prices directly from UAE distributors.' },
  { icon: ShieldCheck,  title: 'Secure Transactions',   desc: 'Escrow-style payment flow protects both buyers and sellers.' },
  { icon: Zap,          title: 'Fast Shipping',         desc: 'Same-day dispatch from Dubai warehouses to 50+ countries.' },
  { icon: Search,       title: 'Easy Discovery',        desc: 'Filter by brand, condition, storage, and price to find exactly what you need.' },
  { icon: Store,        title: 'Multi-Vendor Platform', desc: 'Hundreds of vetted stores competing for your business — you always win.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-site">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="why-grid">
          {/* Left: heading */}
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FF6B00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Why Us</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem' }}>
              The smarter way to source
              <span style={{ color: '#FF6B00' }}> wholesale</span> electronics
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.7, maxWidth: '440px' }}>
              From verified suppliers and wholesale pricing to secure payments and fast shipping — BIG PHONE is built for serious B2B buyers.
            </p>
          </div>

          {/* Right: feature grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} style={{
                padding: '1.25rem',
                background: i % 2 === 0 ? '#FAFAFA' : '#fff',
                borderRadius: '1rem',
                border: '1.5px solid #EAEAEA',
              }}>
                <div style={{ width: '36px', height: '36px', background: '#FFF3E8', borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
                  <f.icon size={17} style={{ color: '#FF6B00' }} />
                </div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827', marginBottom: '0.375rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .why-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </section>
  );
}
