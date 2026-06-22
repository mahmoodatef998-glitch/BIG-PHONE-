import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function CTASection() {
  const waMsg = encodeURIComponent('Hi Big Phone! I want to start buying/selling on the platform.');

  return (
    <section style={{
      padding: '4rem 0',
      background: 'linear-gradient(135deg, #6C5CE7 0%, #8B7CF6 50%, #A78BFA 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%),
                          radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 50%)`,
      }} />
      <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 1rem' }}>
            Ready to buy or sell?
          </h2>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.65, margin: '0 0 2rem' }}>
            Join 50,000+ users already trading on Big Phone. List your devices in minutes
            or find your next device at the best price.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/rfq" className="cta-btn-white">
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <a href={`https://wa.me/${WHATSAPP}?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="cta-btn-outline">
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <style>{`
        .cta-btn-white {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.875rem 1.75rem; border-radius: 10px;
          background: #fff; color: #6C5CE7;
          font-size: 1rem; font-weight: 700;
          text-decoration: none; transition: all 0.15s; white-space: nowrap;
        }
        .cta-btn-white:hover { background: #EDE9FE; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .cta-btn-outline {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.875rem 1.75rem; border-radius: 10px;
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.5);
          color: #fff; font-size: 1rem; font-weight: 700;
          text-decoration: none; transition: all 0.15s; white-space: nowrap;
        }
        .cta-btn-outline:hover { background: rgba(255,255,255,0.25); }
      `}</style>
    </section>
  );
}
