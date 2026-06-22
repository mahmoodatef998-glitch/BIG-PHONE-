'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Search, Heart, Bell, User, ChevronDown,
  Smartphone, Tablet, Headphones, Laptop, Home, Grid3x3, FileText, Tag,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

const CATEGORIES = [
  { label: 'Smartphones', href: '/inventory?category=smartphone', icon: Smartphone },
  { label: 'Tablets',     href: '/inventory?category=tablet',     icon: Tablet },
  { label: 'Accessories', href: '/inventory?category=accessory',  icon: Headphones },
  { label: 'Laptops',     href: '/inventory?category=laptop',     icon: Laptop },
];

export default function Header() {
  const { t, toggle, isRTL } = useLanguage();
  const [menuOpen, setMenuOpen]     = useState(false);
  const [catOpen,  setCatOpen]      = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [search,   setSearch]       = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  const navItems = [
    { href: '/',           label: 'Home' },
    { href: '/inventory',  label: 'Marketplace' },
    { href: '/brands',     label: 'Brands' },
    { href: '/inventory?featured=true', label: 'Deals' },
  ];

  return (
    <>
      {/* ── Main header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#fff',
        borderBottom: scrolled ? 'none' : '1px solid #EAEAEA',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
        transition: 'box-shadow 0.2s',
      }}>
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'center', height: '64px', gap: '1rem' }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
              <div style={{
                width: '36px', height: '36px', background: 'linear-gradient(135deg, #6C5CE7, #8B7CF6)',
                borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(108,92,231,0.35)',
              }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: '16px', letterSpacing: '-0.04em' }}>B</span>
              </div>
              <div style={{ lineHeight: 1 }}>
                <span style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em' }}>BIG PHONE</span>
                <span style={{ display: 'block', fontSize: '0.625rem', fontWeight: 600, color: '#6C5CE7', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '1px' }}>Marketplace</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '0.25rem', flex: 1, marginLeft: '1rem' }}>
              {navItems.map(item => (
                <Link key={item.href} href={item.href} style={{
                  padding: '0.5rem 0.875rem', borderRadius: '0.5rem',
                  fontSize: '0.875rem', fontWeight: active(item.href) ? 600 : 500,
                  color: active(item.href) ? '#6C5CE7' : '#374151',
                  background: active(item.href) ? '#F0EEFF' : 'transparent',
                  transition: 'all 0.15s', textDecoration: 'none',
                }}>{item.label}</Link>
              ))}

              {/* Categories dropdown */}
              <div style={{ position: 'relative' }}
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button style={{
                  display: 'flex', alignItems: 'center', gap: '0.25rem',
                  padding: '0.5rem 0.875rem', borderRadius: '0.5rem',
                  border: 'none', background: 'transparent',
                  fontSize: '0.875rem', fontWeight: 500, color: '#374151',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}>
                  Categories <ChevronDown size={13} style={{ opacity: 0.6 }} />
                </button>
                {catOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, marginTop: '4px',
                    background: '#fff', border: '1px solid #EAEAEA',
                    borderRadius: '0.75rem', boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    padding: '0.5rem', minWidth: '200px', zIndex: 100,
                  }}>
                    {CATEGORIES.map(c => (
                      <Link key={c.href} href={c.href} style={{
                        display: 'flex', alignItems: 'center', gap: '0.625rem',
                        padding: '0.625rem 0.875rem', borderRadius: '0.5rem',
                        fontSize: '0.875rem', color: '#374151',
                        textDecoration: 'none', transition: 'background 0.12s, color 0.12s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#F0EEFF'; (e.currentTarget as HTMLElement).style.color='#6C5CE7'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='#374151'; }}
                      >
                        <c.icon size={15} style={{ color: '#6C5CE7' }} />
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/rfq" style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 0.875rem', borderRadius: '0.5rem',
                fontSize: '0.875rem', fontWeight: 500, color: '#374151',
                transition: 'all 0.15s', textDecoration: 'none',
              }}>Sell / RFQ</Link>
            </nav>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginLeft: 'auto' }}>
              {/* Search toggle */}
              <button onClick={() => setSearchOpen(!searchOpen)} className="icon-btn" aria-label="Search">
                <Search size={17} />
              </button>

              {/* Language toggle */}
              <button onClick={toggle} className="icon-btn" style={{ fontSize: '0.8125rem', fontWeight: 700, minWidth: '44px', letterSpacing: '0.01em' }} aria-label="Switch language">
                {t.header.switchLang}
              </button>

              {/* Login - desktop only */}
              <Link href="/rfq" className="btn btn-primary btn-sm" style={{ display: 'none' }} id="header-cta">
                {t.header.getQuote}
              </Link>

              {/* Admin */}
              <Link href="/admin" className="icon-btn" aria-label="Admin">
                <User size={17} />
              </Link>

              {/* Hamburger - mobile */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="icon-btn" aria-label="Menu" id="header-hamburger">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div style={{ paddingBottom: '0.75rem' }}>
              <form action="/inventory" method="get" style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input
                  autoFocus type="search" name="search"
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder={t.header.searchPlaceholder}
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #EAEAEA', padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navItems.map(item => (
                <Link key={item.href} href={item.href} style={{
                  display: 'block', padding: '0.75rem 1rem', borderRadius: '0.625rem',
                  fontSize: '0.9375rem', fontWeight: 500,
                  color: active(item.href) ? '#6C5CE7' : '#111827',
                  background: active(item.href) ? '#F0EEFF' : 'transparent',
                  textDecoration: 'none',
                }}>{item.label}</Link>
              ))}
              {CATEGORIES.map(c => (
                <Link key={c.href} href={c.href} style={{
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.75rem 1rem', borderRadius: '0.625rem',
                  fontSize: '0.9375rem', color: '#374151', textDecoration: 'none',
                }}>
                  <c.icon size={16} style={{ color: '#6C5CE7' }} />
                  {c.label}
                </Link>
              ))}
              <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #EAEAEA' }} />
              <Link href="/rfq" className="btn btn-primary" style={{ textAlign: 'center', borderRadius: '0.75rem' }}>
                {t.header.getQuote}
              </Link>
              <button onClick={toggle} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #EAEAEA',
                background: '#FAFAFA', color: '#374151', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer',
              }}>
                {isRTL ? 'Switch to English' : 'التبديل إلى العربية'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile bottom nav ── */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
        background: '#fff', borderTop: '1px solid #EAEAEA',
        display: 'flex', alignItems: 'center',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }} className="mobile-bottom-nav">
        {[
          { href: '/',          icon: Home,      label: 'Home' },
          { href: '/inventory', icon: Grid3x3,   label: 'Browse' },
          { href: '/rfq',       icon: FileText,  label: 'Quote' },
          { href: '/admin',     icon: User,      label: 'Admin' },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '0.625rem 0.25rem', gap: '0.25rem',
            color: active(item.href) ? '#6C5CE7' : '#9CA3AF',
            fontSize: '0.625rem', fontWeight: 600, textDecoration: 'none',
            transition: 'color 0.15s',
          }}>
            <item.icon size={20} strokeWidth={active(item.href) ? 2.5 : 1.75} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <style>{`
        .icon-btn {
          width: 38px; height: 38px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 0.5rem; border: 1px solid #EAEAEA;
          background: #fff; color: #374151; cursor: pointer;
          transition: all 0.15s; font-family: inherit;
        }
        .icon-btn:hover { background: #F0EEFF; color: #6C5CE7; border-color: #C4BBFF; }

        .desktop-nav { display: none !important; }
        .mobile-bottom-nav { display: flex !important; }
        #header-hamburger { display: inline-flex !important; }
        #header-cta { display: none !important; }

        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-bottom-nav { display: none !important; }
          #header-hamburger { display: none !important; }
          #header-cta { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
