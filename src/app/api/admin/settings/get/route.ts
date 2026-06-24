import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from('site_settings').select('key, value');
    const settings = Object.fromEntries(
      (data ?? []).map((r: { key: string; value: string | null }) => [r.key, r.value ?? ''])
    );
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({});
  }
}
