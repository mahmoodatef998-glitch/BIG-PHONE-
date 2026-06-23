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
  { title: 'Trusted Sellers',        sub: 'Top rated sellers',    avatar: '⭐', pos: { top: '6%',    left: '2%'   } },
  { title: 'Buy Used Safely',        sub: 'Certified devices',    avatar: '🛡️', pos: { top: '30%',   left: '-4%'  } },
  { title: '24/7 Support',           sub: "We're here",           avatar: '🎧', pos: { top: '8%',    right: '2%'  } },
  { title: 'Secure Payments',        sub: '100% protected',       avatar: '🔒', pos: { top: '42%',   right: '-4%' } },
  { title: 'Best Prices',            sub: 'Guaranteed',           avatar: '💰', pos: { bottom: '26%',right: '0%'  } },
  { title: 'Satisfaction Guarantee', sub: '7 Days Return Policy', avatar: '✅', pos: { bottom: '8%', left: '4%'   } },
];

export default function HeroSection() {
  const [search, setSearch] = useState('');

  return (
    <>
      <section className="hero-section">
        <div className="container-site">
          <div className="hero-grid">

            {/* ── Left ─────────────────────────────── */}
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

            {/* ── Right — iPhone Pro visual ─────────── */}
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

              {/* ── CSS iPhone Pro (back view) ───── */}
              <div className="iphone-showcase">
                {/* Outer titanium frame */}
                <div className="iphone-frame">
                  {/* Glass back */}
                  <div className="iphone-back">
                    {/* Camera island */}
                    <div className="camera-island">
                      {/* Main lens — largest */}
                      <div className="cam cam-main">
                        <div className="cam-inner" />
                        <div className="cam-reflex" />
                      </div>
                      {/* Ultra-wide */}
                      <div className="cam cam-uw">
                        <div className="cam-inner" />
                        <div className="cam-reflex" />
                      </div>
                      {/* Telephoto */}
                      <div className="cam cam-tele">
                        <div className="cam-inner" />
                        <div className="cam-reflex" />
                      </div>
                      {/* Flash */}
                      <div className="cam-flash" />
                      {/* LiDAR */}
                      <div className="cam-lidar" />
                    </div>

                    {/* Apple logo */}
                    <div className="apple-logo">
                      <svg width="28" height="34" viewBox="0 0 814 1000" fill="rgba(0,0,0,0.26)">
                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.3 135.3-316.9 268.4-316.9 71 0 130.1 46.4 174.7 46.4 42.7 0 109.6-49.1 192.6-49.1 30.8 0 134.2 2.8 203.7 99.3zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
                      </svg>
                    </div>

                    {/* Glass sheen overlay */}
                    <div className="glass-sheen" />
                  </div>
                </div>

                {/* Side buttons */}
                <div className="btn-silent" />
                <div className="btn-vol-up" />
                <div className="btn-vol-down" />
                <div className="btn-power" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero layout ──────────────────────────────── */
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

        /* ── Search ──────────────────────────────────── */
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
          background: transparent; font-family: inherit; min-width: 0;
        }
        .hero-search-input::placeholder { color: #9CA3AF; }
        .hero-search-btn {
          padding: 0.625rem 1.5rem;
          background: #FF6B00; color: #fff;
          border: none; border-radius: 8px;
          font-size: 0.9375rem; font-weight: 600;
          cursor: pointer; white-space: nowrap; font-family: inherit;
          transition: background 0.18s; flex-shrink: 0;
        }
        .hero-search-btn:hover { background: #E55A00; }

        /* ── Stats ───────────────────────────────────── */
        .hero-stats {
          display: flex; gap: 0; margin-bottom: 2rem; flex-wrap: wrap;
        }
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
          width: 40px; height: 40px; background: #FFF0E0;
          border-radius: 10px; display: flex; align-items: center;
          justify-content: center; margin-bottom: 6px;
        }
        .hero-stat-value { font-size: 1.375rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; line-height: 1; }
        .hero-stat-label { font-size: 0.6875rem; color: #9CA3AF; font-weight: 500; margin-top: 2px; white-space: nowrap; }
        .hero-cta-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }

        /* ── Right column ─────────────────────────────── */
        .hero-right {
          display: none;
          position: relative;
          height: 440px;
          align-items: center;
          justify-content: center;
        }
        .hero-glow {
          position: absolute; width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,107,0,0.18) 0%, transparent 70%);
          border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%, -50%);
          pointer-events: none;
        }

        /* ── CSS iPhone Pro (back view) ───────────────── */
        .iphone-showcase {
          position: relative;
          width: 186px; height: 402px;
          z-index: 1;
          animation: phoneFloat 8s ease-in-out infinite;
        }
        .iphone-frame {
          position: absolute; inset: 0; border-radius: 46px;
          background: linear-gradient(145deg, #992C00 0%, #C84000 30%, #FF7030 70%, #B03800 100%);
          box-shadow:
            0 40px 80px rgba(0,0,0,0.45),
            0 0 50px rgba(255,107,0,0.2),
            inset 0 1px 0 rgba(255,200,150,0.2);
        }
        .iphone-back {
          position: absolute; inset: 3px; border-radius: 43px; overflow: hidden;
          background: linear-gradient(148deg, #FF8C40 0%, #FF6B00 28%, #EE5800 62%, #CC4400 100%);
        }
        .glass-sheen {
          position: absolute; inset: 0; border-radius: 43px; pointer-events: none;
          background: linear-gradient(152deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 28%, transparent 55%);
        }

        /* Camera island */
        .camera-island {
          position: absolute; top: 22px; left: 18px;
          width: 114px; height: 110px;
          background: rgba(0,0,0,0.26); border-radius: 26px;
          border: 1px solid rgba(0,0,0,0.45);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3), inset 0 0 0 0.5px rgba(255,255,255,0.04);
        }
        .cam {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle at 32% 32%, #252525, #000 60%, #111);
          border: 2px solid rgba(40,15,0,0.55);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.04);
          overflow: hidden;
        }
        .cam-main  { width: 46px; height: 46px; top: 10px; left:  8px; }
        .cam-uw    { width: 34px; height: 34px; top: 12px; right: 10px; }
        .cam-tele  { width: 34px; height: 34px; bottom: 12px; left: 14px; }
        .cam-inner {
          position: absolute; inset: 4px; border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #1a1a30, #000);
        }
        .cam-reflex {
          position: absolute; top: 18%; left: 18%;
          width: 28%; height: 28%;
          background: rgba(110,150,255,0.22); border-radius: 50%;
        }
        .cam-flash {
          position: absolute; bottom: 14px; right: 10px;
          width: 18px; height: 18px; border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, #FFFDE0, #FFE04A, #FFB800);
          box-shadow: 0 0 0 2px rgba(0,0,0,0.3), 0 0 8px rgba(255,200,0,0.35);
        }
        .cam-lidar {
          position: absolute; bottom: 16px; right: 36px;
          width: 12px; height: 12px; border-radius: 50%;
          background: radial-gradient(circle, #2a0a00, #000);
          border: 1.5px solid rgba(40,15,0,0.5);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4);
        }

        /* Apple logo */
        .apple-logo {
          position: absolute; left: 50%; top: 58%;
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.12));
        }

        /* Side buttons */
        .btn-silent {
          position: absolute; left: -3.5px; top: 64px;
          width: 4px; height: 26px;
          background: linear-gradient(180deg, #8B2800, #CC4400, #8B2800);
          border-radius: 2px 0 0 2px;
        }
        .btn-vol-up {
          position: absolute; left: -3.5px; top: 104px;
          width: 4px; height: 46px;
          background: linear-gradient(180deg, #8B2800, #CC4400, #8B2800);
          border-radius: 2px 0 0 2px;
        }
        .btn-vol-down {
          position: absolute; left: -3.5px; top: 162px;
          width: 4px; height: 46px;
          background: linear-gradient(180deg, #8B2800, #CC4400, #8B2800);
          border-radius: 2px 0 0 2px;
        }
        .btn-power {
          position: absolute; right: -3.5px; top: 122px;
          width: 4px; height: 62px;
          background: linear-gradient(180deg, #8B2800, #CC4400, #8B2800);
          border-radius: 0 2px 2px 0;
        }

        /* ── Animations ──────────────────────────────── */
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0)      rotate(0deg); }
          50%       { transform: translateY(-5px)   rotate(0.25deg); }
        }
        @keyframes floatBadge {
          from { transform: translateY(0); }
          to   { transform: translateY(-4px); }
        }

        /* ── Responsive ──────────────────────────────── */
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: 1fr 1fr; }
          .hero-right { display: flex !important; }
          .hero-stat { padding: 0 2rem 0 0; }
        }
      `}</style>
    </>
  );
}
