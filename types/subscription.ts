import type { Database } from '@/types/database';

export type Plan = Database['public']['Tables']['plans']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type SubscriptionPayment = Database['public']['Tables']['subscription_payments']['Row'];

export interface SubscriptionWithPlan extends Subscription {
  plan: Plan;
}

export interface CheckoutSessionParams {
  planId: string;
  userId: string;
  userEmail: string;
}