'use client';

import { Users, DollarSign, ShieldCheck, Zap, Search, Store } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const h = t.home;

  const FEATURES = [
    { icon: Users,       title: h.whyVerified,  desc: h.whyVerifiedSub },
    { icon: DollarSign,  title: h.whyPrices,    desc: h.whyPricesSub },
    { icon: ShieldCheck, title: h.whySecure,    desc: h.whySecureSub },
    { icon: Zap,         title: h.whyShipping,  desc: h.whyShippingSub },
    { icon: Search,      title: h.whyDiscovery, desc: h.whyDiscoverySub },
    { icon: Store,       title: h.whyPlatform,  desc: h.whyPlatformSub },
  ];

  return (
    <section className="section">
      <div className="container-site">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="why-grid">
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FF6B00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{h.whyEyebrow}</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem' }}>
              {h.whyTitleFull}
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.7, maxWidth: '440px' }}>
              {h.whySub}
            </p>
          </div>

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
