'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, X, Loader2, CheckCircle2, AlertCircle, Layers, ImageIcon } from 'lucide-react';
import type { Collection } from '@/types';

interface Props {
  collections: Collection[];
  productCountByCollection: Record<string, number>;
}

type Form = {
  name: string; slug: string; description: string;
  image_url: string; sort_order: string; is_active: boolean;
};

function makeSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function makeEmpty(): Form {
  return { name: '', slug: '', description: '', image_url: '', sort_order: '0', is_active: true };
}

function fromCollection(c: Collection): Form {
  return {
    name: c.name, slug: c.slug, description: c.description ?? '',
    image_url: c.image_url ?? '', sort_order: String(c.sort_order), is_active: c.is_active,
  };
}

const SECTION_STYLES: Record<string, { bg: string; color: string; icon: string }> = {
  'new-arrivals':      { bg: '#D1FAE5', color: '#065F46', icon: '✦' },
  'best-sellers':      { bg: '#DBEAFE', color: '#1E40AF', icon: '★' },
  'accessories':       { bg: '#F3E8FF', color: '#6B21A8', icon: '◈' },
  'refurbished':       { bg: '#FEF9C3', color: '#92400E', icon: '↺' },
  'refurbished-deals': { bg: '#FEF9C3', color: '#92400E', icon: '↺' },
  'featured':          { bg: '#FFF0E0', color: '#C2410C', icon: '◆' },
  'clearance':         { bg: '#FEE2E2', color: '#991B1B', icon: '◉' },
  'tablets':           { bg: '#E0F2FE', color: '#0369A1', icon: '▦' },
  'airpods':           { bg: '#FCE7F3', color: '#9D174D', icon: '◎' },
};

function sStyle(slug: string) {
  return SECTION_STYLES[slug] ?? { bg: '#F1F5F9', color: '#475569', icon: '▣' };
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.75rem', fontWeight: 600,
  color: '#64748B', marginBottom: '0.375rem',
  textTransform: 'uppercase', letterSpacing: '0.05em',
};
const inp: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.875rem',
  border: '1px solid #E2E8F0', borderRadius: '0.5rem',
  fontSize: '0.875rem', color: '#111827', background: '#fff',
  outline: 'none', boxSizing: 'border-box',
};

export default function CollectionsClient({ collections, productCountByCollection }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState<Collection | '__new__' | null>(null);
  const [form, setForm] = useState<Form>(makeEmpty());
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const isNew = editing === '__new__';

  useEffect(() => {
    if (!editing) return;
    if (editing === '__new__') { setForm(makeEmpty()); setSlugEdited(false); }
    else { setForm(fromCollection(editing as Collection)); setSlugEdited(true); }
    setStatus('idle'); setErrorMsg('');
  }, [editing]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setEditing(null); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, []);

  const set = (k: keyof Form, v: string | boolean) => {
    setForm(prev => {
      const next = { ...prev, [k]: v };
      if (k === 'name' && !slugEdited) next.slug = makeSlug(v as string);
      return next;
    });
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setStatus('error'); setErrorMsg('Section name is required'); return; }
    if (!form.slug.trim()) { setStatus('error'); setErrorMsg('Slug is required'); return; }
    setStatus('saving');
    const payload = {
      name: form.name.trim(), slug: form.slug.trim(),
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      sort_order: parseInt(form.sort_order) || 0,
      is_active: form.is_active,
    };
    const res = await fetch('/api/admin/collections/save', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: isNew ? 'insert' : 'update',
        id: !isNew ? (editing as Collection).id : undefined,
        payload,
      }),
    });
    const json = await res.json();
    if (!json.ok) { setStatus('error'); setErrorMsg(json.error ?? 'Failed to save'); return; }
    setStatus('success');
    router.refresh();
    setTimeout(() => { setEditing(null); setStatus('idle'); }, 900);
  };

  const handleDelete = async (c: Collection) => {
    const count = productCountByCollection[c.id] ?? 0;
    const msg = count > 0
      ? `Delete "${c.name}"? This will unlink ${count} product(s) from this section.`
      : `Delete "${c.name}"?`;
    if (!confirm(msg)) return;
    setDeletingId(c.id);
    const res = await fetch('/api/admin/collections/delete', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: c.id }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert('Delete failed: ' + (j.error ?? 'Unknown error'));
    }
    router.refresh();
    setDeletingId(null);
  };

  return (
    <>
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>Sections</h1>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Organize your storefront — New Arrivals, Best Sellers, Accessories, etc.
            </p>
          </div>
          <button onClick={() => setEditing('__new__')} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.625rem 1.125rem', background: '#FF6B00', color: '#fff',
            border: 'none', borderRadius: '0.5rem', fontWeight: 700,
            fontSize: '0.875rem', cursor: 'pointer', flexShrink: 0,
            boxShadow: '0 2px 8px rgba(255,107,0,0.3)',
          }}>
            <Plus size={15} /> Add Section
          </button>
        </div>

        {collections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem' }}>
            <Layers size={40} style={{ color: '#E2E8F0', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', margin: '0 0 0.375rem' }}>No sections yet</h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Create sections like &ldquo;New Arrivals&rdquo; to organize your storefront.
            </p>
            <button onClick={() => setEditing('__new__')} style={{
              padding: '0.625rem 1.25rem', background: '#FF6B00', color: '#fff',
              border: 'none', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
            }}>Create First Section</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1rem' }}>
            {collections.map(c => {
              const s = sStyle(c.slug);
              const count = productCountByCollection[c.id] ?? 0;
              return (
                <div key={c.id} style={{
                  background: '#fff', border: '1px solid #E2E8F0',
                  borderRadius: '0.75rem', overflow: 'hidden',
                  opacity: c.is_active ? 1 : 0.6, position: 'relative',
                }}>
                  <div style={{
                    background: s.bg, height: '72px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', color: s.color,
                    borderBottom: '1px solid #E2E8F0', overflow: 'hidden',
                  }}>
                    {c.image_url
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={c.image_url} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span>{s.icon}</span>}
                  </div>
                  {!c.is_active && (
                    <div style={{
                      position: 'absolute', top: '8px', left: '8px',
                      background: '#64748B', color: '#fff', fontSize: '0.625rem',
                      fontWeight: 700, padding: '2px 6px', borderRadius: '9999px',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>Hidden</div>
                  )}
                  <div style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.375rem', gap: '0.5rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827' }}>{c.name}</div>
                      <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                        <button onClick={() => setEditing(c)} aria-label={`Edit ${c.name}`} style={{
                          width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: '#FFF0E0', color: '#FF6B00', border: '1px solid #FFD0A0',
                          borderRadius: '0.375rem', cursor: 'pointer',
                        }}><Edit2 size={12} /></button>
                        <button onClick={() => handleDelete(c)} aria-label={`Delete ${c.name}`}
                          disabled={deletingId === c.id} style={{
                          width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA',
                          borderRadius: '0.375rem', cursor: 'pointer', opacity: deletingId === c.id ? 0.5 : 1,
                        }}><Trash2 size={12} /></button>
                      </div>
                    </div>
                    {c.description && (
                      <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '0 0 0.5rem', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {c.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <span style={{ display: 'inline-block', padding: '0.2rem 0.625rem', background: '#F1F5F9', color: '#475569', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {count} product{count !== 1 ? 's' : ''}
                      </span>
                      <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>order {c.sort_order}</span>
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#94a3b8', marginTop: '0.25rem' }}>/{c.slug}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: '#FFF3E8', border: '1px solid #FFD0A0', borderRadius: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <Layers size={15} style={{ color: '#FF6B00', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.8125rem', color: '#9A3412', lineHeight: 1.6 }}>
            <strong style={{ color: '#C2410C' }}>How sections work:</strong> Assign products to a section when editing a product — look for the &ldquo;Section&rdquo; dropdown in the product editor. Sections appear on the storefront to help buyers navigate quickly.
          </div>
        </div>
      </div>

      {editing && (
        <>
          <div onClick={() => setEditing(null)} aria-hidden="true" style={{
            position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', zIndex: 40, backdropFilter: 'blur(2px)',
          }} />
          <div ref={drawerRef} role="dialog" aria-modal="true" style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px', maxWidth: '100vw',
            background: '#F8FAFC', zIndex: 50, display: 'flex', flexDirection: 'column',
            boxShadow: '-8px 0 32px rgba(15,23,42,0.16)',
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
              display: 'flex', alignItems: 'center', gap: '0.875rem', flexShrink: 0,
            }}>
              <button onClick={() => setEditing(null)} style={{
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', color: '#fff',
              }}><X size={16} /></button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff' }}>
                  {isNew ? 'New Section' : `Edit "${(editing as Collection).name}"`}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', marginTop: '1px' }}>
                  {isNew ? 'Add a product section' : 'Update section details'}
                </div>
              </div>
              <button onClick={handleSave} disabled={status === 'saving'} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', height: '36px',
                background: status === 'success' ? '#16a34a' : 'rgba(255,255,255,0.25)',
                color: '#fff', border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 700,
                cursor: status === 'saving' ? 'not-allowed' : 'pointer', flexShrink: 0,
              }}>
                {status === 'saving' && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                {status === 'success' && <CheckCircle2 size={14} />}
                {status === 'saving' ? 'Saving…' : status === 'success' ? 'Saved!' : isNew ? 'Create' : 'Save'}
              </button>
            </div>

            {status === 'error' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', background: '#fef2f2', borderBottom: '1px solid #fecaca', padding: '0.75rem 1.5rem', flexShrink: 0 }}>
                <AlertCircle size={14} style={{ color: '#dc2626', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8125rem', color: '#991b1b' }}>{errorMsg}</span>
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Section Name *</label>
                  <input style={inp} value={form.name} placeholder="e.g. New Arrivals"
                    onChange={e => set('name', e.target.value)} autoFocus />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Slug *</label>
                  <input style={inp} value={form.slug} placeholder="new-arrivals"
                    onChange={e => { set('slug', e.target.value); setSlugEdited(true); }} />
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Auto-generated from name · editable</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea style={{ ...inp, resize: 'vertical', minHeight: '80px', lineHeight: 1.6 }}
                    value={form.description} placeholder="Brief description…"
                    onChange={e => set('description', e.target.value)} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Cover Image URL</label>
                  <div style={{ position: 'relative' }}>
                    <ImageIcon size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                    <input style={{ ...inp, paddingLeft: '2.25rem' }} value={form.image_url} placeholder="https://…"
                      onChange={e => set('image_url', e.target.value)} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '0.5rem' }}>
                  <div>
                    <label style={labelStyle}>Sort Order</label>
                    <input type="number" min="0" style={inp} value={form.sort_order}
                      onChange={e => set('sort_order', e.target.value)} />
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>Lower = first</div>
                  </div>
                  <div>
                    <label style={labelStyle}>Visibility</label>
                    <div style={{ paddingTop: '0.5rem' }}>
                      <button type="button" role="switch" aria-checked={form.is_active}
                        onClick={() => set('is_active', !form.is_active)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                        <div style={{ width: '44px', height: '24px', borderRadius: '9999px', background: form.is_active ? '#FF6B00' : '#CBD5E1', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                          <span style={{ position: 'absolute', top: '2px', left: form.is_active ? '22px' : '2px', width: '20px', height: '20px', background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', display: 'block' }} />
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: form.is_active ? '#FF6B00' : '#64748B' }}>
                          {form.is_active ? 'Active' : 'Hidden'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {form.name && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#F8FAFC', borderRadius: '0.5rem', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Preview</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', background: sStyle(form.slug).bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: sStyle(form.slug).color, flexShrink: 0 }}>
                        {sStyle(form.slug).icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827' }}>{form.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>/{form.slug}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, select:focus, textarea:focus {
          border-color: #FF6B00 !important;
          box-shadow: 0 0 0 3px rgba(255,107,0,0.12);
        }
      `}</style>
    </>
  );
}
