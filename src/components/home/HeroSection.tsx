'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Search, Package, Users, ShieldCheck, Star } from 'lucide-react';

const STATS = [
  { Icon: Package,     value: '10K+', label: 'SKUs in Stock' },
  { Icon: Users,       value: '50+',  label: 'Export Markets' },
  { Icon: Star,        value: '4.9★', label: 'Client Rating' },
  { Icon: ShieldCheck, value: '100%', label: 'Verified Stock' },
];

export default function HeroSection() {
  const [search, setSearch] = useState('');

  return (
    <>
      <section className="hero-section">
        <div className="container-site">
          <div className="hero-grid">

            {/* ── Left content ─────────────────────── */}
            <div className="hero-left">

              {/* Eyebrow */}
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                UAE&apos;s Trusted B2B Wholesale Supplier
              </div>

              {/* Headline */}
              <h1 className="hero-heading">
                Wholesale Mobile<br />
                <span className="hero-heading-accent">Devices</span> from Dubai
              </h1>

              {/* Sub */}
              <p className="hero-sub">
                Brand new &amp; refurbished iPhones, Samsung, Xiaomi &amp; more.<br />
                MOQ from 5 units · Global export · Quote within 2 hours.
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

            {/* ── Right — hero image (phone + badges baked in) ── */}
            <div className="hero-right">
              {/* Ambient orange glow */}
              <div className="hero-glow" />

              {/* Hero image — transparent PNG, badges already inside it */}
              <div className="hero-img-wrap">
                <Image
                  src="/images/hero section.png"
                  alt="iPhone Pro — BIG PHONE Wholesale"
                  width={716}
                  height={716}
                  priority
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                    filter: 'drop-shadow(0 32px 64px rgba(255,107,0,0.22)) drop-shadow(0 8px 24px rgba(0,0,0,0.18))',
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
          background-image: radial-gradient(circle, rgba(255,107,0,0.13) 1px, transparent 1px);
          background-size: 28px 28px;
          padding: 4rem 0 3.5rem;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }
        .hero-left { max-width: 560px; }

        /* ─── Eyebrow ────────────────────── */
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
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        /* ─── Heading ────────────────────── */
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

        /* ─── Search ────────────────────── */
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

        /* ─── Stats ────────────────────── */
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
          content: ''; position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 1px; background: #FFD0A0;
        }
        .hero-stat-icon {
          width: 38px; height: 38px; background: #FFF0E0;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 5px;
        }
        .hero-stat-value { font-size: 1.3125rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; line-height: 1; }
        .hero-stat-label { font-size: 0.625rem; color: #9CA3AF; font-weight: 500; margin-top: 2px; white-space: nowrap; }
        .hero-cta-row    { display: flex; gap: 0.75rem; flex-wrap: wrap; }

        /* ─── Right column ──────────────────── */
        .hero-right {
          display: none;
          position: relative;
          align-items: center;
          justify-content: center;
          height: 520px;
        }

        /* Soft orange ambient glow */
        .hero-glow {
          position: absolute;
          width: 460px; height: 460px;
          background: radial-gradient(circle,
            rgba(255,107,0,0.20) 0%,
            rgba(255,140,51,0.08) 50%,
            transparent 70%);
          border-radius: 50%;
          left: 50%; top: 50%; transform: translate(-50%, -50%);
          pointer-events: none; z-index: 0;
        }

        /* ─── Hero image wrap ───────────────────── */
        .hero-img-wrap {
          position: relative; z-index: 1;
          width: 100%;
          max-width: 528px;
          aspect-ratio: 1 / 1;
          margin-top: -24px;
          animation: heroFloat 8s ease-in-out infinite;
        }

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }

        /* ─── Responsive ────────────────────── */
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
          .hero-right { display: flex !important; }
          .hero-stat  { padding: 0 2rem 0 0; }
        }

        @media (min-width: 1200px) {
          .hero-img-wrap { max-width: 572px; }
          .hero-right { height: 560px; }
        }
      `}</style>
    </>
  );
}
