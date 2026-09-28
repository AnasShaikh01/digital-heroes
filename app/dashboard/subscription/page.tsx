import { requireAuth } from '@/lib/auth/permissions';
import { getActivePlans, getUserSubscription, getUserPayments } from '@/lib/subscription/subscription-service';
import { PlanCard } from '@/components/subscription/PlanCard';
import { SubscriptionStatus } from '@/components/subscription/SubscriptionStatus';

export default async function SubscriptionPage() {
  const user = await requireAuth();
  const subscription = await getUserSubscription(user.id);
  const plans = await getActivePlans();
  const payments = subscription ? await getUserPayments(subscription.id) : [];

  const hasActiveSub = subscription?.status === 'active';

  return (
    <div className="space-y-10 max-w-5xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
          Subscription Management
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Review your plan details, renewal cycles, and platform draw eligibility.
        </p>
      </div>

      {hasActiveSub ? (
        <SubscriptionStatus subscription={subscription} payments={payments} />
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
            An active subscription is required to unlock monthly cash prize draws and enable your charity allocations.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrentPlan={subscription?.plan_id === plan.id}
                hasActiveSubscription={hasActiveSub}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}