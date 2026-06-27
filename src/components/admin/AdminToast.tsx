'use client';

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
  success: () => {},
  error: () => {},
  info: () => {},
});

const STYLES: Record<ToastType, { bg: string; border: string; color: string; Icon: typeof Info }> = {
  success: { bg: '#ECFDF5', border: '#BBF7D0', color: '#166534', Icon: CheckCircle2 },
  error: { bg: '#FEF2F2', border: '#FECACA', color: '#991B1B', Icon: AlertCircle },
  info: { bg: '#EFF6FF', border: '#BFDBFE', color: '#1D4ED8', Icon: Info },
};

export function AdminToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = ++idRef.current;
    setToasts(prev => [...prev, { id, type, message }]);
    window.setTimeout(() => dismiss(id), 4500);
  }, [dismiss]);

  const value: ToastContextValue = {
    toast,
    success: (message) => toast('success', message),
    error: (message) => toast('error', message),
    info: (message) => toast('info', message),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: '1.25rem',
          right: '1.25rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.625rem',
          maxWidth: 'min(420px, calc(100vw - 2rem))',
          pointerEvents: 'none',
        }}
      >
        {toasts.map(item => {
          const cfg = STYLES[item.type];
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.625rem',
                padding: '0.875rem 1rem',
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderRadius: '0.75rem',
                boxShadow: '0 8px 24px rgba(15,23,42,0.12)',
                pointerEvents: 'auto',
              }}
            >
              <cfg.Icon size={16} style={{ color: cfg.color, flexShrink: 0, marginTop: '1px' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: cfg.color, lineHeight: 1.45 }}>
                {item.message}
              </span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useAdminToast() {
  return useContext(ToastContext);
}
