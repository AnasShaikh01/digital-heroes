import { redirect } from 'next/navigation';
import { getCurrentUser, getCurrentProfile } from './auth';
import { getUserSubscription } from '@/lib/subscription/subscription-service';
import type { UserRole } from '@/types/database';

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();
  const profile = await getCurrentProfile();

  if (!profile || !allowedRoles.includes(profile.role)) {
    redirect('/dashboard');
  }

  return { user, profile };
}

export async function requireAdmin() {
  return await requireRole(['admin']);
}

/**
 * Access is derived entirely from the subscriptions table.
 */
export async function requireSubscriber() {
  const user = await requireAuth();
  const subscription = await getUserSubscription(user.id);

  const isPeriodValid =
    !subscription?.current_period_end || new Date(subscription.current_period_end) > new Date();

  const isActive =
    subscription &&
    (subscription.status === 'active' || subscription.status === 'trialing') &&
    isPeriodValid;

  if (!isActive) {
    redirect('/dashboard/subscription');
  }

  return { user, subscription };
}