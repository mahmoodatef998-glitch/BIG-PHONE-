'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, Globe, Award, Star, UserCheck, Clock, Search } from 'lucide-react';
import type { AdminCustomer } from '@/lib/admin/customers';
import {
  customerStats,
  customerTier,
  topCustomerCountries,
} from '@/lib/admin/customers';
import { customerInitial, timeAgo, waLink } from '@/lib/admin/utils';

interface Props {
  customers: AdminCustomer[];
}

const TIER_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'vip', label: 'VIP' },
  { id: 'regular', label: 'Regular' },
  { id: 'new', label: 'New' },
] as const;

type TierFilter = (typeof TIER_FILTERS)[number]['id'];

function waGreeting(phone: string, company: string) {
  const msg = `Hello ${company}! Thank you for choosing BIG PHONE for your wholesale needs. How can we assist you today?`;
  return waLink(phone, msg);
}

export default function CustomersClient({ customers }: Props) {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');

  const stats = useMemo(() => customerStats(customers), [customers]);
  const topCountries = useMemo(() => topCustomerCountries(customers), [customers]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return customers.filter(c => {
      const matchesTier =
        tierFilter === 'all' ||
        (tierFilter === 'vip' && c.rfq_count >= 3) ||
        (tierFilter === 'regular' && c.rfq_count === 2) ||
        (tierFilter === 'new' && c.rfq_count === 1);

      if (!matchesTier) return false;
      if (!q) return true;

      return (
        c.company_name.toLowerCase().includes(q) ||
        c.contact_person.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.products.some(p => p.toLowerCase().includes(q))
      );
    });
  }, [customers, search, tierFilter]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>Customers</h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Wholesale buyers derived from RFQ submissions
          </p>
        </div>
        <Link
          href="/admin/rfqs"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.5rem 1rem', borderRadius: '0.5rem',
            background: '#FFF0E0', color: '#C2410C', border: '1px solid #FFD0A0',
            fontSize: '0.8125rem', fontWeight: 700, textDecoration: 'none',
          }}
        >
          View RFQ Inbox →
        </Link>
      </div>

      <div className="customers-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Customers', value: stats.total, icon: UserCheck, color: '#FF6B00', bg: '#FFF0E0' },
          { label: 'VIP Clients', value: stats.vip, icon: Award, color: '#C2410C', bg: '#FFF7ED' },
          { label: 'Regular', value: stats.regular, icon: Star, color: '#1D4ED8', bg: '#EFF6FF' },
          { label: 'New Inquiries', value: stats.new, icon: Clock, color: '#6B7280', bg: '#F8FAFC' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 500, marginTop: '2px' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '360px' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search company, email, country, product…"
            aria-label="Search customers"
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '0.625rem 0.875rem 0.625rem 2.5rem',
              border: '1px solid #E2E8F0', borderRadius: '0.5rem',
              fontSize: '0.875rem', color: '#111827', background: '#fff', outline: 'none',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {TIER_FILTERS.map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setTierFilter(f.id)}
              style={{
                padding: '0.375rem 0.875rem', borderRadius: '9999px', fontSize: '0.8125rem',
                fontWeight: tierFilter === f.id ? 700 : 500,
                background: tierFilter === f.id ? '#FF6B00' : '#fff',
                color: tierFilter === f.id ? '#fff' : '#374151',
                border: '1px solid', borderColor: tierFilter === f.id ? '#FF6B00' : '#E2E8F0',
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="customers-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '1.25rem' }}>
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                  {['Company', 'Contact', 'Country', 'Products Inquired', 'RFQs', 'Last Active', 'Tier', 'Actions'].map(col => (
                    <th key={col} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>
                      {customers.length === 0
                        ? 'No customers yet — they appear when RFQs are submitted.'
                        : 'No customers match your search or filter.'}
                    </td>
                  </tr>
                ) : filtered.map(c => {
                  const tier = customerTier(c.rfq_count);
                  return (
                    <tr key={c.email.toLowerCase()} className="customers-row">
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FFF0E0', border: '1px solid #FFD0A0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '0.875rem', color: '#FF6B00' }}>
                            {customerInitial(c.company_name)}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>{c.company_name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{c.contact_person}</td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <Globe size={12} style={{ color: '#94a3b8', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.875rem', color: '#374151' }}>{c.country}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {c.products.slice(0, 2).map(p => (
                            <div key={p} style={{ fontSize: '0.75rem', color: '#6B7280', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p}</div>
                          ))}
                          {c.products.length > 2 && (
                            <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>+{c.products.length - 2} more</div>
                          )}
                          {c.products.length === 0 && <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>—</div>}
                        </div>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: c.rfq_count >= 3 ? '#C2410C' : '#374151' }}>{c.rfq_count}</span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: '#6B7280', whiteSpace: 'nowrap' }}>
                        {timeAgo(c.last_activity)}
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.625rem', borderRadius: '9999px', fontSize: '0.6875rem', fontWeight: 700, background: tier.bg, color: tier.color, border: `1px solid ${tier.border}` }}>
                          <tier.Icon size={10} />
                          {tier.label}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.375rem' }}>
                          <a
                            href={`mailto:${c.email}`}
                            style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EFF6FF', color: '#2563EB', borderRadius: '0.375rem', textDecoration: 'none' }}
                            title="Send email"
                          >
                            <Mail size={13} />
                          </a>
                          <a
                            href={waGreeting(c.phone, c.company_name)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ECFDF5', color: '#16a34a', borderRadius: '0.375rem', textDecoration: 'none' }}
                            title="WhatsApp"
                          >
                            <MessageCircle size={13} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827', margin: '0 0 1rem' }}>Top Markets</h3>
            {topCountries.length === 0 ? (
              <div style={{ color: '#9CA3AF', fontSize: '0.8125rem' }}>No data yet</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {topCountries.map(([country, count]) => {
                  const pct = customers.length > 0 ? Math.round((count / customers.length) * 100) : 0;
                  return (
                    <div key={country}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>{country}</span>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FF6B00' }}>{count}</span>
                      </div>
                      <div style={{ height: '5px', background: '#F3F4F6', borderRadius: '3px' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: '#FF6B00', borderRadius: '3px', opacity: 0.7 + (pct / 300) }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C2410C', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Note</div>
            <p style={{ fontSize: '0.75rem', color: '#9a3412', margin: 0, lineHeight: 1.5 }}>
              Customers are grouped by email from RFQ submissions. VIP = 3+ RFQs, Regular = 2, New = 1.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .customers-row:hover { background: #FAFAFA; }
        @media (max-width: 1024px) {
          .customers-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .customers-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
