'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cloudinaryUrl } from '@/lib/cloudinary';
import type { ColorVariant } from '@/lib/variants';

function isLight(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  // Perceived luminance
  return (0.299 * r + 0.587 * g + 0.114 * b) > 160;
}

export default function ProductColorGallery({
  productName,
  variants,
}: {
  productName: string;
  variants: ColorVariant[];
}) {
  const [idx, setIdx] = useState(0);
  const active = variants[idx];
  const imgSrc = cloudinaryUrl(active.image, { width: 800, quality: 85 });

  return (
    <div style={{ background: '#fff', border: '1.5px solid #DDE3EA', borderRadius: '14px', overflow: 'hidden' }}>
      {/* Image */}
      <div style={{ position: 'relative', paddingBottom: '80%' }}>
        <Image
          key={active.image}
          src={imgSrc}
          alt={`${productName} — ${active.name}`}
          fill
          style={{ objectFit: 'contain', padding: '2rem', background: '#fff' }}
        />
      </div>

      {/* Color selector */}
      <div style={{ borderTop: '1px solid #F1F5F9', padding: '1rem 1.125rem 1.125rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Color — {variants.length} options
          </span>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0B1829' }}>{active.name}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
          {variants.map((v, i) => {
            const selected = i === idx;
            const light = isLight(v.hex);
            return (
              <button
                key={v.name}
                onClick={() => setIdx(i)}
                aria-label={v.name}
                aria-pressed={selected}
                title={v.name}
                style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: v.hex, cursor: 'pointer', padding: 0, flexShrink: 0,
                  border: selected ? '2.5px solid #0066FF' : `1.5px solid ${light ? '#D5DBE2' : 'rgba(0,0,0,0.12)'}`,
                  boxShadow: selected ? '0 0 0 3px #fff inset' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 0.12s, border-color 0.12s',
                }}
              >
                {selected && <Check size={15} strokeWidth={3} color={light ? '#0B1829' : '#fff'} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Per-color spec overrides (only when defined) */}
      {active.specs && Object.keys(active.specs).length > 0 && (
        <div style={{ borderTop: '1px solid #F1F5F9', padding: '0.5rem 0' }}>
          {Object.entries(active.specs).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', padding: '0.5rem 1.125rem', fontSize: '0.8125rem' }}>
              <span style={{ flex: '0 0 40%', color: '#64748B', fontWeight: 500 }}>{key}</span>
              <span style={{ color: '#111827' }}>{val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
