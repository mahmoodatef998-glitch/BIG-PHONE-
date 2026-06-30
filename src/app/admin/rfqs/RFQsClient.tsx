'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, Globe, Calendar, MessageCircle, Download, Search, X, ShoppingBag } from 'lucide-react';
import type { Product, RFQ } from '@/types';
import { useAdminToast } from '@/components/admin/AdminToast';
import AdminPagination from '@/components/admin/AdminPagination';
import { usePagination } from '@/lib/admin/pagination';
import { formatDateTime } from '@/lib/admin/utils';
import { formatPriceAed } from '@/lib/pricing';
import { getCartLineTotal } from '@/lib/quote-cart';
import SoldRfqModal from './SoldRfqModal';

const PAGE_SIZE = 10;

interface Props {
  rfqs: RFQ[];
  products: Product[];
  initialEmail?: string;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  new:       { label: 'New',       bg: '#fef9c3', color: '#92400e' },
  contacted: { label: 'Contacted', bg: '#dbeafe', color: '#1e40af' },
  quoted:    { label: 'Quoted',    bg: '#f3e8ff', color: '#6b21a8' },
  closed:    { label: 'Closed',    bg: '#f0fdf4', color: '#166534' },
  sold:      { label: 'Sold',      bg: '#dcfce7', color: '#15803d' },
};

const FILTER_OPTIONS = ['all', 'new', 'contacted', 'quoted', 'closed', 'sold'];

function exportToCSV(rfqs: RFQ[], filter: string) {
  const headers = [
    'ID', 'Company', 'Contact', 'Country', 'Phone', 'Email', 'Product', 'Qty',
    'Est. Total AED', 'Message', 'Status', 'Sold Total AED', 'Sold Qty', 'Sold At', 'Date',
  ];
  const rows = rfqs.map(r => {
    const soldQty = r.sold_lines?.reduce((s, l) => s + l.quantity_sold, 0) ?? '';
    return [
      r.id, r.company_name, r.contact_person, r.country, r.phone, r.email,
      r.product_interest, r.quantity, r.estimated_total_aed ?? '', r.message ?? '', r.status,
      r.sold_total_aed ?? '', soldQty,
      r.sold_at ? new Date(r.sold_at).toLocaleString('en-AE', { dateStyle: 'medium', timeStyle: 'short' }) : '',
      new Date(r.created_at).toLocaleString('en-AE', { dateStyle: 'medium', timeStyle: 'short' }),
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
  });
  const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rfqs-${filter}-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function RFQsClient({ rfqs, products, initialEmail = '' }: Props) {
  const router = useRouter();
  const { error: toastError, success: toastSuccess } = useAdminToast();
  const [activeFilter, setActiveFilter] = useState('all');
  const [emailSearch, setEmailSearch] = useState(initialEmail);
  const [soldModalRfq, setSoldModalRfq] = useState<RFQ | null>(null);

  const filtered = useMemo(() => {
    const q = emailSearch.trim().toLowerCase();
    return rfqs.filter(r => {
      const matchesStatus = activeFilter === 'all' || r.status === activeFilter;
      const matchesEmail = !q || r.email.toLowerCase().includes(q) || r.company_name.toLowerCase().includes(q);
      return matchesStatus && matchesEmail;
    });
  }, [rfqs, activeFilter, emailSearch]);

  const paginationKey = `${activeFilter}|${emailSearch}`;
  const { paginated, page, setPage, totalPages, total, pageSize } = usePagination(filtered, PAGE_SIZE, paginationKey);

  async function updateStatus(rfq: RFQ, status: RFQ['status']) {
    if (status === 'sold') {
      setSoldModalRfq(rfq);
      return;
    }

    const res = await fetch('/api/admin/rfqs/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: rfq.id, status }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      toastError('Status update failed: ' + (j.error ?? 'Unknown error'));
      return;
    }
    toastSuccess('RFQ status updated');
    router.refresh();
  }

  async function confirmSale(data: { sold_lines: RFQ['sold_lines']; sold_total_aed: number }) {
    if (!soldModalRfq) return;

    const res = await fetch('/api/admin/rfqs/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: soldModalRfq.id,
        status: 'sold',
        sold_lines: data.sold_lines,
        sold_total_aed: data.sold_total_aed,
      }),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j.error ?? 'Unknown error');
    }

    toastSuccess('Sale recorded — stock updated');
    setSoldModalRfq(null);
    router.refresh();
  }

  return (
    <div className="admin-page-content">
      {soldModalRfq && (
        <SoldRfqModal
          rfq={soldModalRfq}
          products={products}
          onClose={() => setSoldModalRfq(null)}
          onConfirm={confirmSale}
        />
      )}

      <div className="admin-page-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>RFQ Requests</h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>{filtered.length} of {rfqs.length} requests</p>
        </div>
        <div className="admin-page-header-actions">
          {FILTER_OPTIONS.map(s => (
            <button key={s} type="button" onClick={() => setActiveFilter(s)}
              style={{
                padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem',
                fontWeight: activeFilter === s ? 700 : 500,
                background: activeFilter === s ? '#FF6B00' : '#fff',
                color: activeFilter === s ? '#fff' : '#374151',
                border: '1px solid', borderColor: activeFilter === s ? '#FF6B00' : '#E2E8F0',
                cursor: 'pointer', textTransform: 'capitalize',
              }}>
              {s === 'all' ? 'All' : STATUS_CONFIG[s]?.label ?? s}
            </button>
          ))}
          <button type="button" onClick={() => exportToCSV(filtered, activeFilter)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.875rem', borderRadius: '0.5rem', background: '#F8FAFC', color: '#374151', border: '1px solid #E2E8F0', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            <Download size={14} /> Export CSV ({filtered.length})
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: '360px', marginBottom: '1rem' }}>
        <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
        <input
          type="search"
          value={emailSearch}
          onChange={e => setEmailSearch(e.target.value)}
          placeholder="Search by email or company…"
          aria-label="Search RFQs"
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '0.625rem 2.25rem 0.625rem 2.5rem',
            border: '1px solid #E2E8F0', borderRadius: '0.5rem',
            fontSize: '0.875rem', color: '#111827', background: '#fff', outline: 'none',
          }}
        />
        {emailSearch && (
          <button
            type="button"
            onClick={() => setEmailSearch('')}
            aria-label="Clear search"
            style={{
              position: 'absolute', right: '0.625rem', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex',
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>No RFQs match this filter.</div>
        ) : paginated.map(rfq => {
          const statusCfg = STATUS_CONFIG[rfq.status];
          const soldUnits = rfq.sold_lines?.reduce((s, l) => s + l.quantity_sold, 0);
          return (
            <div key={rfq.id} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>{rfq.company_name}</h3>
                    <span style={{ padding: '0.125rem 0.625rem', borderRadius: '9999px', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', background: statusCfg.bg, color: statusCfg.color }}>{statusCfg.label}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: '#64748B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Globe size={13} /> {rfq.country}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Phone size={13} /> {rfq.phone}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Mail size={13} /> {rfq.email}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Calendar size={13} /> {formatDateTime(rfq.created_at)}</span>
                  </div>
                </div>
                <div className="admin-rfq-actions" style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, alignItems: 'center' }}>
                  {rfq.status === 'sold' ? (
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.375rem 0.625rem', background: '#ECFDF5', color: '#15803d',
                      borderRadius: '0.375rem', fontSize: '0.75rem', fontWeight: 700,
                    }}>
                      <ShoppingBag size={13} /> Sold
                    </span>
                  ) : (
                    <select value={rfq.status}
                      onChange={e => updateStatus(rfq, e.target.value as RFQ['status'])}
                      style={{ padding: '0.25rem 0.5rem', border: '1px solid #E2E8F0', borderRadius: '0.375rem', fontSize: '0.75rem', cursor: 'pointer', background: '#fff', color: '#374151' }}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                      <option value="sold">Sold</option>
                    </select>
                  )}
                  <a href={`mailto:${rfq.email}?subject=Re: Your Wholesale Quotation Request&body=Dear ${rfq.contact_person},%0D%0A%0D%0AThank you for your inquiry.`}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.75rem', background: '#FFF3E8', color: '#FF6B00', border: '1px solid #FFE4CC', borderRadius: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none' }}>
                    <Mail size={14} /> Email
                  </a>
                  <a href={`https://wa.me/${rfq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${rfq.contact_person}, thank you for your inquiry about ${rfq.product_interest}. We'd like to discuss your order of ${rfq.quantity ?? 'your requested'} units.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.75rem', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none' }}>
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>
              <div style={{ marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {rfq.items?.length ? `Products (${rfq.items.length})` : 'Product'}
                    </span>
                    {rfq.items?.length ? (
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {rfq.items.map((item, idx) => {
                          const lineTotal = getCartLineTotal(item);
                          return (
                          <div key={`${item.slug}-${idx}`} style={{
                            display: 'flex', justifyContent: 'space-between', gap: '0.75rem',
                            padding: '0.5rem 0.625rem', background: '#F8FAFC', borderRadius: '0.375rem',
                            fontSize: '0.8125rem',
                          }}>
                            <div style={{ minWidth: 0 }}>
                              <span style={{ color: '#0F172A', fontWeight: 600 }}>{item.name}</span>
                              {item.unit_price_aed != null && (
                                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.125rem' }}>
                                  AED {formatPriceAed(item.unit_price_aed)} × {item.quantity.toLocaleString()}
                                </div>
                              )}
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <div style={{ color: '#64748B', fontWeight: 700, whiteSpace: 'nowrap' }}>{item.quantity.toLocaleString()} units</div>
                              {lineTotal != null && (
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#111827', marginTop: '0.125rem' }}>
                                  AED {formatPriceAed(lineTotal)}
                                </div>
                              )}
                            </div>
                          </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.875rem', color: '#0F172A', fontWeight: 500, marginTop: '0.125rem' }}>{rfq.product_interest}</p>
                    )}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Quantity</span>
                    <p style={{ fontSize: '0.875rem', color: '#0F172A', fontWeight: 600, marginTop: '0.125rem' }}>
                      {rfq.quantity != null ? `${rfq.quantity.toLocaleString()} units` : '—'}
                    </p>
                  </div>
                  {rfq.estimated_total_aed != null && (
                    <div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Est. Total</span>
                      <p style={{ fontSize: '0.875rem', color: '#FF6B00', fontWeight: 700, marginTop: '0.125rem' }}>
                        AED {formatPriceAed(Number(rfq.estimated_total_aed))}
                      </p>
                    </div>
                  )}
                  {rfq.status === 'sold' && rfq.sold_total_aed != null && (
                    <div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sale</span>
                      <p style={{ fontSize: '0.875rem', color: '#15803d', fontWeight: 700, marginTop: '0.125rem' }}>
                        AED {formatPriceAed(Number(rfq.sold_total_aed))}
                        {soldUnits ? ` · ${soldUnits.toLocaleString()} sold` : ''}
                      </p>
                      {rfq.sold_at && (
                        <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.125rem' }}>
                          {formatDateTime(rfq.sold_at)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {rfq.message && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem', fontSize: '0.8125rem', color: '#64748B', background: '#F8FAFC', padding: '0.625rem 0.875rem', borderRadius: '0.375rem', marginTop: '0.5rem' }}>
                    <MessageCircle size={12} style={{ color: '#64748B', flexShrink: 0, marginTop: '2px' }} />
                    <span>{rfq.message}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <AdminPagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
