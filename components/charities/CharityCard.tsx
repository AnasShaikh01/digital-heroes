import Link from 'next/link';
import { HeartHandshake, ArrowUpRight, Calendar } from 'lucide-react';
import type { Charity } from '@/lib/charity/charity-service';

export function CharityCard({ charity }: { charity: Charity }) {
  const events = Array.isArray(charity.upcoming_events) ? charity.upcoming_events : [];

  return (
    <div className="group relative flex flex-col justify-between p-7 rounded-3xl border border-white/[0.08] bg-zinc-900/50 hover:bg-zinc-900/80 hover:border-amber-500/40 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/[0.04]">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="h-11 w-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>

          {charity.featured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/15 border border-amber-500/30 text-amber-300">
              Featured
            </span>
          )}
        </div>

        {/* Info */}
        <h3 className="font-heading font-bold text-lg text-white mt-5 group-hover:text-amber-300 transition-colors">
          {charity.name}
        </h3>

        <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
          {charity.description || 'Verified beneficiary providing dedicated support and local sports initiatives.'}
        </p>

        {/* Mini event count pill */}
        {events.length > 0 && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11px] text-zinc-400">
            <Calendar className="w-3 h-3 text-amber-400" />
            <span>{events.length} Upcoming Event{events.length > 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">
          View Profile &amp; Mission
        </span>
        <Link
          href={`/charities/${charity.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-0.5 transition-transform"
        >
          Details
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}