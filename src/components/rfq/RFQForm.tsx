'use client';

import { useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const rfqSchema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  contact_person: z.string().min(2, 'Contact person is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().min(7, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  product_interest: z.string().min(2, 'Please specify the product'),
  quantity: z.coerce.number().min(1, 'Minimum 1 unit').max(100000, 'Max 100,000 units'),
  message: z.string().optional(),
});

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

const COUNTRIES = [
  'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
  'Egypt', 'Jordan', 'Lebanon', 'Iraq', 'Pakistan', 'India', 'Bangladesh',
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United Kingdom', 'Germany',
  'France', 'Turkey', 'China', 'Other',
];

interface RFQFormProps {
  defaultProduct?: string;
  compact?: boolean;
}

export default function RFQForm({ defaultProduct = '', compact = false }: RFQFormProps) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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
      <div style={{
        display: 'grid',
        gridTemplateColumns: compact ? '1fr' : '1fr',
        gap: '1rem',
      }}>
        {/* Company Name */}
        <div className="form-group">
          <label className="form-label">{t.rfq.companyName} *</label>
          <input {...register('company_name')} placeholder={t.rfq.companyPlaceholder} className="form-input" />
          {errors.company_name && <p className="form-error">{errors.company_name.message}</p>}
        </div>

        {/* Contact Person */}
        <div className="form-group">
          <label className="form-label">{t.rfq.contactPerson} *</label>
          <input {...register('contact_person')} placeholder={t.rfq.contactPlaceholder} className="form-input" />
          {errors.contact_person && <p className="form-error">{errors.contact_person.message}</p>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label className="form-label">{t.rfq.country} *</label>
          <select {...register('country')} className="form-input">
            <option value="">{t.rfq.selectCountry}</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.country && <p className="form-error">{errors.country.message}</p>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">{t.rfq.phone} *</label>
          <input {...register('phone')} type="tel" placeholder="+971 50 000 0000" className="form-input" />
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">{t.rfq.email} *</label>
          <input {...register('email')} type="email" placeholder="buyer@company.com" className="form-input" />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        {/* Product */}
        <div className="form-group">
          <label className="form-label">{t.rfq.product} *</label>
          <input {...register('product_interest')} placeholder={t.rfq.productPlaceholder} className="form-input" />
          {errors.product_interest && <p className="form-error">{errors.product_interest.message}</p>}
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label className="form-label">{t.rfq.quantity} *</label>
          <input {...register('quantity')} type="number" min="1" placeholder={t.rfq.quantityPlaceholder} className="form-input" />
          {errors.quantity && <p className="form-error">{errors.quantity.message}</p>}
        </div>

        {/* Notes */}
        <div className="form-group">
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
          <div style={{
            padding: '0.75rem 1rem',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            color: '#dc2626',
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={submitting} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
          {submitting ? (
            <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> {t.rfq.sending}</>
          ) : (
            <><Send size={16} /> {t.rfq.submit}</>
          )}
        </button>

        <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>
          {t.rfq.noSpam}
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
