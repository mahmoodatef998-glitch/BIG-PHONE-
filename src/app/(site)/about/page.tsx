import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Globe, Users, Award, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about BIG PHONE — UAE-based B2B wholesale supplier of refurbished and brand new smartphones, tablets and accessories.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)', padding: '4rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '1.5rem' }}>
            <Link href="/" style={{ color: '#2563EB' }}>Home</Link> / About
          </nav>
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
              About BIG PHONE
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#94a3b8', lineHeight: 1.7 }}>
              Dubai-based B2B wholesale supplier specializing in refurbished and brand new smartphones, tablets, and mobile accessories for resellers and distributors worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>Who We Are</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#374151', lineHeight: 1.75, fontSize: '0.9375rem' }}>
                <p>
                  BIG PHONE is a leading B2B wholesale platform based in Dubai, UAE, supplying premium refurbished and brand new mobile devices to mobile shops, retail traders, wholesalers, resellers, distributors, and export customers across 50+ countries.
                </p>
                <p>
                  We work directly with manufacturers, authorized distributors, and certified refurbishers to bring you the best wholesale pricing on Apple, Samsung, Xiaomi, Huawei, Oppo, Vivo, and more.
                </p>
                <p>
                  Our commitment is simple: quality products, transparent grading, fast response, and competitive pricing — every single time.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {[
                { icon: ShieldCheck, title: 'Quality Certified', desc: '100-point testing on every refurbished device', color: '#2563EB' },
                { icon: Globe, title: 'Global Reach', desc: 'Export to 50+ countries with full documentation', color: '#22c55e' },
                { icon: Users, title: 'B2B Focused', desc: 'Dedicated account managers for wholesale buyers', color: '#F59E0B' },
                { icon: Award, title: 'Trusted Brand', desc: 'Years of experience in mobile wholesale', color: '#8b5cf6' },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                }}>
                  <div style={{
                    width: '40px', height: '40px',
                    background: `${color}15`,
                    borderRadius: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.375rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Refurbished grades explainer */}
      <section className="section" style={{ background: '#F8FAFC' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="section-title">Our Refurbishment Standards</h2>
            <p className="section-subtitle">We never use the word &ldquo;used&rdquo; — every device is professionally graded</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
            {[
              { grade: 'Brand New', badge: 'badge-new', desc: 'Sealed in original manufacturer packaging. Never opened, full warranty.' },
              { grade: 'Certified Refurbished', badge: 'badge-certified', desc: 'Manufacturer or carrier certified. Fully tested, reset to factory settings, comes with accessories.' },
              { grade: 'Grade A Refurbished', badge: 'badge-grade-a', desc: 'Excellent condition. No visible scratches or damage. Fully functional, battery 85%+ health.' },
              { grade: 'Grade B Refurbished', badge: 'badge-grade-b', desc: 'Good condition. Minor cosmetic signs of wear. Fully functional, battery 80%+ health. Great value.' },
            ].map(({ grade, badge, desc }) => (
              <div key={grade} style={{
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}>
                <span className={`badge ${badge}`} style={{ marginTop: '2px', flexShrink: 0 }}>{grade}</span>
                <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-site" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Ready to Start Wholesale?</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>Browse our inventory or request a quotation today</p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/inventory" className="btn btn-primary btn-lg">Browse Inventory <ArrowRight size={16} /></Link>
            <Link href="/rfq" className="btn btn-outline btn-lg">Request Quotation</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          section:first-of-type > div > div { grid-template-columns: 1fr 1fr !important; }
          section:last-of-type > div > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
