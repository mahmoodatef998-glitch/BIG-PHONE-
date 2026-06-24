import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  if (!id) return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  const supabase = createAdminClient();
  const { error } = await supabase.from('brands').delete().eq('id', id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
