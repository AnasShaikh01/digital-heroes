'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Charities', href: '/charities' },
    { label: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-zinc-950/75 backdrop-blur-xl transition-all">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <span className="font-heading font-black text-zinc-950 text-base tracking-tighter">DH</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base tracking-tight text-white leading-none">
              DIGITAL<span className="text-amber-400">HEROES</span>
            </span>
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest leading-tight mt-0.5">
              Purpose & Play
            </span>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-zinc-900/60 border border-white/[0.06] shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-800/90 text-white shadow-sm shadow-black/40 border border-white/[0.08]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-semibold text-zinc-400 hover:text-white px-3.5 py-2 rounded-xl transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
}