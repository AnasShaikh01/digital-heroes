'use client';

import { Search } from 'lucide-react';

interface CharitySearchProps {
  query: string;
  onSearch: (value: string) => void;
}

export function CharitySearch({ query, onSearch }: CharitySearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Filter verified charities by name or cause..."
        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-inner"
      />
    </div>
  );
}