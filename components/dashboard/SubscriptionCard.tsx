import Link from 'next/link';
import { CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { SubscriptionWithPlan } from '@/types/subscription';

export function SubscriptionCard({ subscription }: { subscription: SubscriptionWithPlan | null }) {
  const isActive = subscription?.status === 'active';

  return (
    <div className="p-6 rounded-3xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Membership</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              isActive
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                : 'bg-zinc-800/80 border-white/[0.08] text-zinc-400'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <h3 className="font-heading font-bold text-xl text-white mb-2">
          {isActive ? `${subscription.plan.name} Plan` : 'No Active Plan'}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {isActive
            ? `Enrolled in monthly prize draws. Renews ${
                subscription.current_period_end
                  ? new Date(subscription.current_period_end).toLocaleDateString('en-GB')
                  : 'N/A'
              }.`
            : 'Subscribe to validate your 5-score handicap buffer for monthly cash draws.'}
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          {isActive ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <CreditCard className="w-3.5 h-3.5 text-zinc-500" />
          )}
          <span>{isActive ? 'Draw Protected' : 'Billing Setup Required'}</span>
        </div>
        <Link
          href="/dashboard/subscription"
          className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <span>{isActive ? 'Manage' : 'Upgrade'}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}