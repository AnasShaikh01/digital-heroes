'use client';

import { useState, useTransition } from 'react';
import { cancelSubscriptionAction } from '@/actions/subscription/cancel-subscription';
import type { SubscriptionWithPlan, SubscriptionPayment } from '@/types/subscription';
import { ShieldCheck, Calendar, RefreshCw, AlertCircle } from 'lucide-react';

interface SubscriptionStatusProps {
  subscription: SubscriptionWithPlan | null;
  payments: SubscriptionPayment[];
}

export function SubscriptionStatus({ subscription, payments }: SubscriptionStatusProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleCancel() {
    if (!confirm('Are you sure you want to cancel your subscription at the end of the billing period?')) return;
    setErrorMessage(null);
    startTransition(async () => {
      const res = await cancelSubscriptionAction();
      if (res?.error) {
        setErrorMessage(res.error);
      }
    });
  }

  if (!subscription || subscription.status !== 'active') {
    return null;
  }

  const renewalDate = subscription.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—';

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="p-8 rounded-3xl border border-amber-500/30 bg-zinc-900/60 backdrop-blur-xl shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Current Plan</span>
            <h2 className="font-heading font-extrabold text-2xl text-white mt-1 capitalize">
              {subscription.plan.name} Membership
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-300 self-start sm:self-auto">
            {subscription.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-zinc-950 border border-white/[0.08] flex items-center justify-center text-amber-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Billing Period Renews</span>
              <span className="font-heading font-bold text-sm text-white">{renewalDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-zinc-950 border border-white/[0.08] flex items-center justify-center text-amber-400">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Renewal Status</span>
              <span className="font-heading font-bold text-sm text-white">
                {subscription.cancel_at_period_end ? 'Cancels at Period End' : 'Auto-Renewing'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Eligible for all active monthly cash prize draws</span>
          </div>

          {!subscription.cancel_at_period_end && (
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="text-xs font-bold text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isPending ? 'Processing...' : 'Cancel at Period End'}
            </button>
          )}
        </div>
      </div>

      {payments.length > 0 && (
        <div className="p-8 rounded-3xl border border-white/[0.08] bg-zinc-900/40">
          <h3 className="font-heading font-bold text-base text-white mb-4">Payment Invoices</h3>
          <div className="space-y-2">
            {payments.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl border border-white/[0.05] bg-zinc-950/60 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white">
                    {p.currency} {Number(p.amount).toLocaleString()}
                  </span>
                  <span className="text-zinc-500 ml-2">
                    {p.paid_at ? new Date(p.paid_at).toLocaleDateString('en-GB') : 'Processing'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}