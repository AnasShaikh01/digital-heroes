import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';
import type { Plan, SubscriptionWithPlan, SubscriptionPayment } from '@/types/subscription';

export async function getActivePlans(): Promise<Plan[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('active', true)
    .order('price_amount', { ascending: true });

  if (error) {
    console.error('Error fetching plans:', error.message);
    return [];
  }

  return data ?? [];
}

export async function getPlanById(planId: string): Promise<Plan | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .eq('active', true)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export async function getUserSubscription(userId: string): Promise<SubscriptionWithPlan | null> {
  const supabase = await createClient();

  // First priority: check for active/trialing subscription
  const { data: activeSub } = await supabase
    .from('subscriptions')
    .select('*, plan:plans(*)')
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (activeSub && activeSub.plan) {
    return activeSub as unknown as SubscriptionWithPlan;
  }

  // Second priority: return latest known subscription status
  const { data: latestSub, error } = await supabase
    .from('subscriptions')
    .select('*, plan:plans(*)')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !latestSub || !latestSub.plan) {
    return null;
  }

  return latestSub as unknown as SubscriptionWithPlan;
}

export async function getUserPayments(subscriptionId: string): Promise<SubscriptionPayment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('subscription_payments')
    .select('*')
    .eq('subscription_id', subscriptionId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching subscription payments:', error.message);
    return [];
  }

  return data ?? [];
}