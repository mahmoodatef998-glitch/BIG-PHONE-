'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Search, ShoppingCart, Heart, User,
  ChevronDown, Smartphone, Tablet, Headphones, Laptop, Watch, Gamepad2,
} from 'lucide-react';

const CATEGORIES_DROP = [
  { label: 'Smartphones', href: '/inventory?category=smartphone', icon: Smartphone },
  { label: 'Tablets', href: '/inventory?category=tablet', icon: Tablet },
  { label: 'Earbuds', href: '/inventory?category=airpods', icon: Headphones },
  { label: 'Laptops', href: '/inventory?category=laptop', icon: Laptop },
  { label: 'Smartwatches', href: '/inventory?category=smartwatch', icon: Watch },
  { label: 'Gaming', href: '/inventory?category=gaming', icon: Gamepad2 },
];

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Marketplace' },
  { href: '/brands', label: 'Stores' },
  { href: '/inventory?deals=true', label: 'Deals' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#fff',
        borderBottom: '1px solid #EAEAEA',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
        transition: 'box-shadow 0.2s',
      }}>
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'center', height: '64px', gap: '1.5rem' }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
              <div style={{
                width: '36px', height: '36px', background: '#6C5CE7',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: '18px' }}>B</span>
              </div>
              <span style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em' }}>
                Big Phone
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hdr-nav" style={{ display: 'none', alignItems: 'center', gap: '0.25rem', flex: 1 }}>
              {NAV.map(link => (
                <Link key={link.href} href={link.href} className="hdr-link" style={{
                  color: pathname === link.href ? '#6C5CE7' : '#374151',
                  fontWeight: pathname === link.href ? 600 : 500,
                }}>
                  {link.label}
                </Link>
              ))}

              {/* Categories dropdown */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button className="hdr-link" style={{
                  display: 'flex', alignItems: 'center', gap: '0.25rem',
                  background: 'none', border: 'none', color: '#374151', fontWeight: 500,
                  cursor: 'pointer',
                }}>
                  Categories <ChevronDown size={14} />
                </button>
                {catOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: '#fff', border: '1px solid #EAEAEA',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    padding: '0.75rem', minWidth: '240px', zIndex: 100,
                    marginTop: '0.25rem',
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem' }}>
                      {CATEGORIES_DROP.map(({ label, href, icon: Icon }) => (
                        <Link key={href} href={href} className="cat-drop-item">
                          <div className="cat-drop-icon">
                            <Icon size={16} />
                          </div>
                          <span>{label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/sell" className="hdr-sell-btn">
                Sell on Big Phone
              </Link>
            </nav>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginLeft: 'auto' }}>
              <button className="hdr-icon-btn" aria-label="Search">
                <Search size={18} />
              </button>
              <Link href="/inventory" className="hdr-icon-btn" aria-label="Wishlist">
                <Heart size={18} />
              </Link>
              <Link href="/rfq" className="hdr-icon-btn" aria-label="Cart" style={{ position: 'relative' }}>
                <ShoppingCart size={18} />
                <span className="hdr-badge">0</span>
              </Link>
              <Link href="/rfq" className="hdr-login">
                <User size={14} />
                Login / Register
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hdr-icon-btn hdr-menu-btn"
                aria-label="Menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #EAEAEA', padding: '1rem' }}>
            {NAV.map(link => (
              <Link key={link.href} href={link.href} style={{
                display: 'block', padding: '0.75rem 1rem', borderRadius: '8px',
                fontSize: '0.9375rem', fontWeight: 500,
                color: pathname === link.href ? '#6C5CE7' : '#111827',
                background: pathname === link.href ? '#EDE9FE' : 'transparent',
                textDecoration: 'none', marginBottom: '0.125rem',
              }}>
                {link.label}
              </Link>
            ))}
            <Link href="/sell" style={{
              display: 'block', padding: '0.75rem 1rem', borderRadius: '8px',
              fontSize: '0.9375rem', fontWeight: 600,
              color: '#6C5CE7', textDecoration: 'none',
            }}>
              Sell on Big Phone
            </Link>
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #EAEAEA' }}>
              <Link href="/rfq" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.75rem 1rem', borderRadius: '8px',
                background: '#6C5CE7', color: '#fff',
                fontSize: '0.9375rem', fontWeight: 600, textDecoration: 'none',
              }}>
                <User size={16} /> Login / Register
              </Link>
            </div>
          </div>
        )}

        {/* Mobile bottom nav */}
        <nav className="mob-bottom-nav" aria-label="Mobile navigation">
          <Link href="/" className="mob-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Home</span>
          </Link>
          <Link href="/inventory" className="mob-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="12" x="2" y="6" rx="1"/><rect width="7" height="9" x="10" y="9" rx="1"/><rect width="7" height="6" x="15" y="12" rx="1" width="7"/></svg>
            <span>Categories</span>
          </Link>
          <Link href="/inventory?deals=true" className="mob-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            <span>Deals</span>
          </Link>
          <Link href="/sell" className="mob-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <span>Sell</span>
          </Link>
          <Link href="/rfq" className="mob-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Account</span>
          </Link>
        </nav>
      </header>

      <style>{`
        @media (min-width: 768px) {
          .hdr-nav { display: flex !important; }
          .hdr-menu-btn { display: none !important; }
          .hdr-login { display: inline-flex !important; }
        }
        .hdr-link {
          display: inline-flex; align-items: center; gap: 0.25rem;
          padding: 0.5rem 0.75rem; border-radius: 6px;
          font-size: 0.875rem; text-decoration: none;
          transition: color 0.15s, background 0.15s;
        }
        .hdr-link:hover { background: #F5F3FF; color: #6C5CE7; }
        .hdr-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 8px;
          border: 1px solid #EAEAEA; background: #fff;
          color: #374151; cursor: pointer; position: relative;
          transition: all 0.15s; text-decoration: none;
          flex-shrink: 0;
        }
        .hdr-icon-btn:hover { border-color: #C4BBFF; color: #6C5CE7; background: #F5F3FF; }
        .hdr-badge {
          position: absolute; top: -4px; right: -4px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #EF4444; color: #fff;
          font-size: 9px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid #fff;
        }
        .hdr-login {
          align-items: center; gap: 0.375rem;
          padding: 0.5rem 1rem; border-radius: 8px;
          border: 1.5px solid #6C5CE7; color: #6C5CE7;
          font-size: 0.875rem; font-weight: 600;
          background: transparent; text-decoration: none;
          transition: all 0.15s; white-space: nowrap;
          display: none;
        }
        .hdr-login:hover { background: #6C5CE7; color: #fff; }
        .hdr-sell-btn {
          display: inline-flex; align-items: center;
          padding: 0.5rem 1rem; border-radius: 8px;
          background: #6C5CE7; color: #fff;
          font-size: 0.875rem; font-weight: 600;
          text-decoration: none; transition: background 0.15s;
          white-space: nowrap; margin-left: 0.25rem;
        }
        .hdr-sell-btn:hover { background: #5B4BD5; }
        .cat-drop-item {
          display: flex; align-items: center; gap: 0.625rem;
          padding: 0.625rem 0.75rem; border-radius: 8px;
          font-size: 0.875rem; color: #374151; font-weight: 500;
          text-decoration: none; transition: all 0.15s;
        }
        .cat-drop-item:hover { background: #F5F3FF; color: #6C5CE7; }
        .cat-drop-item:hover .cat-drop-icon { background: #6C5CE7; color: #fff; }
        .cat-drop-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: #EDE9FE; color: #6C5CE7;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.15s;
        }
        .mob-bottom-nav {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
          background: #fff; border-top: 1px solid #EAEAEA;
          padding: 0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom, 0px));
          justify-content: space-around; align-items: center;
        }
        @media (max-width: 767px) { .mob-bottom-nav { display: flex; } }
        .mob-nav-item {
          display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
          color: #6B7280; text-decoration: none;
          font-size: 0.6875rem; font-weight: 500;
          padding: 0.25rem 0.75rem;
          transition: color 0.15s;
        }
        .mob-nav-item:hover { color: #6C5CE7; }
      `}</style>
    </>
  );
}
