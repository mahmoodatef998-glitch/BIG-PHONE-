'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Package, Tag, FileText,
  Users, Settings, LogOut, ExternalLink, ChevronRight, Layers,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AdminToastProvider } from '@/components/admin/AdminToast';

const NAV = [
  { href: '/admin',             label: 'Dashboard',    icon: LayoutDashboard, exact: true },
  { href: '/admin/products',    label: 'Products',     icon: Package },
  { href: '/admin/brands',      label: 'Brands',       icon: Tag },
  { href: '/admin/collections', label: 'Sections',     icon: Layers },
  { href: '/admin/rfqs',        label: 'RFQ Requests', icon: FileText },
  { href: '/admin/customers',   label: 'Customers',    icon: Users },
  { href: '/admin/settings',    label: 'Settings',     icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const active = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return (
      <AdminToastProvider>
        {children}
      </AdminToastProvider>
    );
  }

  return (
    <AdminToastProvider>
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Sidebar */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: '#fff',
        borderRight: '1px solid #FFE4CC',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>

        {/* Brand + logo */}
        <div style={{ padding: '1.125rem 1rem', borderBottom: '1px solid #FFE4CC' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>

            {/* Camel logo */}
            <div style={{
              width: '38px', height: '38px', flexShrink: 0,
              borderRadius: '10px', overflow: 'hidden',
              border: '1.5px solid #FFD0A0',
              background: '#FFF3E8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Image
                src="/images/WhatsApp Image 2026-06-22 at 10.49.38 PM.jpeg"
                alt="BIG PHONE logo"
                width={38}
                height={38}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>

            <div>
              <div style={{
                fontWeight: 800, fontSize: '0.9375rem',
                color: '#111827', lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>BIG PHONE</div>
              <div style={{
                fontSize: '0.6875rem', color: '#9CA3AF',
                marginTop: '2px', fontWeight: 500,
              }}>Control Panel</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
          <div style={{
            fontSize: '0.625rem', fontWeight: 700, color: '#C4C9D4',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0 0.5rem', marginBottom: '0.5rem',
          }}>Main Menu</div>

          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const on = active(href, exact);
            return (
              <Link key={href} href={href} style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: '0.5625rem 0.75rem',
                borderRadius: '8px', marginBottom: '2px',
                fontSize: '0.875rem', fontWeight: on ? 700 : 500,
                color: on ? '#FF6B00' : '#4B5563',
                background: on ? '#FFF0E0' : 'transparent',
                border: `1px solid ${on ? '#FFD0A0' : 'transparent'}`,
                textDecoration: 'none', transition: 'all 0.12s',
              }}>
                <Icon size={16} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{label}</span>
                {on && <ChevronRight size={13} style={{ opacity: 0.6 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '0.875rem 0.75rem',
          borderTop: '1px solid #FFE4CC',
          display: 'flex', flexDirection: 'column', gap: '2px',
        }}>
          <Link href="/" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 0.75rem', borderRadius: '8px',
            fontSize: '0.8125rem', color: '#6B7280', textDecoration: 'none',
          }}>
            <ExternalLink size={14} />
            View Website
          </Link>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            width: '100%', padding: '0.5rem 0.75rem',
            background: 'transparent', border: 'none', borderRadius: '8px',
            fontSize: '0.8125rem', fontWeight: 600, color: '#EF4444',
            cursor: 'pointer', textAlign: 'left',
          }}>
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
        {children}
      </div>
    </div>
    </AdminToastProvider>
  );
}
