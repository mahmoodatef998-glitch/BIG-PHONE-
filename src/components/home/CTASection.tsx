'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function CTASection() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <>
      <section className="cta-section">
        <div className="cta-blob cta-blob-1" />
        <div className="cta-blob cta-blob-2" />

        <div className="container-site" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,255,255,0.15)', borderRadius: '9999px',
            padding: '0.375rem 1rem', marginBottom: '1.5rem',
            border: '1px solid rgba(255,255,255,0.25)',
          }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>{h.ctaBadge}</span>
          </div>

          <h2 className="cta-heading">{h.ctaHeading}</h2>

          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
            {h.ctaBody}
          </p>

          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/rfq" className="cta-btn cta-btn-white">
              {h.ctaStartSelling} <ArrowRight size={16} />
            </Link>
            <Link href="/inventory" className="cta-btn cta-btn-outline">
              {h.ctaExplore}
            </Link>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="cta-btn cta-btn-wa">
              <MessageCircle size={18} /> {h.ctaWhatsapp}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .cta-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #E55A00 0%, #FF6B00 55%, #FF8C33 100%);
          position: relative; overflow: hidden;
        }
        .cta-blob {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: rgba(255,255,255,0.08);
        }
        .cta-blob-1 { top: -80px; right: -80px; width: 400px; height: 400px; }
        .cta-blob-2 { bottom: -60px; left: -60px; width: 300px; height: 300px; }
        .cta-heading {
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 800; color: #fff;
          letter-spacing: -0.03em; line-height: 1.15;
          max-width: 600px; margin: 0 auto 1rem;
        }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.9375rem 2rem; border-radius: 9999px;
          font-size: 1rem; font-weight: 600;
          text-decoration: none; transition: all 0.18s;
        }
        .cta-btn-white {
          background: #fff; color: #FF6B00;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          font-weight: 700;
        }
        .cta-btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }
        .cta-btn-outline {
          background: rgba(255,255,255,0.15);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.4);
        }
        .cta-btn-outline:hover { background: rgba(255,255,255,0.25); }
        .cta-btn-wa { background: #25D366; color: #fff; }
        .cta-btn-wa:hover { background: #20BA5A; }
      `}</style>
    </>
  );
}
