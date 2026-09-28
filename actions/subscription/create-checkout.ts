'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth/permissions';
import { getPlanById, getUserSubscription } from '@/lib/subscription/subscription-service';
import { createStripeCheckoutSession } from '@/lib/stripe/checkout';

export async function createCheckoutAction(formData: FormData) {
  const user = await requireAuth();
  const planId = formData.get('planId') as string;

  if (!planId) {
    throw new Error('Plan selection is required.');
  }

  // Prevent multiple active subscriptions
  const existingSub = await getUserSubscription(user.id);
  if (
    existingSub &&
    existingSub.status === 'active' &&
    (!existingSub.current_period_end || new Date(existingSub.current_period_end) > new Date())
  ) {
    throw new Error('You already have an active subscription. Manage your plan through the subscription dashboard.');
  }

  const plan = await getPlanById(planId);
  if (!plan) {
    throw new Error('Selected plan is invalid or inactive.');
  }

  const headerList = await headers();
  const origin = headerList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const session = await createStripeCheckoutSession({
    plan,
    userId: user.id,
    userEmail: user.email || '',
    origin,
    existingCustomerId: existingSub?.stripe_customer_id,
  });

  if (!session.url) {
    throw new Error('Failed to initiate checkout session.');
  }

  redirect(session.url);
}