'use client';

import { useState, useMemo } from 'react';
import type { Charity } from '@/lib/charity/charity-service';
import { CharityCard } from './CharityCard';
import { CharitySearch } from './CharitySearch';

export function CharityGrid({ initialCharities }: { initialCharities: Charity[] }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return initialCharities;
    const q = search.toLowerCase();
    return initialCharities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [search, initialCharities]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-semibold text-zinc-400">
          Showing <span className="text-white font-bold">{filtered.length}</span> Active Partner Charities
        </p>
        <CharitySearch query={search} onSearch={setSearch} />
      </div>

      {filtered.length === 0 ? (
        <div className="p-16 text-center rounded-3xl border border-dashed border-white/[0.08] bg-zinc-900/20">
          <p className="text-sm font-semibold text-zinc-300">No matching charities found</p>
          <p className="text-xs text-zinc-500 mt-1">Try refining your search keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((charity) => (
            <CharityCard key={charity.id} charity={charity} />
          ))}
        </div>
      )}
    </div>
  );
}