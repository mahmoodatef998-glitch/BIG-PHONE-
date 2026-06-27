'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Translations } from '@/lib/i18n';

// ── Inline device SVG illustrations ─────────────────────────────────────

function SmartphoneSVG() {
  return (
    <svg viewBox="0 0 54 96" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="2" y="2" width="50" height="92" rx="10" fill="url(#sp-b)" />
      <rect x="2" y="2" width="50" height="92" rx="10" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
      <rect x="6" y="10" width="42" height="72" rx="5" fill="#080810" />
      <rect x="18" y="12.5" width="18" height="5" rx="2.5" fill="#030308" />
      <rect x="10" y="22" width="34" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
      <rect x="10" y="27" width="22" height="1.5" rx="0.75" fill="rgba(255,255,255,0.05)" />
      <rect x="10" y="33" width="28" height="14" rx="3" fill="rgba(255,255,255,0.04)" />
      <rect x="18" y="78" width="18" height="2.5" rx="1.25" fill="rgba(255,255,255,0.25)" />
      <rect x="52" y="20" width="2.5" height="14" rx="1.25" fill="#505050" />
      <rect x="-0.5" y="18" width="2.5" height="10" rx="1.25" fill="#505050" />
      <rect x="-0.5" y="32" width="2.5" height="10" rx="1.25" fill="#505050" />
      <defs>
        <linearGradient id="sp-b" x1="2" y1="2" x2="54" y2="94" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A4A4E" />
          <stop offset="1" stopColor="#1A1A1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TabletSVG() {
  return (
    <svg viewBox="0 0 96 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="2" y="2" width="92" height="68" rx="8" fill="url(#tb-b)" />
      <rect x="2" y="2" width="92" height="68" rx="8" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
      <rect x="8" y="7" width="76" height="58" rx="4" fill="#080810" />
      <circle cx="91" cy="36" r="2.5" fill="#3A3A3C" />
      <rect x="14" y="14" width="50" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
      <rect x="14" y="19" width="34" height="1.5" rx="0.75" fill="rgba(255,255,255,0.05)" />
      <rect x="14" y="30" width="44" height="22" rx="3" fill="rgba(255,255,255,0.04)" />
      <rect x="18" y="35" width="30" height="2" rx="1" fill="rgba(255,255,255,0.08)" />
      <rect x="18" y="40" width="20" height="1.5" rx="0.75" fill="rgba(255,255,255,0.05)" />
      <defs>
        <linearGradient id="tb-b" x1="2" y1="2" x2="94" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A4A4E" />
          <stop offset="1" stopColor="#1A1A1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LaptopSVG() {
  return (
    <svg viewBox="0 0 100 68" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="10" y="2" width="80" height="50" rx="5" fill="url(#lp-lid)" />
      <rect x="10" y="2" width="80" height="50" rx="5" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
      <rect x="14" y="6" width="72" height="42" rx="3" fill="#080810" />
      <circle cx="50" cy="4" r="1.2" fill="#2C2C2E" />
      <rect x="18" y="14" width="40" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
      <rect x="18" y="19" width="28" height="1.5" rx="0.75" fill="rgba(255,255,255,0.06)" />
      <rect x="18" y="26" width="64" height="10" rx="2" fill="rgba(255,107,0,0.12)" />
      <rect x="20" y="29" width="30" height="1.5" rx="0.75" fill="rgba(255,107,0,0.3)" />
      <rect x="8" y="52" width="84" height="3" rx="1" fill="#2C2C2E" />
      <rect x="2" y="55" width="96" height="11" rx="4" fill="url(#lp-base)" />
      <rect x="34" y="59" width="32" height="5" rx="2.5" fill="#2A2A2C" />
      <defs>
        <linearGradient id="lp-lid" x1="10" y1="2" x2="90" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A4A4E" />
          <stop offset="1" stopColor="#2A2A2C" />
        </linearGradient>
        <linearGradient id="lp-base" x1="2" y1="55" x2="98" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3A3A3C" />
          <stop offset="1" stopColor="#1A1A1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EarbudsSVG() {
  return (
    <svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="22" cy="30" rx="13" ry="15" fill="url(#eb-l)" />
      <ellipse cx="22" cy="30" rx="13" ry="15" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
      <rect x="18" y="45" width="8" height="22" rx="4" fill="url(#eb-sl)" />
      <circle cx="22" cy="28" r="4" fill="rgba(0,0,0,0.07)" />
      <circle cx="22" cy="28" r="2" fill="rgba(0,0,0,0.1)" />
      <ellipse cx="54" cy="30" rx="13" ry="15" fill="url(#eb-r)" />
      <ellipse cx="54" cy="30" rx="13" ry="15" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
      <rect x="50" y="45" width="8" height="22" rx="4" fill="url(#eb-sr)" />
      <circle cx="54" cy="28" r="4" fill="rgba(0,0,0,0.07)" />
      <circle cx="54" cy="28" r="2" fill="rgba(0,0,0,0.1)" />
      <defs>
        <linearGradient id="eb-l" x1="9" y1="15" x2="35" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8F8FA" /><stop offset="1" stopColor="#D4D4D8" />
        </linearGradient>
        <linearGradient id="eb-r" x1="41" y1="15" x2="67" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8F8FA" /><stop offset="1" stopColor="#D4D4D8" />
        </linearGradient>
        <linearGradient id="eb-sl" x1="18" y1="45" x2="26" y2="67" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0F0F2" /><stop offset="1" stopColor="#C4C4C8" />
        </linearGradient>
        <linearGradient id="eb-sr" x1="50" y1="45" x2="58" y2="67" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0F0F2" /><stop offset="1" stopColor="#C4C4C8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WatchSVG() {
  return (
    <svg viewBox="0 0 64 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="20" y="2" width="24" height="22" rx="5" fill="url(#wt-bt)" />
      <rect x="8" y="22" width="48" height="44" rx="12" fill="url(#wt-c)" />
      <rect x="8" y="22" width="48" height="44" rx="12" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      <rect x="13" y="27" width="38" height="34" rx="8" fill="#080810" />
      <text x="32" y="44" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">12:30</text>
      <rect x="18" y="48" width="28" height="1.5" rx="0.75" fill="rgba(255,255,255,0.12)" />
      <rect x="22" y="52" width="20" height="3" rx="1.5" fill="rgba(255,107,0,0.55)" />
      <rect x="56" y="33" width="3" height="9" rx="1.5" fill="#6E6E70" />
      <rect x="20" y="64" width="24" height="22" rx="5" fill="url(#wt-bb)" />
      <defs>
        <linearGradient id="wt-bt" x1="20" y1="2" x2="44" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#444" /><stop offset="1" stopColor="#222" />
        </linearGradient>
        <linearGradient id="wt-bb" x1="20" y1="64" x2="44" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#333" /><stop offset="1" stopColor="#111" />
        </linearGradient>
        <linearGradient id="wt-c" x1="8" y1="22" x2="56" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D2D2D6" /><stop offset="1" stopColor="#A0A0A8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GamingSVG() {
  return (
    <svg viewBox="0 0 100 68" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <path d="M22 18 C10 18 4 28 4 38 C4 52 14 62 26 62 C34 62 40 56 50 56 C60 56 66 62 74 62 C86 62 96 52 96 38 C96 28 90 18 78 18 L64 16 L36 16 Z" fill="url(#gm-b)" />
      <path d="M22 18 C10 18 4 28 4 38 C4 52 14 62 26 62 C34 62 40 56 50 56 C60 56 66 62 74 62 C86 62 96 52 96 38 C96 28 90 18 78 18 L64 16 L36 16 Z" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      <rect x="18" y="30" width="16" height="4" rx="2" fill="rgba(255,255,255,0.22)" />
      <rect x="24" y="24" width="4" height="16" rx="2" fill="rgba(255,255,255,0.22)" />
      <circle cx="70" cy="28" r="4" fill="#10B981" opacity="0.9" />
      <circle cx="78" cy="34" r="4" fill="#FF6B00" opacity="0.9" />
      <circle cx="70" cy="40" r="4" fill="#3B82F6" opacity="0.9" />
      <circle cx="62" cy="34" r="4" fill="#EF4444" opacity="0.9" />
      <circle cx="36" cy="44" r="8" fill="rgba(0,0,0,0.28)" />
      <circle cx="36" cy="44" r="5.5" fill="rgba(255,255,255,0.07)" />
      <circle cx="64" cy="48" r="8" fill="rgba(0,0,0,0.28)" />
      <circle cx="64" cy="48" r="5.5" fill="rgba(255,255,255,0.07)" />
      <circle cx="50" cy="30" r="5" fill="rgba(255,255,255,0.1)" />
      <rect x="16" y="13" width="20" height="6" rx="3" fill="#3A3A3C" />
      <rect x="64" y="13" width="20" height="6" rx="3" fill="#3A3A3C" />
      <defs>
        <linearGradient id="gm-b" x1="4" y1="16" x2="96" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2E2E32" /><stop offset="1" stopColor="#1A1A1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AudioSVG() {
  return (
    <svg viewBox="0 0 88 78" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <path d="M16 46 C16 22 28 6 44 6 C60 6 72 22 72 46" stroke="url(#hp-arc)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="4" y="40" width="22" height="32" rx="11" fill="url(#hp-l)" />
      <rect x="4" y="40" width="22" height="32" rx="11" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <rect x="8" y="44" width="14" height="24" rx="7" fill="#0a0a14" />
      <rect x="62" y="40" width="22" height="32" rx="11" fill="url(#hp-r)" />
      <rect x="62" y="40" width="22" height="32" rx="11" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
      <rect x="66" y="44" width="14" height="24" rx="7" fill="#0a0a14" />
      <ellipse cx="15" cy="56" rx="5" ry="7" fill="rgba(255,255,255,0.04)" />
      <ellipse cx="73" cy="56" rx="5" ry="7" fill="rgba(255,255,255,0.04)" />
      <rect x="74" y="54" width="4" height="4" rx="2" fill="#FF6B00" opacity="0.75" />
      <defs>
        <linearGradient id="hp-arc" x1="16" y1="6" x2="72" y2="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A4A4E" /><stop offset="0.5" stopColor="#3A3A3C" /><stop offset="1" stopColor="#4A4A4E" />
        </linearGradient>
        <linearGradient id="hp-l" x1="4" y1="40" x2="26" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3A3A3C" /><stop offset="1" stopColor="#1A1A1C" />
        </linearGradient>
        <linearGradient id="hp-r" x1="62" y1="40" x2="84" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3A3A3C" /><stop offset="1" stopColor="#1A1A1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AccessoriesSVG() {
  return (
    <svg viewBox="0 0 68 82" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect x="14" y="6" width="40" height="50" rx="8" fill="url(#ac-b)" />
      <rect x="14" y="6" width="40" height="50" rx="8" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
      <rect x="25" y="56" width="6" height="18" rx="3" fill="#C8C8CC" />
      <rect x="37" y="56" width="6" height="18" rx="3" fill="#C8C8CC" />
      <rect x="23" y="10" width="22" height="8" rx="3" fill="#111" />
      <rect x="25" y="12" width="18" height="4" rx="1.5" fill="#0a0a14" />
      <rect x="20" y="26" width="28" height="18" rx="4" fill="rgba(255,255,255,0.05)" />
      <circle cx="34" cy="35" r="6" stroke="#FF6B00" strokeWidth="1.5" fill="none" />
      <line x1="34" y1="29" x2="34" y2="35" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="ac-b" x1="14" y1="6" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A4A4E" /><stop offset="1" stopColor="#1A1A1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Category data ────────────────────────────────────────────────────────

const CAT_DEFS = [
  { key: 'smartphones' as const,  href: '/inventory?category=smartphone', color: '#FF6B00', bg: '#FFF3E8', Svg: SmartphoneSVG },
  { key: 'tablets' as const,      href: '/inventory?category=tablet',     color: '#3B82F6', bg: '#EFF6FF', Svg: TabletSVG },
  { key: 'laptops' as const,      href: '/inventory?category=tablet',     color: '#10B981', bg: '#ECFDF5', Svg: LaptopSVG },
  { key: 'earbuds' as const,      href: '/inventory?category=airpods',    color: '#F59E0B', bg: '#FFFBEB', Svg: EarbudsSVG },
  { key: 'smartwatches' as const, href: '/inventory?category=smartwatch', color: '#EF4444', bg: '#FEF2F2', Svg: WatchSVG },
  { key: 'gaming' as const,       href: '/inventory?category=accessory',  color: '#8B5CF6', bg: '#F5F3FF', Svg: GamingSVG },
  { key: 'audio' as const,        href: '/inventory?category=airpods',    color: '#EC4899', bg: '#FDF2F8', Svg: AudioSVG },
  { key: 'accessories' as const,  href: '/inventory?category=accessory',  color: '#64748B', bg: '#F8FAFC', Svg: AccessoriesSVG },
];

const SUB_KEYS: Record<(typeof CAT_DEFS)[number]['key'], keyof Translations['categories']> = {
  smartphones: 'smartphoneSub',
  tablets: 'tabletSub',
  laptops: 'laptopSub',
  earbuds: 'earbudsSub',
  smartwatches: 'watchSub',
  gaming: 'gamingSub',
  audio: 'audioSub',
  accessories: 'accessorySub',
};

export default function CategoriesSection() {
  const { t } = useLanguage();

  const cats = CAT_DEFS.map(({ key, href, color, bg, Svg }) => ({
    label: t.categories[key],
    sub: t.categories[SUB_KEYS[key]],
    href,
    color,
    bg,
    Svg,
  }));

  return (
    <section className="section section-bg">
      <div className="container-site">
        <div className="section-header">
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FF6B00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>{t.categories.shopByCategory}</p>
            <h2 className="section-title">{t.categories.topCategories}</h2>
          </div>
          <Link href="/inventory" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FF6B00', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
            {t.common.viewAll} →
          </Link>
        </div>

        <div className="cat-grid">
          {cats.map(({ label, sub, href, color, bg, Svg }) => (
            <div
              key={label}
              className="cat-slot"
              style={{ '--cc': color, '--cc-bg': bg } as CSSProperties}
            >
              {/* Device illustration — sits above the card */}
              <div className="cat-device">
                <Svg />
              </div>

              {/* Card body */}
              <Link href={href} className="cat-card">
                <span className="cat-label">{label}</span>
                <span className="cat-sub">{sub}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Grid ─────────────────────────────────── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem 0.75rem;
        }
        @media (min-width: 640px) {
          .cat-grid { grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        }
        @media (min-width: 1024px) {
          .cat-grid { grid-template-columns: repeat(8, 1fr); gap: 1rem 0.875rem; }
        }

        /* ── Slot (flex column: device → card) ────── */
        .cat-slot {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Device illustration ─────────────────── */
        .cat-device {
          width: 72px;
          height: 66px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-bottom: -20px;
          position: relative;
          z-index: 2;
          filter:
            drop-shadow(0 6px 14px rgba(0,0,0,0.18))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1));
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
        }
        .cat-slot:hover .cat-device {
          transform: translateY(-10px) scale(1.06);
        }

        /* ── Card body ──────────────────────────── */
        .cat-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 28px 10px 18px;
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #E5E7EB;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          gap: 3px;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        /* Animated top accent bar */
        .cat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--cc, #FF6B00);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .cat-slot:hover .cat-card {
          border-color: var(--cc, #FF6B00);
          box-shadow: 0 8px 24px rgba(0,0,0,0.09);
          background: var(--cc-bg, #FFF3E8);
        }
        .cat-slot:hover .cat-card::before {
          transform: scaleX(1);
        }

        .cat-label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #111827;
          text-align: center;
          display: block;
          line-height: 1.2;
        }
        .cat-sub {
          font-size: 0.625rem;
          color: #9CA3AF;
          font-weight: 500;
          text-align: center;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* ── Mobile adjustments ─────────────────── */
        @media (max-width: 639px) {
          .cat-device { width: 58px; height: 52px; margin-bottom: -16px; }
          .cat-card { padding: 22px 8px 14px; }
          .cat-label { font-size: 0.75rem; }
          .cat-sub { display: none; }
        }
      `}</style>
    </section>
  );
}
