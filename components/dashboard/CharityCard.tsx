'use client';

import { useState, useTransition } from 'react';
import { updateCharityPreferenceAction } from '@/actions/charity/update-preference';
import type { Charity, CharityPreference } from '@/lib/charity/charity-service';
import { HeartHandshake, CheckCircle2 } from 'lucide-react';

interface CharityCardProps {
  charities: Charity[];
  activePreference: CharityPreference | null;
  currentCharity: Charity | null;
}

export function CharityCard({ charities, activePreference, currentCharity }: CharityCardProps) {
  const [selectedCharity, setSelectedCharity] = useState(
    activePreference?.charity_id || charities[0]?.id || ''
  );
  const [percentage, setPercentage] = useState(
    activePreference?.contribution_percentage || 10
  );
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setNotice(null);
    setError(null);
    startTransition(async () => {
      const res = await updateCharityPreferenceAction(formData);
      if (res?.error) setError(res.error);
      if (res?.success) setNotice('Charity allocation preference successfully saved.');
    });
  }

  return (
    <div className="p-6 rounded-3xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg text-white">Charity Allocation</h3>
          <p className="text-xs text-zinc-400">Direct 10% to 100% of your subscription payments.</p>
        </div>
      </div>

      {currentCharity && (
        <div className="mb-4 p-3 rounded-xl bg-zinc-950/60 border border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Current Selection</span>
            <p className="text-xs font-semibold text-white mt-0.5">{currentCharity.name}</p>
          </div>
          <span className="text-xs font-black text-amber-400 font-heading">
            {activePreference?.contribution_percentage ?? 10}%
          </span>
        </div>
      )}

      {notice && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
            Designated Partner Charity
          </label>
          <select
            name="charityId"
            value={selectedCharity}
            onChange={(e) => setSelectedCharity(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.08] text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          >
            {charities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.featured ? '★' : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Contribution Percentage
            </label>
            <span className="text-xs font-black text-amber-400 font-heading">{percentage}%</span>
          </div>
          <input
            name="percentage"
            type="range"
            min="10"
            max="100"
            step="5"
            value={percentage}
            onChange={(e) => setPercentage(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
            <span>10% (Min)</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold text-xs hover:brightness-105 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
        >
          {isPending ? 'Updating...' : 'Save Allocation Preference'}
        </button>
      </form>
    </div>
  );
}