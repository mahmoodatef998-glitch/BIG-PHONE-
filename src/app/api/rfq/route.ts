import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendAdminRFQNotification, sendBuyerRFQConfirmation } from '@/lib/email';
import { rfqSchema } from '@/lib/rfq-schema';
import { checkRateLimit } from '@/lib/rate-limit';
import { summarizeCartItems, enrichItemsWithPricing } from '@/lib/quote-cart';
import { upsertCustomerFromRFQ } from '@/lib/data';
import type { RFQItem } from '@/types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const USE_SUPABASE = !!(SUPABASE_URL && SUPABASE_KEY);

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limit = checkRateLimit(`rfq:${ip}`, 5, 60 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: limit.retryAfterSec
            ? { 'Retry-After': String(limit.retryAfterSec) }
            : undefined,
        },
      );
    }

    const body = await request.json();
    const parsed = rfqSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const {
      company_name,
      contact_person,
      country,
      phone,
      email,
      product_interest,
      quantity,
      message,
      items,
    } = parsed.data;

    const cartItems = (items ?? []) as RFQItem[];
    let enrichedItems = cartItems;

    if (cartItems.length > 0 && USE_SUPABASE) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      const slugs = [...new Set(cartItems.map(i => i.slug))];
      const { data: products } = await supabase
        .from('products')
        .select('slug, price_aed, sale_price_aed, show_price')
        .in('slug', slugs);

      enrichedItems = enrichItemsWithPricing(cartItems, products ?? []).items;
    }

    const summary = cartItems.length > 0
      ? summarizeCartItems(enrichedItems)
      : { product_interest: product_interest ?? '', quantity: quantity ?? null, estimated_total_aed: null };

    const rfqData = {
      company_name,
      contact_person,
      country,
      phone,
      email,
      product_interest: summary.product_interest,
      quantity: summary.quantity,
      items: enrichedItems.length > 0 ? enrichedItems : null,
      estimated_total_aed: summary.estimated_total_aed,
      message: message ?? null,
    };

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

    await upsertCustomerFromRFQ({
      email,
      company_name,
      contact_person,
      country,
      phone,
    });

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
