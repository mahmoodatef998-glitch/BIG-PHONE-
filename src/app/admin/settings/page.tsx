import type { Metadata } from 'next';
import { Settings, Globe, MessageCircle, Bell, Shield, Database } from 'lucide-react';

export const metadata: Metadata = { title: 'Settings | Admin' };

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>{label}</div>
        {description && <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.125rem' }}>{description}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
      <Icon size={16} style={{ color: '#64748B' }} />
      <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</h2>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '0.5rem 0.875rem',
  border: '1px solid #E2E8F0',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  color: '#374151',
  background: '#fff',
  outline: 'none',
  minWidth: '220px',
};

export default function AdminSettingsPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Settings</h1>
        <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>Manage store configuration and preferences</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* General */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Settings} title="General" />
          <SettingRow label="Store Name" description="Displayed across the site">
            <input defaultValue="BIG PHONE" style={inputStyle} />
          </SettingRow>
          <SettingRow label="Store Tagline" description="Short description for SEO">
            <input defaultValue="Wholesale Mobile Phones & Devices" style={inputStyle} />
          </SettingRow>
          <SettingRow label="Contact Email" description="Customer inquiries are sent here">
            <input type="email" defaultValue="sales@bigphone.ae" style={inputStyle} />
          </SettingRow>
          <div style={{ padding: '0.875rem 1.25rem' }}>
            <button style={{
              padding: '0.5rem 1.25rem',
              background: '#2563EB', color: '#fff',
              border: 'none', borderRadius: '0.5rem',
              fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
            }}>
              Save Changes
            </button>
          </div>
        </div>

        {/* WhatsApp */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={MessageCircle} title="WhatsApp" />
          <SettingRow label="WhatsApp Number" description="Used for all WhatsApp CTAs (no + or spaces)">
            <input defaultValue="971500000000" style={inputStyle} placeholder="971500000000" />
          </SettingRow>
          <SettingRow label="Default Message" description="Pre-filled message when customer opens chat">
            <input defaultValue="Hello, I'm interested in a wholesale quote." style={{ ...inputStyle, minWidth: '300px' }} />
          </SettingRow>
          <div style={{ padding: '0.875rem 1.25rem' }}>
            <button style={{
              padding: '0.5rem 1.25rem',
              background: '#16a34a', color: '#fff',
              border: 'none', borderRadius: '0.5rem',
              fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
            }}>
              Save WhatsApp
            </button>
          </div>
        </div>

        {/* Localization */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Globe} title="Localization" />
          <SettingRow label="Default Currency" description="Displayed on product pricing">
            <select style={{ ...inputStyle, minWidth: '140px' }}>
              <option>USD ($)</option>
              <option>AED (د.إ)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </SettingRow>
          <SettingRow label="MOQ Display" description="Minimum order quantity label">
            <select style={{ ...inputStyle, minWidth: '140px' }}>
              <option>Show on all products</option>
              <option>Show on cards only</option>
              <option>Hide</option>
            </select>
          </SettingRow>
          <div style={{ padding: '0.875rem 1.25rem' }}>
            <button style={{
              padding: '0.5rem 1.25rem',
              background: '#2563EB', color: '#fff',
              border: 'none', borderRadius: '0.5rem',
              fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
            }}>
              Save Localization
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Bell} title="Notifications" />
          <SettingRow label="New RFQ email" description="Get emailed when someone submits a quote request">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '0.875rem', color: '#374151' }}>Enabled</span>
            </label>
          </SettingRow>
          <SettingRow label="Notification email" description="Where RFQ alerts are sent">
            <input type="email" defaultValue="admin@bigphone.ae" style={inputStyle} />
          </SettingRow>
          <div style={{ padding: '0.875rem 1.25rem' }}>
            <button style={{
              padding: '0.5rem 1.25rem',
              background: '#2563EB', color: '#fff',
              border: 'none', borderRadius: '0.5rem',
              fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
            }}>
              Save Notifications
            </button>
          </div>
        </div>

        {/* Security */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Shield} title="Security" />
          <SettingRow label="Admin Password" description="Change your Supabase Auth password">
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.5rem 1rem',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '0.5rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#374151',
                textDecoration: 'none',
              }}
            >
              Manage in Supabase →
            </a>
          </SettingRow>
          <SettingRow label="Session" description="You are currently logged in">
            <span style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: 600 }}>Active</span>
          </SettingRow>
        </div>

        {/* Database */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Database} title="Database" />
          <SettingRow label="Supabase Connection" description="Products and RFQs data source">
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.625rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
            }}>Connected</span>
          </SettingRow>
          <SettingRow label="Fallback Data" description="Mock data shown when Supabase tables are empty">
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.625rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: '#fff7ed',
              color: '#c2410c',
              border: '1px solid #fed7aa',
            }}>Active</span>
          </SettingRow>
        </div>

      </div>
    </div>
  );
}
