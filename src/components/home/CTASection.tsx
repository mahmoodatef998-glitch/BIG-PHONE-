import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function CTASection() {
  return (
    <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #6C5CE7 0%, #8B7CF6 50%, #A78BFA 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', background: 'rgba(255,255,255,0.07)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="container-site" style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', borderRadius: '9999px', padding: '0.375rem 1rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.25)' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff', letterSpacing: '0.04em' }}>✨ Join 500+ verified suppliers</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 800, color: '#fff',
          letterSpacing: '-0.03em', lineHeight: 1.15,
          marginBottom: '1rem', maxWidth: '600px', margin: '0 auto 1rem',
        }}>
          Ready to Grow Your Electronics Business?
        </h2>

        <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          Start listing your devices or browse thousands of wholesale listings from trusted UAE suppliers today.
        </p>

        <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/rfq" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.9375rem 2rem', borderRadius: '9999px',
            background: '#fff', color: '#6C5CE7',
            fontSize: '1rem', fontWeight: 700,
            textDecoration: 'none', transition: 'all 0.18s',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 8px 24px rgba(0,0,0,0.18)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=''; (e.currentTarget as HTMLElement).style.boxShadow='0 4px 16px rgba(0,0,0,0.12)'; }}
          >
            Start Selling <ArrowRight size={16} />
          </Link>

          <Link href="/inventory" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.9375rem 2rem', borderRadius: '9999px',
            background: 'rgba(255,255,255,0.15)', color: '#fff',
            fontSize: '1rem', fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.18s',
            border: '1.5px solid rgba(255,255,255,0.4)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.25)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.15)'; }}
          >
            Explore Marketplace
          </Link>

          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.9375rem 2rem', borderRadius: '9999px',
            background: '#25D366', color: '#fff',
            fontSize: '1rem', fontWeight: 600,
            textDecoration: 'none', transition: 'all 0.18s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#20BA5A'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#25D366'; }}
          >
            <MessageCircle size={18} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
