import Link from 'next/link';
import { ArrowRight, Flame, ShieldCheck, HeartHandshake, Trophy } from 'lucide-react';

export function Hero() {
  const sampleScores = [
    { score: 38, date: 'Round 1' },
    { score: 41, date: 'Round 2' },
    { score: 36, date: 'Round 3' },
    { score: 42, date: 'Round 4' },
    { score: 39, date: 'Round 5' },
  ];

  return (
    <section className="relative pt-24 pb-28 overflow-hidden bg-zinc-950">
      {/* Ambient Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[440px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        {/* Concept Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-300 text-xs font-semibold mb-8 shadow-sm shadow-amber-500/10">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Purpose-Driven Golf Platform</span>
          <span className="h-1 w-1 rounded-full bg-amber-400/60" />
          <span className="text-zinc-300 font-normal">Monthly Rollover Prize Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto">
          Every round you play powers{' '}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            real grassroots change.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Log your weekend Stableford rounds. Choose how much of your subscription, from 10% to 100%, supports your selected charity, and enter transparent monthly cash jackpots.
        </p>

        {/* CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-105 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-amber-500/20 active:scale-[0.98]"
          >
            <span>Join Digital Heroes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/charities"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm transition-all backdrop-blur-md"
          >
            Explore Partner Charities
          </Link>
        </div>

        {/* Scorecard Demonstration Mockup */}
        <div className="mt-16 mx-auto max-w-2xl p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-xl shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.06] text-left">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400">Handicap Architecture</p>
              <h3 className="font-heading font-extrabold text-lg text-white mt-0.5">Rolling 5-Score Buffer</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-800 border border-white/[0.08] text-zinc-400 self-start sm:self-auto">
              Sample Scorecard
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2.5 sm:gap-4 mt-6">
            {sampleScores.map((s, idx) => (
              <div
                key={idx}
                className="group p-3 sm:p-4 rounded-2xl border border-white/[0.06] bg-zinc-950/60 flex flex-col items-center hover:border-amber-500/40 transition-colors"
              >
                <span className="text-[10px] text-zinc-500 font-medium">{s.date}</span>
                <span className="font-heading font-black text-xl sm:text-2xl text-white mt-1 group-hover:text-amber-300 transition-colors">
                  {s.score}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-amber-400/80 font-semibold mt-1">
                  pts
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-500 mt-5 text-center sm:text-left">
            FIFO Buffer: When you log a new score, it replaces your oldest score automatically.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/[0.06] text-left">
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/[0.05] flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Scorecard Verification</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Admin-reviewed proof required before releasing draw payouts.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/[0.05] flex items-start gap-3.5">
            <HeartHandshake className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Charity Split</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Choose how much of your subscription, from 10% to 100%, supports your selected charity.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/[0.05] flex items-start gap-3.5">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Automated Rollovers</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Unclaimed Match 5 jackpot funds automatically carry over to the next month.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}