'use client';

import { useState, useTransition } from 'react';
import { createScoreAction } from '@/actions/scores/create-score';
import { Plus } from 'lucide-react';

export function ScoreForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const today = new Date().toISOString().split('T')[0];

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await createScoreAction(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        const form = document.getElementById('score-form') as HTMLFormElement;
        form?.reset();
      }
    });
  }

  return (
    <div className="p-6 rounded-3xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-md">
      <h3 className="font-heading font-bold text-lg text-white mb-1">Record Round</h3>
      <p className="text-xs text-zinc-400 mb-4">
        Log an 18-hole Stableford score (1–45). Your buffer preserves your 5 most recent scores.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300">
          {error}
        </div>
      )}

      <form id="score-form" action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
            Stableford Points (1–45)
          </label>
          <input
            name="score"
            type="number"
            min="1"
            max="45"
            required
            placeholder="e.g. 36"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
            Round Date
          </label>
          <input
            name="scoreDate"
            type="date"
            required
            defaultValue={today}
            max={today}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isPending ? 'Saving Round...' : 'Add Score to Buffer'}</span>
        </button>
      </form>
    </div>
  );
}