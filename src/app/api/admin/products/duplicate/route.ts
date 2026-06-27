import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Product } from '@/types';

export async function POST(request: NextRequest) {
  const product: Product = await request.json();
  const supabase = createAdminClient();

  const insertData: Record<string, unknown> = {
    brand_id: product.brand_id,
    name: product.name + ' (Copy)',
    slug: product.slug + '-copy-' + Date.now().toString(36),
    model: product.model,
    category: product.category,
    subcategory: product.subcategory ?? null,
    condition: product.condition,
    storage: product.storage ?? null,
    color: product.color ?? null,
    battery_health: product.battery_health ?? null,
    stock_quantity: product.stock_quantity,
    moq: product.moq,
    country_of_origin: product.country_of_origin,
    warranty: product.warranty ?? null,
    description: product.description ?? null,
    specifications: product.specifications ?? null,
    images: product.images,
    is_featured: false,
    is_active: false,
  };

  if (product.price_aed != null) insertData.price_aed = product.price_aed;
  if (product.collection_id != null) insertData.collection_id = product.collection_id;

  const { error } = await supabase.from('products').insert(insertData);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
