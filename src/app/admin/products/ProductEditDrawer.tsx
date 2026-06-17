'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ImageIcon, Info, Package, Cpu, ToggleLeft, Loader2, CheckCircle2, AlertCircle, Copy } from 'lucide-react';
import type { Product, Brand, Condition, Category } from '@/types';
import { createClient } from '@/lib/supabase/client';
import ImageDropZone from './ImageDropZone';
import { useRouter } from 'next/navigation';

async function uploadToStorage(file: File): Promise<string | null> {
  const supabase = createClient();
  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) { console.error('[upload]', error.message); return null; }
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}

type FormState = {
  name: string; model: string; color: string; brand_id: string;
  category: Category; condition: Condition; storage: string;
  battery_health: string; stock_quantity: string; moq: string;
  country_of_origin: string; warranty: string; description: string;
  is_featured: boolean; is_active: boolean; images: string[];
};

function field(product: Product): FormState {
  return {
    name: product.name, model: product.model,
    color: product.color ?? '', brand_id: product.brand_id,
    category: product.category, condition: product.condition,
    storage: product.storage ?? '', battery_health: product.battery_health?.toString() ?? '',
    stock_quantity: product.stock_quantity.toString(), moq: product.moq.toString(),
    country_of_origin: product.country_of_origin, warranty: product.warranty ?? '',
    description: product.description ?? '', is_featured: product.is_featured,
    is_active: product.is_active, images: [...product.images],
  };
}

interface Props {
  product: Product | null;
  brands: Brand[];
  onClose: () => void;
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748B', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.05em' };
const inp: React.CSSProperties = { width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #E2E8F0', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#0F172A', background: '#fff', outline: 'none', boxSizing: 'border-box' };
const row2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' };

function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1rem' }}>
      <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon size={14} style={{ color: '#64748B' }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</span>
      </div>
      <div style={{ padding: '1.25rem' }}>{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #F1F5F9' }}>
      <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: '44px', height: '24px', borderRadius: '9999px',
          background: checked ? '#2563EB' : '#CBD5E1',
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background 0.2s', padding: 0, flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
          width: '20px', height: '20px', background: '#fff', borderRadius: '50%',
          transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          display: 'block',
        }} />
      </button>
    </div>
  );
}

export default function ProductEditDrawer({ product, brands, onClose }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState | null>(null);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [syncVariants, setSyncVariants] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) { setForm(field(product)); setNewFiles([]); setStatus('idle'); setSyncVariants(false); setUploadProgress(''); }
  }, [product]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!product || !form) return null;

  const set = (key: keyof FormState, val: FormState[keyof FormState]) =>
    setForm(prev => prev ? { ...prev, [key]: val } : prev);

  const handleSave = async () => {
    if (!form) return;
    setStatus('saving');
    setErrorMsg('');

    let finalImages = [...form.images];

    if (newFiles.length > 0) {
      setUploadProgress(`Uploading ${newFiles.length} image${newFiles.length > 1 ? 's' : ''}…`);
      const uploads = await Promise.all(newFiles.map(uploadToStorage));
      const uploaded = uploads.filter(Boolean) as string[];
      finalImages = [...finalImages, ...uploaded];
      if (uploaded.length < newFiles.length) {
        const failed = newFiles.length - uploaded.length;
        setErrorMsg(`${failed} image${failed > 1 ? 's' : ''} failed to upload. Others were saved.`);
      }
      setUploadProgress('');
    }

    const supabase = createClient();

    const { error } = await supabase.from('products').update({
      name: form.name, model: form.model, color: form.color || null,
      brand_id: form.brand_id, category: form.category, condition: form.condition,
      storage: form.storage || null,
      battery_health: form.battery_health ? parseInt(form.battery_health) : null,
      stock_quantity: parseInt(form.stock_quantity) || 0,
      moq: parseInt(form.moq) || 1,
      country_of_origin: form.country_of_origin,
      warranty: form.warranty || null,
      description: form.description || null,
      is_featured: form.is_featured, is_active: form.is_active,
      images: finalImages,
      updated_at: new Date().toISOString(),
    }).eq('id', product.id);

    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
      return;
    }

    if (syncVariants && finalImages.length > 0) {
      await supabase
        .from('products')
        .update({ images: finalImages, updated_at: new Date().toISOString() })
        .eq('model', product.model)
        .neq('id', product.id);
    }

    setStatus('success');
    router.refresh();
    setTimeout(() => { onClose(); setStatus('idle'); }, 1200);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)',
          zIndex: 40, backdropFilter: 'blur(2px)',
        }}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Edit ${product.model}`}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '520px', maxWidth: '100vw',
          background: '#F8FAFC', zIndex: 50,
          display: 'flex', flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(15,23,42,0.16)',
        }}
      >
        <div style={{
          padding: '1rem 1.5rem', background: '#0F172A',
          display: 'flex', alignItems: 'center', gap: '0.875rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0,
        }}>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              width: '32px', height: '32px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              borderRadius: '0.375rem', cursor: 'pointer', color: '#fff',
            }}
          >
            <X size={16} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {product.model}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '1px' }}>
              {product.brand?.name} · {product.condition}
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={status === 'saving'}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', height: '36px',
              background: status === 'success' ? '#16a34a' : '#2563EB',
              color: '#fff', border: 'none', borderRadius: '0.5rem',
              fontSize: '0.875rem', fontWeight: 700, cursor: status === 'saving' ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s', flexShrink: 0,
              opacity: status === 'saving' ? 0.8 : 1,
            }}
          >
            {status === 'saving' && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
            {status === 'success' && <CheckCircle2 size={14} />}
            {status === 'saving' ? (uploadProgress || 'Saving…') : status === 'success' ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {status === 'error' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            background: '#fef2f2', borderBottom: '1px solid #fecaca',
            padding: '0.75rem 1.5rem', flexShrink: 0,
          }}>
            <AlertCircle size={14} style={{ color: '#dc2626', flexShrink: 0 }} />
            <span style={{ fontSize: '0.8125rem', color: '#991b1b' }}>{errorMsg || 'Failed to save. Check your Supabase connection.'}</span>
          </div>
        )}

        {status === 'success' && errorMsg && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            background: '#fff7ed', borderBottom: '1px solid #fed7aa',
            padding: '0.625rem 1.5rem', flexShrink: 0,
          }}>
            <AlertCircle size={13} style={{ color: '#c2410c', flexShrink: 0 }} />
            <span style={{ fontSize: '0.75rem', color: '#9a3412' }}>{errorMsg}</span>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>

          <SectionCard icon={ImageIcon} title="Product Images">
            <ImageDropZone
              existingImages={form.images}
              onExistingChange={imgs => set('images', imgs)}
              onNewFiles={setNewFiles}
              uploading={status === 'saving'}
            />

            <div style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              background: syncVariants ? '#eff6ff' : '#F8FAFC',
              border: `1px solid ${syncVariants ? '#bfdbfe' : '#E2E8F0'}`,
              borderRadius: '0.5rem',
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
              transition: 'all 0.15s',
              cursor: 'pointer',
            }}
              onClick={() => setSyncVariants(v => !v)}
            >
              <div style={{
                width: '18px', height: '18px', flexShrink: 0, marginTop: '1px',
                borderRadius: '4px',
                border: `2px solid ${syncVariants ? '#2563EB' : '#CBD5E1'}`,
                background: syncVariants ? '#2563EB' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}>
                {syncVariants && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: syncVariants ? '#1d4ed8' : '#374151' }}>
                  Apply images to all &ldquo;{product.model}&rdquo; variants
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                  Same images will be copied to every product with this model name (different storage, color, condition).
                </div>
              </div>
              <Copy size={14} style={{ color: syncVariants ? '#2563EB' : '#94a3b8', flexShrink: 0, marginTop: '2px' }} />
            </div>
          </SectionCard>

          <SectionCard icon={Info} title="Basic Info">
            <div style={{ marginBottom: '0.875rem' }}>
              <label htmlFor="edit-name" style={labelStyle}>Product Name</label>
              <input id="edit-name" style={inp} value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div style={{ ...row2, marginBottom: '0.875rem' }}>
              <div>
                <label htmlFor="edit-model" style={labelStyle}>Model</label>
                <input id="edit-model" style={inp} value={form.model} onChange={e => set('model', e.target.value)} />
              </div>
              <div>
                <label htmlFor="edit-color" style={labelStyle}>Color</label>
                <input id="edit-color" style={inp} value={form.color} onChange={e => set('color', e.target.value)} placeholder="e.g. Black" />
              </div>
            </div>
            <div style={row2}>
              <div>
                <label htmlFor="edit-brand" style={labelStyle}>Brand</label>
                <select id="edit-brand" style={inp} value={form.brand_id} onChange={e => set('brand_id', e.target.value)}>
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="edit-category" style={labelStyle}>Category</label>
                <select id="edit-category" style={inp} value={form.category} onChange={e => set('category', e.target.value as Category)}>
                  <option value="smartphone">Smartphone</option>
                  <option value="tablet">Tablet</option>
                  <option value="accessory">Accessory</option>
                  <option value="airpods">AirPods</option>
                  <option value="smartwatch">Smartwatch</option>
                </select>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={Package} title="Inventory">
            <div style={{ ...row2, marginBottom: '0.875rem' }}>
              <div>
                <label htmlFor="edit-stock" style={labelStyle}>Stock Qty</label>
                <input id="edit-stock" type="number" min="0" style={inp} value={form.stock_quantity} onChange={e => set('stock_quantity', e.target.value)} />
              </div>
              <div>
                <label htmlFor="edit-moq" style={labelStyle}>MOQ</label>
                <input id="edit-moq" type="number" min="1" style={inp} value={form.moq} onChange={e => set('moq', e.target.value)} />
              </div>
            </div>
            <div style={row2}>
              <div>
                <label htmlFor="edit-country" style={labelStyle}>Country of Origin</label>
                <input id="edit-country" style={inp} value={form.country_of_origin} onChange={e => set('country_of_origin', e.target.value)} />
              </div>
              <div>
                <label htmlFor="edit-warranty" style={labelStyle}>Warranty</label>
                <input id="edit-warranty" style={inp} value={form.warranty} onChange={e => set('warranty', e.target.value)} placeholder="e.g. 12 Months" />
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={Cpu} title="Condition & Specs">
            <div style={{ ...row2, marginBottom: '0.875rem' }}>
              <div>
                <label htmlFor="edit-condition" style={labelStyle}>Condition</label>
                <select id="edit-condition" style={inp} value={form.condition} onChange={e => set('condition', e.target.value as Condition)}>
                  <option value="brand-new">Brand New</option>
                  <option value="refurbished-grade-a">Refurbished Grade A</option>
                  <option value="refurbished-grade-b">Refurbished Grade B</option>
                  <option value="certified-refurbished">Certified Refurbished</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-storage" style={labelStyle}>Storage</label>
                <input id="edit-storage" style={inp} value={form.storage} onChange={e => set('storage', e.target.value)} placeholder="e.g. 256GB" />
              </div>
            </div>
            <div style={{ marginBottom: '0.875rem' }}>
              <label htmlFor="edit-battery" style={labelStyle}>Battery Health %</label>
              <input id="edit-battery" type="number" min="0" max="100" style={{ ...inp, maxWidth: '50%' }} value={form.battery_health} onChange={e => set('battery_health', e.target.value)} placeholder="Leave blank if new" />
            </div>
            <div>
              <label htmlFor="edit-desc" style={labelStyle}>Description</label>
              <textarea
                id="edit-desc"
                rows={3}
                style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }}
                value={form.description}
                onChange={e => set('description', e.target.value)}
              />
            </div>
          </SectionCard>

          <SectionCard icon={ToggleLeft} title="Status">
            <Toggle checked={form.is_featured} onChange={v => set('is_featured', v)} label="Featured product" />
            <Toggle checked={form.is_active} onChange={v => set('is_active', v)} label="Active (visible on site)" />
          </SectionCard>

        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, select:focus, textarea:focus { border-color: #2563EB !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
      `}</style>
    </>
  );
}
