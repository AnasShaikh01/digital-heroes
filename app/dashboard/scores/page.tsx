import { requireAuth } from '@/lib/auth/permissions';
import { getUserScores } from '@/lib/scores/score-service';
import { ScoreForm } from '@/components/dashboard/ScoreForm';
import { ScoreList } from '@/components/dashboard/ScoreList';

export default async function ScoresPage() {
  const user = await requireAuth();
  const scores = await getUserScores(user.id);

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
          Handicap Score Buffer
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Digital Heroes preserves only your latest 5 valid rounds (FIFO).
        </p>
      </div>

      <ScoreForm />

      <div>
        <h3 className="font-heading font-bold text-base text-white mb-4">Current Active Buffer</h3>
        <ScoreList scores={scores} />
      </div>
    </div>
  );
}