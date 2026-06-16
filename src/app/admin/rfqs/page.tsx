import type { Metadata } from 'next';
import { FileText, Mail, Phone, Globe, Calendar, MessageCircle } from 'lucide-react';

export const metadata: Metadata = { title: 'RFQ Requests | Admin' };

const MOCK_RFQS = [
  { id: '1', company_name: 'Al Baraka Mobile', contact_person: 'Ahmed Al-Rashid', country: 'Saudi Arabia', phone: '+966501234567', email: 'ahmed@albaraka.sa', product_interest: 'iPhone 15 Pro 128GB Grade A', quantity: 50, message: 'Need urgent delivery to Riyadh', status: 'new', created_at: '2024-01-15T10:30:00Z' },
  { id: '2', company_name: 'Tech World LLC', contact_person: 'Mohamed Hassan', country: 'Egypt', phone: '+201001234567', email: 'mohamed@techworld.eg', product_interest: 'Samsung Galaxy S24 256GB', quantity: 100, message: 'Export to Egypt, need HS codes', status: 'contacted', created_at: '2024-01-15T08:15:00Z' },
  { id: '3', company_name: 'Dubai Phone Mart', contact_person: 'Sarah Johnson', country: 'UAE', phone: '+971501234567', email: 'sarah@dubaiphone.ae', product_interest: 'Mixed iPhone 14 Lot', quantity: 200, message: 'Various colors and storage', status: 'quoted', created_at: '2024-01-14T16:45:00Z' },
  { id: '4', company_name: 'Global Mobile KE', contact_person: 'James Mwangi', country: 'Kenya', phone: '+254701234567', email: 'james@globalmobile.ke', product_interest: 'Xiaomi 13 Pro 256GB', quantity: 30, message: 'Nairobi delivery required', status: 'new', created_at: '2024-01-14T09:00:00Z' },
  { id: '5', company_name: 'Horizon Phones PK', contact_person: 'Ali Raza', country: 'Pakistan', phone: '+923001234567', email: 'ali@horizonphones.pk', product_interest: 'Huawei P60 Pro', quantity: 25, message: 'Karachi port delivery', status: 'closed', created_at: '2024-01-13T14:30:00Z' },
];

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  new: { label: 'New', bg: '#fef9c3', color: '#92400e' },
  contacted: { label: 'Contacted', bg: '#dbeafe', color: '#1e40af' },
  quoted: { label: 'Quoted', bg: '#f3e8ff', color: '#6b21a8' },
  closed: { label: 'Closed', bg: '#f0fdf4', color: '#166534' },
};

export default function RFQsAdminPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>RFQ Requests</h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>{MOCK_RFQS.length} total requests</p>
        </div>
        {/* Status filter pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'New', 'Contacted', 'Quoted', 'Closed'].map(s => (
            <span key={s} style={{
              padding: '0.375rem 0.875rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: s === 'All' ? 700 : 500,
              background: s === 'All' ? '#0F172A' : '#fff',
              color: s === 'All' ? '#fff' : '#374151',
              border: '1px solid #E2E8F0',
              cursor: 'pointer',
            }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {MOCK_RFQS.map(rfq => {
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

                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <a
                    href={`mailto:${rfq.email}?subject=Re: Your Wholesale Quotation Request&body=Dear ${rfq.contact_person},%0D%0A%0D%0AThank you for your inquiry.`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      background: '#eff6ff',
                      color: '#2563EB',
                      border: '1px solid #bfdbfe',
                      borderRadius: '0.5rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <Mail size={14} /> Email
                  </a>
                  <a
                    href={`https://wa.me/${rfq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${rfq.contact_person}, thank you for your inquiry about ${rfq.product_interest}. We'd like to discuss your order of ${rfq.quantity} units.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.5rem 0.75rem',
                      background: '#f0fdf4',
                      color: '#16a34a',
                      border: '1px solid #bbf7d0',
                      borderRadius: '0.5rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      textDecoration: 'none',
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
                  <p style={{ fontSize: '0.8125rem', color: '#64748B', background: '#F8FAFC', padding: '0.625rem 0.875rem', borderRadius: '0.375rem', marginTop: '0.5rem' }}>
                    💬 {rfq.message}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

void FileText;
