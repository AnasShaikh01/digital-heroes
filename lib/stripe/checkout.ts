import { stripe } from './stripe';
import type { Plan } from '@/types/subscription';

interface CreateSessionOptions {
  plan: Plan;
  userId: string;
  userEmail: string;
  origin: string;
  existingCustomerId?: string | null;
}

export async function createStripeCheckoutSession({
  plan,
  userId,
  userEmail,
  origin,
  existingCustomerId,
}: CreateSessionOptions) {
  if (!plan.stripe_price_id) {
    throw new Error(`Plan ${plan.name} does not have a configured stripe_price_id.`);
  }

  const customerOptions = existingCustomerId
    ? { customer: existingCustomerId }
    : { customer_email: userEmail };

  return await stripe.checkout.sessions.create({
    ...customerOptions,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: plan.stripe_price_id,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      planId: plan.id,
    },
    subscription_data: {
      metadata: {
        userId,
        planId: plan.id,
      },
    },
    success_url: `${origin}/dashboard/subscription?session_id={CHECKOUT_SESSION_ID}&success=true`,
    cancel_url: `${origin}/dashboard/subscription?canceled=true`,
    allow_promotion_codes: true,
  });
}