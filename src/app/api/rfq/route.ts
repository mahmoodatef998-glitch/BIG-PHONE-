import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

    if (USE_SUPABASE) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      const { error } = await supabase.from('rfqs').insert([{
        company_name,
        contact_person,
        country,
        phone,
        email,
        product_interest,
        quantity: Number(quantity),
        message: message ?? null,
        status: 'new',
      }]);

      if (error) {
        console.error('[RFQ Supabase Error]', error.message);
        return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
      }
    } else {
      console.log('[RFQ - no Supabase]', { company_name, contact_person, country, phone, email, product_interest, quantity, message });
    }

    return NextResponse.json({ success: true, message: 'Quotation request submitted successfully' });
  } catch (err) {
    console.error('[RFQ Error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
