import AdminLoginForm from './AdminLoginForm';

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
