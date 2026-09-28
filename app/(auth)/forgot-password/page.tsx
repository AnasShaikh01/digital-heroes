import { PasswordForm } from '@/components/auth/PasswordForm';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-zinc-950">
      <PasswordForm mode="forgot" />
    </main>
  );
}