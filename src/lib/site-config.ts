import { getSettings } from '@/lib/data';

/** Default contact details — override via Vercel env or Admin → Settings. */
export const DEFAULT_WHATSAPP_NUMBER = '971555522469';
export const DEFAULT_COMPANY_EMAIL = 'BigPhoneUAE@gmail.com';

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER;
}

export function getCompanyEmail(): string {
  return process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? DEFAULT_COMPANY_EMAIL;
}

export function formatWhatsAppDisplay(number = getWhatsAppNumber()): string {
  return `+${number}`;
}

/** RFQ admin alerts: DB notification_email → env → default. */
export async function getNotificationEmail(): Promise<string> {
  try {
    const settings = await getSettings();
    const fromDb = settings.notification_email?.trim();
    if (fromDb) return fromDb;
  } catch {
    /* fall through */
  }
  return getCompanyEmail();
}
