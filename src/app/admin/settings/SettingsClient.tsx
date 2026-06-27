'use client';

import { useState } from 'react';
import { Settings, Globe, MessageCircle, Bell, Shield, Database, Loader2, Check, AlertCircle } from 'lucide-react';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

const DEFAULTS: Record<string, string> = {
  store_name: 'BIG PHONE',
  store_tagline: 'Wholesale Mobile Phones & Devices',
  contact_email: 'sales@bigphone.ae',
  whatsapp_number: '971500000000',
  whatsapp_message: "Hello, I'm interested in a wholesale quote.",
  currency: 'USD',
  moq_display: 'show-all',
  rfq_notifications: 'true',
  notification_email: 'admin@bigphone.ae',
};

interface Props { initialSettings: Record<string, string>; }

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
      <Icon size={16} style={{ color: '#64748B' }} />
      <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</h2>
    </div>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid #F1F5F9' }} className="admin-setting-row">
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>{label}</div>
        {description && <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.125rem' }}>{description}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '0.5rem 0.875rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem',
  fontSize: '0.875rem', color: '#374151', background: '#fff', outline: 'none', minWidth: '220px',
};

function SaveBtn({
  section, keys, color = '#FF6B00', states, onSave,
}: {
  section: string;
  keys: string[];
  color?: string;
  states: Record<string, SaveState>;
  onSave: (section: string, keys: string[]) => void;
}) {
  const st = states[section] ?? 'idle';
  return (
    <button onClick={() => onSave(section, keys)} disabled={st === 'saving'} style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
      padding: '0.5rem 1.25rem',
      background: st === 'saved' ? '#16a34a' : st === 'error' ? '#dc2626' : color,
      color: '#fff', border: 'none', borderRadius: '0.5rem',
      fontSize: '0.875rem', fontWeight: 600, cursor: st === 'saving' ? 'not-allowed' : 'pointer',
      transition: 'background 0.15s',
    }}>
      {st === 'saving' && <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />}
      {st === 'saved' && <Check size={13} />}
      {st === 'error' && <AlertCircle size={13} />}
      {st === 'saving' ? 'Saving…' : st === 'saved' ? 'Saved!' : st === 'error' ? 'Failed — Retry' : 'Save Changes'}
    </button>
  );
}

function Toggle({
  k, vals, onChange,
}: {
  k: string;
  vals: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  const on = vals[k] === 'true';
  return (
    <button type="button" role="switch" aria-checked={on}
      onClick={() => onChange(k, on ? 'false' : 'true')}
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
      <div style={{ width: '44px', height: '24px', borderRadius: '9999px', background: on ? '#FF6B00' : '#CBD5E1', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: '2px', left: on ? '22px' : '2px', width: '20px', height: '20px', background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', display: 'block' }} />
      </div>
      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{on ? 'Enabled' : 'Disabled'}</span>
    </button>
  );
}

export default function SettingsClient({ initialSettings }: Props) {
  const [vals, setVals] = useState<Record<string, string>>({ ...DEFAULTS, ...initialSettings });
  const [states, setStates] = useState<Record<string, SaveState>>({});

  const set = (key: string, value: string) => setVals(prev => ({ ...prev, [key]: value }));

  const save = async (section: string, keys: string[]) => {
    setStates(prev => ({ ...prev, [section]: 'saving' }));
    const body: Record<string, string> = {};
    keys.forEach(k => { body[k] = vals[k] ?? ''; });
    try {
      const res = await fetch('/api/admin/settings/save', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setStates(prev => ({ ...prev, [section]: json.ok ? 'saved' : 'error' }));
      if (json.ok) setTimeout(() => setStates(prev => ({ ...prev, [section]: 'idle' })), 2500);
    } catch {
      setStates(prev => ({ ...prev, [section]: 'error' }));
    }
  };

  return (
    <div className="admin-page-content">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>Settings</h1>
        <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Changes are saved to the database per section.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Settings} title="General" />
          <SettingRow label="Store Name" description="Displayed across the site">
            <input style={inputStyle} value={vals.store_name ?? ''} onChange={e => set('store_name', e.target.value)} />
          </SettingRow>
          <SettingRow label="Store Tagline" description="Short description for SEO">
            <input style={inputStyle} value={vals.store_tagline ?? ''} onChange={e => set('store_tagline', e.target.value)} />
          </SettingRow>
          <SettingRow label="Contact Email" description="Customer inquiries are sent here">
            <input type="email" style={inputStyle} value={vals.contact_email ?? ''} onChange={e => set('contact_email', e.target.value)} />
          </SettingRow>
          <div style={{ padding: '0.875rem 1.25rem' }}>
            <SaveBtn section="general" keys={['store_name', 'store_tagline', 'contact_email']} states={states} onSave={save} />
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={MessageCircle} title="WhatsApp" />
          <SettingRow label="WhatsApp Number" description="Used for all WhatsApp CTAs (no + or spaces)">
            <input style={inputStyle} value={vals.whatsapp_number ?? ''} onChange={e => set('whatsapp_number', e.target.value)} placeholder="971500000000" />
          </SettingRow>
          <SettingRow label="Default Message" description="Pre-filled message when customer taps chat">
            <input style={{ ...inputStyle, minWidth: '300px' }} value={vals.whatsapp_message ?? ''} onChange={e => set('whatsapp_message', e.target.value)} />
          </SettingRow>
          <div style={{ padding: '0.875rem 1.25rem' }}>
            <SaveBtn section="whatsapp" keys={['whatsapp_number', 'whatsapp_message']} color="#16a34a" states={states} onSave={save} />
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Globe} title="Localization" />
          <SettingRow label="Default Currency" description="Displayed on product pricing">
            <select style={{ ...inputStyle, minWidth: '140px' }} value={vals.currency ?? 'USD'} onChange={e => set('currency', e.target.value)}>
              <option value="USD">USD ($)</option>
              <option value="AED">AED (د.إ)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </SettingRow>
          <SettingRow label="MOQ Display" description="Minimum order quantity label">
            <select style={{ ...inputStyle, minWidth: '180px' }} value={vals.moq_display ?? 'show-all'} onChange={e => set('moq_display', e.target.value)}>
              <option value="show-all">Show on all products</option>
              <option value="cards-only">Show on cards only</option>
              <option value="hide">Hide</option>
            </select>
          </SettingRow>
          <div style={{ padding: '0.875rem 1.25rem' }}>
            <SaveBtn section="localization" keys={['currency', 'moq_display']} states={states} onSave={save} />
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Bell} title="Notifications" />
          <SettingRow label="New RFQ email" description="Get emailed when someone submits a quote request">
            <Toggle k="rfq_notifications" vals={vals} onChange={set} />
          </SettingRow>
          <SettingRow label="Notification email" description="Where RFQ alerts are sent">
            <input type="email" style={inputStyle} value={vals.notification_email ?? ''} onChange={e => set('notification_email', e.target.value)} />
          </SettingRow>
          <div style={{ padding: '0.875rem 1.25rem' }}>
            <SaveBtn section="notifications" keys={['rfq_notifications', 'notification_email']} states={states} onSave={save} />
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Shield} title="Security" />
          <SettingRow label="Admin Password" description="Change your Supabase Auth password">
            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer"
              style={{ padding: '0.5rem 1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', textDecoration: 'none' }}>
              Manage in Supabase →
            </a>
          </SettingRow>
          <SettingRow label="Session" description="You are currently logged in">
            <span style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: 600 }}>Active</span>
          </SettingRow>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <SectionHeader icon={Database} title="Database" />
          <SettingRow label="Supabase Connection" description="Products, brands, RFQs and sections data source">
            <span style={{ display: 'inline-block', padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>Connected</span>
          </SettingRow>
        </div>

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } input:focus, select:focus { border-color: #FF6B00 !important; box-shadow: 0 0 0 3px rgba(255,107,0,0.12); }`}</style>
    </div>
  );
}
