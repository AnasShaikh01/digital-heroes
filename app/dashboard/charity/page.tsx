import { requireAuth } from '@/lib/auth/permissions';
import { getActiveCharities, getUserCharityPreference } from '@/lib/charity/charity-service';
import { CharityCard } from '@/components/dashboard/CharityCard';

export default async function CharityDashboardPage() {
  const user = await requireAuth();
  const charities = await getActiveCharities();
  const { preference, charity } = await getUserCharityPreference(user.id);

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
          Charity Preference
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Select which grassroots cause receives between 10% and 100% of your membership.
        </p>
      </div>

      <CharityCard
        charities={charities}
        activePreference={preference}
        currentCharity={charity}
      />
    </div>
  );
}