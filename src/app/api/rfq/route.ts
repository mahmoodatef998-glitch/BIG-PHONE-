import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendAdminRFQNotification, sendBuyerRFQConfirmation } from '@/lib/email';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const USE_SUPABASE = !!(SUPABASE_URL && SUPABASE_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company_name, contact_person, country, phone, email, product_interest, quantity, message } = body;

    if (!company_name || !contact_person || !country || !phone || !email || !product_interest) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const rfqData = { company_name, contact_person, country, phone, email, product_interest, quantity: quantity ? Number(quantity) : null, message: message ?? null };

    if (USE_SUPABASE) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      const { error } = await supabase.from('rfqs').insert([{ ...rfqData, status: 'new' }]);

      if (error) {
        console.error('[RFQ Supabase Error]', error.message);
        return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
      }
    } else {
      console.log('[RFQ - no Supabase]', rfqData);
    }

    // Fire emails in parallel — non-blocking (errors are swallowed inside each function)
    void Promise.all([
      sendAdminRFQNotification(rfqData),
      sendBuyerRFQConfirmation(rfqData),
    ]);

    return NextResponse.json({ success: true, message: 'Quotation request submitted successfully' });
  } catch (err) {
    console.error('[RFQ Error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}