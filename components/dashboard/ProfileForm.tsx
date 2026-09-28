'use client';

import { useState, useTransition } from 'react';
import { updateProfileAction } from '@/actions/auth/profile';

interface ProfileFormProps {
  initialFullName: string;
}

export function ProfileForm({ initialFullName }: ProfileFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const res = await updateProfileAction(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        setSuccess(true);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300">
          Profile updated successfully.
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
          Full Name
        </label>
        <input
          name="fullName"
          type="text"
          required
          defaultValue={initialFullName}
          placeholder="e.g. Rory McIlroy"
          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
      >
        {isPending ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}