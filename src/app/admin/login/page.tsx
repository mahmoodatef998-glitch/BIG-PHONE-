import type { Metadata } from 'next';
import AdminLoginForm from './AdminLoginForm';

export const metadata: Metadata = {
  title: 'Staff Login',
  description: 'Sign in to the BIG PHONE admin control panel.',
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialError = params.error === 'unauthorized'
    ? 'This account is not authorized for admin access.'
    : '';

  return <AdminLoginForm initialError={initialError} />;
}
