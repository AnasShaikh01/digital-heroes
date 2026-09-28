import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getActivePlans } from '@/lib/subscription/subscription-service';

export default async function PricingPage() {
  const plans = await getActivePlans();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      <Navbar />

      <main className="flex-1 py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Transparent Memberships</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              One Membership. Pure Purpose.
            </h1>
            <p className="text-zinc-400 mt-4 text-sm sm:text-base leading-relaxed">
              Every tier funds verified grassroots causes and enters your 5-round scorecard into monthly cash prize pools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const isYearly = plan.billing_interval === 'yearly';

              return (
                <div
                  key={plan.id}
                  className={`p-8 sm:p-10 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${
                    isYearly
                      ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/[0.08] via-zinc-900/80 to-zinc-900/90 shadow-2xl shadow-amber-500/10'
                      : 'border-white/[0.08] bg-zinc-900/50'
                  }`}
                >
                  {isYearly && (
                    <span className="absolute -top-3 right-8 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 shadow-md">
                      Best Value
                    </span>
                  )}

                  <div>
                    <h3 className="font-heading font-extrabold text-xl text-white capitalize">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      {isYearly ? 'Annual billing • Maximum impact' : 'Flexible month-to-month access'}
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
                        <span>Eligible for monthly cash draws with 5 logged scores</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-zinc-300">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Choose 10% to 100% allocation to your selected charity</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-zinc-300">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Automated 5-score rolling buffer (FIFO)</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-zinc-300">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Verified payout and scorecard audit system</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/[0.06]">
                    <Link
                      href="/signup"
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 ${
                        isYearly
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 hover:brightness-105 shadow-md shadow-amber-500/20'
                          : 'border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white'
                      }`}
                    >
                      <span>Get Started with {plan.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}