import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { PRODUCT_IMAGES } from '@/lib/product-images';

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    const force = request.nextUrl.searchParams.get('force') === '1';

    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, slug, images');

    if (fetchError) {
      return NextResponse.json({ ok: false, error: fetchError.message }, { status: 500 });
    }

    const results: { slug: string; status: string; error?: string }[] = [];

    for (const product of products ?? []) {
      const images = PRODUCT_IMAGES[product.slug];
      if (!images) {
        results.push({ slug: product.slug, status: 'no mapping found' });
        continue;
      }

      const isEmpty = !product.images || product.images.length === 0;
      if (!isEmpty && !force) {
        results.push({ slug: product.slug, status: 'skipped (already has images)' });
        continue;
      }

      const { error: updateError } = await supabase
        .from('products')
        .update({ images, updated_at: new Date().toISOString() })
        .eq('id', product.id);

      results.push({
        slug: product.slug,
        status: updateError ? 'error' : force && !isEmpty ? 'overwritten' : 'updated',
        error: updateError?.message,
      });
    }

    const updated     = results.filter(r => r.status === 'updated').length;
    const overwritten = results.filter(r => r.status === 'overwritten').length;
    const skipped     = results.filter(r => r.status.startsWith('skipped')).length;
    const noMap       = results.filter(r => r.status === 'no mapping found').length;
    const errors      = results.filter(r => r.status === 'error').length;

    return NextResponse.json({
      ok: true,
      force,
      summary: { updated, overwritten, skipped, noMap, errors },
      results,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
