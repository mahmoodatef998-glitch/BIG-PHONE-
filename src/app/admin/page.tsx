import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Package, FileText, Tag, AlertTriangle,
  ArrowRight, Plus, Users, Settings, ChevronRight, Layers,
  DollarSign, TrendingUp, MessageCircle,
} from 'lucide-react';
import { getProductsAdmin, getBrandsAdmin, getRFQs, getCollectionsAdmin } from '@/lib/data';
import { formatDateTime } from '@/lib/admin/utils';
import { formatPriceAed, getProductPricing } from '@/lib/pricing';
import StockReportExportButton from '@/components/admin/StockReportExportButton';

export const metadata: Metadata = { title: 'Admin Dashboard | BIG PHONE' };
export const dynamic = 'force-dynamic';

const STATUS: Record<string, { label: string; bg: string; color: string; dot: string }> = {
  new:       { label: 'New',       bg: '#FEF9C3', color: '#92400E', dot: '#F59E0B' },
  contacted: { label: 'Contacted', bg: '#DBEAFE', color: '#1E40AF', dot: '#3B82F6' },
  quoted:    { label: 'Quoted',    bg: '#D1FAE5', color: '#065F46', dot: '#10B981' },
  closed:    { label: 'Closed',    bg: '#F1F5F9', color: '#475569', dot: '#9CA3AF' },
};

function waLink(phone: string, company: string, product: string | null, qty: number | null) {
  const productLabel = product ?? 'your requested product';
  const msg = `Hello ${company}!\n\nThank you for your RFQ for *${productLabel}*${qty ? ` (Qty: ${qty})` : ''}.\n\nOur team will share the best wholesale price shortly.\n\nBest regards,\nBIG PHONE Team`;
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
}

export default async function AdminDashboard() {
  const [products, brands, rfqs, collections] = await Promise.all([
    getProductsAdmin(), getBrandsAdmin(), getRFQs(), getCollectionsAdmin(),
  ]);

  const totalStock  = products.reduce((s, p) => s + p.stock_quantity, 0);
  const lowStock    = products.filter(p => p.stock_quantity > 0 && p.stock_quantity < p.moq);
  const outOfStock  = products.filter(p => p.stock_quantity === 0);
  const inStock     = products.filter(p => p.stock_quantity >= p.moq);
  const pendingRFQs = rfqs.filter(r => r.status === 'new');
  const alertCount  = lowStock.length + outOfStock.length;

  // Stock value
  const stockValue = products
    .filter(p => p.price_aed && p.show_price && p.stock_quantity > 0)
    .reduce((sum, p) => sum + p.stock_quantity * Number(p.price_aed), 0);
  const pricedCount = products.filter(p => p.price_aed && p.show_price).length;

  // RFQ Funnel
  const funnelStages = [
    { label: 'New',       count: rfqs.filter(r => r.status === 'new').length,       color: '#F59E0B' },
    { label: 'Contacted', count: rfqs.filter(r => r.status === 'contacted').length, color: '#3B82F6' },
    { label: 'Quoted',    count: rfqs.filter(r => r.status === 'quoted').length,    color: '#10B981' },
    { label: 'Closed',    count: rfqs.filter(r => r.status === 'closed').length,    color: '#6B7280' },
  ];
  const totalRFQs = rfqs.length || 1;
  const conversionRate = rfqs.length > 0 ? Math.round((rfqs.filter(r => r.status === 'closed').length / totalRFQs) * 100) : 0;

  // Top requested from RFQ text
  const KEYWORDS = ['iPhone', 'iPad', 'AirPods', 'Galaxy', 'Xiaomi', 'Huawei', 'OPPO', 'Vivo', 'Redmi'];
  const mentions: Record<string, number> = {};
  rfqs.forEach(r => {
    KEYWORDS.forEach(kw => {
      if (r.product_interest?.toLowerCase().includes(kw.toLowerCase())) {
        mentions[kw] = (mentions[kw] || 0) + 1;
      }
    });
  });
  const topRequested = Object.entries(mentions).sort(([, a], [, b]) => b - a).slice(0, 5);
  const maxMentions = topRequested[0]?.[1] || 1;

  const kpis = [
    { label: 'Total Products', value: products.length, sub: `${totalStock.toLocaleString()} units in stock`, icon: Package, color: '#FF6B00', bg: '#FFF0E0', border: '#FF6B00', href: '/admin/products' },
    { label: 'Pending RFQs',   value: pendingRFQs.length, sub: `${rfqs.length} total received`, icon: FileText, color: '#F59E0B', bg: '#FFFBEB', border: '#F59E0B', href: '/admin/rfqs' },
    { label: 'Brands',         value: brands.length, sub: `${collections.length} active sections`, icon: Tag, color: '#8B5CF6', bg: '#F5F3FF', border: '#8B5CF6', href: '/admin/brands' },
    { label: 'Stock Alerts',   value: alertCount, sub: `${outOfStock.length} out of stock`, icon: AlertTriangle, color: '#EF4444', bg: '#FEF2F2', border: '#EF4444', href: '/admin/products' },
  ];

  const quickActions = [
    { href: '/admin/products',    icon: Package,  label: 'Manage Products', color: '#FF6B00', bg: '#FFF0E0' },
    { href: '/admin/rfqs',        icon: FileText, label: 'RFQ Inbox',       color: '#F59E0B', bg: '#FFFBEB' },
    { href: '/admin/brands',      icon: Tag,      label: 'Edit Brands',     color: '#8B5CF6', bg: '#F5F3FF' },
    { href: '/admin/collections', icon: Layers,   label: 'Sections',        color: '#0EA5E9', bg: '#F0F9FF' },
    { href: '/admin/customers',   icon: Users,    label: 'Customers',       color: '#10B981', bg: '#ECFDF5' },
    { href: '/admin/settings',    icon: Settings, label: 'Settings',        color: '#6B7280', bg: '#F3F4F6' },
  ];

  return (
    <div className="admin-dashboard admin-page-content">

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>Dashboard</h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>
            {new Date().toLocaleDateString('en-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link href="/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: '#FF6B00', color: '#fff', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 2px 8px rgba(255,107,0,0.3)' }}>
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="admin-kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
        {kpis.map(k => (
          <Link key={k.label} href={k.href} style={{ background: '#fff', border: '1px solid #E5E7EB', borderTop: `3px solid ${k.border}`, borderRadius: '12px', padding: '1.25rem', textDecoration: 'none', display: 'block' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <k.icon size={20} style={{ color: k.color }} />
              </div>
              <ArrowRight size={15} style={{ color: '#D1D5DB', marginTop: '2px' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', lineHeight: 1, letterSpacing: '-0.04em' }}>{k.value}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0.25rem 0 0.125rem' }}>{k.label}</div>
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{k.sub}</div>
          </Link>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="admin-analytics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>

        {/* Stock Value */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={15} style={{ color: '#10B981' }} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>Stock Value</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', lineHeight: 1 }}>
            {stockValue > 0 ? `AED ${(stockValue / 1000).toFixed(0)}K` : '—'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.375rem' }}>
            {pricedCount} of {products.length} products priced
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {[
              { label: 'In Stock',     value: inStock.length,    color: '#10B981' },
              { label: 'Low Stock',    value: lowStock.length,   color: '#F59E0B' },
              { label: 'Out of Stock', value: outOfStock.length, color: '#EF4444' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{s.label}</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RFQ Funnel */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FFF0E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={15} style={{ color: '#FF6B00' }} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>RFQ Conversion Funnel</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600 }}>{rfqs.length} total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {funnelStages.map(stage => {
              const pct = Math.round((stage.count / totalRFQs) * 100);
              return (
                <div key={stage.label}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>{stage.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{pct}%</span>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: stage.color, minWidth: '20px', textAlign: 'right' }}>{stage.count}</span>
                    </div>
                  </div>
                  <div style={{ height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.max(pct, stage.count > 0 ? 2 : 0)}%`, background: stage.color, borderRadius: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Close rate</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: conversionRate > 30 ? '#10B981' : '#FF6B00' }}>{conversionRate}%</span>
          </div>
        </div>

        {/* Top Requested */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={15} style={{ color: '#8B5CF6' }} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>Top Requested</span>
          </div>
          {topRequested.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '0.8125rem', padding: '1.5rem 0' }}>No RFQ data yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {topRequested.map(([name, count], i) => (
                <div key={name}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: i === 0 ? '#FF6B00' : '#CBD5E1', width: '18px', textAlign: 'center' }}>#{i + 1}</span>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>{name}</span>
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#374151' }}>{count}</span>
                  </div>
                  <div style={{ height: '4px', background: '#F3F4F6', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${(count / maxMentions) * 100}%`, background: i === 0 ? '#FF6B00' : '#E2E8F0', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main grid */}
      <div className="admin-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.25rem', marginBottom: '1.25rem' }}>

        {/* RFQ Table with WhatsApp */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block' }} />
              <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', margin: 0 }}>Recent RFQ Requests</h2>
              {pendingRFQs.length > 0 && (
                <span style={{ background: '#FF6B00', color: '#fff', fontSize: '0.6875rem', fontWeight: 700, padding: '1px 8px', borderRadius: '9999px' }}>{pendingRFQs.length} new</span>
              )}
            </div>
            <Link href="/admin/rfqs" style={{ fontSize: '0.8125rem', color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>View All →</Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '540px' }}>
              <thead>
                <tr style={{ background: '#F9FAFB' }}>
                  {['Company', 'Product Interest', 'Country', 'Status', 'Time', 'WA'].map(h => (
                    <th key={h} style={{ padding: '0.625rem 1rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>{h}</th>
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
                        <div style={{ fontSize: '0.8125rem', color: '#374151', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rfq.product_interest ?? '—'}</div>
                        {rfq.quantity && <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Qty: {rfq.quantity}</div>}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{rfq.country}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.625rem', borderRadius: '9999px', background: cfg.bg, color: cfg.color, fontSize: '0.75rem', fontWeight: 700 }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.dot, display: 'inline-block', flexShrink: 0 }} />
                          {cfg.label}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{formatDateTime(rfq.created_at)}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <a href={waLink(rfq.phone, rfq.company_name, rfq.product_interest, rfq.quantity ?? null)}
                          target="_blank" rel="noopener noreferrer" title="Reply via WhatsApp"
                          style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ECFDF5', color: '#16a34a', borderRadius: '7px', textDecoration: 'none' }}>
                          <MessageCircle size={14} />
                        </a>
                      </td>
                    </tr>
                  );
                })}
                {rfqs.length === 0 && (
                  <tr><td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>No RFQ requests yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6' }}>
              <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', margin: 0 }}>Quick Actions</h2>
            </div>
            <div style={{ padding: '0.625rem 0.75rem' }}>
              {quickActions.map(a => (
                <Link key={a.href} href={a.href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.5rem', borderRadius: '8px', textDecoration: 'none' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <a.icon size={16} style={{ color: a.color }} />
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', flex: 1 }}>{a.label}</span>
                  <ChevronRight size={14} style={{ color: '#D1D5DB' }} />
                </Link>
              ))}
            </div>
          </div>

          {alertCount > 0 && (
            <div style={{ background: '#fff', border: '1px solid #FED7AA', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #FED7AA', background: '#FFF7ED', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={15} style={{ color: '#F59E0B', flexShrink: 0 }} />
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#92400E', margin: 0 }}>Stock Alerts</h2>
                <span style={{ marginLeft: 'auto', background: '#F59E0B', color: '#fff', fontSize: '0.6875rem', fontWeight: 700, padding: '1px 7px', borderRadius: '9999px' }}>{alertCount}</span>
              </div>
              <div style={{ padding: '0.5rem 0.75rem' }}>
                {[...outOfStock, ...lowStock].slice(0, 6).map(p => (
                  <Link key={p.id} href="/admin/products" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.5rem', borderRadius: '7px', textDecoration: 'none', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{p.model} {p.storage}</span>
                    <span style={{ flexShrink: 0, fontSize: '0.6875rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px', background: p.stock_quantity === 0 ? '#FEE2E2' : '#FEF9C3', color: p.stock_quantity === 0 ? '#991B1B' : '#92400E' }}>
                      {p.stock_quantity === 0 ? 'Out' : `${p.stock_quantity} left`}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inventory Table */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF6B00', display: 'inline-block' }} />
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#111827', margin: 0 }}>Inventory Overview</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <StockReportExportButton
              products={products}
              collections={collections}
              label={`Stock Report (${products.length})`}
            />
            <Link href="/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>Manage All <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['Product', 'Brand', 'Condition', 'Stock', 'MOQ', 'Price', 'Status'].map(h => (
                  <th key={h} style={{ padding: '0.625rem 1rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>{h}</th>
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
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: '6px', background: '#F3F4F6', color: '#374151' }}>{p.condition.replace(/-/g, ' ')}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: out ? '#EF4444' : low ? '#F59E0B' : '#10B981' }}>{p.stock_quantity}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{p.moq}</td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>
                      {(() => {
                        const pricing = getProductPricing(p);
                        if (!pricing.showPrice || pricing.display == null) return '—';
                        return pricing.hasDiscount
                          ? `AED ${formatPriceAed(pricing.display)} (${formatPriceAed(pricing.original)} was)`
                          : `AED ${formatPriceAed(pricing.display)}`;
                      })()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{ display: 'inline-block', fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.625rem', borderRadius: '9999px', background: out ? '#FEE2E2' : low ? '#FEF9C3' : '#D1FAE5', color: out ? '#991B1B' : low ? '#92400E' : '#065F46' }}>
                        {out ? 'Out of Stock' : low ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>No products yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {products.length > 10 && (
          <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid #F3F4F6', textAlign: 'center' }}>
            <Link href="/admin/products" style={{ fontSize: '0.875rem', color: '#FF6B00', fontWeight: 600, textDecoration: 'none' }}>View all {products.length} products →</Link>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 1280px) {
          .admin-analytics-grid { grid-template-columns: 1fr 1.6fr 1fr; }
        }
      `}</style>
    </div>
  );
}
