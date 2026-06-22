import Link from 'next/link';
import { Smartphone, Mail, MapPin, Phone } from 'lucide-react';

const LINKS = {
  marketplace: [
    { label: 'Browse All', href: '/inventory' },
    { label: 'Brands', href: '/brands' },
    { label: 'New Arrivals', href: '/inventory?condition=new' },
    { label: 'Deals', href: '/inventory?featured=true' },
    { label: 'Request a Quote', href: '/rfq' },
  ],
  categories: [
    { label: 'Smartphones', href: '/inventory?category=smartphone' },
    { label: 'Tablets', href: '/inventory?category=tablet' },
    { label: 'Accessories', href: '/inventory?category=accessory' },
    { label: 'Laptops', href: '/inventory?category=laptop' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'About Us', href: '/about' },
    { label: 'Admin', href: '/admin' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#111827', color: '#D1D5DB' }}>
      {/* Main footer */}
      <div className="container-site" style={{ paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2.5rem',
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem', textDecoration: 'none' }}>
              <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #6C5CE7, #8B7CF6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: '17px', letterSpacing: '-0.04em' }}>B</span>
              </div>
              <div>
                <span style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>BIG PHONE</span>
                <span style={{ display: 'block', fontSize: '0.625rem', fontWeight: 600, color: '#8B7CF6', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Marketplace</span>
              </div>
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#9CA3AF', maxWidth: '260px', marginBottom: '1.5rem' }}>
              UAE&apos;s trusted B2B platform for buying and selling wholesale mobile devices from verified suppliers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { icon: MapPin, text: 'Dubai, United Arab Emirates' },
                { icon: Phone, text: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000'}` },
                { icon: Mail, text: 'wholesale@bigphone.ae' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#9CA3AF' }}>
                  <Icon size={13} style={{ color: '#6C5CE7', flexShrink: 0 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries({ Marketplace: LINKS.marketplace, Categories: LINKS.categories, Support: LINKS.support }).map(([title, items]) => (
            <div key={title}>
              <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#fff', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '1rem' }}>{title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} style={{ fontSize: '0.875rem', color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
                    >{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #1F2937', padding: '1.25rem 0' }}>
        <div className="container-site" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: 0 }}>
            © {year} BIG PHONE. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <span key={t} style={{ fontSize: '0.8125rem', color: '#6B7280', cursor: 'pointer' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
