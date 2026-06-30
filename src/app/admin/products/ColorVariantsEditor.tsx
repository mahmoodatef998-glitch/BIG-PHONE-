'use client';

import { Plus, Trash2 } from 'lucide-react';
import ImageDropZone from './ImageDropZone';
import { colorSwatchHex } from '@/lib/iphone-catalog';

export type VariantRow = {
  /** Existing product id when editing a saved colour row; undefined for new rows. */
  id?: string;
  color: string;
  stock_quantity: string;
  price_aed: string;
  sale_price_aed: string;
  existingImages: string[];
  newFiles: File[];
};

export function emptyVariant(color = ''): VariantRow {
  return { color, stock_quantity: '', price_aed: '', sale_price_aed: '', existingImages: [], newFiles: [] };
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#64748B',
  marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.04em',
};
const inp: React.CSSProperties = {
  width: '100%', padding: '0.5rem 0.75rem',
  border: '1px solid #E2E8F0', borderRadius: '0.5rem',
  fontSize: '0.8125rem', color: '#111827', background: '#fff',
  outline: 'none', boxSizing: 'border-box',
};

interface Props {
  variants: VariantRow[];
  onChange: (next: VariantRow[]) => void;
  availableColors: string[];
  uploading: boolean;
}

export default function ColorVariantsEditor({ variants, onChange, availableColors, uploading }: Props) {
  const update = (idx: number, patch: Partial<VariantRow>) => {
    onChange(variants.map((v, i) => (i === idx ? { ...v, ...patch } : v)));
  };

  const addRow = () => {
    const used = new Set(variants.map(v => v.color));
    const nextColor = availableColors.find(c => !used.has(c)) ?? '';
    onChange([...variants, emptyVariant(nextColor)]);
  };

  const removeRow = (idx: number) => {
    onChange(variants.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: '0 0 1rem', lineHeight: 1.6 }}>
        Add one row per colour. Each colour becomes its own SKU with its own
        stock quantity, price, and images — customers pick the colour and see
        that colour&rsquo;s availability and photos.
      </p>

      {variants.map((v, idx) => (
        <div key={idx} style={{
          border: '1px solid #E2E8F0', borderRadius: '0.625rem',
          padding: '1rem', marginBottom: '0.875rem', background: '#FBFCFE',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '16px', height: '16px', borderRadius: '50%',
                background: v.color ? colorSwatchHex(v.color) : '#E2E8F0',
                border: '1px solid #CBD5E1', flexShrink: 0,
              }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111827' }}>
                {v.color || `Colour ${idx + 1}`}
              </span>
            </div>
            <button type="button" aria-label="Remove colour" onClick={() => removeRow(idx)} style={{
              width: '30px', height: '30px', border: '1px solid #FECACA',
              background: '#FEF2F2', color: '#DC2626', borderRadius: '0.5rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Trash2 size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '0.875rem' }}>
            <div>
              <label style={labelStyle}>Colour</label>
              {availableColors.length > 0 ? (
                <select style={inp} value={v.color} onChange={e => update(idx, { color: e.target.value })}>
                  <option value="">Select…</option>
                  {availableColors.map(c => <option key={c} value={c}>{c}</option>)}
                  {v.color && !availableColors.includes(v.color) && (
                    <option value={v.color}>{v.color}</option>
                  )}
                </select>
              ) : (
                <input style={inp} value={v.color} onChange={e => update(idx, { color: e.target.value })} placeholder="e.g. Black" />
              )}
            </div>
            <div>
              <label style={labelStyle}>Stock Qty</label>
              <input type="number" min="0" style={inp} value={v.stock_quantity}
                onChange={e => update(idx, { stock_quantity: e.target.value })} placeholder="0" />
            </div>
            <div>
              <label style={labelStyle}>Original Price (AED)</label>
              <input type="number" min="0" step="1" style={inp} value={v.price_aed}
                onChange={e => update(idx, { price_aed: e.target.value })} placeholder="2500" />
            </div>
            <div>
              <label style={labelStyle}>Sale Price (AED)</label>
              <input type="number" min="0" step="1" style={inp} value={v.sale_price_aed}
                onChange={e => update(idx, { sale_price_aed: e.target.value })} placeholder="Optional discount" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Images for this colour</label>
            <ImageDropZone
              existingImages={v.existingImages}
              onExistingChange={imgs => update(idx, { existingImages: imgs })}
              onNewFiles={files => update(idx, { newFiles: files })}
              uploading={uploading}
            />
          </div>
        </div>
      ))}

      <button type="button" onClick={addRow} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        width: '100%', padding: '0.625rem', marginTop: '0.25rem',
        border: '1.5px dashed #FFB366', background: '#FFF7F0', color: '#C2410C',
        borderRadius: '0.5rem', fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer',
      }}>
        <Plus size={15} /> Add colour
      </button>
    </div>
  );
}
