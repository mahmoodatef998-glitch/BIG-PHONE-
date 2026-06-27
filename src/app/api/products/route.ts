import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';
import { parseProductFilters } from '@/lib/product-filters';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const filters = parseProductFilters(request.nextUrl.searchParams);
    const products = await getProducts(filters);
    return NextResponse.json(
      { products, count: products.length },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (err) {
    console.error('[GET /api/products]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
