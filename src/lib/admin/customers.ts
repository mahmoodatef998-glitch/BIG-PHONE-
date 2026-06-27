import type { RFQ } from '@/types';
import { Award, Star, UserCheck, type LucideIcon } from 'lucide-react';

export interface AdminCustomer {
  email: string;
  company_name: string;
  contact_person: string;
  phone: string;
  country: string;
  rfq_count: number;
  last_activity: string;
  products: string[];
}

export interface CustomerTier {
  label: string;
  bg: string;
  color: string;
  border: string;
  Icon: LucideIcon;
}

export function deriveCustomersFromRFQs(rfqs: RFQ[]): AdminCustomer[] {
  const map = new Map<string, AdminCustomer>();

  for (const rfq of rfqs) {
    const key = rfq.email.trim().toLowerCase();
    if (!key) continue;

    const interest = rfq.product_interest?.trim() || null;
    const existing = map.get(key);

    if (existing) {
      existing.rfq_count += 1;
      if (rfq.created_at > existing.last_activity) {
        existing.last_activity = rfq.created_at;
        existing.contact_person = rfq.contact_person;
        existing.phone = rfq.phone;
        existing.company_name = rfq.company_name;
        existing.country = rfq.country;
      }
      if (interest && existing.products.length < 5 && !existing.products.includes(interest)) {
        existing.products.push(interest);
      }
      continue;
    }

    map.set(key, {
      email: rfq.email.trim(),
      company_name: rfq.company_name,
      contact_person: rfq.contact_person,
      phone: rfq.phone,
      country: rfq.country,
      rfq_count: 1,
      last_activity: rfq.created_at,
      products: interest ? [interest] : [],
    });
  }

  return Array.from(map.values()).sort(
    (a, b) => b.rfq_count - a.rfq_count || b.last_activity.localeCompare(a.last_activity),
  );
}

export function customerTier(rfqCount: number): CustomerTier {
  if (rfqCount >= 3) {
    return { label: 'VIP', bg: '#FFF0E0', color: '#C2410C', border: '#FFD0A0', Icon: Award };
  }
  if (rfqCount >= 2) {
    return { label: 'Regular', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', Icon: Star };
  }
  return { label: 'New', bg: '#F8FAFC', color: '#475569', border: '#E2E8F0', Icon: UserCheck };
}

export function customerStats(customers: AdminCustomer[]) {
  return {
    total: customers.length,
    vip: customers.filter(c => c.rfq_count >= 3).length,
    regular: customers.filter(c => c.rfq_count === 2).length,
    new: customers.filter(c => c.rfq_count === 1).length,
  };
}

export function topCustomerCountries(customers: AdminCustomer[], limit = 4) {
  const countryMap: Record<string, number> = {};
  customers.forEach(c => {
    const country = c.country.trim();
    if (!country) return;
    countryMap[country] = (countryMap[country] || 0) + 1;
  });
  return Object.entries(countryMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);
}
