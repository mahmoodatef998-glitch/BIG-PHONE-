import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const { action, ids, payload } = await req.json() as {
      action: string;
      ids: string[];
      payload?: Record<string, unknown>;
    };

    if (!ids?.length) {
      return NextResponse.json({ ok: false, error: 'No products selected' }, { status: 400 });
    }

    const supabase = createAdminClient();

    if (action === 'activate') {
      const { error } = await supabase.from('products').update({ is_active: true, updated_at: new Date().toISOString() }).in('id', ids);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    } else if (action === 'deactivate') {
      const { error } = await supabase.from('products').update({ is_active: false, updated_at: new Date().toISOString() }).in('id', ids);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    } else if (action === 'delete') {
      const { error } = await supabase.from('products').delete().in('id', ids);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    } else if (action === 'set-collection') {
      const { error } = await supabase
        .from('products')
        .update({ collection_id: payload?.collection_id ?? null, updated_at: new Date().toISOString() })
        .in('id', ids);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    } else if (action === 'set-featured') {
      const { error } = await supabase
        .from('products')
        .update({ is_featured: payload?.is_featured ?? false, updated_at: new Date().toISOString() })
        .in('id', ids);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    } else {
      return NextResponse.json({ ok: false, error: `Unknown action: ${action}` }, { status: 400 });
    }

    return NextResponse.json({ ok: true, count: ids.length });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
