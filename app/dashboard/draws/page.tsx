import { requireAuth } from '@/lib/auth/permissions';
import { Trophy } from 'lucide-react';

export default async function DrawsPage() {
  await requireAuth();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">Monthly Cash Draws</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">Review upcoming snapshots, active numbers, and draw results.</p>
      </div>

      <div className="p-12 rounded-3xl border border-white/[0.08] bg-zinc-900/30 text-center">
        <Trophy className="w-8 h-8 text-amber-400/60 mx-auto mb-3" />
        <h3 className="font-heading font-bold text-base text-white">No active draw snapshot locked</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
          Draw snapshots lock at the end of each calendar month for active subscribers with a full 5-score buffer.
        </p>
      </div>
    </div>
  );
}