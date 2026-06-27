'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Image from 'next/image';

type Props = {
  initialError?: string;
};

export default function AdminLoginForm({ initialError = '' }: Props) {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const displayError = error || initialError;

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
    width: '100%',
    background: '#0F172A',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '0.5rem',
    color: '#f1f5f9',
    fontSize: '0.9375rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(140deg, #0F172A 0%, #1C0A00 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '68px', height: '68px',
            borderRadius: '18px',
            overflow: 'hidden',
            border: '2px solid rgba(255,107,0,0.35)',
            display: 'inline-flex',
            marginBottom: '1rem',
            background: '#FFF3E8',
            boxShadow: '0 0 24px rgba(255,107,0,0.2)',
          }}>
            <Image
              src="/images/WhatsApp Image 2026-06-22 at 10.49.38 PM.jpeg"
              alt="BIG PHONE"
              width={68}
              height={68}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          <h1 style={{
            color: '#fff', fontSize: '1.5rem', fontWeight: 800,
            margin: 0, letterSpacing: '-0.025em',
          }}>BIG PHONE</h1>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '0.375rem' }}>
            Admin Panel — Sign in to continue
          </p>
        </div>

        <div style={{
          background: '#1E293B',
          border: '1px solid rgba(255,107,0,0.15)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.02)',
        }}>

          {displayError && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
            }}>
              <AlertCircle size={15} style={{ color: '#f87171', flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', color: '#fca5a5' }}>{displayError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>

            <div style={{ marginBottom: '1.125rem' }}>
              <label style={{
                display: 'block', fontSize: '0.8125rem',
                fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem',
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{
                  position: 'absolute', left: '0.875rem', top: '50%',
                  transform: 'translateY(-50%)', color: '#475569',
                  pointerEvents: 'none',
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@bigphone.ae"
                  style={{ ...inputStyle, padding: '0.75rem 0.875rem 0.75rem 2.625rem' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{
                display: 'block', fontSize: '0.8125rem',
                fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem',
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{
                  position: 'absolute', left: '0.875rem', top: '50%',
                  transform: 'translateY(-50%)', color: '#475569',
                  pointerEvents: 'none',
                }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  style={{ ...inputStyle, padding: '0.75rem 2.75rem 0.75rem 2.625rem' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)')}
                  onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{
                    position: 'absolute', right: '0.875rem', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: '#475569', cursor: 'pointer', padding: 0,
                  }}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: loading ? 'rgba(255,107,0,0.55)' : '#FF6B00',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.9375rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(255,107,0,0.45)',
                letterSpacing: '-0.01em',
              }}
            >
              {loading ? 'Signing in…' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontSize: '0.8125rem', color: '#1E293B',
        }}>
          BIG PHONE Admin — Authorized personnel only
        </p>
      </div>
    </div>
  );
}
