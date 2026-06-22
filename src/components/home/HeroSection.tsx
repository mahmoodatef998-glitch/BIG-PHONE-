'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, Truck, Star, BadgeCheck, Package, Headphones } from 'lucide-react';

const FLOAT_CARDS = [
  { icon: ShieldCheck, label: 'Verified Sellers',    color: '#6C5CE7', bg: '#F0EEFF' },
  { icon: BadgeCheck,  label: 'Buyer Protection',    color: '#10B981', bg: '#ECFDF5' },
  { icon: Package,     label: 'Wholesale Pricing',   color: '#F59E0B', bg: '#FFFBEB' },
  { icon: Truck,       label: 'Fast Delivery',        color: '#3B82F6', bg: '#EFF6FF' },
  { icon: Star,        label: 'Quality Assured',      color: '#EF4444', bg: '#FEF2F2' },
  { icon: Headphones,  label: 'Support 24/7',         color: '#8B5CF6', bg: '#F5F3FF' },
];

const STATS = [
  { value: '10K+',  label: 'Products' },
  { value: '500+',  label: 'Suppliers' },
  { value: '50K+',  label: 'Monthly Visitors' },
  { value: '100%',  label: 'Secure' },
];

export default function HeroSection() {
  const [search, setSearch] = useState('');

  return (
    <section style={{
      background: 'linear-gradient(135deg, #F8F7FF 0%, #FFFFFF 50%, #F0EEFF 100%)',
      padding: '5rem 0 4rem',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-60px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(139,124,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-site">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }} className="hero-grid">

          {/* ─ Left: Content ─ */}
          <div style={{ maxWidth: '580px' }}>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#F0EEFF', border: '1px solid #C4BBFF',
              borderRadius: '9999px', padding: '0.375rem 0.875rem',
              marginBottom: '1.5rem',
            }}>
              <span style={{ width: '6px', height: '6px', background: '#6C5CE7', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#6C5CE7', letterSpacing: '0.02em' }}>
                UAE’s #1 B2B Mobile Marketplace
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              color: '#111827',
              marginBottom: '1.25rem',
            }}>
              UAE’s Trusted{' '}
              <span className="gradient-text">B2B Mobile</span>
              <br />Marketplace
            </h1>

            <p style={{ fontSize: '1.0625rem', color: '#6B7280', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px' }}>
              Buy and sell new, used, refurbished, and wholesale mobile devices
              from trusted suppliers across the UAE — fast, secure, verified.
            </p>

            {/* Search bar */}
            <form action="/inventory" method="get" style={{ marginBottom: '1.75rem' }}>
              <div style={{
                display: 'flex', gap: '0.5rem',
                background: '#fff',
                border: '2px solid #EAEAEA',
                borderRadius: '1rem',
                padding: '0.375rem 0.375rem 0.375rem 1rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                transition: 'border-color 0.2s',
              }}
              onFocus={() => {}}
              >
                <Search size={18} style={{ color: '#9CA3AF', alignSelf: 'center', flexShrink: 0 }} />
                <input
                  type="search"
                  name="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search iPhone 15 Pro, Samsung S24, iPad..."
                  style={{
                    flex: 1, border: 'none', outline: 'none',
                    fontSize: '0.9375rem', color: '#111827',
                    background: 'transparent',
                  }}
                />
                <button type="submit" className="btn btn-primary" style={{ borderRadius: '0.75rem', gap: '0.375rem' }}>
                  Search <ArrowRight size={15} />
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link href="/inventory" className="btn btn-primary btn-lg btn-pill">
                Browse Products
              </Link>
              <Link href="/rfq" className="btn btn-ghost btn-lg btn-pill">
                Request a Quote
              </Link>
            </div>

            {/* Trust stats */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.375rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em' }}>{s.value}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─ Right: Visual ─ */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '420px' }} className="hero-visual">
            {/* Glow */}
            <div style={{
              position: 'absolute', width: '320px', height: '320px',
              background: 'radial-gradient(circle, rgba(108,92,231,0.18) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />

            {/* Phone mockup */}
            <div style={{
              position: 'relative', zIndex: 2,
              width: '160px', height: '300px',
              background: 'linear-gradient(160deg, #1C1C1E 0%, #2D2D30 100%)',
              borderRadius: '28px',
              boxShadow: '0 32px 64px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(255,255,255,0.08) inset',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '16px',
            }}>
              {/* Notch */}
              <div style={{ width: '60px', height: '6px', background: '#3A3A3C', borderRadius: '3px', marginBottom: '12px' }} />
              {/* Screen content */}
              <div style={{ flex: 1, width: '100%', background: 'linear-gradient(180deg, #6C5CE7 0%, #8B7CF6 100%)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '20px', fontWeight: 900 }}>B</span>
                </div>
                <div style={{ width: '70%', height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }} />
                <div style={{ width: '50%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
                <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px' }} />
                  ))}
                </div>
              </div>
              {/* Home indicator */}
              <div style={{ width: '50px', height: '4px', background: '#3A3A3C', borderRadius: '2px', marginTop: '10px' }} />
            </div>

            {/* Floating feature cards */}
            {FLOAT_CARDS.map((card, i) => {
              const positions: React.CSSProperties[] = [
                { top: '8%',  left: '-5%'  },
                { top: '8%',  right: '-5%' },
                { top: '42%', left: '-12%' },
                { top: '42%', right: '-12%'},
                { bottom: '10%', left: '2%'  },
                { bottom: '10%', right: '2%' },
              ];
              return (
                <div key={card.label} style={{
                  position: 'absolute',
                  ...positions[i],
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: '0.875rem',
                  padding: '0.625rem 0.875rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  whiteSpace: 'nowrap', zIndex: 3,
                  animation: `float-card ${2.5 + i * 0.3}s ease-in-out infinite alternate`,
                }}>
                  <div style={{ width: '28px', height: '28px', background: card.bg, borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <card.icon size={14} style={{ color: card.color }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111827' }}>{card.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes float-card {
          from { transform: translateY(0px); }
          to   { transform: translateY(-8px); }
        }
        .hero-grid { grid-template-columns: 1fr; }
        .hero-visual { display: none; }
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1fr 1fr; }
          .hero-visual { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
