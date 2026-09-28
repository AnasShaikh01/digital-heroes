'use server';

import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth/permissions';
import { getUserSubscription } from '@/lib/subscription/subscription-service';
import { stripe } from '@/lib/stripe/stripe';

export async function cancelSubscriptionAction() {
  const user = await requireAuth();
  const subscription = await getUserSubscription(user.id);

  if (!subscription || !subscription.stripe_subscription_id) {
    return { error: 'No active subscription found to cancel.' };
  }

  try {
    await stripe.subscriptions.update(subscription.stripe_subscription_id, {
      cancel_at_period_end: true,
    });

    revalidatePath('/dashboard/subscription');
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update subscription.';
    return { error: message };
  }
}