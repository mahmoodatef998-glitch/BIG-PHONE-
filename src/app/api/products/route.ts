import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const sp       = request.nextUrl.searchParams;
    const brand     = sp.get('brand')     ?? undefined;
    const condition = sp.get('condition') ?? undefined;
    const category  = sp.get('category')  ?? undefined;
    const search    = sp.get('search')    ?? undefined;
    const featured  = sp.get('featured') === 'true' ? true : undefined;
    const limitRaw  = sp.get('limit');
    const limit     = limitRaw ? Math.min(Math.max(1, Number(limitRaw)), 100) : undefined;

    const products = await getProducts({ brand, condition, category, search, featured, limit });
    return NextResponse.json(
      { products, count: products.length },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    );
  } catch (err) {
    console.error('[GET /api/products]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
