import type { Metadata } from 'next';
import { Mail, MessageCircle, Globe, Award, Star, UserCheck, Clock } from 'lucide-react';
import { getRFQs } from '@/lib/data';

export const metadata: Metadata = { title: 'Customers | Admin' };
export const dynamic = 'force-dynamic';

function timeAgo(dateStr: string) {
  const d = Date.now() - new Date(dateStr).getTime();
  if (d < 3600000)  return `${Math.floor(d / 60000)}m ago`;
  if (d < 86400000) return `${Math.floor(d / 3600000)}h ago`;
  if (d < 2592000000) return `${Math.floor(d / 86400000)}d ago`;
  return new Date(dateStr).toLocaleDateString('en-AE', { month: 'short', day: 'numeric' });
}

function customerTier(rfqCount: number) {
  if (rfqCount >= 3) return { label: 'VIP',     bg: '#FFF0E0', color: '#C2410C', border: '#FFD0A0', Icon: Award };
  if (rfqCount >= 2) return { label: 'Regular', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', Icon: Star };
  return               { label: 'New',     bg: '#F8FAFC', color: '#475569', border: '#E2E8F0', Icon: UserCheck };
}

function waGreeting(phone: string, company: string) {
  const msg = `Hello ${company}! Thank you for choosing BIG PHONE for your wholesale needs. How can we assist you today?`;
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
}

export default async function AdminCustomersPage() {
  const rfqs = await getRFQs();

  // Derive customers from RFQs grouped by email
  const map = new Map<string, {
    company_name: string; contact_person: string; email: string;
    phone: string; country: string; rfq_count: number;
    last_activity: string; products: string[];
  }>();

  rfqs.forEach(rfq => {
    const key = rfq.email;
    const interest = rfq.product_interest ?? null;
    if (map.has(key)) {
      const c = map.get(key)!;
      c.rfq_count++;
      if (rfq.created_at > c.last_activity) c.last_activity = rfq.created_at;
      if (interest && c.products.length < 3 && !c.products.includes(interest))
        c.products.push(interest);
    } else {
      map.set(key, {
        company_name: rfq.company_name,
        contact_person: rfq.contact_person,
        email: rfq.email,
        phone: rfq.phone,
        country: rfq.country,
        rfq_count: 1,
        last_activity: rfq.created_at,
        products: interest ? [interest] : [],
      });
    }
  });

  const customers = Array.from(map.values())
    .sort((a, b) => b.rfq_count - a.rfq_count || b.last_activity.localeCompare(a.last_activity));

  const vipCount     = customers.filter(c => c.rfq_count >= 3).length;
  const regularCount = customers.filter(c => c.rfq_count === 2).length;
  const newCount     = customers.filter(c => c.rfq_count === 1).length;

  // Country breakdown
  const countryMap: Record<string, number> = {};
  customers.forEach(c => { countryMap[c.country] = (countryMap[c.country] || 0) + 1; });
  const topCountries = Object.entries(countryMap).sort(([, a], [, b]) => b - a).slice(0, 4);

  return (
    <div style={{ padding: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>Customers</h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>Wholesale buyers derived from RFQ submissions</p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Customers', value: customers.length, icon: UserCheck, color: '#FF6B00', bg: '#FFF0E0' },
          { label: 'VIP Clients',     value: vipCount,         icon: Award,     color: '#C2410C', bg: '#FFF7ED' },
          { label: 'Regular',         value: regularCount,     icon: Star,      color: '#1D4ED8', bg: '#EFF6FF' },
          { label: 'New Inquiries',   value: newCount,         icon: Clock,     color: '#6B7280', bg: '#F8FAFC' },
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '1.25rem' }}>

        {/* Customers Table */}
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
                {customers.length === 0 ? (
                  <tr><td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>No customers yet — they appear when RFQs are submitted.</td></tr>
                ) : customers.map((c, i) => {
                  const tier = customerTier(c.rfq_count);
                  return (
                    <tr key={c.email}
                      style={{ borderBottom: i < customers.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FFF0E0', border: '1px solid #FFD0A0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '0.875rem', color: '#FF6B00' }}>
                            {c.company_name[0].toUpperCase()}
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
                          {c.products.slice(0, 2).map((p, pi) => (
                            <div key={pi} style={{ fontSize: '0.75rem', color: '#6B7280', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p}</div>
                          ))}
                          {c.products.length > 2 && <div style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>+{c.products.length - 2} more</div>}
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
                          <a href={`mailto:${c.email}`}
                            style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EFF6FF', color: '#2563EB', borderRadius: '0.375rem', textDecoration: 'none' }}
                            title="Send email">
                            <Mail size={13} />
                          </a>
                          <a href={waGreeting(c.phone, c.company_name)}
                            target="_blank" rel="noopener noreferrer"
                            style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ECFDF5', color: '#16a34a', borderRadius: '0.375rem', textDecoration: 'none' }}
                            title="WhatsApp">
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

        {/* Country Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827', margin: '0 0 1rem' }}>Top Markets</h3>
            {topCountries.length === 0 ? (
              <div style={{ color: '#9CA3AF', fontSize: '0.8125rem' }}>No data yet</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {topCountries.map(([country, count]) => {
                  const pct = Math.round((count / customers.length) * 100);
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
              Customers are derived from RFQ submissions. Each unique email becomes a customer entry automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
