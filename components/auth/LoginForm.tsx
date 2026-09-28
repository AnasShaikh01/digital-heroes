'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { loginAction } from '@/actions/auth/signup';

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await loginAction(formData);
      if (res?.error) setError(res.error);
    });
  }

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-card/85 border border-border shadow-2xl backdrop-blur-md">
      <div className="mb-6 text-center">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Welcome Back</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to track your scores and charity draws
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-destructive/15 border border-destructive/30 text-sm text-rose-300">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
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

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-primary font-medium hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-3.5 py-2.5 rounded-xl bg-secondary/40 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-bold text-sm transition-all shadow-md shadow-amber-500/10 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {isPending ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-primary font-semibold hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}