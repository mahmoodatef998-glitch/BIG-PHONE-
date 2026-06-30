import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface SoldLineInput {
  slug: string;
  name: string;
  quantity_sold: number;
  line_total_aed?: number | null;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, status, sold_total_aed, sold_lines } = body;

  if (!id || !status) {
    return NextResponse.json({ ok: false, error: 'Missing params' }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: rfq, error: fetchError } = await supabase
    .from('rfqs')
    .select('id, status')
    .eq('id', id)
    .single();

  if (fetchError || !rfq) {
    return NextResponse.json({ ok: false, error: 'RFQ not found' }, { status: 404 });
  }

  if (status !== 'sold') {
    const { error } = await supabase.from('rfqs').update({ status }).eq('id', id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (rfq.status === 'sold') {
    return NextResponse.json({ ok: false, error: 'RFQ is already marked as sold' }, { status: 400 });
  }

  if (!Array.isArray(sold_lines) || sold_lines.length === 0) {
    return NextResponse.json({ ok: false, error: 'Sold lines are required' }, { status: 400 });
  }

  const totalAed = Number(sold_total_aed);
  if (!Number.isFinite(totalAed) || totalAed <= 0) {
    return NextResponse.json({ ok: false, error: 'Valid total sale price is required' }, { status: 400 });
  }

  const lines: SoldLineInput[] = [];
  for (const line of sold_lines) {
    const qty = Number(line.quantity_sold);
    if (!line.slug || !line.name || !Number.isInteger(qty) || qty <= 0) {
      return NextResponse.json({ ok: false, error: 'Invalid sold line data' }, { status: 400 });
    }
    lines.push({
      slug: String(line.slug),
      name: String(line.name),
      quantity_sold: qty,
      line_total_aed: line.line_total_aed != null ? Number(line.line_total_aed) : null,
    });
  }

  const slugs = [...new Set(lines.map(l => l.slug))];
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, slug, stock_quantity, name')
    .in('slug', slugs);

  if (productsError) {
    return NextResponse.json({ ok: false, error: productsError.message }, { status: 400 });
  }

  const productMap = new Map((products ?? []).map(p => [p.slug, p]));

  for (const line of lines) {
    const product = productMap.get(line.slug);
    if (!product) {
      return NextResponse.json({ ok: false, error: `Product not found: ${line.name}` }, { status: 400 });
    }
    if (product.stock_quantity < line.quantity_sold) {
      return NextResponse.json({
        ok: false,
        error: `Insufficient stock for ${line.name}: ${product.stock_quantity} available, ${line.quantity_sold} requested`,
      }, { status: 400 });
    }
  }

  const deductions = new Map<string, number>();
  for (const line of lines) {
    deductions.set(line.slug, (deductions.get(line.slug) ?? 0) + line.quantity_sold);
  }

  for (const [slug, qty] of deductions) {
    const product = productMap.get(slug)!;
    const { error: stockError } = await supabase
      .from('products')
      .update({
        stock_quantity: product.stock_quantity - qty,
        updated_at: new Date().toISOString(),
      })
      .eq('id', product.id);

    if (stockError) {
      return NextResponse.json({ ok: false, error: stockError.message }, { status: 400 });
    }
  }

  const { error: updateError } = await supabase
    .from('rfqs')
    .update({
      status: 'sold',
      sold_at: new Date().toISOString(),
      sold_total_aed: totalAed,
      sold_lines: lines,
    })
    .eq('id', id);

  if (updateError) {
    return NextResponse.json({ ok: false, error: updateError.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
