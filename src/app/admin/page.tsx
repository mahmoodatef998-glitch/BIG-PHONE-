import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, FileText, Tag, Users, TrendingUp, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getProducts, getBrands, getRFQs } from '@/lib/data';

export const metadata: Metadata = { title: 'Admin Dashboard | BIG PHONE' };

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

export default async function AdminDashboard() {
  const [products, brands, rfqs] = await Promise.all([getProducts(), getBrands(), getRFQs()]);

  const rfqStats = { total: rfqs.length, new: rfqs.filter(r => r.status === 'new').length };
  const totalStock = products.reduce((sum, p) => sum + p.stock_quantity, 0);
  const lowStockCount = products.filter(p => p.stock_quantity > 0 && p.stock_quantity < p.moq).length;

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: '#2563EB', href: '/admin/products' },
    { label: 'Total Stock', value: `${totalStock}+`, icon: TrendingUp, color: '#22c55e', href: '/admin/products' },
    { label: 'Pending RFQs', value: rfqStats.new, icon: FileText, color: '#F59E0B', href: '/admin/rfqs' },
    { label: 'Low Stock', value: lowStockCount, icon: AlertCircle, color: '#ef4444', href: '/admin/products' },
  ];

  const quickLinks = [
    { href: '/admin/products', label: 'Manage Products', desc: 'Add, edit, delete products and manage stock', icon: Package, color: '#2563EB' },
    { href: '/admin/rfqs', label: 'View RFQ Requests', desc: `${rfqStats.new} new requests awaiting response`, icon: FileText, color: '#F59E0B' },
    { href: '/admin/brands', label: 'Manage Brands', desc: 'Update brand info and product counts', icon: Tag, color: '#8b5cf6' },
    { href: '/admin/customers', label: 'Customers', desc: 'View wholesale customer contacts', icon: Users, color: '#22c55e' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Dashboard</h1>
        <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>Welcome back. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href} style={{
            background: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '0.75rem',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none',
            transition: 'box-shadow 0.15s',
          }}>
            <div style={{
              width: '44px', height: '44px',
              background: `${stat.color}15`,
              borderRadius: '0.625rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <div>
              <div style={{ fontSize: '1.625rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* Quick links */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>Quick Actions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', padding: '1.25rem' }}>
            {quickLinks.map(link => (
              <Link key={link.href} href={link.href} style={{
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '0.625rem',
                padding: '1rem',
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}>
                <div style={{
                  width: '36px', height: '36px',
                  background: `${link.color}15`,
                  borderRadius: '0.5rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <link.icon size={16} style={{ color: link.color }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>{link.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.125rem' }}>{link.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent RFQs */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>Recent RFQ Requests</h2>
            <Link href="/admin/rfqs" style={{ fontSize: '0.8125rem', color: '#2563EB', fontWeight: 600 }}>View All →</Link>
          </div>
          <div>
            {rfqs.slice(0, 4).map((rfq, i) => (
              <div key={rfq.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1.25rem',
                borderBottom: i < 3 ? '1px solid #F1F5F9' : 'none',
              }}>
                <div style={{
                  width: '36px', height: '36px',
                  background: rfq.status === 'new' ? '#fef9c3' : rfq.status === 'contacted' ? '#dbeafe' : '#f0fdf4',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {rfq.status === 'new' ? <AlertCircle size={16} style={{ color: '#ca8a04' }} /> :
                   rfq.status === 'quoted' ? <CheckCircle2 size={16} style={{ color: '#16a34a' }} /> :
                   <Clock size={16} style={{ color: '#2563EB' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>{rfq.company_name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {rfq.product_interest} {rfq.quantity ? `x${rfq.quantity}` : ''} • {rfq.country}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    background: rfq.status === 'new' ? '#fef9c3' : rfq.status === 'contacted' ? '#dbeafe' : '#f0fdf4',
                    color: rfq.status === 'new' ? '#92400e' : rfq.status === 'contacted' ? '#1e40af' : '#166534',
                  }}>{rfq.status}</span>
                  <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.25rem' }}>{timeAgo(rfq.created_at)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>Product Inventory Summary</h2>
            <Link href="/admin/products" style={{ fontSize: '0.8125rem', color: '#2563EB', fontWeight: 600 }}>Manage →</Link>
          </div>
          <div>
            {products.slice(0, 5).map((product, i) => (
              <div key={product.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1.25rem',
                borderBottom: i < 4 ? '1px solid #F1F5F9' : 'none',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.model} {product.storage}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{product.brand?.name} • {product.condition.replace(/-/g, ' ')}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: product.stock_quantity > 20 ? '#166534' : product.stock_quantity > 0 ? '#c2410c' : '#991b1b' }}>
                    {product.stock_quantity} units
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>MOQ: {product.moq}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          div > div:first-child { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
