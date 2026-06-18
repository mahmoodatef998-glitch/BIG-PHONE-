import { Resend } from 'resend';

const FROM = `BIG PHONE <${process.env.RESEND_FROM_EMAIL ?? 'noreply@bigphone.ae'}>`;
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? 'info@bigphone.ae';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bigphone.ae';
const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '971500000000';

export interface RFQEmailData {
  company_name: string;
  contact_person: string;
  country: string;
  phone: string;
  email: string;
  product_interest: string;
  quantity?: number | null;
  message?: string | null;
}

function tableRow(label: string, value: string | number | null | undefined) {
  if (!value) return '';
  return `<tr style="border-top:1px solid #F1F5F9">
    <td style="padding:8px 0;font-size:13px;color:#6B7280;width:38%;vertical-align:top">${label}</td>
    <td style="padding:8px 0;font-size:14px;font-weight:600;color:#0F172A">${value}</td>
  </tr>`;
}

function adminHtml(d: RFQEmailData): string {
  const waLink = `https://wa.me/${d.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${d.contact_person}, this is BIG PHONE regarding your wholesale inquiry for ${d.product_interest}.`)}`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">
  <div style="background:#0B1829;padding:22px 28px">
    <div style="font-size:18px;font-weight:800;color:#fff;letter-spacing:-.02em">BIG PHONE</div>
    <div style="font-size:12px;color:rgba(255,255,255,.45);margin-top:2px">Wholesale Platform · Dubai, UAE</div>
  </div>
  <div style="background:#DBEAFE;border-left:4px solid #2563EB;padding:13px 28px">
    <span style="font-size:13px;font-weight:700;color:#1D4ED8">New Wholesale Inquiry Received</span>
  </div>
  <div style="padding:24px 28px">
    <p style="margin:0 0 16px;font-size:14px;color:#374151;line-height:1.6">A new RFQ was submitted. Respond within <strong>2 hours</strong> to maintain your SLA.</p>
    <table style="width:100%;border-collapse:collapse">
      ${tableRow('Company', d.company_name)}
      ${tableRow('Contact', d.contact_person)}
      ${tableRow('Country', d.country)}
      ${tableRow('Phone', d.phone)}
      ${tableRow('Email', d.email)}
      ${tableRow('Product', d.product_interest)}
      ${tableRow('Quantity', d.quantity ? `${d.quantity.toLocaleString()} units` : null)}
      ${d.message ? tableRow('Message', d.message) : ''}
    </table>
    <div style="margin-top:22px;display:flex;gap:8px;flex-wrap:wrap">
      <a href="${SITE_URL}/admin/rfqs" style="display:inline-block;background:#0066FF;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px">View Dashboard →</a>
      <a href="mailto:${d.email}?subject=Re: Wholesale Inquiry — ${encodeURIComponent(d.product_interest)}" style="display:inline-block;background:#F1F5F9;color:#374151;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px">Reply by Email</a>
      <a href="${waLink}" style="display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px">WhatsApp</a>
    </div>
  </div>
  <div style="padding:14px 28px;background:#F8FAFC;border-top:1px solid #E2E8F0">
    <p style="margin:0;font-size:11px;color:#9CA3AF">BIG PHONE · ${ADMIN_EMAIL}</p>
  </div>
</div>
</body></html>`;
}

function buyerHtml(d: RFQEmailData): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">
  <div style="background:linear-gradient(135deg,#0B1829,#0D2040);padding:28px">
    <div style="font-size:20px;font-weight:800;color:#fff;letter-spacing:-.02em">BIG PHONE</div>
    <div style="font-size:12px;color:rgba(255,255,255,.45);margin-top:2px">B2B Wholesale Supplier · Dubai, UAE</div>
  </div>
  <div style="padding:28px">
    <div style="display:inline-block;background:#DCFCE7;color:#166534;font-size:12px;font-weight:700;padding:4px 12px;border-radius:9999px;margin-bottom:18px">✓ Inquiry Received</div>
    <h2 style="margin:0 0 10px;font-size:20px;font-weight:800;color:#0F172A">Thank you, ${d.contact_person}!</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#64748B;line-height:1.65">Your wholesale inquiry has been received. Our team will review and respond within <strong style="color:#0F172A">2 business hours</strong>.</p>
    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:18px;margin-bottom:22px">
      <div style="font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px">Your Inquiry Summary</div>
      <table style="width:100%;border-collapse:collapse">
        ${tableRow('Company', d.company_name)}
        ${tableRow('Product', d.product_interest)}
        ${tableRow('Quantity', d.quantity ? `${d.quantity.toLocaleString()} units` : 'To be discussed')}
        ${tableRow('Country', d.country)}
      </table>
    </div>
    <p style="margin:0 0 16px;font-size:13px;color:#64748B">Have questions? Reach us directly on WhatsApp or browse our catalog:</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <a href="${SITE_URL}/inventory" style="display:inline-block;background:#0066FF;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px">Browse Inventory</a>
      <a href="https://wa.me/${WA}?text=${encodeURIComponent(`Hi, I just submitted an RFQ for ${d.product_interest}.`)}" style="display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px">WhatsApp Us</a>
    </div>
  </div>
  <div style="padding:14px 28px;background:#F8FAFC;border-top:1px solid #E2E8F0">
    <p style="margin:0;font-size:11px;color:#9CA3AF">BIG PHONE · ${ADMIN_EMAIL} · This is an automated confirmation — please do not reply.</p>
  </div>
</div>
</body></html>`;
}

export async function sendAdminRFQNotification(data: RFQEmailData): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `New RFQ: ${data.company_name} — ${data.product_interest}`,
      html: adminHtml(data),
    });
  } catch (err) {
    console.error('[Email] Admin notification failed:', err);
  }
}

export async function sendBuyerRFQConfirmation(data: RFQEmailData): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: 'Your wholesale inquiry has been received — BIG PHONE',
      html: buyerHtml(data),
    });
  } catch (err) {
    console.error('[Email] Buyer confirmation failed:', err);
  }
}
