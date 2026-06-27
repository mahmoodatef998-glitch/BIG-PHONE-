'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus, Edit2, Trash2, X, Loader2, CheckCircle2, AlertCircle,
  Tag, Package, ImageIcon, ExternalLink,
} from 'lucide-react';
import type { Brand } from '@/types';
import { useAdminToast } from '@/components/admin/AdminToast';

interface Props {
  brands: Brand[];
  productCountByBrand: Record<string, number>;
  stockByBrand: Record<string, number>;
}

type Form = {
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  banner_url: string;
  sort_order: string;
  is_active: boolean;
};

const BRAND_COLORS: Record<string, { from: string; to: string }> = {
  apple:   { from: '#1C1C1E', to: '#3A3A3C' },
  samsung: { from: '#1428A0', to: '#2F4FE0' },
  xiaomi:  { from: '#FF6900', to: '#FF8C00' },
  huawei:  { from: '#CF0A2C', to: '#E83048' },
  oppo:    { from: '#1D3461', to: '#3B5998' },
  vivo:    { from: '#415FFF', to: '#6B7FFF' },
};

function makeSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function makeEmpty(): Form {
  return {
    name: '', slug: '', description: '', logo_url: '', banner_url: '',
    sort_order: '0', is_active: true,
  };
}

function fromBrand(brand: Brand): Form {
  return {
    name: brand.name,
    slug: brand.slug,
    description: brand.description ?? '',
    logo_url: brand.logo_url ?? '',
    banner_url: brand.banner_url ?? '',
    sort_order: String(brand.sort_order),
    is_active: brand.is_active,
  };
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

export default function BrandsClient({ brands, productCountByBrand, stockByBrand }: Props) {
  const router = useRouter();
  const { success, error: toastError } = useAdminToast();
  const [editing, setEditing] = useState<Brand | '__new__' | null>(null);
  const [form, setForm] = useState<Form>(makeEmpty());
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const isNew = editing === '__new__';

  const openNew = () => {
    setForm(makeEmpty());
    setSlugEdited(false);
    setStatus('idle');
    setErrorMsg('');
    setEditing('__new__');
  };

  const openEdit = (brand: Brand) => {
    setForm(fromBrand(brand));
    setSlugEdited(true);
    setStatus('idle');
    setErrorMsg('');
    setEditing(brand);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setEditing(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const set = (key: keyof Form, value: string | boolean) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'name' && !slugEdited) next.slug = makeSlug(value as string);
      return next;
    });
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setStatus('error'); setErrorMsg('Brand name is required'); return; }
    if (!form.slug.trim()) { setStatus('error'); setErrorMsg('Slug is required'); return; }

    setStatus('saving');
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      logo_url: form.logo_url.trim() || null,
      banner_url: form.banner_url.trim() || null,
      sort_order: parseInt(form.sort_order, 10) || 0,
      is_active: form.is_active,
    };

    const res = await fetch('/api/admin/brands/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: isNew ? 'insert' : 'update',
        id: !isNew ? (editing as Brand).id : undefined,
        payload,
      }),
    });
    const json = await res.json();
    if (!json.ok) {
      setStatus('error');
      setErrorMsg(json.error ?? 'Failed to save brand');
      toastError(json.error ?? 'Failed to save brand');
      return;
    }

    setStatus('success');
    success(isNew ? 'Brand created' : 'Brand updated');
    router.refresh();
    window.setTimeout(() => setEditing(null), 700);
  };

  const handleDelete = async (brand: Brand) => {
    const count = productCountByBrand[brand.slug] ?? 0;
    const msg = count > 0
      ? `Delete "${brand.name}"? It has ${count} linked product(s). This may fail if products still reference it.`
      : `Delete "${brand.name}"?`;
    if (!confirm(msg)) return;

    setDeletingId(brand.id);
    const res = await fetch('/api/admin/brands/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: brand.id }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) {
      toastError(json.error ?? 'Delete failed — remove or reassign products first');
      setDeletingId(null);
      return;
    }

    success(`"${brand.name}" deleted`);
    router.refresh();
    setDeletingId(null);
  };

  return (
    <>
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Brands</h1>
            <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {brands.length} brands · manage catalog brands and storefront pages
            </p>
          </div>
          <button type="button" onClick={openNew} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.625rem 1.125rem', background: '#FF6B00', color: '#fff',
            border: 'none', borderRadius: '0.5rem', fontWeight: 700,
            fontSize: '0.875rem', cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(255,107,0,0.3)',
          }}>
            <Plus size={15} /> Add Brand
          </button>
        </div>

        {brands.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem' }}>
            <Tag size={40} style={{ color: '#E2E8F0', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', margin: '0 0 0.375rem' }}>No brands yet</h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Create your first brand to organize products.</p>
            <button type="button" onClick={openNew} style={{
              padding: '0.625rem 1.25rem', background: '#FF6B00', color: '#fff',
              border: 'none', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
            }}>
              Create First Brand
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {brands.map(brand => {
              const cfg = BRAND_COLORS[brand.slug] ?? { from: '#0B1829', to: '#1A2332' };
              const productCount = productCountByBrand[brand.slug] ?? 0;
              const totalStock = stockByBrand[brand.slug] ?? 0;

              return (
                <div key={brand.id} style={{
                  background: '#fff', border: '1px solid #E2E8F0',
                  borderRadius: '0.75rem', overflow: 'hidden',
                  opacity: brand.is_active ? 1 : 0.65,
                }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${cfg.from} 0%, ${cfg.to} 100%)`,
                    padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem',
                    position: 'relative',
                  }}>
                    {!brand.is_active && (
                      <span style={{
                        position: 'absolute', top: '8px', right: '8px',
                        background: 'rgba(0,0,0,0.35)', color: '#fff',
                        fontSize: '0.625rem', fontWeight: 700, padding: '2px 6px',
                        borderRadius: '9999px', textTransform: 'uppercase',
                      }}>
                        Hidden
                      </span>
                    )}
                    <div style={{
                      width: '48px', height: '48px', background: 'rgba(255,255,255,0.15)',
                      borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {brand.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={brand.logo_url} alt={brand.name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                      ) : (
                        <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.25rem' }}>{brand.name[0]}</span>
                      )}
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.0625rem' }}>{brand.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginTop: '0.125rem' }}>/{brand.slug}</div>
                    </div>
                  </div>

                  <div style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Package size={14} style={{ color: '#64748B' }} />
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}><strong>{productCount}</strong> products</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Tag size={14} style={{ color: '#64748B' }} />
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}><strong>{totalStock}</strong> units</span>
                    </div>
                  </div>

                  {brand.description && (
                    <div style={{ padding: '0 1.25rem 1rem', borderTop: '1px solid #F1F5F9' }}>
                      <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: '0.75rem 0 0', lineHeight: 1.5 }}>
                        {brand.description}
                      </p>
                    </div>
                  )}

                  <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #F1F5F9', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <button type="button" onClick={() => openEdit(brand)} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.5rem 0.75rem', background: '#FFF0E0', color: '#C2410C',
                      border: '1px solid #FFD0A0', borderRadius: '0.375rem',
                      fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                    }}>
                      <Edit2 size={13} /> Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(brand)} disabled={deletingId === brand.id} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.5rem 0.75rem', background: '#FEF2F2', color: '#DC2626',
                      border: '1px solid #FECACA', borderRadius: '0.375rem',
                      fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                      opacity: deletingId === brand.id ? 0.5 : 1,
                    }}>
                      <Trash2 size={13} /> Delete
                    </button>
                    <Link href={`/brands/${brand.slug}`} target="_blank" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      padding: '0.5rem 0.75rem', background: '#F8FAFC', color: '#374151',
                      border: '1px solid #E2E8F0', borderRadius: '0.375rem',
                      fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none', marginLeft: 'auto',
                    }}>
                      <ExternalLink size={13} /> View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
              <button type="button" onClick={() => setEditing(null)} style={{
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', color: '#fff',
              }}>
                <X size={16} />
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff' }}>
                  {isNew ? 'New Brand' : `Edit "${(editing as Brand).name}"`}
                </div>
              </div>
              <button type="button" onClick={handleSave} disabled={status === 'saving'} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', background: status === 'success' ? '#16a34a' : 'rgba(255,255,255,0.25)',
                color: '#fff', border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer',
              }}>
                {status === 'saving' && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                {status === 'success' && <CheckCircle2 size={14} />}
                {status === 'saving' ? 'Saving…' : status === 'success' ? 'Saved!' : isNew ? 'Create' : 'Save'}
              </button>
            </div>

            {status === 'error' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', background: '#fef2f2', borderBottom: '1px solid #fecaca', padding: '0.75rem 1.5rem' }}>
                <AlertCircle size={14} style={{ color: '#dc2626', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8125rem', color: '#991b1b' }}>{errorMsg}</span>
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
              <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Brand Name *</label>
                  <input style={inp} value={form.name} placeholder="e.g. Apple" onChange={e => set('name', e.target.value)} autoFocus />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Slug *</label>
                  <input style={inp} value={form.slug} placeholder="apple" onChange={e => { set('slug', e.target.value); setSlugEdited(true); }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea style={{ ...inp, resize: 'vertical', minHeight: '80px' }} value={form.description} onChange={e => set('description', e.target.value)} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Logo URL</label>
                  <div style={{ position: 'relative' }}>
                    <ImageIcon size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input style={{ ...inp, paddingLeft: '2.25rem' }} value={form.logo_url} placeholder="https://…" onChange={e => set('logo_url', e.target.value)} />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Banner URL</label>
                  <input style={inp} value={form.banner_url} placeholder="https://…" onChange={e => set('banner_url', e.target.value)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                  <div>
                    <label style={labelStyle}>Sort Order</label>
                    <input type="number" min="0" style={inp} value={form.sort_order} onChange={e => set('sort_order', e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Visibility</label>
                    <div style={{ paddingTop: '0.5rem' }}>
                      <button type="button" role="switch" aria-checked={form.is_active} onClick={() => set('is_active', !form.is_active)} style={{
                        display: 'flex', alignItems: 'center', gap: '0.625rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                      }}>
                        <div style={{
                          width: '44px', height: '24px', borderRadius: '9999px',
                          background: form.is_active ? '#FF6B00' : '#CBD5E1', position: 'relative',
                        }}>
                          <span style={{
                            position: 'absolute', top: '2px', left: form.is_active ? '22px' : '2px',
                            width: '20px', height: '20px', background: '#fff', borderRadius: '50%',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)', display: 'block',
                          }} />
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: form.is_active ? '#FF6B00' : '#64748B' }}>
                          {form.is_active ? 'Active' : 'Hidden'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, textarea:focus { border-color: #FF6B00 !important; box-shadow: 0 0 0 3px rgba(255,107,0,0.12); }
      `}</style>
    </>
  );
}
