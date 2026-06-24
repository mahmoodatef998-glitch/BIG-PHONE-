import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, id, payload } = body as {
      action: 'insert' | 'update';
      id?: string;
      payload: Record<string, unknown>;
    };

    const supabase = createAdminClient();

    if (action === 'insert') {
      const { error } = await supabase.from('products').insert(payload);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    } else {
      if (!id) return NextResponse.json({ ok: false, error: 'Missing product id' }, { status: 400 });
      const { error } = await supabase
        .from('products')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
