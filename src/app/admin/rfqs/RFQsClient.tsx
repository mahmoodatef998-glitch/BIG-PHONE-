'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Mail, Phone, Globe, Calendar, MessageCircle } from 'lucide-react';
import type { RFQ } from '@/types';

void FileText;

interface Props {
  rfqs: RFQ[];
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  new:       { label: 'New',       bg: '#fef9c3', color: '#92400e' },
  contacted: { label: 'Contacted', bg: '#dbeafe', color: '#1e40af' },
  quoted:    { label: 'Quoted',    bg: '#f3e8ff', color: '#6b21a8' },
  closed:    { label: 'Closed',    bg: '#f0fdf4', color: '#166534' },
};

const FILTER_OPTIONS = ['all', 'new', 'contacted', 'quoted', 'closed'];

export default function RFQsClient({ rfqs }: Props) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all' ? rfqs : rfqs.filter(r => r.status === activeFilter);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>RFQ Requests</h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {filtered.length} of {rfqs.length} requests
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {FILTER_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              style={{
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: activeFilter === s ? 700 : 500,
                background: activeFilter === s ? '#FF6B00' : '#fff',
                color: activeFilter === s ? '#fff' : '#374151',
                border: '1px solid',
                borderColor: activeFilter === s ? '#FF6B00' : '#E2E8F0',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {s === 'all' ? 'All' : STATUS_CONFIG[s]?.label ?? s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
            No RFQs match this filter.
          </div>
        ) : filtered.map(rfq => {
          const statusCfg = STATUS_CONFIG[rfq.status];
          return (
            <div key={rfq.id} style={{
              background: '#fff',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              padding: '1.25rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>{rfq.company_name}</h3>
                    <span style={{
                      padding: '0.125rem 0.625rem',
                      borderRadius: '9999px',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      background: statusCfg.bg,
                      color: statusCfg.color,
                    }}>{statusCfg.label}</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: '#64748B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Globe size={13} /> {rfq.country}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Phone size={13} /> {rfq.phone}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Mail size={13} /> {rfq.email}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Calendar size={13} /> {new Date(rfq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, alignItems: 'center' }}>
                  <select
                    value={rfq.status}
                    onChange={async e => {
                      const s = e.target.value as RFQ['status'];
                      const res = await fetch('/api/admin/rfqs/update', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: rfq.id, status: s }),
                      });
                      if (!res.ok) {
                        const j = await res.json().catch(() => ({}));
                        alert('Status update failed: ' + (j.error ?? 'Unknown error'));
                      }
                      router.refresh();
                    }}
                    style={{
                      padding: '0.25rem 0.5rem',
                      border: '1px solid #E2E8F0',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      background: '#fff',
                      color: '#374151',
                    }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>

                  <a
                    href={`mailto:${rfq.email}?subject=Re: Your Wholesale Quotation Request&body=Dear ${rfq.contact_person},%0D%0A%0D%0AThank you for your inquiry.`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      background: '#FFF3E8', color: '#FF6B00',
                      border: '1px solid #FFE4CC', borderRadius: '0.5rem',
                      fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none',
                    }}
                  >
                    <Mail size={14} /> Email
                  </a>
                  <a
                    href={`https://wa.me/${rfq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${rfq.contact_person}, thank you for your inquiry about ${rfq.product_interest}. We'd like to discuss your order of ${rfq.quantity} units.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      background: '#f0fdf4', color: '#16a34a',
                      border: '1px solid #bbf7d0', borderRadius: '0.5rem',
                      fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>

              <div style={{ marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Product</span>
                    <p style={{ fontSize: '0.875rem', color: '#0F172A', fontWeight: 500, marginTop: '0.125rem' }}>{rfq.product_interest}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quantity</span>
                    <p style={{ fontSize: '0.875rem', color: '#0F172A', fontWeight: 600, marginTop: '0.125rem' }}>{rfq.quantity} units</p>
                  </div>
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
    </div>
  );
}
