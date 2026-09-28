'use client';

import { useState, useTransition } from 'react';
import { deleteScoreAction } from '@/actions/scores/delete-score';
import { updateScoreAction } from '@/actions/scores/update-score';
import type { ScoreRow } from '@/lib/scores/score-utils';
import { Trash2, Calendar, Pencil, X, Check, AlertCircle } from 'lucide-react';

export function ScoreList({ scores }: { scores: ScoreRow[] }) {
  const [editingScore, setEditingScore] = useState<ScoreRow | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!confirm('Remove this score from your active buffer?')) return;
    setErrorMessage(null);
    startTransition(async () => {
      const res = await deleteScoreAction(id);
      if (res?.error) {
        setErrorMessage(res.error);
      }
    });
  }

  async function handleUpdate(formData: FormData) {
    setErrorMessage(null);
    startTransition(async () => {
      const res = await updateScoreAction(formData);
      if (res?.error) {
        setErrorMessage(res.error);
      } else {
        setEditingScore(null);
      }
    });
  }

  if (scores.length === 0) {
    return (
      <div className="p-8 rounded-3xl border border-dashed border-white/[0.08] bg-zinc-900/20 text-center">
        <p className="text-sm font-semibold text-zinc-300">No rounds logged</p>
        <p className="text-xs text-zinc-500 mt-1">Submit your first score to begin your draw buffer.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-rose-200">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {editingScore && (
        <div className="p-5 rounded-2xl border border-amber-500/40 bg-zinc-900/90 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Edit Round Score
            </span>
            <button
              onClick={() => {
                setEditingScore(null);
                setErrorMessage(null);
              }}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form action={handleUpdate} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="hidden" name="scoreId" value={editingScore.id} />
            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase mb-1">
                Points (1-45)
              </label>
              <input
                name="score"
                type="number"
                min="1"
                max="45"
                required
                defaultValue={editingScore.score}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/[0.08] text-white text-xs focus:ring-1 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 uppercase mb-1">
                Round Date
              </label>
              <input
                name="scoreDate"
                type="date"
                required
                defaultValue={editingScore.score_date}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/[0.08] text-white text-xs focus:ring-1 focus:ring-amber-500 outline-none"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isPending ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {scores.map((s, idx) => {
        const [year, month, day] = s.score_date.split('-');
        const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
        const formattedDate = dateObj.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });

        return (
          <div
            key={s.id}
            className="p-4 rounded-2xl border border-white/[0.07] bg-zinc-900/40 hover:bg-zinc-900/70 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-heading font-black text-amber-400 text-xs">
                #{idx + 1}
              </span>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading font-black text-xl text-white">{s.score}</span>
                  <span className="text-[10px] uppercase font-semibold text-zinc-400">pts</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-0.5">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setEditingScore(s);
                  setErrorMessage(null);
                }}
                disabled={isPending}
                aria-label="Edit score"
                className="p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                disabled={isPending}
                aria-label="Delete score"
                className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}