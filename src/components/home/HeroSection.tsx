import Link from 'next/link';
import { Search, Package, Users, Smile, ShieldCheck } from 'lucide-react';

const STATS = [
  { icon: Package,     value: '500+',  label: 'Products' },
  { icon: Users,       value: '50K+',  label: 'Users' },
  { icon: Smile,       value: '98%',   label: 'Happy Buyers' },
  { icon: ShieldCheck, value: '100%',  label: 'Secure Pay' },
];

export default function HeroSection() {
  return (
    <section style={{ background: '#F5F3FF', padding: '3.5rem 0 3rem', overflow: 'hidden' }}>
      <div className="container-site">
        <div className="hero-layout">

          {/* Left column */}
          <div style={{ flex: 1, maxWidth: '560px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              background: '#EDE9FE', borderRadius: '9999px',
              padding: '0.375rem 0.875rem', marginBottom: '1.25rem',
            }}>
              <span style={{ width: '6px', height: '6px', background: '#6C5CE7', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#6C5CE7' }}>
                The #1 Mobile Marketplace in UAE
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}>
              The Ultimate<br />
              <span style={{ color: '#6C5CE7' }}>Mobile Marketplace</span>
            </h1>

            <p style={{
              fontSize: '1.0625rem',
              color: '#6B7280',
              lineHeight: 1.65,
              marginBottom: '2rem',
              maxWidth: '480px',
            }}>
              Buy from trusted sellers. New, used or refurbished &mdash; you choose.
              Compare prices, read reviews, order in minutes.
            </p>

            {/* Search */}
            <form action="/inventory" method="GET" style={{ marginBottom: '2.5rem' }}>
              <div style={{
                display: 'flex', alignItems: 'stretch',
                background: '#fff', borderRadius: '12px',
                border: '2px solid #DDD6FE',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(108,92,231,0.12)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  paddingLeft: '1rem', color: '#9CA3AF', flexShrink: 0,
                }}>
                  <Search size={18} />
                </div>
                <input
                  type="search"
                  name="search"
                  placeholder="Search iPhone 16, Samsung S25, AirPods..."
                  aria-label="Search products"
                  style={{
                    flex: 1, border: 'none', outline: 'none',
                    padding: '0.875rem 0.75rem',
                    fontSize: '0.9375rem', color: '#111827',
                    background: 'transparent', minWidth: 0,
                  }}
                />
                <button type="submit" className="hero-search-btn">
                  Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="hero-stats">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: '#EDE9FE', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={20} color="#6C5CE7" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1 }}>
                      {value}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: '#6B7280', fontWeight: 500, marginTop: '0.125rem' }}>
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — phone mockups */}
          <div className="hero-phones-wrap">
            <div style={{ position: 'relative', width: '300px', height: '400px', margin: '0 auto' }}>
              <div className="phone-left"><div className="phone-inner" /></div>
              <div className="phone-right"><div className="phone-inner" /></div>
              <div className="phone-center">
                <div className="phone-inner phone-center-inner">
                  <div className="phone-screen" />
                </div>
              </div>
              <div className="fbadge" style={{ top: '5%', left: '-40px', animationDelay: '0s' }}>📱 iPhone 15 Pro</div>
              <div className="fbadge" style={{ top: '32%', left: '-55px', animationDelay: '0.4s' }}>Galaxy S24</div>
              <div className="fbadge" style={{ bottom: '20%', left: '-30px', animationDelay: '0.8s' }}>🚚 Free Delivery</div>
              <div className="fbadge" style={{ top: '8%', right: '-45px', animationDelay: '0.2s' }}>MacBook Air</div>
              <div className="fbadge" style={{ top: '42%', right: '-58px', animationDelay: '0.6s' }}>🎧 AirPods Pro</div>
              <div className="fbadge" style={{ bottom: '16%', right: '-32px', animationDelay: '1s' }}>🔒 Secure Pay</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-layout {
          display: flex;
          align-items: center;
          gap: 3rem;
          flex-direction: column;
          text-align: center;
        }
        @media (min-width: 900px) {
          .hero-layout { flex-direction: row; text-align: left; }
          .hero-stats { grid-template-columns: repeat(4, auto) !important; }
        }
        .hero-phones-wrap { display: none; }
        @media (min-width: 900px) { .hero-phones-wrap { display: block; flex-shrink: 0; } }

        .hero-search-btn {
          background: #6C5CE7; color: #fff;
          border: none; padding: 0 1.5rem;
          font-size: 0.9375rem; font-weight: 700;
          cursor: pointer; white-space: nowrap;
          transition: background 0.15s; flex-shrink: 0;
          font-family: inherit;
        }
        .hero-search-btn:hover { background: #5B4BD5; }

        .phone-left, .phone-center, .phone-right { position: absolute; bottom: 0; }
        .phone-left {
          left: 25px; width: 100px; height: 210px;
          transform: rotate(-8deg) translateY(15px);
          transform-origin: bottom center;
        }
        .phone-center {
          left: 50%; transform: translateX(-50%);
          width: 120px; height: 260px; z-index: 2;
        }
        .phone-right {
          right: 25px; width: 100px; height: 210px;
          transform: rotate(8deg) translateY(15px);
          transform-origin: bottom center;
        }
        .phone-inner {
          width: 100%; height: 100%;
          background: linear-gradient(160deg, #1F1F2E 0%, #2D2D4E 100%);
          border-radius: 18px;
          border: 3px solid rgba(255,255,255,0.12);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          position: relative; overflow: hidden;
        }
        .phone-center-inner {
          background: linear-gradient(160deg, #111827 0%, #1F2937 100%) !important;
          border-color: rgba(108,92,231,0.5) !important;
          box-shadow: 0 20px 60px rgba(108,92,231,0.3), 0 0 0 1px rgba(108,92,231,0.25) !important;
        }
        .phone-screen {
          position: absolute; inset: 12px;
          background: linear-gradient(135deg, #6C5CE7 0%, #A78BFA 50%, #6C5CE7 100%);
          border-radius: 10px; opacity: 0.7;
        }
        .phone-inner::before {
          content: '';
          position: absolute; top: 8px; left: 50%;
          transform: translateX(-50%);
          width: 30px; height: 4px;
          background: rgba(255,255,255,0.18);
          border-radius: 9999px;
        }
        .fbadge {
          position: absolute;
          background: #fff;
          border-radius: 24px;
          padding: 0.375rem 0.875rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #111827;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          border: 1px solid rgba(108,92,231,0.12);
          animation: float-y 3s ease-in-out infinite;
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (prefers-reduced-motion: reduce) { .fbadge { animation: none; } }
      `}</style>
    </section>
  );
}
