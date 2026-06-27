'use client';

import { useMemo, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { COUNTRIES, countryLabel } from '@/lib/countries';

type RFQFormValues = {
  company_name: string;
  contact_person: string;
  country: string;
  phone: string;
  email: string;
  product_interest: string;
  quantity: number;
  message?: string;
};

interface RFQFormProps {
  defaultProduct?: string;
  compact?: boolean;
}

export default function RFQForm({ defaultProduct = '', compact = false }: RFQFormProps) {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const rfqSchema = useMemo(() => z.object({
    company_name: z.string().min(2, t.validation.companyRequired),
    contact_person: z.string().min(2, t.validation.contactRequired),
    country: z.string().min(2, t.validation.countryRequired),
    phone: z.string().min(7, t.validation.phoneRequired),
    email: z.string().email(t.validation.emailRequired),
    product_interest: z.string().min(2, t.validation.productRequired),
    quantity: z.coerce.number().min(1, t.validation.quantityMin).max(100000, t.validation.quantityMax),
    message: z.string().optional(),
  }), [t]);

  const { register, handleSubmit, formState: { errors } } = useForm<RFQFormValues>({
    resolver: zodResolver(rfqSchema) as Resolver<RFQFormValues>,
    defaultValues: {
      product_interest: defaultProduct,
      quantity: 10,
    },
  });

  const onSubmit = async (data: RFQFormValues) => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setError(t.rfq.error);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: '1rem', padding: compact ? '2rem' : '3rem 1rem',
      }}>
        <div style={{
          width: '64px', height: '64px',
          background: '#f0fdf4',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CheckCircle2 size={32} style={{ color: '#22c55e' }} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
            {t.rfq.successTitle}
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            {t.rfq.successMsg}
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="btn btn-outline btn-sm"
        >
          {t.rfq.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="rfq-form-grid">
        <div className="form-group">
          <label className="form-label">{t.rfq.companyName}</label>
          <input {...register('company_name')} placeholder={t.rfq.companyPlaceholder} className="form-input" />
          {errors.company_name && <p className="form-error">{errors.company_name.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">{t.rfq.contactPerson}</label>
          <input {...register('contact_person')} placeholder={t.rfq.contactPlaceholder} className="form-input" />
          {errors.contact_person && <p className="form-error">{errors.contact_person.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">{t.rfq.country}</label>
          <select {...register('country')} className="form-input">
            <option value="">{t.rfq.selectCountry}</option>
            {COUNTRIES.map(c => (
              <option key={c.value} value={c.value}>{countryLabel(c.value, lang)}</option>
            ))}
          </select>
          {errors.country && <p className="form-error">{errors.country.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">{t.rfq.phone}</label>
          <input {...register('phone')} type="tel" placeholder="+971 50 000 0000" className="form-input" dir="ltr" />
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">{t.rfq.email}</label>
          <input {...register('email')} type="email" placeholder="buyer@company.com" className="form-input" dir="ltr" />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">{t.rfq.product}</label>
          <input {...register('product_interest')} placeholder={t.rfq.productPlaceholder} className="form-input" />
          {errors.product_interest && <p className="form-error">{errors.product_interest.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">{t.rfq.quantity}</label>
          <input {...register('quantity')} type="number" min="1" placeholder={t.rfq.quantityPlaceholder} className="form-input" dir="ltr" />
          {errors.quantity && <p className="form-error">{errors.quantity.message}</p>}
        </div>

        <div className="form-group rfq-form-full">
          <label className="form-label">{t.rfq.notes}</label>
          <textarea
            {...register('message')}
            placeholder={t.rfq.notesPlaceholder}
            className="form-input"
            rows={3}
            style={{ resize: 'vertical' }}
          />
        </div>

        {error && (
          <div className="rfq-form-error rfq-form-full">
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting} className="btn btn-primary btn-lg rfq-form-full" style={{ width: '100%' }}>
          {submitting ? (
            <><Loader2 size={18} className="spin-icon" /> {t.rfq.sending}</>
          ) : (
            <><Send size={16} /> {t.rfq.submit}</>
          )}
        </button>

        <p className="rfq-form-footnote rfq-form-full">
          {t.rfq.noSpam}
        </p>
      </div>

      <style>{`
        .rfq-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .rfq-form-grid { grid-template-columns: repeat(2, 1fr); }
          .rfq-form-full { grid-column: 1 / -1; }
        }
        .rfq-form-error {
          padding: 0.75rem 1rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          color: #dc2626;
        }
        .rfq-form-footnote {
          font-size: 0.75rem;
          color: #94a3b8;
          text-align: center;
          margin: 0;
        }
        .spin-icon { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
