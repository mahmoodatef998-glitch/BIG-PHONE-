import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  const { action, id, payload } = await request.json();
  const supabase = createAdminClient();
  if (action === 'insert') {
    const { error } = await supabase.from('brands').insert(payload);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  } else {
    const { error } = await supabase.from('brands').update(payload).eq('id', id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
