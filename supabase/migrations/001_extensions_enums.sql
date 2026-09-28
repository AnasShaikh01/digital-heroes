create extension if not exists "uuid-ossp";

-- Role Enums
create type public.user_role as enum ('user', 'admin');

-- Subscription Enums
create type public.billing_interval as enum ('monthly', 'yearly');
create type public.subscription_status as enum (
  'trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid'
);
create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded');

-- Draw & Gaming Enums
create type public.draw_type as enum ('random', 'algorithmic');
create type public.draw_status as enum ('draft', 'simulated', 'published', 'completed', 'cancelled');
create type public.winner_verification_status as enum ('pending', 'approved', 'rejected');
create type public.payout_status as enum ('pending', 'paid', 'failed');

-- Charity & Donation Enums
create type public.contribution_status as enum ('pending', 'completed', 'failed');
create type public.donation_status as enum ('pending', 'completed', 'failed', 'refunded');