import Link from 'next/link';
import { HeartHandshake, ArrowRight } from 'lucide-react';
import type { Charity } from '@/lib/charity/charity-service';

export function FeaturedCharity({ charity }: { charity: Charity | null }) {
  if (!charity) return null;

  return (
    <section className="py-16 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="p-8 sm:p-10 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-semibold mb-4">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Featured Partner Spotlight</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              {charity.name}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {charity.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              href={`/charities/${charity.slug}`}
              className="px-6 py-3 rounded-xl border border-border bg-card hover:bg-card/80 text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/charities"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center transition-all shadow-sm shadow-amber-500/10"
            >
              Browse All Partners
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}