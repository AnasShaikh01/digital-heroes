import { requireAuth } from '@/lib/auth/permissions';
import { getCurrentProfile } from '@/lib/auth/auth';
import Link from 'next/link';
import { logoutAction } from '@/actions/auth/signup';
import {
  LayoutDashboard,
  Layers,
  HeartHandshake,
  CreditCard,
  Trophy,
  Award,
  User as UserIcon,
  LogOut,
} from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();
  const profile = await getCurrentProfile();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Scores (Buffer)', href: '/dashboard/scores', icon: Layers },
    { label: 'Charity Allocation', href: '/dashboard/charity', icon: HeartHandshake },
    { label: 'Subscription', href: '/dashboard/subscription', icon: CreditCard },
    { label: 'Monthly Draws', href: '/dashboard/draws', icon: Trophy },
    { label: 'Winnings & Proofs', href: '/dashboard/winnings', icon: Award },
    { label: 'Profile Settings', href: '/dashboard/profile', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-950 text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/[0.07] bg-zinc-950 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-zinc-950 font-black text-sm">
              DH
            </div>
            <span className="font-heading font-extrabold text-base tracking-tight text-white">
              DIGITAL<span className="text-amber-400">HEROES</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-colors"
                >
                  <Icon className="w-4 h-4 text-zinc-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Identity & Logout */}
        <div className="pt-6 border-t border-white/[0.07] mt-6 flex items-center justify-between">
          <div className="truncate mr-2">
            <p className="text-xs font-bold text-white truncate">
              {profile?.full_name || 'Golfer'}
            </p>
            <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              aria-label="Log Out"
              className="p-2 rounded-xl text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full">{children}</main>
    </div>
  );
}