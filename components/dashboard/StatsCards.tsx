import { Layers, Award, BarChart3, CheckCircle2 } from 'lucide-react';
import type { calculateScoreStats } from '@/lib/scores/score-utils';

export function StatsCards({ stats }: { stats: ReturnType<typeof calculateScoreStats> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-5 rounded-2xl border border-white/[0.07] bg-zinc-900/50">
        <div className="flex items-center justify-between text-zinc-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Score Buffer</span>
          <Layers className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-2xl font-black text-white">{stats.count} / 5</span>
          <span className="text-[11px] text-zinc-400">Rounds</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px]">
          {stats.isBufferComplete ? (
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 5/5 Buffer Complete
            </span>
          ) : (
            <span className="text-zinc-500">Need {5 - stats.count} more round{5 - stats.count === 1 ? '' : 's'}</span>
          )}
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-white/[0.07] bg-zinc-900/50">
        <div className="flex items-center justify-between text-zinc-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Buffer Avg</span>
          <BarChart3 className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-2xl font-black text-white">{stats.average || '—'}</span>
          <span className="text-[11px] text-zinc-400">Pts/Round</span>
        </div>
        <p className="mt-2 text-[11px] text-zinc-500">Rolling 5-score average</p>
      </div>

      <div className="p-5 rounded-2xl border border-white/[0.07] bg-zinc-900/50">
        <div className="flex items-center justify-between text-zinc-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Best Round</span>
          <Award className="w-4 h-4 text-rose-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-2xl font-black text-white">{stats.highest || '—'}</span>
          <span className="text-[11px] text-zinc-400">Stableford</span>
        </div>
        <p className="mt-2 text-[11px] text-zinc-500">Peak buffer score</p>
      </div>

      <div className="p-5 rounded-2xl border border-white/[0.07] bg-zinc-900/50">
        <div className="flex items-center justify-between text-zinc-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Oldest Score</span>
          <Layers className="w-4 h-4 text-zinc-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-2xl font-black text-white">{stats.lowest || '—'}</span>
          <span className="text-[11px] text-zinc-400">Stableford</span>
        </div>
        <p className="mt-2 text-[11px] text-zinc-500">Next in line to roll out</p>
      </div>
    </div>
  );
}