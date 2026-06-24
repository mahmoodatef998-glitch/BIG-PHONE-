import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Package, FileText, Tag, AlertTriangle,
  Clock, CheckCircle2, XCircle,
  ArrowRight, Plus, Users, Settings, ChevronRight, Layers,
} from 'lucide-react';
import { getProductsAdmin, getBrands, getRFQs, getCollectionsAdmin } from '@/lib/data';

export const metadata: Metadata = { title: 'Admin Dashboard | BIG PHONE' };

function timeAgo(dateStr: string) {
  const d = Date.now() - new Date(dateStr).getTime();
  if (d < 3600000)  return `${Math.floor(d / 60000)}m ago`;
  if (d < 86400000) return `${Math.floor(d / 3600000)}h ago`;
  return `${Math.floor(d / 86400000)}d ago`;
}

const STATUS: Record<string, { label: string; bg: string; color: string; dot: string }> = {
  new:       { label: 'New',       bg: '#FEF9C3', color: '#92400E', dot: '#F59E0B' },
  contacted: { label: 'Contacted', bg: '#DBEAFE', color: '#1E40AF', dot: '#3B82F6' },
  quoted:    { label: 'Quoted',    bg: '#D1FAE5', color: '#065F46', dot: '#10B981' },
  closed:    { label: 'Closed',    bg: '#F1F5F9', color: '#475569', dot: '#9CA3AF' },
};

export default async function AdminDashboard() {
  const [products, brands, rfqs, collections] = await Promise.all([
    getProductsAdmin(), getBrands(), getRFQs(), getCollectionsAdmin(),
  ]);

  const totalStock  = products.reduce((s, p) => s + p.stock_quantity, 0);
  const lowStock    = products.filter(p => p.stock_quantity > 0 && p.stock_quantity < p.moq);
  const outOfStock  = products.filter(p => p.stock_quantity === 0);
  const pendingRFQs = rfqs.filter(r => r.status === 'new');
  const alertCount  = lowStock.length + outOfStock.length;

  const kpis = [
    {
      label: 'Total Products',
      value: products.length,
      sub: `${totalStock.toLocaleString()} units in stock`,
      icon: Package,
      color: '#FF6B00', bg: '#FFF0E0', border: '#FF6B00',
      href: '/admin/products',
    },
    {
      label: 'Pending RFQs',
      value: pendingRFQs.length,
      sub: `${rfqs.length} total received`,
      icon: FileText,
      color: '#F59E0B', bg: '#FFFBEB', border: '#F59E0B',
      href: '/admin/rfqs',
    },
    {
      label: 'Brands',
      value: brands.length,
      sub: `${collections.length} active sections`,
      icon: Tag,
      color: '#8B5CF6', bg: '#F5F3FF', border: '#8B5CF6',
      href: '/admin/brands',
    },
    {
      label: 'Stock Alerts',
      value: alertCount,
      sub: `${outOfStock.length} out of stock`,
      icon: AlertTriangle,
      color: '#EF4444', bg: '#FEF2F2', border: '#EF4444',
      href: '/admin/products',
    },
  ];

  const quickActions = [
    { href: '/admin/products',    icon: Package,  label: 'Manage Products',  color: '#FF6B00', bg: '#FFF0E0' },
    { href: '/admin/rfqs',        icon: FileText,  label: 'RFQ Inbox',        color: '#F59E0B', bg: '#FFFBEB' },
    { href: '/admin/brands',      icon: Tag,       label: 'Edit Brands',      color: '#8B5CF6', bg: '#F5F3FF' },
    { href: '/admin/collections', icon: Layers,    label: 'Sections',         color: '#0EA5E9', bg: '#F0F9FF' },
    { href: '/admin/customers',   icon: Users,     label: 'Customers',        color: '#10B981', bg: '#ECFDF5' },
    { href: '/admin/settings',    icon: Settings,  label: 'Settings',         color: '#6B7280', bg: '#F3F4F6' },
  ];

  return (
    <div style={{ padding: '1.75rem 2rem' }}>

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>
            Dashboard
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>
            {new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link href="/admin/products" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          background: '#FF6B00', color: '#fff', borderRadius: '8px',
          fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(255,107,0,0.3)',
          transition: 'background 0.15s',
        }}>
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {kpis.map(k => (
          <Link key={k.label} href={k.href} style={{
            background: '#fff',
            border: '1px solid #E5E7EB',
            borderTop: `3px solid ${k.border}`,
            borderRadius: '12px',
            padding: '1.25rem',
            textDecoration: 'none',
            display: 'block',
            transition: 'box-shadow 0.15s',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px',
                background: k.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <k.icon size={20} style={{ color: k.color }} />
              </div>
              <ArrowRight size={15} style={{ color: '#D1D5DB', marginTop: '2px' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', lineHeight: 1, letterSpacing: '-0.04em' }}>
              {k.value}
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0.25rem 0 0.125rem' }}>{k.label}</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{k.sub}</div>
          </Link>
        ))}
      </div>

      {/* ── Main two-column grid ────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.25rem', marginBottom: '1.25rem' }}>

        {/* Recent RFQs table */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{
            padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block' }} />
              <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', margin: 0 }}>Recent RFQ Requests</h2>
              {pendingRFQs.length > 0 && (
                <span style={{
                  background: '#FF6B00', color: '#fff',
                  fontSize: '0.6875rem', fontWeight: 700,
                  padding: '1px 8px', borderRadius: '9999px',
                }}>{pendingRFQs.length} new</span>
              )}
            </div>
            <Link href="/admin/rfqs" style={{ fontSize: '0.8125rem', color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>
              View All →
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead>
                <tr style={{ background: '#F9FAFB' }}>
                  {['Company', 'Product Interest', 'Country', 'Status', 'Time'].map(h => (
                    <th key={h} style={{
                      padding: '0.625rem 1rem', textAlign: 'left',
                      fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rfqs.slice(0, 7).map((rfq, i) => {
                  const cfg = STATUS[rfq.status] ?? STATUS.new;
                  return (
                    <tr key={rfq.id} style={{ borderBottom: i < 6 ? '1px solid #F9FAFB' : 'none' }}>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>{rfq.company_name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{rfq.email}</div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: '#374151', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {rfq.product_interest}
                        </div>
                        {rfq.quantity && <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Qty: {rfq.quantity}</div>}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{rfq.country}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                          padding: '0.2rem 0.625rem', borderRadius: '9999px',
                          background: cfg.bg, color: cfg.color,
                          fontSize: '0.75rem', fontWeight: 700,
                        }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.dot, display: 'inline-block', flexShrink: 0 }} />
                          {cfg.label}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                        {timeAgo(rfq.created_at)}
                      </td>
                    </tr>
                  );
                })}
                {rfqs.length === 0 && (
                  <tr><td colSpan={5} style={{ padding: '2.5rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>No RFQ requests yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Quick Actions */}
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
              <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', margin: 0 }}>Quick Actions</h2>
            </div>
            <div style={{ padding: '0.625rem 0.75rem' }}>
              {quickActions.map(a => (
                <Link key={a.href} href={a.href} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.625rem 0.5rem', borderRadius: '8px',
                  textDecoration: 'none', transition: 'background 0.12s',
                }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '8px',
                    background: a.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <a.icon size={16} style={{ color: a.color }} />
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', flex: 1 }}>{a.label}</span>
                  <ChevronRight size={14} style={{ color: '#D1D5DB' }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Stock Alerts */}
          {alertCount > 0 && (
            <div style={{ background: '#fff', border: '1px solid #FED7AA', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{
                padding: '0.875rem 1.25rem', borderBottom: '1px solid #FED7AA',
                background: '#FFF7ED',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <AlertTriangle size={15} style={{ color: '#F59E0B', flexShrink: 0 }} />
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#92400E', margin: 0 }}>Stock Alerts</h2>
                <span style={{
                  marginLeft: 'auto',
                  background: '#F59E0B', color: '#fff',
                  fontSize: '0.6875rem', fontWeight: 700,
                  padding: '1px 7px', borderRadius: '9999px',
                }}>{alertCount}</span>
              </div>
              <div style={{ padding: '0.5rem 0.75rem' }}>
                {[...outOfStock, ...lowStock].slice(0, 6).map(p => (
                  <Link key={p.id} href="/admin/products" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.5rem 0.5rem', borderRadius: '7px',
                    textDecoration: 'none', gap: '0.5rem',
                  }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                      {p.model} {p.storage}
                    </span>
                    <span style={{
                      flexShrink: 0,
                      fontSize: '0.6875rem', fontWeight: 700,
                      padding: '0.15rem 0.5rem', borderRadius: '9999px',
                      background: p.stock_quantity === 0 ? '#FEE2E2' : '#FEF9C3',
                      color:      p.stock_quantity === 0 ? '#991B1B' : '#92400E',
                    }}>
                      {p.stock_quantity === 0 ? 'Out' : `${p.stock_quantity} left`}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Inventory Table ──────────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{
          padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block' }} />
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', margin: 0 }}>Inventory Overview</h2>
          </div>
          <Link href="/admin/products" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            fontSize: '0.8125rem', color: '#FF6B00', fontWeight: 600, textDecoration: 'none',
          }}>
            Manage All <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['Product', 'Brand', 'Condition', 'Stock', 'MOQ', 'Price', 'Status'].map(h => (
                  <th key={h} style={{
                    padding: '0.625rem 1rem', textAlign: 'left',
                    fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 10).map((p, i) => {
                const out = p.stock_quantity === 0;
                const low = p.stock_quantity > 0 && p.stock_quantity < p.moq;
                return (
                  <tr key={p.id} style={{ borderBottom: i < 9 ? '1px solid #F9FAFB' : 'none' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>{p.model}</div>
                      {p.storage && <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{p.storage}</div>}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{p.brand?.name ?? '—'}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        fontSize: '0.75rem', fontWeight: 600,
                        padding: '0.2rem 0.5rem', borderRadius: '6px',
                        background: '#F3F4F6', color: '#374151',
                      }}>{p.condition.replace(/-/g, ' ')}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        fontSize: '0.9375rem', fontWeight: 700,
                        color: out ? '#EF4444' : low ? '#F59E0B' : '#10B981',
                      }}>{p.stock_quantity}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{p.moq}</td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>
                      {p.show_price && p.price_aed ? `AED ${p.price_aed.toLocaleString()}` : '—'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        display: 'inline-block', fontSize: '0.6875rem', fontWeight: 700,
                        padding: '0.2rem 0.625rem', borderRadius: '9999px',
                        background: out ? '#FEE2E2' : low ? '#FEF9C3' : '#D1FAE5',
                        color:      out ? '#991B1B' : low ? '#92400E' : '#065F46',
                      }}>
                        {out ? 'Out of Stock' : low ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>No products yet. Add your first product.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {products.length > 10 && (
          <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid #F3F4F6', textAlign: 'center' }}>
            <Link href="/admin/products" style={{ fontSize: '0.875rem', color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>
              View all {products.length} products →
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
