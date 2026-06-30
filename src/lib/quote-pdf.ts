import type { QuoteCartItem } from '@/types';
import { formatPriceAed } from '@/lib/pricing';

interface QuoteMeta {
  whatsapp?: string;
  email?: string;
  siteUrl?: string;
  estimatedTotal?: number | null;
  totalUnits?: number;
}

function esc(s: string): string {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

/**
 * Build a print-ready proforma quotation from the quote cart and open it in a
 * new window that triggers the browser print dialog (Save as PDF). No external
 * dependencies; renders Arabic/English natively.
 */
export function openQuotePdf(items: QuoteCartItem[], meta: QuoteMeta = {}): void {
  if (typeof window === 'undefined' || items.length === 0) return;

  const now = new Date();
  const fmtDate = (d: Date) =>
    d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const ref = 'BP-Q-' + now.getTime().toString(36).toUpperCase();
  const validUntil = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const rows = items.map((it, i) => {
    const sub = [it.brand_name, it.storage, it.color].filter(Boolean).join(' · ');
    const hasPrice = it.unit_price_aed != null;
    const unit = hasPrice ? `AED ${formatPriceAed(it.unit_price_aed)}` : 'On request';
    const line = hasPrice ? `AED ${formatPriceAed((it.unit_price_aed as number) * it.quantity)}` : '—';
    return `<tr>
      <td class="c">${i + 1}</td>
      <td><div class="pname">${esc(it.name)}</div>${sub ? `<div class="psub">${esc(sub)}</div>` : ''}</td>
      <td class="num">${it.quantity.toLocaleString('en-AE')}</td>
      <td class="num">${unit}</td>
      <td class="num">${line}</td>
    </tr>`;
  }).join('');

  const totalUnits = meta.totalUnits ?? items.reduce((s, i) => s + i.quantity, 0);
  const totalRow = meta.estimatedTotal != null
    ? `<tr class="total"><td colspan="4">Estimated Total (${totalUnits.toLocaleString('en-AE')} units)</td><td class="num">AED ${formatPriceAed(meta.estimatedTotal)}</td></tr>`
    : '';

  const contactBits = [
    meta.whatsapp ? `WhatsApp: +${esc(meta.whatsapp)}` : '',
    meta.email ? `Email: ${esc(meta.email)}` : '',
    meta.siteUrl ? esc(meta.siteUrl.replace(/^https?:\/\//, '')) : '',
  ].filter(Boolean).join('&nbsp;&nbsp;•&nbsp;&nbsp;');

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Proforma Quotation ${ref}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #1a2332; margin: 0; padding: 32px; }
  .doc { max-width: 760px; margin: 0 auto; }
  .head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #FF6B00; padding-bottom: 16px; }
  .brand { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
  .brand small { display: block; font-size: 9px; font-weight: 700; color: #FF6B00; letter-spacing: 0.14em; text-transform: uppercase; }
  .title { text-align: right; }
  .title h1 { font-size: 18px; margin: 0 0 4px; color: #FF6B00; letter-spacing: 0.02em; }
  .meta { font-size: 12px; color: #64748b; line-height: 1.6; }
  table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 13px; }
  th { background: #0B1829; color: #fff; text-align: left; padding: 9px 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
  th.num, td.num { text-align: right; }
  th.c, td.c { text-align: center; width: 32px; }
  td { padding: 9px 10px; border-bottom: 1px solid #e6eaf0; vertical-align: top; }
  .pname { font-weight: 700; }
  .psub { font-size: 11px; color: #64748b; margin-top: 2px; }
  tr.total td { background: #FFF2E6; font-weight: 800; font-size: 14px; border-top: 2px solid #FF6B00; }
  .notes { margin-top: 22px; font-size: 11px; color: #64748b; line-height: 1.7; background: #F8FAFC; border: 1px solid #e6eaf0; border-radius: 8px; padding: 12px 14px; }
  .foot { margin-top: 22px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e6eaf0; padding-top: 14px; }
  @media print { body { padding: 0; } @page { margin: 14mm; } }
</style></head>
<body onload="window.focus();window.print();">
  <div class="doc">
    <div class="head">
      <div class="brand">BIG PHONE<small>B2B Wholesale Marketplace</small></div>
      <div class="title">
        <h1>PROFORMA QUOTATION</h1>
        <div class="meta">
          Ref: <strong>${ref}</strong><br>
          Date: ${fmtDate(now)}<br>
          Valid until: ${fmtDate(validUntil)}
        </div>
      </div>
    </div>

    <table>
      <thead>
        <tr><th class="c">#</th><th>Product</th><th class="num">Qty</th><th class="num">Unit Price</th><th class="num">Line Total</th></tr>
      </thead>
      <tbody>
        ${rows}
        ${totalRow}
      </tbody>
    </table>

    <div class="notes">
      <strong>Terms:</strong> Prices are indicative and subject to final confirmation and stock availability.
      Minimum order quantities (MOQ) apply per item. Prices exclude shipping, duties, and taxes unless stated.
      This proforma is for quotation purposes only and is not a tax invoice.
    </div>

    <div class="foot">
      BIG PHONE — Dubai, UAE${contactBits ? `<br>${contactBits}` : ''}<br>
      Thank you for your business.
    </div>
  </div>
</body></html>`;

  const w = window.open('', '_blank');
  if (!w) {
    alert('Please allow pop-ups to download the PDF quote.');
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
}
