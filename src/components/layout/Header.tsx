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

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: '#fff',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: scrolled ? '0 1px 8px 0 rgb(0 0 0 / 0.08)' : 'none',
          transition: 'box-shadow 0.2s',
        }}
      >
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
                width: '32px', height: '32px',
                background: '#0F172A',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#F59E0B', fontWeight: 800, fontSize: '14px' }}>B</span>
              </div>
              <div>
                <span style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>BIG PHONE</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ alignItems: 'center', gap: '0.25rem', flex: 1, display: 'none' }} className="md-nav">
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
                      color: isActive(link.href) ? '#2563EB' : '#374151',
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
                        border: '1px solid #E2E8F0',
                        borderRadius: '0.5rem',
                        boxShadow: '0 8px 24px -4px rgb(0 0 0 / 0.12)',
                        padding: '0.5rem',
                        minWidth: '160px',
                        zIndex: 100,
                      }}>
                        {brandLinks.map(b => (
                          <Link key={b.href} href={b.href} style={{
                            display: 'block',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.875rem',
                            color: '#374151',
                            borderRadius: '0.375rem',
                            transition: 'background 0.1s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
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
                    color: isActive(link.href) ? '#2563EB' : '#374151',
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
                  border: '1px solid #E2E8F0',
                  background: '#fff',
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                aria-label="Search"
              >
                <Search size={16} />
              </button>

              {/* WhatsApp button - hidden on very small screens */}
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
                style={{ display: 'none' }}
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>

              {/* Request Quote */}
              <Link href="/rfq" className="btn btn-primary btn-sm" style={{ display: 'none' }}>
                Request Quote
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '0.375rem',
                  border: '1px solid #E2E8F0',
                  background: '#fff',
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
                <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: '#fff',
            borderTop: '1px solid #E2E8F0',
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
                  color: isActive(link.href) ? '#2563EB' : '#111827',
                  background: isActive(link.href) ? '#eff6ff' : 'transparent',
                  textDecoration: 'none',
                }}>
                  {link.label}
                </Link>
              ))}
              <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #E2E8F0' }} />
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

      {/* Desktop nav visibility — inline responsive via style tags */}
      <style>{`
        @media (min-width: 768px) {
          .md-nav { display: flex !important; }
          header button[aria-label="Menu"] { display: none !important; }
          header a.btn-whatsapp { display: inline-flex !important; }
          header a.btn-primary { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
