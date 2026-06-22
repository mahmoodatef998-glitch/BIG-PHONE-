'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Package, Users, Smile, ShieldCheck } from 'lucide-react';

const STATS = [
  { Icon: Package,     value: '10K+',  label: 'Products' },
  { Icon: Users,       value: '500+',  label: 'Trusted Sellers' },
  { Icon: Smile,       value: '50K+',  label: 'Happy Customers' },
  { Icon: ShieldCheck, value: '100%',  label: 'Secure Transactions' },
];

const FLOAT_BADGES = [
  { title: 'Trusted Sellers',     sub: 'Top rated sellers',    avatar: '⭐', pos: 'top: 6%; left: 2%' },
  { title: 'Buy Used Safely',     sub: 'Certified devices',    avatar: '🛡️', pos: 'top: 28%; left: -2%' },
  { title: '24/7 Support',        sub: 'We\'re here',          avatar: '🎧', pos: 'top: 10%; right: 4%' },
  { title: 'Secure Payments',     sub: '100% protected',       avatar: '🔒', pos: 'top: 38%; right: -2%' },
  { title: 'Best Prices',         sub: 'Guaranteed',           avatar: '💰', pos: 'bottom: 28%; right: 0%' },
  { title: 'Satisfaction Guarantee', sub: '7 Days Return Policy', avatar: '✅', pos: 'bottom: 10%; left: 6%' },
];

export default function HeroSection() {
  const [search, setSearch] = useState('');

  return (
    <>
      <section className="hero-section">
        <div className="container-site">
          <div className="hero-grid">

            {/* Left */}
            <div className="hero-left">
              <h1 className="hero-heading">
                The Ultimate<br />Mobile Marketplace
              </h1>
              <p className="hero-sub">
                Buy from trusted sellers. New, used<br />or refurbished — you choose.
              </p>

              {/* Search bar */}
              <form action="/inventory" method="get" className="hero-search-form">
                <Search size={18} className="hero-search-icon" />
                <input
                  type="search" name="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search products, brands or sellers..."
                  className="hero-search-input"
                />
                <button type="submit" className="hero-search-btn">Search</button>
              </form>

              {/* Stats */}
              <div className="hero-stats">
                {STATS.map(s => (
                  <div key={s.label} className="hero-stat">
                    <div className="hero-stat-icon">
                      <s.Icon size={20} color="#6C5CE7" />
                    </div>
                    <div className="hero-stat-value">{s.value}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA row */}
              <div className="hero-cta-row">
                <Link href="/inventory" className="btn btn-primary btn-lg btn-pill">Browse Products</Link>
                <Link href="/rfq" className="btn btn-ghost btn-lg btn-pill">Get a Quote</Link>
              </div>
            </div>

            {/* Right — phone visual */}
            <div className="hero-right">
              {/* Glow */}
              <div className="hero-glow" />

              {/* 3-phone mockup */}
              <div className="phones-wrap">
                {/* Back-left phone */}
                <div className="phone phone-left">
                  <div className="phone-screen" style={{ background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)' }}>
                    <div style={{ width: '70%', height: '6px', background: 'rgba(108,92,231,0.5)', borderRadius: '3px', marginBottom: '8px' }} />
                    <div style={{ width: '50%', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
                    <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(108,92,231,0.3) 0%, rgba(139,124,246,0.2) 100%)', borderRadius: '8px', marginTop: '12px' }} />
                  </div>
                </div>

                {/* Center phone */}
                <div className="phone phone-center">
                  <div className="phone-notch" />
                  <div className="phone-screen" style={{ background: 'linear-gradient(160deg, #0f0f23 0%, #1a0533 100%)' }}>
                    <div style={{ width: '60%', height: '6px', background: 'rgba(167,139,250,0.6)', borderRadius: '3px', marginBottom: '6px' }} />
                    <div style={{ width: '40%', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', marginBottom: '10px' }} />
                    <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(108,92,231,0.4) 0%, rgba(167,139,250,0.3) 100%)', borderRadius: '8px' }} />
                  </div>
                  <div className="phone-home-bar" />
                </div>

                {/* Back-right phone */}
                <div className="phone phone-right">
                  <div className="phone-screen" style={{ background: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 100%)' }}>
                    <div style={{ width: '65%', height: '6px', background: 'rgba(196,187,255,0.5)', borderRadius: '3px', marginBottom: '8px' }} />
                    <div style={{ width: '45%', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px' }} />
                    <div style={{ flex: 1, background: 'linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.25) 100%)', borderRadius: '8px', marginTop: '12px' }} />
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              {FLOAT_BADGES.map((b, i) => (
                <div key={b.title} className="float-badge" style={{ cssText: b.pos } as React.CSSProperties}
                  // @ts-ignore
                  style={{ position: 'absolute', ...(Object.fromEntries(b.pos.split(';').map(p => p.trim().split(':')).map(([k,v]) => [k.trim(), v?.trim()]).filter(([k]) => k))), background: '#fff', borderRadius: '12px', padding: '8px 12px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', display: 'flex', alignItems: 'center', gap: '8px', animation: `float-y ${2.2 + i*0.25}s ease-in-out infinite alternate`, zIndex: 2 }}
                >
                  <span style={{ fontSize: '1rem' }}>{b.avatar}</span>
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>{b.title}</div>
                    <div style={{ fontSize: '0.5625rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section {
          background: #F5F3FF;
          padding: 4rem 0 3.5rem;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .hero-left { max-width: 560px; }
        .hero-heading {
          font-size: clamp(2.25rem, 5vw, 3.25rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #111827;
          margin: 0 0 1rem;
        }
        .hero-sub {
          font-size: 1.0625rem;
          color: #6B7280;
          line-height: 1.65;
          margin: 0 0 1.75rem;
        }
        /* Search */
        .hero-search-form {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1.5px solid #E5E7EB;
          border-radius: 12px;
          padding: 6px 6px 6px 1rem;
          gap: 0.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          margin-bottom: 2rem;
        }
        .hero-search-icon { color: #9CA3AF; flex-shrink: 0; }
        .hero-search-input {
          flex: 1; border: none; outline: none;
          font-size: 0.9375rem; color: #111827;
          background: transparent; font-family: inherit;
          min-width: 0;
        }
        .hero-search-input::placeholder { color: #9CA3AF; }
        .hero-search-btn {
          padding: 0.625rem 1.5rem;
          background: #6C5CE7; color: #fff;
          border: none; border-radius: 8px;
          font-size: 0.9375rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          font-family: inherit;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .hero-search-btn:hover { background: #5A4BD1; }
        /* Stats */
        .hero-stats {
          display: flex;
          gap: 0;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .hero-stat {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 0 1.5rem 0 0;
          position: relative;
        }
        .hero-stat + .hero-stat::before {
          content: '';
          position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 1px; background: #DDD8FF;
        }
        .hero-stat-icon {
          width: 40px; height: 40px;
          background: #EDE9FE;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 6px;
        }
        .hero-stat-value {
          font-size: 1.375rem; font-weight: 800;
          color: #111827; letter-spacing: -0.02em;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 0.6875rem; color: #9CA3AF;
          font-weight: 500; margin-top: 2px;
          white-space: nowrap;
        }
        .hero-cta-row {
          display: flex; gap: 0.75rem; flex-wrap: wrap;
        }
        /* Right visual */
        .hero-right {
          display: none;
          position: relative;
          height: 420px;
          align-items: center;
          justify-content: center;
        }
        .hero-glow {
          position: absolute;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%);
          border-radius: 50%;
          left: 50%; top: 50%; transform: translate(-50%, -50%);
        }
        /* Phones */
        .phones-wrap {
          position: relative;
          width: 240px; height: 360px;
          display: flex; align-items: center; justify-content: center;
          z-index: 1;
        }
        .phone {
          position: absolute;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08) inset;
        }
        .phone-center {
          width: 120px; height: 230px;
          background: #111;
          z-index: 3;
          display: flex; flex-direction: column;
          padding: 12px 8px 8px;
          gap: 0;
        }
        .phone-left {
          width: 100px; height: 190px;
          background: #1a1a2e;
          left: -50px; top: 20px;
          z-index: 2;
          transform: rotate(-8deg);
          display: flex; flex-direction: column;
          padding: 10px 7px 7px;
        }
        .phone-right {
          width: 100px; height: 190px;
          background: #1e1b4b;
          right: -50px; top: 20px;
          z-index: 2;
          transform: rotate(8deg);
          display: flex; flex-direction: column;
          padding: 10px 7px 7px;
        }
        .phone-notch {
          width: 50px; height: 6px;
          background: #222; border-radius: 3px;
          margin: 0 auto 8px;
          flex-shrink: 0;
        }
        .phone-screen {
          flex: 1;
          border-radius: 12px;
          display: flex; flex-direction: column;
          padding: 10px;
          overflow: hidden;
        }
        .phone-home-bar {
          width: 50px; height: 4px;
          background: rgba(255,255,255,0.3); border-radius: 2px;
          margin: 6px auto 0;
          flex-shrink: 0;
        }
        @keyframes float-y {
          from { transform: translateY(0); }
          to   { transform: translateY(-8px); }
        }
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1fr 1fr; }
          .hero-right { display: flex !important; }
          .hero-stat { padding: 0 2rem 0 0; }
        }
      `}</style>
    </>
  );
}
