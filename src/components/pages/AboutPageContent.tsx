'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Globe, Users, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPageContent() {
  const { t } = useLanguage();
  const a = t.about;

  const cards = [
    { icon: ShieldCheck, title: a.qualityTitle, desc: a.qualityDesc, color: '#FF6B00' },
    { icon: Globe, title: a.globalTitle, desc: a.globalDesc, color: '#10B981' },
    { icon: Users, title: a.b2bTitle, desc: a.b2bDesc, color: '#F59E0B' },
    { icon: Award, title: a.trustedTitle, desc: a.trustedDesc, color: '#8B5CF6' },
  ];

  const grades = [
    { grade: a.gradeBrandNew, badge: 'badge-new', desc: a.gradeBrandNewDesc },
    { grade: a.gradeCertified, badge: 'badge-certified', desc: a.gradeCertifiedDesc },
    { grade: a.gradeA, badge: 'badge-grade-a', desc: a.gradeADesc },
    { grade: a.gradeB, badge: 'badge-grade-b', desc: a.gradeBDesc },
  ];

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)', padding: '4rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: '#FF6B00' }}>{t.common.home}</Link>
            <span style={{ margin: '0 0.375rem' }}>/</span>
            <span>{a.breadcrumb}</span>
          </nav>
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
              {a.title}
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#94a3b8', lineHeight: 1.7 }}>{a.heroSub}</p>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container-site">
          <div className="about-grid">
            <div>
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>{a.whoTitle}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#374151', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                <p>{a.whoP1}</p>
                <p>{a.whoP2}</p>
                <p>{a.whoP3}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {cards.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} style={{ background: '#FAFAFA', border: '1px solid #EAEAEA', borderRadius: '0.75rem', padding: '1.25rem' }}>
                  <div style={{ width: '40px', height: '40px', background: `${color}15`, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#111827', marginBottom: '0.375rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.5, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-bg">
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="section-title">{a.standardsTitle}</h2>
            <p className="section-subtitle">{a.standardsSub}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
            {grades.map(({ grade, badge, desc }) => (
              <div key={grade} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '0.75rem', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span className={`badge ${badge}`} style={{ marginTop: '2px', flexShrink: 0 }}>{grade}</span>
                <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>{a.ctaTitle}</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>{a.ctaSub}</p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/inventory" className="btn btn-primary btn-lg">{t.common.browseInventory} <ArrowRight size={16} /></Link>
            <Link href="/rfq" className="btn btn-outline btn-lg">{t.common.requestQuotation}</Link>
          </div>
        </div>
      </section>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center; }
        @media (min-width: 768px) { .about-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </div>
  );
}
