import { User } from '@supabase/supabase-js';
import type { Profile } from '@/lib/auth/auth';

interface DashboardHeaderProps {
  user: User;
  profile: Profile | null;
}

export function DashboardHeader({ user, profile }: DashboardHeaderProps) {
  const displayName = profile?.full_name || user.email?.split('@')[0] || 'Golfer';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.06]">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
          Subscriber Portal
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Welcome, {displayName}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Review your rolling 5-score handicap and partner charity distribution.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 border border-white/[0.08] text-zinc-300">
          Role: <strong className="text-amber-400 capitalize">{profile?.role || 'user'}</strong>
        </span>
      </div>
    </div>
  );
}