import { PasswordForm } from '@/components/auth/PasswordForm';

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
      <PasswordForm mode="reset" />
    </main>
  );
}