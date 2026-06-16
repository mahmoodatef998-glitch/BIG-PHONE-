import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { company_name, contact_person, country, phone, email, product_interest, quantity, message } = body;

    if (!company_name || !contact_person || !country || !phone || !email || !product_interest) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In production: save to Supabase + send email via Resend
    console.log('[RFQ]', { company_name, contact_person, country, phone, email, product_interest, quantity, message });

    /* Uncomment when Supabase + Resend are configured:

    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    await supabase.from('rfqs').insert([{ company_name, contact_person, country, phone, email, product_interest, quantity, message, status: 'new' }]);

    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'BIG PHONE <noreply@bigphone.ae>',
      to: [process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? 'info@bigphone.ae'],
      subject: `New RFQ from ${company_name}`,
      html: `<h2>New Wholesale Quotation Request</h2>
        <p><strong>Company:</strong> ${company_name}</p>
        <p><strong>Contact:</strong> ${contact_person}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${product_interest}</p>
        <p><strong>Quantity:</strong> ${quantity} units</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>`,
    });
    */

    return NextResponse.json({ success: true, message: 'Quotation request submitted successfully' });
  } catch (err) {
    console.error('[RFQ Error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
