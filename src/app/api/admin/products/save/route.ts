import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type VariantInput = {
  id?: string;
  color: string;
  stock_quantity: number;
  price_aed: number | null;
  images: string[];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, id, payload } = body as {
      action: 'insert' | 'update' | 'sync-variants' | 'save-color-variants';
      id?: string;
      payload: Record<string, unknown>;
    };

    const supabase = createAdminClient();

    if (action === 'save-color-variants') {
      const base = payload?.base as Record<string, unknown> | undefined;
      const variants = payload?.variants as VariantInput[] | undefined;

      if (!base || !Array.isArray(variants) || variants.length === 0) {
        return NextResponse.json({ ok: false, error: 'Missing base or variants' }, { status: 400 });
      }

      const baseName = String(base.name ?? base.model ?? 'Product').trim();
      const model = String(base.model ?? '').trim();
      const condition = String(base.condition ?? '').trim();
      const storage = base.storage ? String(base.storage) : '';
      const now = new Date().toISOString();
      const results: { color: string; status: string; error?: string }[] = [];

      for (const v of variants) {
        const color = (v.color ?? '').trim();
        if (!color) {
          results.push({ color: '(empty)', status: 'skipped — no colour' });
          continue;
        }

        const row: Record<string, unknown> = {
          ...base,
          name: `${baseName} ${color}`.trim(),
          color,
          stock_quantity: Number.isFinite(v.stock_quantity) ? v.stock_quantity : 0,
          price_aed: v.price_aed ?? null,
          images: Array.isArray(v.images) ? v.images : [],
          updated_at: now,
        };
        delete (row as { base?: unknown }).base;
        delete (row as { variants?: unknown }).variants;

        if (v.id) {
          const { error } = await supabase.from('products').update(row).eq('id', v.id);
          results.push({ color, status: error ? 'error' : 'updated', error: error?.message });
        } else {
          row.slug = `${slugify([model, condition, storage, color].filter(Boolean).join(' '))}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
          const { error } = await supabase.from('products').insert(row);
          results.push({ color, status: error ? 'error' : 'created', error: error?.message });
        }
      }

      const failed = results.find(r => r.status === 'error');
      if (failed) {
        return NextResponse.json({ ok: false, error: `${failed.color}: ${failed.error}`, results }, { status: 400 });
      }
      return NextResponse.json({ ok: true, results });
    }

    if (action === 'sync-variants') {
      const images = payload?.images as string[] | undefined;
      const model = payload?.model as string | undefined;
      const excludeId = payload?.exclude_id as string | undefined;

      if (!images?.length || !model) {
        return NextResponse.json({ ok: false, error: 'Missing images or model for sync' }, { status: 400 });
      }

      let query = supabase
        .from('products')
        .update({ images, updated_at: new Date().toISOString() })
        .eq('model', model);

      if (excludeId) query = query.neq('id', excludeId);

      const { error } = await query;
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
      return NextResponse.json({ ok: true });
    }

    if (action === 'insert') {
      const { error } = await supabase.from('products').insert(payload);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    } else if (action === 'update') {
      if (!id) return NextResponse.json({ ok: false, error: 'Missing product id' }, { status: 400 });
      const { error } = await supabase
        .from('products')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ ok: false, error: 'Unknown action' }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
