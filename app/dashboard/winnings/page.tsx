import { requireAuth } from '@/lib/auth/permissions';
import { Award } from 'lucide-react';

export default async function WinningsPage() {
  await requireAuth();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">Winnings & Verification</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">Submit scorecard verification screenshots and monitor prize distributions.</p>
      </div>

      <div className="p-12 rounded-3xl border border-white/[0.08] bg-zinc-900/30 text-center">
        <Award className="w-8 h-8 text-rose-400/60 mx-auto mb-3" />
        <h3 className="font-heading font-bold text-base text-white">No pending claims</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
          If your numbers match 3, 4, or 5 draw values in an upcoming cycle, claim instructions will appear here.
        </p>
      </div>
    </div>
  );
}