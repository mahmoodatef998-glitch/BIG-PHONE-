'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Package, Users, Smile, ShieldCheck } from 'lucide-react';

const STATS = [
  { Icon: Package,     value: '10K+',  label: 'Products' },
  { Icon: Users,       value: '500+',  label: 'Trusted Sellers' },
  { Icon: Smile,       value: '50K+',  label: 'Happy Customers' },
  { Icon: ShieldCheck, value: '100%',  label: 'Secure Transactions' },
];

const FLOAT_BADGES = [
  { title: 'Trusted Sellers',        sub: 'Top rated sellers',    avatar: '⭐', pos: { top: '4%',    left: '0%'   } },
  { title: 'Buy Used Safely',        sub: 'Certified devices',    avatar: '🛡️', pos: { top: '30%',   left: '-6%'  } },
  { title: '24/7 Support',           sub: "We're here",           avatar: '🎧', pos: { top: '6%',    right: '0%'  } },
  { title: 'Secure Payments',        sub: '100% protected',       avatar: '🔒', pos: { top: '40%',   right: '-6%' } },
  { title: 'Best Prices',            sub: 'Guaranteed',           avatar: '💰', pos: { bottom: '24%',right: '0%'  } },
  { title: 'Satisfaction Guarantee', sub: '7 Days Return Policy', avatar: '✅', pos: { bottom: '6%', left: '4%'   } },
];

export default function HeroSection() {
  const [search, setSearch] = useState('');

  return (
    <>
      <section className="hero-section">
        <div className="container-site">
          <div className="hero-grid">

            {/* ── Left ─────────────────────────────────── */}
            <div className="hero-left">
              <h1 className="hero-heading">
                The Ultimate<br />Mobile Marketplace
              </h1>
              <p className="hero-sub">
                Buy from trusted sellers. New, used<br />or refurbished — you choose.
              </p>

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

              <div className="hero-stats">
                {STATS.map(s => (
                  <div key={s.label} className="hero-stat">
                    <div className="hero-stat-icon">
                      <s.Icon size={20} color="#FF6B00" />
                    </div>
                    <div className="hero-stat-value">{s.value}</div>
                    <div className="hero-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="hero-cta-row">
                <Link href="/inventory" className="btn btn-primary btn-lg btn-pill">Browse Products</Link>
                <Link href="/rfq" className="btn btn-ghost btn-lg btn-pill">Get a Quote</Link>
              </div>
            </div>

            {/* ── Right — real iPhone photo ─────────────── */}
            <div className="hero-right">
              <div className="hero-glow" />

              {/* Floating badges */}
              {FLOAT_BADGES.map((b, i) => (
                <div
                  key={b.title}
                  style={{
                    position: 'absolute',
                    ...b.pos,
                    background: '#fff',
                    borderRadius: '14px',
                    padding: '9px 13px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.09)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '9px',
                    animation: `floatBadge ${5.5 + i * 0.5}s ease-in-out infinite alternate`,
                    zIndex: 3,
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <span style={{ fontSize: '1.0625rem', lineHeight: 1 }}>{b.avatar}</span>
                  <div>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>{b.title}</div>
                    <div style={{ fontSize: '0.5625rem', color: '#9CA3AF', whiteSpace: 'nowrap', marginTop: '1px' }}>{b.sub}</div>
                  </div>
                </div>
              ))}

              {/* iPhone photo */}
              <div className="iphone-photo-wrap">
                <Image
                  src="/images/iphone-hero.png"
                  alt="iPhone"
                  width={260}
                  height={480}
                  priority
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                    maxWidth: '260px',
                    maxHeight: '420px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hero-section {
          background: #FFF3E8;
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
          font-weight: 800; line-height: 1.1;
          letter-spacing: -0.03em; color: #111827;
          margin: 0 0 1rem;
        }
        .hero-sub {
          font-size: 1.0625rem; color: #6B7280;
          line-height: 1.65; margin: 0 0 1.75rem;
        }
        .hero-search-form {
          display: flex; align-items: center;
          background: #fff; border: 1.5px solid #E5E7EB;
          border-radius: 12px; padding: 6px 6px 6px 1rem;
          gap: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          margin-bottom: 2rem;
        }
        .hero-search-icon { color: #9CA3AF; flex-shrink: 0; }
        .hero-search-input {
          flex: 1; border: none; outline: none;
          font-size: 0.9375rem; color: #111827;
          background: transparent; font-family: inherit; min-width: 0;
        }
        .hero-search-input::placeholder { color: #9CA3AF; }
        .hero-search-btn {
          padding: 0.625rem 1.5rem;
          background: #FF6B00; color: #fff;
          border: none; border-radius: 8px;
          font-size: 0.9375rem; font-weight: 600;
          cursor: pointer; white-space: nowrap;
          font-family: inherit; transition: background 0.18s; flex-shrink: 0;
        }
        .hero-search-btn:hover { background: #E55A00; }
        .hero-stats {
          display: flex; gap: 0;
          margin-bottom: 2rem; flex-wrap: wrap;
        }
        .hero-stat {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 0 1.5rem 0 0; position: relative;
        }
        .hero-stat + .hero-stat::before {
          content: ''; position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 1px; background: #FFD0A0;
        }
        .hero-stat-icon {
          width: 40px; height: 40px; background: #FFF0E0;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 6px;
        }
        .hero-stat-value { font-size: 1.375rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; line-height: 1; }
        .hero-stat-label { font-size: 0.6875rem; color: #9CA3AF; font-weight: 500; margin-top: 2px; white-space: nowrap; }
        .hero-cta-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }

        /* Right column */
        .hero-right {
          display: none;
          position: relative;
          height: 440px;
          align-items: center;
          justify-content: center;
        }
        .hero-glow {
          position: absolute; width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(255,107,0,0.16) 0%, transparent 70%);
          border-radius: 50%;
          left: 50%; top: 50%; transform: translate(-50%, -50%);
          pointer-events: none;
        }

        /* iPhone photo wrapper */
        .iphone-photo-wrap {
          position: relative; z-index: 1;
          display: flex; align-items: center; justify-content: center;
          width: 260px; height: 420px;
          animation: phoneFloat 8s ease-in-out infinite;
          filter:
            drop-shadow(0 40px 60px rgba(0,0,0,0.30))
            drop-shadow(0 8px 24px rgba(255,107,0,0.18));
        }

        /* Animations */
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0)    rotate(0deg); }
          50%       { transform: translateY(-5px) rotate(0.25deg); }
        }
        @keyframes floatBadge {
          from { transform: translateY(0); }
          to   { transform: translateY(-4px); }
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
