'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, MessageCircle, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/brands', label: 'Brands', hasDropdown: true },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const brandLinks = [
  { href: '/brands/apple', label: 'Apple' },
  { href: '/brands/samsung', label: 'Samsung' },
  { href: '/brands/xiaomi', label: 'Xiaomi' },
  { href: '/brands/huawei', label: 'Huawei' },
  { href: '/brands/oppo', label: 'Oppo' },
  { href: '/brands/vivo', label: 'Vivo' },
];

const categoryPills = [
  { label: 'Smartphones', emoji: '📱', href: '/inventory?category=smartphone' },
  { label: 'Tablets', emoji: '📋', href: '/inventory?category=tablet' },
  { label: 'Accessories', emoji: '🎧', href: '/inventory?category=accessory' },
  { label: 'Apple', emoji: '🍎', href: '/inventory?brand=apple' },
  { label: 'Samsung', emoji: '📟', href: '/inventory?brand=samsung' },
  { label: 'Xiaomi', emoji: '📲', href: '/inventory?brand=xiaomi' },
  { label: 'Huawei', emoji: '🔷', href: '/inventory?brand=huawei' },
];

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isCategoryActive = (href: string) => pathname + (typeof window !== 'undefined' ? window.location.search : '') === href;

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: '#fff',
          borderBottom: '1px solid #DDE3EA',
          boxShadow: scrolled ? '0 2px 12px 0 rgba(13,27,42,0.1)' : 'none',
          transition: 'box-shadow 0.2s',
        }}
      >
        {/* Main header bar */}
        <div className="container-site">
          <div style={{ display: 'flex', alignItems: 'center', height: '64px', gap: '1.5rem' }}>
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <div style={{
                width: '34px', height: '34px',
                background: '#0B1829',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#0066FF', fontWeight: 900, fontSize: '16px', letterSpacing: '-0.02em' }}>B</span>
              </div>
              <div>
                <span style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0B1829', letterSpacing: '-0.03em' }}>BIG PHONE</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ alignItems: 'center', gap: '0.125rem', flex: 1, display: 'none' }} className="md-nav">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.href} style={{ position: 'relative' }}
                    onMouseEnter={() => setBrandsOpen(true)}
                    onMouseLeave={() => setBrandsOpen(false)}
                  >
                    <button style={{
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: isActive(link.href) ? '#0066FF' : '#4B5563',
                      cursor: 'pointer',
                      transition: 'color 0.15s',
                    }}>
                      {link.label}
                      <ChevronDown size={14} />
                    </button>
                    {brandsOpen && (
                      <div style={{
                        position: 'absolute', top: '100%', left: 0,
                        background: '#fff',
                        border: '1px solid #DDE3EA',
                        borderRadius: '0.5rem',
                        boxShadow: '0 8px 24px -4px rgba(13,27,42,0.15)',
                        padding: '0.5rem',
                        minWidth: '160px',
                        zIndex: 100,
                      }}>
                        {brandLinks.map(b => (
                          <Link key={b.href} href={b.href} style={{
                            display: 'block',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.875rem',
                            color: '#4B5563',
                            borderRadius: '0.375rem',
                            transition: 'background 0.1s, color 0.1s',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#E5F0FF';
                            e.currentTarget.style.color = '#0066FF';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#4B5563';
                          }}
                          >
                            {b.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href} style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: isActive(link.href) ? '#0066FF' : '#4B5563',
                    transition: 'color 0.15s, background 0.15s',
                    textDecoration: 'none',
                  }}>
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Right side actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
              {/* Search button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '0.375rem',
                  border: '1px solid #DDE3EA',
                  background: '#fff',
                  color: '#4B5563',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                aria-label="Search"
              >
                <Search size={16} />
              </button>

              {/* WhatsApp button */}
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  display: 'none',
                  background: '#00A850',
                  color: '#fff',
                  gap: '0.375rem',
                }}
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>

              {/* Get Quote */}
              <Link
                href="/rfq"
                className="btn btn-primary btn-sm"
                style={{ display: 'none' }}
              >
                Get Quote
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '0.375rem',
                  border: '1px solid #DDE3EA',
                  background: '#fff',
                  color: '#4B5563',
                  cursor: 'pointer',
                }}
                aria-label="Menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Search bar (expandable) */}
          {searchOpen && (
            <div style={{ paddingBottom: '0.75rem' }}>
              <form action="/inventory" method="get" style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#8B9DB5' }} />
                <input
                  autoFocus
                  type="search"
                  name="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search iPhone 15, Samsung S24, iPad..."
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', paddingRight: '1rem' }}
                />
              </form>
            </div>
          )}
        </div>

        {/* Category strip — desktop only */}
        <div className="category-strip cat-strip-desktop">
          <div className="container-site">
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.5rem 0',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
            }}>
              {categoryPills.map((pill) => (
                <Link
                  key={pill.href}
                  href={pill.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.375rem 0.875rem',
                    borderRadius: '9999px',
                    border: `1.5px solid ${isCategoryActive(pill.href) ? '#0066FF' : '#DDE3EA'}`,
                    background: isCategoryActive(pill.href) ? '#E5F0FF' : '#fff',
                    color: isCategoryActive(pill.href) ? '#0066FF' : '#4B5563',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    if (!isCategoryActive(pill.href)) {
                      e.currentTarget.style.borderColor = '#0066FF';
                      e.currentTarget.style.color = '#0066FF';
                      e.currentTarget.style.background = '#E5F0FF';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isCategoryActive(pill.href)) {
                      e.currentTarget.style.borderColor = '#DDE3EA';
                      e.currentTarget.style.color = '#4B5563';
                      e.currentTarget.style.background = '#fff';
                    }
                  }}
                >
                  <span>{pill.emoji}</span>
                  <span>{pill.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: '#fff',
            borderTop: '1px solid #DDE3EA',
            padding: '1rem',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: isActive(link.href) ? '#0066FF' : '#1A2332',
                  background: isActive(link.href) ? '#E5F0FF' : 'transparent',
                  textDecoration: 'none',
                }}>
                  {link.label}
                </Link>
              ))}
              <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #DDE3EA' }} />
              <Link href="/rfq" className="btn btn-primary" style={{ textAlign: 'center' }}>
                Request a Quote
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ textAlign: 'center' }}
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      <style>{`
        .cat-strip-desktop { display: none; }
        @media (min-width: 768px) {
          .md-nav { display: flex !important; }
          header button[aria-label="Menu"] { display: none !important; }
          header a.btn-whatsapp { display: inline-flex !important; }
          header a.btn-primary { display: inline-flex !important; }
          .cat-strip-desktop { display: block; }
        }
        .cat-strip-desktop div::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
