'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

type Props = {
  initialError?: string;
};

export default function AdminLoginForm({ initialError = '' }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <div className="admin-login-page">
      <div className="admin-login-accent" />

      <div className="admin-login-shell">
        <Link href="/" className="admin-login-back">
          <ArrowLeft size={16} />
          Back to website
        </Link>

        <div className="admin-login-grid">
          {/* Brand panel — desktop */}
          <div className="admin-login-brand">
            <div className="admin-login-brand-inner">
              <div className="admin-login-logo-wrap">
                <Image
                  src="/images/WhatsApp Image 2026-06-22 at 10.49.38 PM.jpeg"
                  alt="BIG PHONE"
                  width={72}
                  height={72}
                  priority
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div>
                <div className="admin-login-brand-name">BIG PHONE</div>
                <div className="admin-login-brand-tag">WHOLESALE</div>
              </div>
              <p className="admin-login-brand-desc">
                Secure access for authorized staff to manage inventory, RFQ requests, and store settings.
              </p>
              <div className="admin-login-trust">
                <ShieldCheck size={16} color="#FF6B00" />
                <span>Authorized personnel only</span>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="admin-login-card-wrap">
            <div className="card admin-login-card">
              <div className="admin-login-card-head">
                <div className="admin-login-logo-wrap admin-login-logo-wrap-sm">
                  <Image
                    src="/images/WhatsApp Image 2026-06-22 at 10.49.38 PM.jpeg"
                    alt="BIG PHONE"
                    width={52}
                    height={52}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div>
                  <h1 className="admin-login-title">Staff Login</h1>
                  <p className="admin-login-sub">Sign in to the control panel</p>
                </div>
              </div>

              {displayError && (
                <div className="admin-login-error">
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{displayError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="admin-login-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="admin-email">Email address</label>
                  <div className="admin-login-input-wrap">
                    <Mail size={16} className="admin-login-input-icon" />
                    <input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="admin@bigphone.ae"
                      className="form-input admin-login-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="admin-password">Password</label>
                  <div className="admin-login-input-wrap">
                    <Lock size={16} className="admin-login-input-icon" />
                    <input
                      id="admin-password"
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="form-input admin-login-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(p => !p)}
                      className="admin-login-toggle-pass"
                      aria-label={showPass ? 'Hide password' : 'Show password'}
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg admin-login-submit"
                >
                  {loading ? 'Signing in…' : 'Sign in to dashboard'}
                </button>
              </form>
            </div>

            <p className="admin-login-footnote">
              BIG PHONE Admin · Dubai, UAE
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh;
          background: #F8FAFC;
          position: relative;
        }
        .admin-login-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF6B00, #FF8C33);
        }
        .admin-login-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem 1rem;
        }
        .admin-login-back {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          max-width: 920px;
          width: 100%;
          margin: 0 auto 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #6B7280;
          text-decoration: none;
          transition: color 0.15s;
        }
        .admin-login-back:hover { color: #FF6B00; }
        .admin-login-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 920px;
          width: 100%;
          margin: 0 auto;
          align-items: stretch;
        }
        @media (min-width: 900px) {
          .admin-login-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        .admin-login-brand {
          display: none;
          background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
          border-radius: 1rem;
          border: 1px solid #374151;
          overflow: hidden;
          position: relative;
        }
        @media (min-width: 900px) {
          .admin-login-brand { display: flex; }
        }
        .admin-login-brand::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF6B00, #FF8C33);
        }
        .admin-login-brand-inner {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.25rem;
        }
        .admin-login-logo-wrap {
          width: 72px;
          height: 72px;
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid rgba(255,107,0,0.35);
          background: #FFF3E8;
          flex-shrink: 0;
        }
        .admin-login-logo-wrap-sm {
          width: 52px;
          height: 52px;
          border-radius: 12px;
        }
        .admin-login-brand-name {
          font-size: 1.375rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
        }
        .admin-login-brand-tag {
          font-size: 0.625rem;
          font-weight: 700;
          color: #FF8C33;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 2px;
        }
        .admin-login-brand-desc {
          font-size: 0.9375rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          margin: 0;
          max-width: 320px;
        }
        .admin-login-trust {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.875rem;
          background: rgba(255,107,0,0.12);
          border: 1px solid rgba(255,107,0,0.25);
          border-radius: 9999px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #FFD0A0;
          width: fit-content;
        }
        .admin-login-card-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .admin-login-card {
          padding: 2rem;
          border: 1.5px solid #EAEAEA;
          border-radius: 1rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .admin-login-card-head {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #F3F4F6;
        }
        @media (min-width: 900px) {
          .admin-login-logo-wrap-sm { display: none; }
        }
        .admin-login-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #111827;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .admin-login-sub {
          font-size: 0.875rem;
          color: #9CA3AF;
          margin: 0.25rem 0 0;
        }
        .admin-login-error {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 0.625rem;
          padding: 0.75rem 1rem;
          margin-bottom: 1.25rem;
          font-size: 0.875rem;
          color: #DC2626;
        }
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 1.125rem;
        }
        .admin-login-input-wrap {
          position: relative;
        }
        .admin-login-input-icon {
          position: absolute;
          left: 0.875rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF;
          pointer-events: none;
        }
        .admin-login-input {
          padding-left: 2.625rem !important;
          padding-right: 2.75rem;
        }
        .admin-login-toggle-pass {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9CA3AF;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .admin-login-toggle-pass:hover { color: #FF6B00; }
        .admin-login-submit {
          width: 100%;
          margin-top: 0.25rem;
          border-radius: 0.625rem;
        }
        .admin-login-footnote {
          text-align: center;
          margin-top: 1.25rem;
          font-size: 0.8125rem;
          color: #9CA3AF;
        }
        @media (max-width: 767px) {
          .admin-login-card { padding: 1.25rem; }
          .admin-login-shell { padding: 1.25rem 0.75rem; }
          .admin-login-card-head { margin-bottom: 1.25rem; padding-bottom: 1rem; }
        }
      `}</style>
    </div>
  );
}
