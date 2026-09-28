import Link from 'next/link';
import { ExternalLink, Calendar, HeartHandshake, ArrowLeft } from 'lucide-react';
import type { Charity } from '@/lib/charity/charity-service';

export function CharityDetails({ charity }: { charity: Charity }) {
  const events = Array.isArray(charity.upcoming_events)
    ? (charity.upcoming_events as Array<{ title?: string; date?: string; description?: string }>)
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Link */}
      <Link
        href="/charities"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Return to Directory
      </Link>

      <div className="p-8 sm:p-12 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl shadow-2xl">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  {charity.name}
                </h1>
                {charity.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/15 border border-amber-500/30 text-amber-300">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-zinc-400 mt-1">
                Partner Charity
              </p>
            </div>
          </div>

          {charity.website_url && (
            <a
              href={charity.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-white transition-all shadow-sm"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Mission Details */}
        <div className="py-8 border-b border-white/[0.06] space-y-3">
          <h2 className="font-heading font-bold text-base uppercase tracking-wider text-amber-400">
            Mission Overview
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {charity.description || 'This organization is an active partner eligible to receive direct subscription allocations on Digital Heroes.'}
          </p>
        </div>

        {/* Upcoming Events */}
        {events.length > 0 && (
          <div className="py-8 border-b border-white/[0.06] space-y-4">
            <h2 className="font-heading font-bold text-base uppercase tracking-wider text-amber-400">
              Upcoming Community Engagements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map((ev, i) => (
                <div key={i} className="p-4 rounded-2xl border border-white/[0.06] bg-zinc-950/50">
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ev.date || 'Upcoming'}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">{ev.title || 'Community Event'}</h4>
                  {ev.description && (
                    <p className="text-xs text-zinc-400 mt-1">{ev.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-base text-white">Support This Cause</h3>
            <p className="text-xs text-zinc-400">
              Choose how much of your subscription, from 10% to 100%, supports {charity.name}.
            </p>
          </div>
          <Link
            href="/signup"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold text-xs hover:brightness-105 transition-all text-center shrink-0 shadow-md shadow-amber-500/20"
          >
            Select in Portal
          </Link>
        </div>
      </div>
    </div>
  );
}