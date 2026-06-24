import type { Metadata } from 'next';
import { getSettings } from '@/lib/data';
import SettingsClient from './SettingsClient';

export const metadata: Metadata = { title: 'Settings | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return <SettingsClient initialSettings={settings} />;
}
