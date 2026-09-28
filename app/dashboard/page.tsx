import { requireAuth } from '@/lib/auth/permissions';
import { getCurrentProfile } from '@/lib/auth/auth';
import { getUserScores } from '@/lib/scores/score-service';
import { calculateScoreStats } from '@/lib/scores/score-utils';
import { getActiveCharities, getUserCharityPreference } from '@/lib/charity/charity-service';
import { getUserSubscription } from '@/lib/subscription/subscription-service';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ScoreForm } from '@/components/dashboard/ScoreForm';
import { ScoreList } from '@/components/dashboard/ScoreList';
import { CharityCard } from '@/components/dashboard/CharityCard';
import { SubscriptionCard } from '@/components/dashboard/SubscriptionCard';

export default async function DashboardPage() {
  const user = await requireAuth();
  const profile = await getCurrentProfile();
  const scores = await getUserScores(user.id);
  const stats = calculateScoreStats(scores);

  const charities = await getActiveCharities();
  const { preference, charity } = await getUserCharityPreference(user.id);
  const subscription = await getUserSubscription(user.id);

  return (
    <div className="space-y-8">
      <DashboardHeader user={user} profile={profile} />

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ScoreForm />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg text-white">
                Active 5-Score Buffer
              </h3>
              <span className="text-xs text-zinc-400 font-mono">
                {scores.length} / 5 Logged
              </span>
            </div>
            <ScoreList scores={scores} />
          </div>
        </div>

        <div className="space-y-6">
          <SubscriptionCard subscription={subscription} />
          <CharityCard
            charities={charities}
            activePreference={preference}
            currentCharity={charity}
          />
        </div>
      </div>
    </div>
  );
}