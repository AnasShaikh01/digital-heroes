'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { forgotPasswordAction, resetPasswordAction } from '@/actions/auth/signup';

interface PasswordFormProps {
  mode: 'forgot' | 'reset';
}

export function PasswordForm({ mode }: PasswordFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const res =
        mode === 'forgot'
          ? await forgotPasswordAction(formData)
          : await resetPasswordAction(formData);

      if (res?.error) setError(res.error);
      if (res?.success) setSuccess(true);
    });
  }

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-card/85 border border-border shadow-2xl backdrop-blur-md">
      <div className="mb-6 text-center">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          {mode === 'forgot' ? 'Reset Password' : 'Set New Password'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {mode === 'forgot'
            ? "Enter your email and we'll send you a recovery link"
            : 'Enter your new account password'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-destructive/15 border border-destructive/30 text-sm text-rose-300">
          {error}
        </div>
      )}

      {success && mode === 'forgot' ? (
        <div className="p-4 rounded-xl bg-primary/15 border border-primary/30 text-sm text-amber-300 text-center leading-relaxed">
          Recovery instructions sent. Check your inbox.
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-4">
          {mode === 'forgot' ? (
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="player@digitalheroes.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/40 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                New Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/40 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 px-4 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-bold text-sm transition-all shadow-md shadow-amber-500/10 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isPending
              ? 'Processing...'
              : mode === 'forgot'
              ? 'Send Reset Link'
              : 'Update Password'}
          </button>
        </form>
      )}

      <div className="mt-6 text-center text-xs text-muted-foreground">
        Remember your password?{' '}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Return to Sign In
        </Link>
      </div>
    </div>
  );
}