'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Package, Users, ShieldCheck, Star, Truck, RefreshCcw, BadgeCheck } from 'lucide-react';

const STATS = [
  { Icon: Package,     value: '10K+',  label: 'Products' },
  { Icon: Users,       value: '500+',  label: 'Verified Sellers' },
  { Icon: Star,        value: '4.9★',  label: 'Avg Rating' },
  { Icon: ShieldCheck, value: '100%',  label: 'Secure Payments' },
];

const FLOAT_BADGES = [
  {
    Icon: ShieldCheck, color: '#10B981', bg: '#ECFDF5',
    label: 'Secure Payments', sub: '100% protected',
    pos: { top: '5%', left: '-2%' }, delay: 0,
  },
  {
    Icon: Star, color: '#F59E0B', bg: '#FFFBEB',
    label: '4.9 ★ Rated', sub: '2,000+ reviews',
    pos: { top: '34%', left: '-8%' }, delay: 0.6,
  },
  {
    Icon: Truck, color: '#3B82F6', bg: '#EFF6FF',
    label: 'Fast Delivery', sub: 'Same-day dispatch',
    pos: { top: '5%', right: '-2%' }, delay: 1.1,
  },
  {
    Icon: RefreshCcw, color: '#8B5CF6', bg: '#F5F3FF',
    label: '7-Day Returns', sub: 'Hassle-free policy',
    pos: { top: '42%', right: '-8%' }, delay: 1.7,
  },
  {
    Icon: Package, color: '#FF6B00', bg: '#FFF3E8',
    label: '10K+ Products', sub: 'Always in stock',
    pos: { bottom: '18%', right: '-2%' }, delay: 2.2,
  },
  {
    Icon: BadgeCheck, color: '#0EA5E9', bg: '#F0F9FF',
    label: 'Verified Sellers', sub: 'KYC approved',
    pos: { bottom: '4%', left: '4%' }, delay: 2.8,
  },
];

export default function HeroSection() {
  const [search, setSearch] = useState('');

  return (
    <>
      <section className="hero-section">
        <div className="container-site">
          <div className="hero-grid">

            {/* ── Left content ───────────────────── */}
            <div className="hero-left">

              {/* Eyebrow */}
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                UAE’s #1 B2B Mobile Platform
              </div>

              {/* Headline */}
              <h1 className="hero-heading">
                The Ultimate<br />
                <span className="hero-heading-accent">Mobile</span> Marketplace
              </h1>

              {/* Sub */}
              <p className="hero-sub">
                Source new, used &amp; refurbished phones<br />
                from 500+ verified UAE suppliers.
              </p>

              {/* Search */}
              <form action="/inventory" method="get" className="hero-search-form">
                <Search size={18} className="hero-search-icon" />
                <input
                  type="search" name="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search iPhone, Samsung, Xiaomi…"
                  className="hero-search-input"
                />
                <button type="submit" className="hero-search-btn">Search</button>
              </form>

              {/* Stats */}
              <div className="hero-stats">
                {STATS.map(s => (
                  <div key={s.label} className="hero-stat">
                    <div className="hero-stat-icon">
                      <s.Icon size={18} color="#FF6B00" />
                    </div>
                    <div className="hero-stat-value">{s.value}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="hero-cta-row">
                <Link href="/inventory" className="btn btn-primary btn-lg btn-pill">Browse Products</Link>
                <Link href="/rfq" className="btn btn-ghost btn-lg btn-pill">Get a Quote</Link>
              </div>
            </div>

            {/* ── Right — iPhone showcase ─────────── */}
            <div className="hero-right">

              {/* Deep orange ambient glow */}
              <div className="hero-glow-outer" />
              <div className="hero-glow-inner" />

              {/* Floating badge cards */}
              {FLOAT_BADGES.map((b, i) => (
                <div
                  key={b.label}
                  style={{
                    position: 'absolute', ...b.pos,
                    background: 'rgba(255,255,255,0.93)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(255,255,255,0.85)',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    animation: `floatBadge ${5.5 + i * 0.5}s ease-in-out ${b.delay}s infinite alternate`,
                    zIndex: 4,
                  }}
                >
                  <div style={{
                    width: '32px', height: '32px', background: b.bg,
                    borderRadius: '9px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <b.Icon size={16} color={b.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', lineHeight: 1.25 }}>
                      {b.label}
                    </div>
                    <div style={{ fontSize: '0.5625rem', color: '#9CA3AF', whiteSpace: 'nowrap', marginTop: '2px' }}>
                      {b.sub}
                    </div>
                  </div>
                </div>
              ))}

              {/* iPhone — bg removed via mix-blend-mode: screen */}
              <div className="iphone-photo-wrap">
                <Image
                  src="/images/images (4).jpg"
                  alt="iPhone — BIG PHONE Marketplace"
                  width={440}
                  height={780}
                  priority
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                    /* Removes the black background on the light hero bg */
                    mixBlendMode: 'screen',
                    /* Restore color vibrancy after screen blend lightening */
                    filter: 'saturate(1.8) contrast(1.25) brightness(1.08)',
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ─── Section ────────────────────────────── */
        .hero-section {
          background-color: #FFF3E8;
          background-image: radial-gradient(circle, rgba(255,107,0,0.14) 1px, transparent 1px);
          background-size: 28px 28px;
          padding: 4.5rem 0 4rem;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-left { max-width: 560px; }

        /* ─── Eyebrow ─────────────────────────── */
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #fff; border: 1.5px solid #FFD0A0;
          border-radius: 9999px; padding: 0.375rem 1rem;
          font-size: 0.8125rem; font-weight: 600; color: #C2410C;
          margin-bottom: 1.25rem;
        }
        .hero-eyebrow-dot {
          width: 7px; height: 7px; background: #FF6B00;
          border-radius: 50%;
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        /* ─── Heading ─────────────────────────── */
        .hero-heading {
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          font-weight: 800; line-height: 1.08;
          letter-spacing: -0.035em; color: #111827;
          margin: 0 0 1rem;
        }
        .hero-heading-accent { color: #FF6B00; }
        .hero-sub {
          font-size: 1.0625rem; color: #6B7280;
          line-height: 1.7; margin: 0 0 1.75rem;
        }

        /* ─── Search ─────────────────────────── */
        .hero-search-form {
          display: flex; align-items: center;
          background: #fff; border: 1.5px solid #E5E7EB;
          border-radius: 14px; padding: 6px 6px 6px 1rem; gap: 0.5rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          margin-bottom: 2rem;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .hero-search-form:focus-within {
          border-color: #FFB366;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 0 0 3px rgba(255,107,0,0.12);
        }
        .hero-search-icon { color: #9CA3AF; flex-shrink: 0; }
        .hero-search-input {
          flex: 1; border: none; outline: none;
          font-size: 0.9375rem; color: #111827;
          background: transparent; font-family: inherit; min-width: 0;
        }
        .hero-search-input::placeholder { color: #9CA3AF; }
        .hero-search-btn {
          padding: 0.6875rem 1.5rem;
          background: #FF6B00; color: #fff;
          border: none; border-radius: 10px;
          font-size: 0.9375rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          font-family: inherit; transition: background 0.15s; flex-shrink: 0;
        }
        .hero-search-btn:hover { background: #E55A00; }

        /* ─── Stats ─────────────────────────── */
        .hero-stats { display: flex; gap: 0; margin-bottom: 2rem; flex-wrap: wrap; }
        .hero-stat {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 0 1.5rem 0 0; position: relative;
        }
        .hero-stat + .hero-stat::before {
          content: ''; position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 1px; background: #FFD0A0;
        }
        .hero-stat-icon {
          width: 38px; height: 38px; background: #FFF0E0;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 5px;
        }
        .hero-stat-value  { font-size: 1.3125rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; line-height: 1; }
        .hero-stat-label  { font-size: 0.625rem; color: #9CA3AF; font-weight: 500; margin-top: 2px; white-space: nowrap; }
        .hero-cta-row     { display: flex; gap: 0.75rem; flex-wrap: wrap; }

        /* ─── Right column ─────────────────────── */
        .hero-right {
          display: none; position: relative;
          height: 640px;
          align-items: center; justify-content: center;
        }

        /* Double-layer ambient glow */
        .hero-glow-outer {
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle,
            rgba(255,107,0,0.28) 0%,
            rgba(255,140,50,0.12) 40%,
            transparent 70%);
          border-radius: 50%;
          left: 50%; top: 50%; transform: translate(-50%,-50%);
          pointer-events: none; z-index: 0;
        }
        .hero-glow-inner {
          position: absolute;
          width: 260px; height: 260px;
          background: radial-gradient(circle,
            rgba(255,107,0,0.2) 0%,
            transparent 70%);
          border-radius: 50%;
          left: 50%; top: 58%; transform: translate(-50%,-50%);
          pointer-events: none; z-index: 0;
          filter: blur(24px);
        }

        /* ─── iPhone photo ───────────────────── */
        .iphone-photo-wrap {
          position: relative; z-index: 2;
          width: 360px; height: 620px;
          animation: phoneFloat 8s ease-in-out infinite;
        }

        /* ─── Animations ─────────────────────── */
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0)    rotate(0deg); }
          50%       { transform: translateY(-8px) rotate(0.4deg); }
        }
        @keyframes floatBadge {
          from { transform: translateY(0); }
          to   { transform: translateY(-5px); }
        }

        /* ─── Responsive ─────────────────────── */
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1fr 1fr; }
          .hero-right { display: flex !important; }
          .hero-stat  { padding: 0 2rem 0 0; }
        }
      `}</style>
    </>
  );
}
