import { Check, ArrowRight } from 'lucide-react';
import { createCheckoutAction } from '@/actions/subscription/create-checkout';
import type { Plan } from '@/types/subscription';

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan?: boolean;
  hasActiveSubscription?: boolean;
}

export function PlanCard({ plan, isCurrentPlan = false, hasActiveSubscription = false }: PlanCardProps) {
  const isYearly = plan.billing_interval === 'yearly';

  return (
    <div
      className={`relative p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
        isYearly
          ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/[0.08] via-zinc-900/80 to-zinc-900/90 shadow-2xl shadow-amber-500/10'
          : 'border-white/[0.08] bg-zinc-900/50'
      }`}
    >
      {isYearly && (
        <span className="absolute -top-3 right-8 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-zinc-950 shadow-md">
          Annual Plan
        </span>
      )}

      <div>
        <h3 className="font-heading font-extrabold text-xl text-white capitalize">{plan.name}</h3>
        <p className="text-xs text-zinc-400 mt-1">
          {isYearly ? 'Annual billing cycle' : 'Month-to-month access'}
        </p>

        <div className="mt-8 flex items-baseline gap-1.5">
          <span className="font-heading text-4xl sm:text-5xl font-black text-white">
            {plan.currency} {Number(plan.price_amount).toLocaleString()}
          </span>
          <span className="text-xs text-zinc-400 font-medium">
            /{plan.billing_interval === 'monthly' ? 'month' : 'year'}
          </span>
        </div>

        <div className="mt-8 space-y-3.5">
          <div className="flex items-center gap-3 text-xs text-zinc-300">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Enrolled in all monthly cash draws</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-300">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Direct 10% to 100% to your selected charity</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-300">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Automatic 5-score rolling buffer</span>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/[0.06]">
        {isCurrentPlan ? (
          <div className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-zinc-800 text-zinc-400 text-center border border-white/[0.06]">
            Active Subscription
          </div>
        ) : (
          <form action={createCheckoutAction}>
            <input type="hidden" name="planId" value={plan.id} />
            <button
              type="submit"
              disabled={hasActiveSubscription}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                isYearly
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 hover:brightness-105 shadow-md shadow-amber-500/20'
                  : 'border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white'
              }`}
            >
              <span>{hasActiveSubscription ? 'Plan Active' : `Subscribe to ${plan.name}`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}