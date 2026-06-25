'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
      return;
    }
    router.push('/admin');
    router.refresh();
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '0.8125rem 0.875rem 0.8125rem 2.75rem',
    border: '1.5px solid #E5E7EB', borderRadius: '0.625rem',
    fontSize: '0.9375rem', color: '#111827', background: '#FAFAFA',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFF3E8 0%, #fff 50%, #FFF3E8 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>

      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#6B7280', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '1.5rem', alignSelf: 'center' }}>
        <ArrowLeft size={15} /> Back to Marketplace
      </Link>

      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div style={{ width: '48px', height: '48px', background: '#FF6B00', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '22px', lineHeight: 1 }}>B</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.125rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em' }}>BIG PHONE</div>
              <div style={{ fontSize: '0.5rem', fontWeight: 700, color: '#FF6B00', letterSpacing: '0.14em', textTransform: 'uppercase' }}>B2B MARKETPLACE</div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', padding: '2rem' }}>

          <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#111827', marginBottom: '0.375rem', textAlign: 'center', letterSpacing: '-0.02em' }}>Admin Sign In</h1>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.75rem', textAlign: 'center', lineHeight: 1.6 }}>
            Access the admin dashboard to manage products, brands, and quotations.
          </p>

          <form onSubmit={handleLogin}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
                <AlertCircle size={15} style={{ color: '#DC2626', flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: '#991B1B' }}>{error}</span>
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                <input
                  type="email" required autoComplete="email"
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                <input
                  type={showPass ? 'text' : 'password'} required autoComplete="current-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: '2.75rem' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '0.9375rem',
              background: loading ? '#E55A00' : '#FF6B00', color: '#fff',
              border: 'none', borderRadius: '0.75rem',
              fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              fontFamily: 'inherit', transition: 'background 0.15s',
            }}>
              {loading
                ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Signing in&hellip;</>
                : 'Sign In'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus { border-color: #FF6B00 !important; box-shadow: 0 0 0 3px rgba(255,107,0,0.12); }
      `}</style>
    </div>
  );
}
