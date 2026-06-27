import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminLogin    = pathname === '/admin/login';
  const isAdminRoute    = pathname.startsWith('/admin');
  const isAdminApiRoute = pathname.startsWith('/api/admin');

  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const adminEmail   = process.env.ADMIN_EMAIL; // optional whitelist

  // If Supabase not configured, block everything admin-related
  if (!supabaseUrl || !supabaseKey) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (isAdminRoute && !isAdminLogin) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    const { data: { user } } = await supabase.auth.getUser();

    // If ADMIN_EMAIL is set, only that email is authorised
    const isAuthorized = !!user && (!adminEmail || user.email === adminEmail);

    // API routes → 401 JSON (not a redirect)
    if (isAdminApiRoute && !isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Admin pages → redirect to login
    if (isAdminRoute && !isAdminLogin && !isAuthorized) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      if (user && adminEmail) url.searchParams.set('error', 'unauthorized');
      return NextResponse.redirect(url);
    }

    // Already authenticated → skip login page
    if (isAdminLogin && isAuthorized) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  } catch {
    // Auth check failed — fail closed
    if (isAdminApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (isAdminRoute && !isAdminLogin) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
