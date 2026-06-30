'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, User, Menu, X, ChevronDown, Smartphone, Tablet, Headphones, Watch, Headset } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import QuoteCartLink from '@/components/cart/QuoteCartLink';

function CamelLogo({ size = 68 }: { size?: number }) {
  const showH = Math.round(size * 0.64);
  return (
    <div style={{ width: size, height: showH, overflow: 'hidden', flexShrink: 0, lineHeight: 0 }}>
      <Image
        src="/images/WhatsApp Image 2026-06-22 at 10.49.38 PM.jpeg"
        alt="BIG PHONE camel logo"
        width={size}
        height={size}
        priority
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
        }}
      />
    </div>
  );
}

export default function Header() {
  const { t, toggle } = useLanguage();
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [catOpen,    setCatOpen]    = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [search,     setSearch]     = useState('');
  const pathname = usePathname();

  const CATEGORIES_DROP = [
    { label: t.categories.smartphones, href: '/inventory?category=smartphone', Icon: Smartphone },
    { label: t.categories.tablets,     href: '/inventory?category=tablet',     Icon: Tablet },
    { label: t.categories.accessories, href: '/inventory?category=accessory',  Icon: Headphones },
    { label: t.categories.smartwatches, href: '/inventory?category=smartwatch', Icon: Watch },
    { label: t.categories.earbuds,     href: '/inventory?category=airpods',    Icon: Headset },
  ];

  const NAV = [
    { href: '/',                          label: t.nav.home },
    { href: '/inventory',                 label: t.nav.inventory },
    { href: '/brands',                    label: t.nav.brands },
    { href: '/inventory?featured=true',   label: t.nav.featured },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const closeNav = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="site-header" style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#fff',
        borderBottom: '1px solid #EAEAEA',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
        transition: 'box-shadow 0.2s',
      }}>
        <div className="container-site">
          <div className="site-header-row" style={{ display: 'flex', alignItems: 'center', height: '64px', gap: '1.5rem' }}>

            {/* ── Logo ────────────────────────────── */}
            <Link href="/" onClick={closeNav} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', textDecoration: 'none', flexShrink: 0 }}>
              <CamelLogo size={72} />
              <div style={{ lineHeight: 1 }}>
                <div className="site-logo-text" style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em' }}>BIG PHONE</div>
                <div style={{ fontSize: '0.5625rem', fontWeight: 700, color: '#FF6B00', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1px' }}>{t.header.wholesale}</div>
              </div>
            </Link>

            {/* ── Desktop Nav ────────────────────── */}
            <nav className="hdr-nav">
              {NAV.map(item => (
                <Link key={item.href} href={item.href} onClick={closeNav} className={`hdr-link${active(item.href) ? ' hdr-link-active' : ''}`}>
                  {item.label}
                </Link>
              ))}

              {/* Categories dropdown */}
              <div style={{ position: 'relative' }}
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button className="hdr-link" style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                  {t.nav.categories} <ChevronDown size={13} />
                </button>
                {catOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, marginTop: '2px',
                    background: '#fff', border: '1px solid #EAEAEA',
                    borderRadius: '0.75rem', boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    padding: '0.5rem', minWidth: '200px', zIndex: 100,
                  }}>
                    {CATEGORIES_DROP.map(c => (
                      <Link key={c.href} href={c.href} onClick={closeNav} className="cat-drop-item">
                        <div style={{ width: '28px', height: '28px', background: '#FFF3E8', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <c.Icon size={14} style={{ color: '#FF6B00' }} />
                        </div>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/rfq" onClick={closeNav} className="hdr-link" style={{ color: '#FF6B00', fontWeight: 700 }}>{t.header.getQuote}</Link>
            </nav>

            {/* ── Right actions ───────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
              <QuoteCartLink />
              <button onClick={toggle} className="hdr-icon-btn" style={{ fontSize: '0.75rem', fontWeight: 700, minWidth: 'auto', padding: '0 0.5rem', letterSpacing: '0.02em' }}>
                {t.header.switchLang}
              </button>
              <button onClick={() => setSearchOpen(!searchOpen)} className="hdr-icon-btn" aria-label={t.common.search}>
                <Search size={17} />
              </button>
              <Link href="/admin/login" className="hdr-login hdr-login-desktop">
                <User size={15} />
                {t.header.admin}
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="hdr-icon-btn hdr-hamburger" aria-label="Menu">
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div style={{ paddingBottom: '0.75rem' }}>
              <form action="/inventory" method="get" style={{ position: 'relative' }}>
                <Search size={16} className="hdr-search-icon-left" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                <input
                  autoFocus type="search" name="search"
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder={t.header.searchPlaceholder}
                  className="form-input hdr-search-input-rtl"
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
              {NAV.map(item => (
                <Link key={item.href} href={item.href} onClick={closeNav} style={{
                  display: 'block', padding: '0.75rem 1rem', borderRadius: '0.625rem',
                  fontSize: '0.9375rem', fontWeight: active(item.href) ? 700 : 500,
                  color: active(item.href) ? '#FF6B00' : '#111827',
                  background: active(item.href) ? '#FFF3E8' : 'transparent', textDecoration: 'none',
                }}>{item.label}</Link>
              ))}
              {CATEGORIES_DROP.map(c => (
                <Link key={c.href} href={c.href} onClick={closeNav} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.75rem 1rem', borderRadius: '0.625rem', fontSize: '0.9375rem', color: '#374151', textDecoration: 'none' }}>
                  <c.Icon size={16} style={{ color: '#FF6B00' }} /> {c.label}
                </Link>
              ))}
              <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #EAEAEA' }} />
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <QuoteCartLink compact />
              </div>
              <Link href="/rfq" onClick={closeNav} className="btn btn-primary" style={{ textAlign: 'center', borderRadius: '0.75rem' }}>{t.header.getQuote}</Link>
              <Link href="/admin/login" onClick={closeNav} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', border: '1.5px solid #FF6B00', color: '#FF6B00', fontSize: '0.9375rem', fontWeight: 700, textDecoration: 'none' }}>
                <User size={16} /> {t.header.admin}
              </Link>
              <button onClick={toggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #EAEAEA', background: '#FAFAFA', color: '#374151', fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer' }}>
                {t.header.switchLang}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile bottom nav */}
      <nav className="mob-bottom-nav">
        {[
          { href: '/',          Icon: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>, label: t.nav.home },
          { href: '/inventory',  Icon: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>, label: t.nav.shop },
          { href: '/rfq',        Icon: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>, label: t.nav.rfq },
          { href: '/inventory?featured=true', Icon: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>, label: t.nav.deals },
          { href: '/admin/login', Icon: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>, label: t.header.admin },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '0.5rem 0.25rem', gap: '3px',
            color: active(item.href) ? '#FF6B00' : '#9CA3AF',
            fontSize: '0.625rem', fontWeight: 600, textDecoration: 'none',
          }}>
            <item.Icon /> {item.label}
          </Link>
        ))}
      </nav>

      <style>{`
        .hdr-nav { display: none; align-items: center; gap: 0; }
        .hdr-link {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem; font-weight: 500; color: #374151;
          text-decoration: none; border-radius: 0.375rem;
          transition: color 0.15s, background 0.15s; white-space: nowrap;
        }
        .hdr-link:hover { color: #FF6B00; background: #FFF3E8; }
        .hdr-link-active { color: #FF6B00 !important; font-weight: 600; }
        .hdr-icon-btn {
          width: 38px; height: 38px;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 50%; border: 1.5px solid #EAEAEA;
          background: #fff; color: #374151; cursor: pointer;
          transition: all 0.15s; font-family: inherit; flex-shrink: 0;
        }
        .hdr-icon-btn:hover { border-color: #FF6B00; color: #FF6B00; background: #FFF3E8; }
        .hdr-login {
          display: none; align-items: center; gap: 0.375rem;
          padding: 0.5rem 1rem; border-radius: 9999px;
          border: 1.5px solid #FF6B00; color: #FF6B00;
          font-size: 0.8125rem; font-weight: 700;
          text-decoration: none; transition: all 0.18s; white-space: nowrap;
        }
        .hdr-login:hover { background: #FF6B00; color: #fff; }
        .cat-drop-item {
          display: flex; align-items: center; gap: 0.625rem;
          padding: 0.5rem 0.75rem; border-radius: 0.5rem;
          font-size: 0.875rem; color: #374151; text-decoration: none;
          transition: background 0.12s, color 0.12s;
        }
        .cat-drop-item:hover { background: #FFF3E8; color: #FF6B00; }
        .hdr-hamburger { display: inline-flex !important; }
        .mob-bottom-nav {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 40;
          background: #fff; border-top: 1px solid #EAEAEA;
          display: flex; padding-bottom: env(safe-area-inset-bottom);
        }
        @media (min-width: 768px) {
          .hdr-nav { display: flex !important; }
          .hdr-login-desktop { display: inline-flex !important; }
          .hdr-hamburger { display: none !important; }
          .mob-bottom-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
