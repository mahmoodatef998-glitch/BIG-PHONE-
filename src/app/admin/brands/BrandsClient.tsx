'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Package, Tag, X } from 'lucide-react';
import type { Brand } from '@/types';

interface Props {
  brands: Brand[];
  productCountByBrand: Record<string, number>;
  stockByBrand: Record<string, number>;
}

type BrandForm = {
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  banner_url: string;
  is_active: boolean;
  sort_order: number;
};

const BRAND_COLORS: Record<string, { from: string; to: string }> = {
  apple:   { from: '#1C1C1E', to: '#3A3A3C' },
  samsung: { from: '#1428A0', to: '#2F4FE0' },
  xiaomi:  { from: '#FF6900', to: '#FF8C00' },
  huawei:  { from: '#CF0A2C', to: '#E83048' },
  oppo:    { from: '#1D3461', to: '#3B5998' },
  vivo:    { from: '#415FFF', to: '#6B7FFF' },
  oem:     { from: '#475569', to: '#64748B' },
};

const fieldStyle: CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.875rem',
  border: '1px solid #E2E8F0',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  color: '#0F172A',
  outline: 'none',
  boxSizing: 'border-box',
  background: '#fff',
};

function makeSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function brandToForm(brand: Brand): BrandForm {
  return {
    name: brand.name,
    slug: brand.slug,
    description: brand.description ?? '',
    logo_url: brand.logo_url ?? '',
    banner_url: brand.banner_url ?? '',
    is_active: brand.is_active,
    sort_order: brand.sort_order,
  };
}

function emptyForm(): BrandForm {
  return { name: '', slug: '', description: '', logo_url: '', banner_url: '', is_active: true, sort_order: 99 };
}

export default function BrandsClient({ brands, productCountByBrand, stockByBrand }: Props) {
  const router = useRouter();
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<BrandForm>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const openAdd = () => {
    setIsNew(true);
    setEditingBrand({ id: '__new__', name: '', slug: '', logo_url: null, banner_url: null, description: null, product_count: 0, is_active: true, sort_order: 99, created_at: '' });
    setForm(emptyForm());
    setSaveError(null);
  };

  const openEdit = (brand: Brand) => {
    setIsNew(false);
    setEditingBrand(brand);
    setForm(brandToForm(brand));
    setSaveError(null);
  };

  const closeDrawer = () => {
    setEditingBrand(null);
    setSaveError(null);
  };

  const handleNameChange = (name: string) => {
    setForm(f => ({ ...f, name, slug: isNew ? makeSlug(name) : f.slug }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setSaveError('Brand name is required'); return; }
    if (!form.slug.trim()) { setSaveError('Slug is required'); return; }
    setSaving(true);
    setSaveError(null);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      logo_url: form.logo_url.trim() || null,
      banner_url: form.banner_url.trim() || null,
      is_active: form.is_active,
      sort_order: Number(form.sort_order) || 99,
    };

    const res = await fetch('/api/admin/brands/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: isNew ? 'insert' : 'update', id: editingBrand?.id, payload }),
    });
    const json = await res.json();
    setSaving(false);

    if (!json.ok) { setSaveError(json.error ?? 'Save failed'); return; }
    closeDrawer();
    router.refresh();
  };

  const handleDelete = async (brand: Brand) => {
    const count = productCountByBrand[brand.slug] ?? 0;
    const msg = count > 0
      ? `Delete "${brand.name}"? This brand has ${count} product(s) linked to it. Deleting may break those products.`
      : `Delete brand "${brand.name}"? This cannot be undone.`;
    if (!confirm(msg)) return;
    setDeletingId(brand.id);
    const res = await fetch('/api/admin/brands/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: brand.id }),
    });
    const json = await res.json();
    if (!json.ok) alert('Delete failed: ' + json.error);
    setDeletingId(null);
    router.refresh();
  };

  const drawerOpen = editingBrand !== null;

  return (
    <>
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Brands</h1>
            <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.25rem' }}>{brands.length} brands in catalog</p>
          </div>
          <button
            onClick={openAdd}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.625rem 1.125rem',
              background: '#FF6B00', color: '#fff',
              border: 'none', borderRadius: '0.5rem',
              fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <Plus size={15} /> Add Brand
          </button>
        </div>

        {brands.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <Package size={32} style={{ color: '#CBD5E1', marginBottom: '0.75rem', display: 'block', margin: '0 auto 0.75rem' }} />
            <p style={{ fontSize: '0.875rem', margin: 0 }}>No brands yet. Add your first brand.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {brands.map(brand => {
              const cfg = BRAND_COLORS[brand.slug] ?? { from: '#334155', to: '#475569' };
              const productCount = productCountByBrand[brand.slug] ?? 0;
              const totalStock = stockByBrand[brand.slug] ?? 0;

              return (
                <div
                  key={brand.id}
                  style={{
                    background: '#fff', border: '1px solid #E2E8F0',
                    borderRadius: '0.75rem', overflow: 'hidden',
                    opacity: brand.is_active ? 1 : 0.7, position: 'relative',
                  }}
                >
                  {!brand.is_active && (
                    <div style={{
                      position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 1,
                      background: '#F1F5F9', color: '#64748B',
                      fontSize: '0.6875rem', fontWeight: 700,
                      padding: '0.125rem 0.5rem', borderRadius: '9999px',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>Inactive</div>
                  )}

                  <div style={{
                    background: `linear-gradient(135deg, ${cfg.from} 0%, ${cfg.to} 100%)`,
                    padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem',
                  }}>
                    <div style={{
                      width: '48px', height: '48px', background: 'rgba(255,255,255,0.15)',
                      borderRadius: '10px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0,
                    }}>
                      {brand.logo_url ? (
                        <img src={brand.logo_url} alt={brand.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.25rem' }}>{brand.name[0]}</span>
                      )}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.0625rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{brand.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginTop: '0.125rem' }}>/{brand.slug}</div>
                    </div>
                  </div>

                  <div style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1.5rem', borderBottom: '1px solid #F1F5F9' }}>
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
                    <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #F1F5F9' }}>
                      <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as CSSProperties}>
                        {brand.description}
                      </p>
                    </div>
                  )}

                  <div style={{ padding: '0.75rem 1.25rem', display: 'flex', gap: '0.5rem' }}>
                    <a
                      href={`/brands/${brand.slug}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        flex: 1, textAlign: 'center', padding: '0.5rem',
                        background: '#F8FAFC', border: '1px solid #E2E8F0',
                        borderRadius: '0.375rem', fontSize: '0.8125rem', fontWeight: 600,
                        color: '#374151', textDecoration: 'none',
                      }}
                    >
                      View
                    </a>
                    <button
                      onClick={() => openEdit(brand)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.25rem',
                        padding: '0.5rem 0.875rem',
                        background: '#FFF3E8', color: '#FF6B00',
                        border: '1px solid #FFE4CC', borderRadius: '0.375rem',
                        fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(brand)}
                      disabled={deletingId === brand.id}
                      aria-label={`Delete ${brand.name}`}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '34px', height: '34px',
                        background: '#fef2f2', color: '#dc2626',
                        border: '1px solid #fecaca', borderRadius: '0.375rem',
                        cursor: deletingId === brand.id ? 'not-allowed' : 'pointer',
                        opacity: deletingId === brand.id ? 0.5 : 1, flexShrink: 0,
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {drawerOpen && (
        <div
          onClick={closeDrawer}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }}
        />
      )}

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '420px',
        background: '#fff', boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        zIndex: 50,
        transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column', overflowY: 'hidden',
      }}>
        <div style={{
          borderBottom: '1px solid #E2E8F0', padding: '1rem 1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              {isNew ? 'Add Brand' : 'Edit Brand'}
            </h2>
            {!isNew && editingBrand && (
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.125rem 0 0' }}>/{editingBrand.slug}</p>
            )}
          </div>
          <button
            onClick={closeDrawer}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: '#64748B', display: 'flex' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', flex: 1 }}>
          {saveError && (
            <div style={{ padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#dc2626', fontSize: '0.8125rem' }}>
              {saveError}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>
              Brand Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="e.g. Apple" style={fieldStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>
              Slug <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
              placeholder="e.g. apple"
              style={fieldStyle}
            />
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0 0' }}>URL: /brands/{form.slug || '…'}</p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Short description of this brand…"
              rows={3}
              style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.5 }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Logo URL</label>
            <input value={form.logo_url} onChange={e => setForm(f => ({ ...f, logo_url: e.target.value }))} placeholder="https://…" style={fieldStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Banner URL</label>
            <input value={form.banner_url} onChange={e => setForm(f => ({ ...f, banner_url: e.target.value }))} placeholder="https://…" style={fieldStyle} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Sort Order</label>
              <input
                type="number" min="1"
                value={form.sort_order}
                onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) || 99 }))}
                style={fieldStyle}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Status</label>
              <div
                onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', paddingTop: '0.5rem' }}
              >
                <div style={{
                  width: '40px', height: '22px', borderRadius: '11px', position: 'relative',
                  background: form.is_active ? '#FF6B00' : '#CBD5E1',
                  transition: 'background 0.2s', flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute', top: '3px',
                    left: form.is_active ? '21px' : '3px',
                    width: '16px', height: '16px',
                    borderRadius: '50%', background: '#fff',
                    transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </div>
                <span style={{ fontSize: '0.875rem', color: form.is_active ? '#16a34a' : '#64748B', fontWeight: 500 }}>
                  {form.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #E2E8F0', padding: '1rem 1.25rem', display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
          <button
            onClick={closeDrawer}
            style={{
              flex: 1, padding: '0.625rem',
              background: '#F8FAFC', color: '#374151',
              border: '1px solid #E2E8F0', borderRadius: '0.5rem',
              fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              flex: 2, padding: '0.625rem',
              background: saving ? '#fed7aa' : '#FF6B00', color: '#fff',
              border: 'none', borderRadius: '0.5rem',
              fontWeight: 700, fontSize: '0.875rem',
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
          >
            {saving ? 'Saving…' : isNew ? 'Create Brand' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  );
}
