import Link from 'next/link';
import { ArrowRight, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
              Mechanics & Rules
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-foreground mt-4">
              How Digital Heroes Works
            </h1>
            <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
              We combine your natural weekend golf scores with high-integrity monthly prize pools while directing sustained capital to grassroots causes.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl border border-border/80 bg-card/60">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-8 w-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm">
                  01
                </span>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  The Rolling 5-Score Buffer
                </h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whenever you play an 18-hole round, log your Stableford score (ranging from 1 to 45). Only one score can be submitted per calendar day. Our automated database trigger preserves your latest 5 valid scores. When you record your 6th score, it pushes out the oldest, keeping your entry fresh and current.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-amber-400">
                <span className="px-2.5 py-1 rounded-md bg-secondary/60">Max 5 Scores</span>
                <span className="px-2.5 py-1 rounded-md bg-secondary/60">1-45 Stableford</span>
                <span className="px-2.5 py-1 rounded-md bg-secondary/60">Automatic FIFO Rolling</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl border border-border/80 bg-card/60">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-8 w-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center font-bold text-rose-400 text-sm">
                  02
                </span>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Charity Allocation Selection
                </h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every active subscriber allocates at least 10% (and up to 100%) of their subscription payment to any verified grassroots charity of their choice. You can adjust your designated charity at any point before your renewal billing date.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl border border-border/80 bg-card/60">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-8 w-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm">
                  03
                </span>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Monthly Tiered Draws & Rollovers
                </h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At the end of each month, an official snapshot of all eligible subscribers (active account + complete 5-score set) is locked. Winning numbers are drawn, and entries are evaluated across three distinct tiers:
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border">
                  <span className="text-xs font-semibold text-muted-foreground">Match 5 (Jackpot)</span>
                  <p className="font-heading font-bold text-lg text-amber-400 mt-1">40% Pool</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Rolls over if unwon.</p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border">
                  <span className="text-xs font-semibold text-muted-foreground">Match 4 Tier</span>
                  <p className="font-heading font-bold text-lg text-foreground mt-1">35% Pool</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Shared among winners.</p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border">
                  <span className="text-xs font-semibold text-muted-foreground">Match 3 Tier</span>
                  <p className="font-heading font-bold text-lg text-foreground mt-1">25% Pool</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Shared among winners.</p>
                </div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="p-6 rounded-2xl bg-secondary/20 border border-border flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Strict Verification:</strong> All winning entries must provide screenshot verification of their scorecard or golf app record before funds are released by an administrator.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all shadow-md shadow-amber-500/10"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}