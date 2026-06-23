'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, Building2, User, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

type Tab = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('login');

  // Login state
  const [loginEmail, setLoginEmail]     = useState('');
  const [loginPass,  setLoginPass]      = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError,   setLoginError]   = useState('');

  // Register state
  const [company,         setCompany]         = useState('');
  const [regName,         setRegName]         = useState('');
  const [regEmail,        setRegEmail]        = useState('');
  const [regPass,         setRegPass]         = useState('');
  const [regConfirm,      setRegConfirm]      = useState('');
  const [showRegPass,     setShowRegPass]     = useState(false);
  const [regLoading,      setRegLoading]      = useState(false);
  const [regError,        setRegError]        = useState('');
  const [regSuccess,      setRegSuccess]      = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPass });
    if (error) {
      setLoginError('Invalid email or password. Please try again.');
      setLoginLoading(false);
      return;
    }
    router.push('/admin');
    router.refresh();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (regPass !== regConfirm) { setRegError('Passwords do not match.'); return; }
    if (regPass.length < 6) { setRegError('Password must be at least 6 characters.'); return; }
    if (!company.trim()) { setRegError('Company name is required.'); return; }
    setRegLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: regEmail,
      password: regPass,
      options: { data: { company_name: company, full_name: regName } },
    });
    if (error) { setRegError(error.message); setRegLoading(false); return; }
    setRegSuccess(true);
    setRegLoading(false);
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

      {/* Back link */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#6B7280', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '1.5rem', alignSelf: 'center' }}>
        <ArrowLeft size={15} /> Back to Marketplace
      </Link>

      <div style={{ width: '100%', maxWidth: '460px' }}>

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
        <div style={{ background: '#fff', border: '1.5px solid #E5E7EB', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

          {/* Tab switcher */}
          <div style={{ display: 'flex', borderBottom: '1.5px solid #E5E7EB' }}>
            {(['login', 'register'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setLoginError(''); setRegError(''); }}
                style={{
                  flex: 1, padding: '1rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.9375rem', fontWeight: 700,
                  color: tab === t ? '#FF6B00' : '#9CA3AF',
                  borderBottom: `2.5px solid ${tab === t ? '#FF6B00' : 'transparent'}`,
                  marginBottom: '-1.5px',
                  transition: 'all 0.18s', fontFamily: 'inherit',
                }}
              >
                {t === 'login' ? 'Sign In' : 'Register Business'}
              </button>
            ))}
          </div>

          <div style={{ padding: '2rem' }}>

            {/* ─── LOGIN ────────────────────────────────── */}
            {tab === 'login' && (
              <form onSubmit={handleLogin}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.5rem', textAlign: 'center', lineHeight: 1.6 }}>
                  Sign in to access your wholesale account and track your quotation requests.
                </p>

                {loginError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
                    <AlertCircle size={15} style={{ color: '#DC2626', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: '#991B1B' }}>{loginError}</span>
                  </div>
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Business Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                    <input
                      type="email" required autoComplete="email"
                      value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                      placeholder="your@company.com"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>Password</label>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                    <input
                      type={showLoginPass ? 'text' : 'password'} required autoComplete="current-password"
                      value={loginPass} onChange={e => setLoginPass(e.target.value)}
                      placeholder="••••••••"
                      style={{ ...inputStyle, paddingRight: '2.75rem' }}
                    />
                    <button type="button" onClick={() => setShowLoginPass(!showLoginPass)}
                      style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex' }}>
                      {showLoginPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loginLoading} style={{
                  width: '100%', padding: '0.9375rem',
                  background: loginLoading ? '#E55A00' : '#FF6B00', color: '#fff',
                  border: 'none', borderRadius: '0.75rem',
                  fontSize: '1rem', fontWeight: 700, cursor: loginLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  fontFamily: 'inherit', transition: 'background 0.15s',
                }}>
                  {loginLoading
                    ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Signing in&hellip;</>
                    : 'Sign In to Account'}
                </button>

                <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: '#6B7280' }}>
                  New to BIG PHONE?{' '}
                  <button type="button" onClick={() => setTab('register')}
                    style={{ background: 'none', border: 'none', color: '#FF6B00', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0, textDecoration: 'underline' }}>
                    Register your business
                  </button>
                </p>
              </form>
            )}

            {/* ─── REGISTER ─────────────────────────────── */}
            {tab === 'register' && (
              regSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ width: '68px', height: '68px', background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <CheckCircle2 size={32} style={{ color: '#22C55E' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Account Created!</h3>
                  <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '1.75rem', maxWidth: '320px', margin: '0 auto 1.75rem' }}>
                    Check your business email for a confirmation link, then sign in to access your wholesale dashboard.
                  </p>
                  <button
                    onClick={() => { setRegSuccess(false); setTab('login'); }}
                    style={{ padding: '0.875rem 2rem', background: '#FF6B00', color: '#fff', border: 'none', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9375rem' }}>
                    Go to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister}>
                  <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.5rem', textAlign: 'center', lineHeight: 1.6 }}>
                    Create a wholesale B2B account to request quotes and access exclusive pricing.
                  </p>

                  {regError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '0.625rem', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
                      <AlertCircle size={15} style={{ color: '#DC2626', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.875rem', color: '#991B1B' }}>{regError}</span>
                    </div>
                  )}

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Company Name *</label>
                    <div style={{ position: 'relative' }}>
                      <Building2 size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                      <input type="text" required value={company} onChange={e => setCompany(e.target.value)} placeholder="Your Company LLC" style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Your Full Name *</label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                      <input type="text" required value={regName} onChange={e => setRegName(e.target.value)} placeholder="First Last" style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Business Email *</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                      <input type="email" required autoComplete="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="buyer@company.com" style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Password *</label>
                      <div style={{ position: 'relative' }}>
                        <Lock size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                        <input
                          type={showRegPass ? 'text' : 'password'} required
                          value={regPass} onChange={e => setRegPass(e.target.value)}
                          placeholder="••••••••"
                          style={{ ...inputStyle, paddingLeft: '2.25rem', paddingRight: '2.5rem' }}
                        />
                        <button type="button" onClick={() => setShowRegPass(!showRegPass)}
                          style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex' }}>
                          {showRegPass ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.375rem' }}>Confirm *</label>
                      <div style={{ position: 'relative' }}>
                        <Lock size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }} />
                        <input
                          type={showRegPass ? 'text' : 'password'} required
                          value={regConfirm} onChange={e => setRegConfirm(e.target.value)}
                          placeholder="••••••••"
                          style={{ ...inputStyle, paddingLeft: '2.25rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={regLoading} style={{
                    width: '100%', padding: '0.9375rem',
                    background: regLoading ? '#E55A00' : '#FF6B00', color: '#fff',
                    border: 'none', borderRadius: '0.75rem',
                    fontSize: '1rem', fontWeight: 700, cursor: regLoading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    fontFamily: 'inherit', transition: 'background 0.15s',
                  }}>
                    {regLoading
                      ? <><Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} /> Creating account&hellip;</>
                      : 'Create Business Account'}
                  </button>

                  <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.875rem', color: '#6B7280' }}>
                    Already registered?{' '}
                    <button type="button" onClick={() => setTab('login')}
                      style={{ background: 'none', border: 'none', color: '#FF6B00', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0, textDecoration: 'underline' }}>
                      Sign in
                    </button>
                  </p>
                </form>
              )
            )}
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {['🔒 SSL Secured', '🏢 500+ Verified Sellers', '⚡ Response < 2h'].map(t => (
            <span key={t} style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus { border-color: #FF6B00 !important; box-shadow: 0 0 0 3px rgba(255,107,0,0.12); }
      `}</style>
    </div>
  );
}
