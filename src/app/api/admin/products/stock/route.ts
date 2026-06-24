import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  const { id, stock_quantity } = await request.json();
  if (!id || stock_quantity === undefined || stock_quantity === null) {
    return NextResponse.json({ ok: false, error: 'Missing params' }, { status: 400 });
  }
  const supabase = createAdminClient();
  const { error } = await supabase
    .from('products')
    .update({ stock_quantity, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
