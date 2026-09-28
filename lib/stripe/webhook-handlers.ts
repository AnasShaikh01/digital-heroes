import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { stripe } from './stripe';
import type { Database } from '@/types/database';
import type Stripe from 'stripe';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Supabase Service Role credentials not configured.');
  }

  return createSupabaseClient<Database>(url, serviceKey, {
    auth: { persistSession: false },
  });
}

type DbSubscriptionStatus = Database['public']['Enums']['subscription_status'];

function mapStripeStatusToDb(status: Stripe.Subscription.Status): DbSubscriptionStatus {
  switch (status) {
    case 'active':
      return 'active';
    case 'trialing':
      return 'trialing';
    case 'past_due':
    case 'unpaid':
      return 'past_due';
    case 'canceled':
    case 'incomplete_expired':
    case 'paused':
      return 'canceled';
    case 'incomplete':
      return 'incomplete';
    default:
      return 'canceled';
  }
}

function getInvoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const invoiceAny = invoice as unknown as {
    subscription?: string | { id: string };
    parent?: { subscription_details?: { subscription?: string | { id: string } } };
    lines?: { data: Array<{ subscription?: string | { id: string } }> };
  };

  if (typeof invoiceAny.subscription === 'string') return invoiceAny.subscription;
  if (invoiceAny.subscription?.id) return invoiceAny.subscription.id;

  const parentSub = invoiceAny.parent?.subscription_details?.subscription;
  if (typeof parentSub === 'string') return parentSub;
  if (parentSub?.id) return parentSub.id;

  const lineSub = invoiceAny.lines?.data?.[0]?.subscription;
  if (typeof lineSub === 'string') return lineSub;
  if (lineSub?.id) return lineSub.id;

  return null;
}

function getSubscriptionPeriodTimestamps(subscription: Stripe.Subscription): {
  start: string;
  end: string;
} {
  const subAny = subscription as unknown as {
    current_period_start?: number;
    current_period_end?: number;
  };

  const item = subscription.items?.data?.[0] as unknown as {
    current_period_start?: number;
    current_period_end?: number;
  } | undefined;

  const startTimestamp = subAny.current_period_start ?? item?.current_period_start;
  const endTimestamp = subAny.current_period_end ?? item?.current_period_end;

  if (!startTimestamp || !endTimestamp) {
    throw new Error(`Unable to resolve period dates for Stripe subscription: ${subscription.id}`);
  }

  return {
    start: new Date(startTimestamp * 1000).toISOString(),
    end: new Date(endTimestamp * 1000).toISOString(),
  };
}

export async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const supabase = getAdminClient();
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
  let userId = subscription.metadata?.userId;
  let planId = subscription.metadata?.planId;

  // Fallback to match plan from Stripe price ID
  if (!planId) {
    const priceId = subscription.items?.data?.[0]?.price?.id;
    if (priceId) {
      const { data: matchedPlan } = await supabase
        .from('plans')
        .select('id')
        .eq('stripe_price_id', priceId)
        .maybeSingle();

      if (matchedPlan) {
        planId = matchedPlan.id;
      }
    }
  }

  // Fallback to match user from existing subscription record
  if (!userId) {
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('user_id')
      .eq('stripe_customer_id', customerId)
      .maybeSingle();

    if (existingSub) {
      userId = existingSub.user_id;
    }
  }

  if (!userId || !planId) {
    throw new Error(`Cannot process subscription ${subscription.id} - Missing userId (${userId}) or planId (${planId})`);
  }

  const { start: currentPeriodStart, end: currentPeriodEnd } = getSubscriptionPeriodTimestamps(subscription);
  const canceledAt = subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null;
  const dbStatus = mapStripeStatusToDb(subscription.status);

  const { error } = await supabase.from('subscriptions').upsert(
    {
      user_id: userId,
      plan_id: planId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      status: dbStatus,
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd,
      cancel_at_period_end: subscription.cancel_at_period_end,
      canceled_at: canceledAt,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'stripe_subscription_id' }
  );

  if (error) {
    console.error('Error saving subscription record:', error.message);
    throw error;
  }
}

export async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const supabase = getAdminClient();
  const subscriptionId = getInvoiceSubscriptionId(invoice);

  if (!subscriptionId) return;

  let { data: sub } = await supabase
    .from('subscriptions')
    .select('id, user_id')
    .eq('stripe_subscription_id', subscriptionId)
    .maybeSingle();

  // Out-of-order webhook resilience: pull subscription from Stripe directly
  if (!sub) {
    const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
    await handleSubscriptionUpdated(stripeSub);

    const { data: refreshedSub } = await supabase
      .from('subscriptions')
      .select('id, user_id')
      .eq('stripe_subscription_id', subscriptionId)
      .maybeSingle();

    sub = refreshedSub;
  }

  if (!sub) {
    throw new Error(`Subscription record could not be reconciled for invoice ${invoice.id}`);
  }

  const amount = (invoice.amount_paid || 0) / 100;
  const currency = (invoice.currency || 'INR').toUpperCase();
  const paidAt = invoice.status_transitions?.paid_at
    ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
    : new Date().toISOString();

  const invoiceAny = invoice as unknown as {
    period_start?: number;
    period_end?: number;
  };

  const { error } = await supabase.from('subscription_payments').upsert(
    {
      subscription_id: sub.id,
      stripe_invoice_id: invoice.id,
      amount,
      currency,
      status: 'paid',
      period_start: invoiceAny.period_start ? new Date(invoiceAny.period_start * 1000).toISOString() : null,
      period_end: invoiceAny.period_end ? new Date(invoiceAny.period_end * 1000).toISOString() : null,
      paid_at: paidAt,
    },
    { onConflict: 'stripe_invoice_id' }
  );

  if (error) {
    console.error('Error recording invoice payment:', error.message);
    throw error;
  }
}

export async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const supabase = getAdminClient();
  const subscriptionId = getInvoiceSubscriptionId(invoice);

  if (!subscriptionId) return;

  let { data: sub } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('stripe_subscription_id', subscriptionId)
    .maybeSingle();

  // Out-of-order webhook resilience
  if (!sub) {
    const stripeSub = await stripe.subscriptions.retrieve(subscriptionId);
    await handleSubscriptionUpdated(stripeSub);

    const { data: refreshedSub } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('stripe_subscription_id', subscriptionId)
      .maybeSingle();

    sub = refreshedSub;
  }

  if (!sub) {
    throw new Error(`Subscription record could not be reconciled for failed invoice ${invoice.id}`);
  }

  const invoiceAny = invoice as unknown as {
    period_start?: number;
    period_end?: number;
  };

  const { error } = await supabase.from('subscription_payments').upsert(
    {
      subscription_id: sub.id,
      stripe_invoice_id: invoice.id,
      amount: (invoice.amount_due || 0) / 100,
      currency: (invoice.currency || 'INR').toUpperCase(),
      status: 'failed',
      period_start: invoiceAny.period_start ? new Date(invoiceAny.period_start * 1000).toISOString() : null,
      period_end: invoiceAny.period_end ? new Date(invoiceAny.period_end * 1000).toISOString() : null,
      paid_at: null,
    },
    { onConflict: 'stripe_invoice_id' }
  );

  if (error) {
    console.error('Error recording failed payment invoice:', error.message);
    throw error;
  }
}