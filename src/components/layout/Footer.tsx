'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const marketplace = [
    { label: t.footer.browseAll,    href: '/inventory' },
    { label: t.nav.brands,          href: '/brands' },
    { label: t.footer.newArrivals,  href: '/inventory?sort=newest' },
    { label: t.footer.deals,        href: '/inventory?featured=true' },
    { label: t.footer.requestQuote, href: '/rfq' },
  ];

  const categories = [
    { label: t.footer.smartphones,  href: '/inventory?category=smartphone' },
    { label: t.footer.tablets,      href: '/inventory?category=tablet' },
    { label: t.footer.accessories,  href: '/inventory?category=accessory' },
    { label: t.footer.smartwatches, href: '/inventory?category=smartwatch' },
    { label: t.footer.audio,        href: '/inventory?category=airpods' },
  ];

  const support = [
    { label: t.footer.contactUs,  href: '/contact' },
    { label: t.footer.aboutUs,    href: '/about' },
    { label: t.footer.staffLogin, href: '/admin/login' },
  ];

  const columns = [
    { title: t.footer.marketplace, items: marketplace },
    { title: t.footer.categories,  items: categories },
    { title: t.footer.support,     items: support },
  ];

  return (
    <>
      <footer style={{ background: '#111827', color: '#D1D5DB' }}>
        <div className="container-site" style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand-col">
              <Link href="/" className="footer-logo">
                <div style={{
                  width: '64px',
                  height: '42px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  lineHeight: 0,
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.06)',
                }}>
                  <Image
                    src="/images/WhatsApp Image 2026-06-22 at 10.49.38 PM.jpeg"
                    alt="BIG PHONE"
                    width={64}
                    height={64}
                    style={{
                      width: '64px',
                      height: '64px',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                      filter: 'brightness(0.9) contrast(1.05)',
                    }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>BIG PHONE</span>
                  <span style={{ display: 'block', fontSize: '0.625rem', fontWeight: 600, color: '#FF8C33', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.header.wholesale}</span>
                </div>
              </Link>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#9CA3AF', maxWidth: '260px', margin: '0 0 1.5rem' }}>
                {t.footer.tagline}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  { Icon: MapPin, text: t.footer.location },
                  { Icon: Phone,  text: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000'}` },
                  { Icon: Mail,   text: 'wholesale@bigphone.ae' },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#9CA3AF' }}>
                    <Icon size={13} style={{ color: '#FF6B00', flexShrink: 0 }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {columns.map(({ title, items }) => (
              <div key={title}>
                <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '1rem' }}>{title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {items.map(item => (
                    <li key={item.href}>
                      <Link href={item.href} className="footer-link">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1F2937', padding: '1.25rem 0' }}>
          <div className="container-site" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0 }}>
              &copy; {year} BIG PHONE. {t.footer.rights}
            </p>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <Link href="/privacy" className="footer-link" style={{ fontSize: '0.8125rem', color: '#6B7280' }}>{t.footer.privacy}</Link>
              <Link href="/terms" className="footer-link" style={{ fontSize: '0.8125rem', color: '#6B7280' }}>{t.footer.terms}</Link>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .footer-grid {
          display: grid; grid-template-columns: 1fr; gap: 2.5rem;
        }
        @media (min-width: 640px)  { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; } }
        .footer-brand-col { grid-column: span 1; }
        .footer-logo {
          display: inline-flex; align-items: center; gap: 0.625rem;
          margin-bottom: 1.25rem; text-decoration: none;
        }
        .footer-link {
          font-size: 0.875rem; color: #9CA3AF;
          text-decoration: none; transition: color 0.15s;
        }
        .footer-link:hover { color: #fff; }
      `}</style>
    </>
  );
}
