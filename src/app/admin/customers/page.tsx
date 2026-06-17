import type { Metadata } from 'next';
import { Users, Mail, MessageCircle, Globe } from 'lucide-react';

export const metadata: Metadata = { title: 'Customers | Admin' };

const MOCK_CUSTOMERS = [
  { id: 1, company: 'Al Baraka Mobile', contact: 'Ahmed Al-Rashid', country: 'Saudi Arabia', email: 'ahmed@albaraka.sa', phone: '+966501234567', orders: 12, status: 'active' },
  { id: 2, company: 'Tech World LLC', contact: 'Mohamed Hassan', country: 'Egypt', email: 'mhassan@techworld.eg', phone: '+201012345678', orders: 8, status: 'active' },
  { id: 3, company: 'Dubai Phone Mart', contact: 'Khalid Al-Mansoori', country: 'UAE', email: 'khalid@dubaiphones.ae', phone: '+971501234567', orders: 24, status: 'active' },
  { id: 4, company: 'Global Mobile KE', contact: 'James Omondi', country: 'Kenya', email: 'james@globalmobile.ke', phone: '+254712345678', orders: 5, status: 'inactive' },
  { id: 5, company: 'Cairo Electronics', contact: 'Sara Mostafa', country: 'Egypt', email: 'sara@cairoelec.eg', phone: '+201112345678', orders: 3, status: 'active' },
  { id: 6, company: 'Riyadh Phones', contact: 'Abdullah Saad', country: 'Saudi Arabia', email: 'a.saad@riyadhphones.sa', phone: '+966559876543', orders: 18, status: 'active' },
];

export default function AdminCustomersPage() {
  const activeCount = MOCK_CUSTOMERS.filter(c => c.status === 'active').length;
  const totalOrders = MOCK_CUSTOMERS.reduce((sum, c) => sum + c.orders, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Customers</h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Wholesale buyers and B2B clients
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'center', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.625rem', padding: '0.625rem 1.25rem' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{activeCount}</div>
            <div style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>ACTIVE</div>
          </div>
          <div style={{ textAlign: 'center', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.625rem', padding: '0.625rem 1.25rem' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{totalOrders}</div>
            <div style={{ fontSize: '0.6875rem', color: '#64748B', fontWeight: 600 }}>TOTAL ORDERS</div>
          </div>
        </div>
      </div>

      {/* Note banner */}
      <div style={{
        background: '#fff7ed',
        border: '1px solid #fed7aa',
        borderRadius: '0.625rem',
        padding: '0.875rem 1.125rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.625rem',
      }}>
        <Users size={16} style={{ color: '#c2410c', flexShrink: 0 }} />
        <span style={{ fontSize: '0.8125rem', color: '#9a3412' }}>
          This section will show RFQ contacts automatically once connected to Supabase. Sample data shown below.
        </span>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Company', 'Contact', 'Country', 'Orders', 'Status', 'Actions'].map(col => (
                  <th key={col} style={{
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap',
                  }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_CUSTOMERS.map((customer, i) => (
                <tr key={customer.id} style={{ borderBottom: i < MOCK_CUSTOMERS.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div style={{
                        width: '36px', height: '36px',
                        background: '#F1F5F9',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        color: '#475569',
                      }}>
                        {customer.company[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>{customer.company}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#374151' }}>{customer.contact}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Globe size={13} style={{ color: '#94a3b8' }} />
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{customer.country}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A' }}>{customer.orders}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.125rem 0.625rem',
                      borderRadius: '9999px',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      background: customer.status === 'active' ? '#f0fdf4' : '#F8FAFC',
                      color: customer.status === 'active' ? '#166534' : '#94a3b8',
                      border: `1px solid ${customer.status === 'active' ? '#bbf7d0' : '#E2E8F0'}`,
                    }}>
                      {customer.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <a
                        href={`mailto:${customer.email}`}
                        style={{
                          width: '30px', height: '30px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: '#eff6ff',
                          color: '#2563EB',
                          borderRadius: '0.375rem',
                          textDecoration: 'none',
                        }}
                        title="Send email"
                      >
                        <Mail size={13} />
                      </a>
                      <a
                        href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '30px', height: '30px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: '#f0fdf4',
                          color: '#16a34a',
                          borderRadius: '0.375rem',
                          textDecoration: 'none',
                        }}
                        title="WhatsApp"
                      >
                        <MessageCircle size={13} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
