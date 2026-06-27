'use client';

import { ShieldCheck, BadgeCheck, Truck, Wrench, Star, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TrustSection() {
  const { t } = useLanguage();
  const h = t.home;

  const CARDS = [
    { icon: ShieldCheck, title: h.trustSecure,     desc: h.trustSecureSub,     color: '#FF6B00', bg: '#FFF3E8' },
    { icon: BadgeCheck,  title: h.trustSuppliers,  desc: h.trustSuppliersSub,  color: '#10B981', bg: '#ECFDF5' },
    { icon: Truck,       title: h.trustDelivery,   desc: h.trustDeliverySub,   color: '#3B82F6', bg: '#EFF6FF' },
    { icon: Wrench,      title: h.trustWarranty,   desc: h.trustWarrantySub,   color: '#F59E0B', bg: '#FFFBEB' },
    { icon: Star,        title: h.trustQuality,    desc: h.trustQualitySub,    color: '#EF4444', bg: '#FEF2F2' },
    { icon: Lock,        title: h.trustProtection, desc: h.trustProtectionSub, color: '#8B5CF6', bg: '#F5F3FF' },
  ];

  return (
    <>
      <section className="section section-bg">
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FF6B00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{h.trustEyebrow}</p>
            <h2 className="section-title">{h.trustSectionTitle}</h2>
            <p className="section-subtitle">{h.trustSectionSub}</p>
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
