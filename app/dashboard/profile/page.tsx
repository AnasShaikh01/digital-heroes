import { requireAuth } from '@/lib/auth/permissions';
import { getCurrentProfile } from '@/lib/auth/auth';
import { ProfileForm } from '@/components/dashboard/ProfileForm';

export default async function ProfilePage() {
  const user = await requireAuth();
  const profile = await getCurrentProfile();

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
          Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Manage your personal display information.
        </p>
      </div>

      <div className="p-6 rounded-3xl border border-white/[0.08] bg-zinc-900/60 backdrop-blur-md space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            disabled
            value={user.email || ''}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.08] text-zinc-500 text-sm cursor-not-allowed"
          />
          <p className="text-[10px] text-zinc-400 mt-1">Authentication identity cannot be changed directly.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
            Assigned Role
          </label>
          <input
            type="text"
            disabled
            value={profile?.role || 'user'}
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.08] text-zinc-500 text-sm capitalize cursor-not-allowed"
          />
        </div>

        <ProfileForm initialFullName={profile?.full_name || ''} />
      </div>
    </div>
  );
}