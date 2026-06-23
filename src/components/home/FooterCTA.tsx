import Link from 'next/link';
import { ArrowRight, MessageCircle, Package } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

function CamelSVG() {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id="camel-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="camel-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>
        <filter id="camel-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="162" cy="228" rx="100" ry="8" fill="url(#camel-shadow)" />

      {/* Camel body — main torso */}
      <path
        d="M72 148 Q68 120 75 108 Q82 96 100 95 Q120 94 135 98 Q150 102 160 112 Q170 122 172 140 Q174 158 168 172 Q162 186 148 192 Q134 198 118 196 Q102 194 90 184 Q78 174 72 148Z"
        fill="url(#camel-body)"
        filter="url(#camel-glow)"
      />

      {/* Hump */}
      <path
        d="M108 95 Q118 62 132 55 Q146 48 156 58 Q166 68 162 85 Q158 102 148 108 Q138 114 125 112 Q112 110 108 95Z"
        fill="url(#camel-body)"
        filter="url(#camel-glow)"
      />

      {/* Neck */}
      <path
        d="M152 98 Q162 85 170 72 Q178 59 182 46 Q186 34 188 28"
        stroke="url(#camel-body)"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
        filter="url(#camel-glow)"
      />

      {/* Head */}
      <ellipse
        cx="188"
        cy="24"
        rx="22"
        ry="16"
        fill="url(#camel-body)"
        filter="url(#camel-glow)"
      />

      {/* Snout extension */}
      <path
        d="M206 22 Q220 24 222 30 Q224 36 218 40 Q212 44 206 38"
        fill="url(#camel-body)"
        filter="url(#camel-glow)"
      />

      {/* Nostril */}
      <ellipse cx="218" cy="35" rx="3" ry="2" fill="#92400E" opacity="0.6" />

      {/* Eye */}
      <circle cx="196" cy="18" r="3.5" fill="#1A0A00" />
      <circle cx="197" cy="17" r="1" fill="rgba(255,255,255,0.5)" />

      {/* Ear */}
      <path d="M178 10 L172 2 L182 8Z" fill="url(#camel-body)" />

      {/* Front legs */}
      <rect x="88" y="188" width="14" height="42" rx="6" fill="url(#camel-body)" />
      <rect x="88" y="224" width="14" height="8" rx="4" fill="#92400E" />

      <rect x="118" y="192" width="14" height="38" rx="6" fill="url(#camel-body)" />
      <rect x="118" y="224" width="14" height="8" rx="4" fill="#92400E" />

      {/* Rear legs */}
      <rect x="148" y="186" width="14" height="44" rx="6" fill="url(#camel-body)" />
      <rect x="148" y="224" width="14" height="8" rx="4" fill="#92400E" />

      <rect x="172" y="188" width="14" height="42" rx="6" fill="url(#camel-body)" />
      <rect x="172" y="224" width="14" height="8" rx="4" fill="#92400E" />

      {/* Tail */}
      <path
        d="M72 152 Q58 148 54 138 Q50 128 56 122 Q60 118 64 124"
        stroke="#D97706"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function FooterCTA() {
  const waMessage = encodeURIComponent('Hi BIG PHONE, I want to learn more about your wholesale electronics. Can you help?');

  return (
    <section className="footer-cta-section">
      {/* Background layers */}
      <div className="footer-cta-bg-grid" aria-hidden="true" />
      <div className="footer-cta-glow-1" aria-hidden="true" />
      <div className="footer-cta-glow-2" aria-hidden="true" />

      <div className="container-site footer-cta-inner">

        {/* Left — Text + CTAs */}
        <div className="footer-cta-content">
          <div className="footer-cta-badge">
            <Package size={12} />
            Dubai's #1 B2B Electronics Marketplace
          </div>

          <h2 className="footer-cta-heading">
            Ready to Grow Your<br />
            <span className="footer-cta-heading-accent">Electronics Business?</span>
          </h2>

          <p className="footer-cta-sub">
            Browse thousands of wholesale listings from verified UAE suppliers,
            request instant quotes, and scale your inventory — all in one place.
          </p>

          <div className="footer-cta-actions">
            <Link href="/rfq" className="btn btn-primary btn-lg footer-cta-btn-primary">
              Get a Quote
              <ArrowRight size={16} />
            </Link>
            <Link href="/inventory" className="btn footer-cta-btn-ghost btn-lg">
              Explore Marketplace
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn footer-cta-btn-wa btn-lg"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>

          {/* Mini stats */}
          <div className="footer-cta-stats">
            {[
              { value: '500+', label: 'Products' },
              { value: '50+', label: 'Countries' },
              { value: '< 2h', label: 'Response' },
            ].map(s => (
              <div key={s.label} className="footer-cta-stat">
                <span className="footer-cta-stat-value">{s.value}</span>
                <span className="footer-cta-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Camel logo mark */}
        <div className="footer-cta-logo-wrap" aria-hidden="true">
          {/* Outer ring */}
          <div className="footer-cta-ring footer-cta-ring-3" />
          <div className="footer-cta-ring footer-cta-ring-2" />
          <div className="footer-cta-ring footer-cta-ring-1" />

          {/* Amber halo disc */}
          <div className="footer-cta-halo" />

          {/* Camel container */}
          <div className="footer-cta-camel">
            <CamelSVG />
          </div>

          {/* Location badge */}
          <div className="footer-cta-location">
            <span className="footer-cta-location-dot" />
            Est. Dubai, UAE
          </div>
        </div>
      </div>

      <style>{`
        .footer-cta-section {
          position: relative;
          background: #030B18;
          overflow: hidden;
          padding: 5.5rem 0 5rem;
          border-top: 1px solid rgba(245,158,11,0.12);
        }

        /* Dot grid background */
        .footer-cta-bg-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(245,158,11,0.08) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        /* Ambient glows */
        .footer-cta-glow-1 {
          position: absolute;
          top: -120px;
          left: -80px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-cta-glow-2 {
          position: absolute;
          bottom: -100px;
          right: 0;
          width: 600px;
          height: 400px;
          background: radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Layout */
        .footer-cta-inner {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .footer-cta-inner { grid-template-columns: 1fr 380px; gap: 4rem; }
        }

        /* Badge */
        .footer-cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.875rem;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #F59E0B;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        /* Heading */
        .footer-cta-heading {
          font-size: clamp(2rem, 4.5vw, 2.75rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin: 0 0 1.125rem;
        }
        .footer-cta-heading-accent {
          background: linear-gradient(90deg, #F59E0B 0%, #FBBF24 50%, #FCD34D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-cta-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 0 2.25rem;
        }

        /* CTA buttons */
        .footer-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        .footer-cta-btn-primary {
          background: #0066FF !important;
          color: #fff !important;
          padding: 0.875rem 1.625rem !important;
          font-weight: 700 !important;
          border-radius: 0.5rem !important;
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s !important;
          box-shadow: 0 4px 20px rgba(0,102,255,0.3) !important;
        }
        .footer-cta-btn-primary:hover {
          background: #0052CC !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 28px rgba(0,102,255,0.4) !important;
        }
        .footer-cta-btn-ghost {
          background: transparent !important;
          color: rgba(255,255,255,0.8) !important;
          border: 1.5px solid rgba(255,255,255,0.18) !important;
          border-radius: 0.5rem !important;
          transition: all 0.15s !important;
        }
        .footer-cta-btn-ghost:hover {
          border-color: rgba(255,255,255,0.4) !important;
          background: rgba(255,255,255,0.05) !important;
          color: #fff !important;
        }
        .footer-cta-btn-wa {
          background: #00A850 !important;
          color: #fff !important;
          border-radius: 0.5rem !important;
          font-weight: 600 !important;
          transition: background 0.15s, transform 0.15s !important;
        }
        .footer-cta-btn-wa:hover {
          background: #007A3D !important;
          transform: translateY(-1px) !important;
        }

        /* Stats */
        .footer-cta-stats {
          display: flex;
          gap: 2rem;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-cta-stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .footer-cta-stat-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: #F59E0B;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .footer-cta-stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Camel logo mark */
        .footer-cta-logo-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 340px;
          height: 340px;
          margin: 0 auto;
        }
        @media (min-width: 900px) {
          .footer-cta-logo-wrap {
            max-width: 380px;
            height: 380px;
          }
        }

        /* Rings */
        .footer-cta-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          animation: footer-ring-pulse 4s ease-in-out infinite;
        }
        .footer-cta-ring-1 {
          width: 240px; height: 240px;
          border-color: rgba(245,158,11,0.25);
          animation-delay: 0s;
        }
        .footer-cta-ring-2 {
          width: 300px; height: 300px;
          border-color: rgba(245,158,11,0.12);
          animation-delay: 0.8s;
        }
        .footer-cta-ring-3 {
          width: 360px; height: 360px;
          border-color: rgba(245,158,11,0.05);
          animation-delay: 1.6s;
        }
        @keyframes footer-ring-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.04); opacity: 0.6; }
        }

        /* Amber halo disc */
        .footer-cta-halo {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0.08) 50%, transparent 75%);
        }

        /* Camel SVG */
        .footer-cta-camel {
          position: relative;
          z-index: 2;
          width: 220px;
          height: 180px;
          filter: drop-shadow(0 8px 32px rgba(245,158,11,0.35)) drop-shadow(0 2px 8px rgba(245,158,11,0.2));
        }
        @media (min-width: 900px) {
          .footer-cta-camel { width: 260px; height: 210px; }
        }

        /* Location badge */
        .footer-cta-location {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.875rem;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 100px;
          font-size: 0.6875rem;
          font-weight: 600;
          color: rgba(245,158,11,0.8);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .footer-cta-location-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F59E0B;
          box-shadow: 0 0 6px #F59E0B;
          animation: footer-dot-blink 2s ease-in-out infinite;
        }
        @keyframes footer-dot-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
