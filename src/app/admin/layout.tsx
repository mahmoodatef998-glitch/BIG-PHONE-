'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tag,
  FileText,
  Users,
  Settings,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/brands', label: 'Brands', icon: Tag },
  { href: '/admin/rfqs', label: 'RFQ Requests', icon: FileText },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        background: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '32px', height: '32px',
              background: '#F59E0B',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#0F172A', fontWeight: 800, fontSize: '14px' }}>B</span>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.9375rem', lineHeight: 1 }}>BIG PHONE</div>
              <div style={{ color: '#64748B', fontSize: '0.6875rem', marginTop: '2px' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link key={href} href={href} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.625rem 0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '0.25rem',
                fontSize: '0.875rem',
                fontWeight: active ? 600 : 400,
                color: active ? '#fff' : '#94a3b8',
                background: active ? 'rgba(37,99,235,0.3)' : 'transparent',
                border: active ? '1px solid rgba(37,99,235,0.4)' : '1px solid transparent',
                transition: 'all 0.15s',
                textDecoration: 'none',
              }}>
                <Icon size={16} />
                <span style={{ flex: 1 }}>{label}</span>
                {active && <ChevronRight size={14} />}
              </Link>
            );
          })}
        </nav>

        {/* Back to site */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.625rem 0.75rem',
            fontSize: '0.8125rem',
            color: '#64748B',
            textDecoration: 'none',
          }}>
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
