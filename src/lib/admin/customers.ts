import type { RFQ, Customer } from '@/types';
import { Award, Star, UserCheck, type LucideIcon } from 'lucide-react';

export interface AdminCustomer {
  id?: string;
  email: string;
  company_name: string;
  contact_person: string;
  phone: string;
  country: string;
  rfq_count: number;
  registered_at: string;
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

export interface RFQContactPayload {
  email: string;
  company_name: string;
  contact_person: string;
  country: string;
  phone: string;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function deriveCustomersFromRFQs(rfqs: RFQ[]): AdminCustomer[] {
  const map = new Map<string, AdminCustomer>();

  for (const rfq of rfqs) {
    const key = normalizeEmail(rfq.email);
    if (!key) continue;

    const interest = rfq.product_interest?.trim() || null;
    const existing = map.get(key);

    if (existing) {
      existing.rfq_count += 1;
      if (rfq.created_at < existing.registered_at) {
        existing.registered_at = rfq.created_at;
      }
      if (rfq.created_at > existing.last_activity) {
        existing.last_activity = rfq.created_at;
        existing.contact_person = rfq.contact_person;
        existing.phone = rfq.phone;
        existing.company_name = rfq.company_name;
        existing.country = rfq.country;
        existing.email = rfq.email.trim();
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
      registered_at: rfq.created_at,
      last_activity: rfq.created_at,
      products: interest ? [interest] : [],
    });
  }

  return Array.from(map.values()).sort(
    (a, b) => b.rfq_count - a.rfq_count || b.last_activity.localeCompare(a.last_activity),
  );
}

export function mergeCustomersWithRFQStats(
  dbCustomers: Customer[],
  rfqStats: AdminCustomer[],
): AdminCustomer[] {
  const statsMap = new Map(rfqStats.map(c => [normalizeEmail(c.email), c]));
  const merged = new Map<string, AdminCustomer>();

  for (const db of dbCustomers) {
    const key = normalizeEmail(db.email);
    const stats = statsMap.get(key);
    merged.set(key, {
      id: db.id,
      email: db.email,
      company_name: db.company_name,
      contact_person: db.contact_person,
      phone: db.phone,
      country: db.country,
      registered_at: db.registered_at,
      last_activity: stats?.last_activity ?? db.last_activity_at,
      rfq_count: stats?.rfq_count ?? 0,
      products: stats?.products ?? [],
    });
  }

  for (const stat of rfqStats) {
    const key = normalizeEmail(stat.email);
    if (!merged.has(key)) {
      merged.set(key, stat);
    }
  }

  return Array.from(merged.values()).sort(
    (a, b) => b.last_activity.localeCompare(a.last_activity) || b.rfq_count - a.rfq_count,
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
    new: customers.filter(c => c.rfq_count <= 1).length,
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

export function buildCustomerUpsertRow(payload: RFQContactPayload, activityAt: string) {
  const email = normalizeEmail(payload.email);
  return {
    email,
    company_name: payload.company_name.trim(),
    contact_person: payload.contact_person.trim(),
    country: payload.country.trim(),
    phone: payload.phone.trim(),
    registered_at: activityAt,
    last_activity_at: activityAt,
    updated_at: activityAt,
  };
}
