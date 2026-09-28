import { Sparkles, Trophy, ShieldCheck, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export function DrawExplanation() {
  const tiers = [
    {
      tier: 'Tier 1',
      matches: 'Match 5 (Jackpot)',
      share: '40% Pool',
      desc: 'Matches all 5 drawn numbers against your active buffer. Unclaimed jackpot automatically rolls over to the next month.',
      highlight: true,
      tag: 'Rollover Protection',
    },
    {
      tier: 'Tier 2',
      matches: 'Match 4 of 5',
      share: '35% Pool',
      desc: 'Matches 4 out of 5 drawn numbers. Evenly allocated across all eligible subscribers matching the 4-number criteria.',
      highlight: false,
      tag: 'Shared Allocation',
    },
    {
      tier: 'Tier 3',
      matches: 'Match 3 of 5',
      share: '25% Pool',
      desc: 'Matches 3 out of 5 drawn numbers. Immediate distribution to all eligible tier winners upon verification audit.',
      highlight: false,
      tag: 'High Probability',
    },
  ];

  return (
    <section className="py-24 border-t border-white/[0.06] bg-zinc-950/60 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 mb-4">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Algorithmic Monthly Draws</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transparent Tiered Pools
          </h2>

          <p className="text-zinc-400 mt-4 text-sm sm:text-base leading-relaxed">
            Prize pools are generated directly from subscription volume, segregated into distinct tiers, and validated before release.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                t.highlight
                  ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/[0.1] via-zinc-900/80 to-zinc-900/90 shadow-2xl shadow-amber-500/[0.05]'
                  : 'border-white/[0.08] bg-zinc-900/40 hover:border-white/[0.15]'
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 right-8 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 shadow-md">
                  Jackpot
                </span>
              )}

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-2">
                  <span>{t.tier}</span>
                  <span className="text-amber-400/90 font-mono text-[11px]">{t.tag}</span>
                </div>

                <h3 className="font-heading font-extrabold text-lg text-white mb-4">
                  {t.matches}
                </h3>

                <div className="font-heading font-black text-4xl text-white tracking-tight mb-4">
                  {t.share}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                {t.highlight ? (
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-spin-slow" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                )}
                <span>{t.highlight ? 'Carries over if no full match' : 'Distributed evenly per tier'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Guarantee Notice */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl border border-white/[0.07] bg-zinc-900/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">Score Proof Audit Mandate</h4>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                All winning entries require scorecard upload and administrative confirmation prior to payout release.
              </p>
            </div>
          </div>

          <Link
            href="/signup"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs whitespace-nowrap transition-all shadow-md shadow-amber-500/15"
          >
            Enter Next Draw
          </Link>
        </div>
      </div>
    </section>
  );
}