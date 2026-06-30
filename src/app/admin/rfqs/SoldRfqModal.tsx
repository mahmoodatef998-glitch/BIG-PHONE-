'use client';

import { useMemo, useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import type { Product, RFQ, RFQSoldLine } from '@/types';
import { formatPriceAed } from '@/lib/pricing';

interface Props {
  rfq: RFQ;
  products: Product[];
  onClose: () => void;
  onConfirm: (data: { sold_lines: RFQSoldLine[]; sold_total_aed: number }) => Promise<void>;
}

interface LineDraft {
  slug: string;
  name: string;
  quantity_sold: string;
  maxQty: number;
  stockQty: number;
}

export default function SoldRfqModal({ rfq, products, onClose, onConfirm }: Props) {
  const productBySlug = useMemo(
    () => new Map(products.map(p => [p.slug, p])),
    [products],
  );

  const initialLines = useMemo((): LineDraft[] => {
    if (rfq.items?.length) {
      return rfq.items.map(item => {
        const product = productBySlug.get(item.slug);
        return {
          slug: item.slug,
          name: item.name,
          quantity_sold: String(item.quantity),
          maxQty: item.quantity,
          stockQty: product?.stock_quantity ?? 0,
        };
      });
    }

    const matched = products.find(p =>
      rfq.product_interest &&
      (p.name.toLowerCase().includes(rfq.product_interest.toLowerCase()) ||
        p.model.toLowerCase().includes(rfq.product_interest.toLowerCase())),
    );

    return [{
      slug: matched?.slug ?? '',
      name: matched?.name ?? rfq.product_interest ?? '',
      quantity_sold: String(rfq.quantity ?? 1),
      maxQty: rfq.quantity ?? 999999,
      stockQty: matched?.stock_quantity ?? 0,
    }];
  }, [rfq, products, productBySlug]);

  const [lines, setLines] = useState<LineDraft[]>(initialLines);
  const [totalPrice, setTotalPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isMultiItem = Boolean(rfq.items?.length);
  const isSingleWithoutSlug = !isMultiItem && !lines[0]?.slug;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const soldLines: RFQSoldLine[] = [];
    for (const line of lines) {
      if (!line.slug) {
        setError('Please select a product');
        return;
      }
      const qty = parseInt(line.quantity_sold, 10);
      if (!Number.isInteger(qty) || qty <= 0) {
        setError(`Enter a valid quantity for ${line.name || 'product'}`);
        return;
      }
      if (qty > line.stockQty) {
        setError(`Only ${line.stockQty} units in stock for ${line.name}`);
        return;
      }
      soldLines.push({ slug: line.slug, name: line.name, quantity_sold: qty });
    }

    const total = parseFloat(totalPrice.replace(/,/g, ''));
    if (!Number.isFinite(total) || total <= 0) {
      setError('Enter a valid total sale price (AED)');
      return;
    }

    setSubmitting(true);
    try {
      await onConfirm({ sold_lines: soldLines, sold_total_aed: total });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to record sale');
      setSubmitting(false);
    }
  }

  function updateLine(index: number, patch: Partial<LineDraft>) {
    setLines(prev => prev.map((line, i) => (i === index ? { ...line, ...patch } : line)));
  }

  function handleProductSelect(index: number, slug: string) {
    const product = productBySlug.get(slug);
    if (!product) return;
    updateLine(index, {
      slug: product.slug,
      name: product.name,
      stockQty: product.stock_quantity,
      maxQty: rfq.quantity ?? product.stock_quantity,
    });
  }

  const totalUnits = lines.reduce((sum, l) => sum + (parseInt(l.quantity_sold, 10) || 0), 0);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)',
          zIndex: 50, backdropFilter: 'blur(2px)',
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Record sale"
        style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 51, width: 'min(520px, calc(100vw - 2rem))',
          background: '#fff', borderRadius: '0.875rem',
          boxShadow: '0 20px 60px rgba(15,23,42,0.2)',
          maxHeight: 'calc(100vh - 2rem)', overflow: 'auto',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.125rem 1.25rem', borderBottom: '1px solid #F1F5F9',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '0.5rem',
              background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShoppingBag size={18} style={{ color: '#16a34a' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Record Sale</h2>
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '0.125rem 0 0' }}>{rfq.company_name}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.25rem', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.25rem' }}>
          <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: '0 0 1rem' }}>
            Enter the quantity sold and total price. Stock will be deducted automatically.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1rem' }}>
            {lines.map((line, index) => (
              <div key={`${line.slug}-${index}`} style={{
                padding: '0.875rem', background: '#F8FAFC', borderRadius: '0.5rem',
                border: '1px solid #E2E8F0',
              }}>
                {isSingleWithoutSlug ? (
                  <div style={{ marginBottom: '0.625rem' }}>
                    <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                      Product
                    </label>
                    <select
                      value={line.slug}
                      onChange={e => handleProductSelect(index, e.target.value)}
                      required
                      style={{
                        width: '100%', padding: '0.5rem 0.625rem', border: '1px solid #E2E8F0',
                        borderRadius: '0.375rem', fontSize: '0.8125rem', background: '#fff',
                      }}
                    >
                      <option value="">Select product…</option>
                      {products.map(p => (
                        <option key={p.id} value={p.slug}>
                          {p.name} ({p.stock_quantity} in stock)
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div style={{ marginBottom: '0.625rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>{line.name}</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '0.5rem' }}>
                      {line.stockQty} in stock
                    </span>
                  </div>
                )}

                <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                  Quantity Sold
                </label>
                <input
                  type="number"
                  min={1}
                  max={Math.min(line.maxQty || line.stockQty, line.stockQty)}
                  value={line.quantity_sold}
                  onChange={e => updateLine(index, { quantity_sold: e.target.value })}
                  required
                  style={{
                    width: '100%', boxSizing: 'border-box', padding: '0.5rem 0.625rem',
                    border: '1px solid #E2E8F0', borderRadius: '0.375rem', fontSize: '0.875rem',
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
              Total Sale Price (AED)
            </label>
            <input
              type="number"
              min={0.01}
              step={0.01}
              value={totalPrice}
              onChange={e => setTotalPrice(e.target.value)}
              placeholder="e.g. 45000"
              required
              style={{
                width: '100%', boxSizing: 'border-box', padding: '0.625rem 0.75rem',
                border: '1px solid #E2E8F0', borderRadius: '0.375rem', fontSize: '0.9375rem', fontWeight: 600,
              }}
            />
            {totalUnits > 0 && totalPrice && parseFloat(totalPrice) > 0 && (
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.375rem' }}>
                {totalUnits} units · avg AED {formatPriceAed(parseFloat(totalPrice) / totalUnits)} / unit
              </p>
            )}
          </div>

          {error && (
            <div style={{
              padding: '0.625rem 0.875rem', background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: '0.375rem', fontSize: '0.8125rem', color: '#991B1B', marginBottom: '1rem',
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.625rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} disabled={submitting}
              style={{
                padding: '0.625rem 1rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0',
                background: '#fff', color: '#374151', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
              }}>
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              style={{
                padding: '0.625rem 1.25rem', borderRadius: '0.5rem', border: 'none',
                background: submitting ? '#86EFAC' : '#16a34a', color: '#fff',
                fontSize: '0.875rem', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer',
              }}>
              {submitting ? 'Saving…' : 'Confirm Sale'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
