import Link from 'next/link';
import { ArrowUpRight, Layers, HeartHandshake, Coins, CheckCircle2 } from 'lucide-react';

export function HowItWorks() {
  const pillars = [
    {
      step: '01',
      icon: Layers,
      accent: 'amber',
      badge: 'Database FIFO Trigger',
      title: 'Log Stableford Scores',
      description:
        'Submit your 18-hole Stableford rounds (1–45 points). The system enforces 1 score per date and automatically retains your most recent 5 scores. A 6th score automatically rolls out the oldest.',
      bullets: ['Max 5 active scores', '1 score per calendar day', 'Automated database retention'],
    },
    {
      step: '02',
      icon: HeartHandshake,
      accent: 'rose',
      badge: 'Verified Grassroots',
      title: 'Direct Your Charity Split',
      description:
        'Every subscription directly allocates between 10% and 100% of its value to your selected partner charity. Adjust your beneficiary at any time through your dashboard before monthly renewal.',
      bullets: ['10% guaranteed minimum', 'Configurable contribution', 'Direct charity payouts'],
    },
    {
      step: '03',
      icon: Coins,
      accent: 'amber',
      badge: 'Tiered Monthly Engine',
      title: 'Enter Monthly Prize Draws',
      description:
        'Subscribers with 5 active scores are locked into the monthly draw snapshot. Winning numbers evaluate across 3 match tiers, with unwon top jackpots carrying over automatically.',
      bullets: ['Match 3, 4, and 5 tiers', 'Jackpot rollover protection', 'Score proof audit verification'],
    },
  ];

  return (
    <section className="py-24 border-t border-white/[0.06] bg-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400/90">
              Core Architecture
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Fair, Transparent, Purpose-Built
            </h2>
          </div>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Full Technical Specification</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isRose = p.accent === 'rose';

            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl border border-white/[0.07] bg-gradient-to-b from-zinc-900/70 to-zinc-900/30 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-amber-500/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`h-12 w-12 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-105 ${
                        isRose
                          ? 'bg-rose-500/10 border-rose-500/25 text-rose-400'
                          : 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading font-black text-2xl text-white/20 group-hover:text-amber-400/40 transition-colors">
                      {p.step}
                    </span>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-zinc-300 mb-3">
                    {p.badge}
                  </span>

                  <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.06] space-y-2">
                  {p.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}