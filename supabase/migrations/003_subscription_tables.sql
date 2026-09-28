create table public.plans (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  billing_interval public.billing_interval not null,
  price_amount numeric(12,2) not null check (price_amount > 0),
  currency text not null default 'INR',
  discount_percentage numeric(5,2) not null default 0 check (discount_percentage >= 0 and discount_percentage <= 100),
  prize_pool_percentage numeric(5,2) not null check (prize_pool_percentage >= 0 and prize_pool_percentage <= 100),
  stripe_product_id text unique,
  stripe_price_id text unique,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_id uuid not null references public.plans(id),
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status public.subscription_status not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index subscriptions_user_id_idx on public.subscriptions(user_id);
create index subscriptions_status_idx on public.subscriptions(status);

create table public.subscription_payments (
  id uuid primary key default uuid_generate_v4(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  stripe_invoice_id text unique,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'INR',
  status public.payment_status not null default 'pending',
  period_start timestamptz,
  period_end timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index subscription_payments_subscription_idx on public.subscription_payments(subscription_id);