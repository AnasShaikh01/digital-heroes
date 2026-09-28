create table public.charities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  website_url text,
  image_urls text[] not null default '{}',
  upcoming_events jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index charities_active_idx on public.charities(active);
create index charities_featured_idx on public.charities(featured);

create table public.user_charity_preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  charity_id uuid not null references public.charities(id),
  contribution_percentage numeric(5,2) not null check (contribution_percentage >= 10 and contribution_percentage <= 100),
  updated_at timestamptz not null default now()
);

create table public.charity_contributions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  charity_id uuid not null references public.charities(id),
  subscription_payment_id uuid references public.subscription_payments(id),
  contribution_percentage numeric(5,2) not null check (contribution_percentage >= 10 and contribution_percentage <= 100),
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'INR',
  status public.contribution_status not null default 'pending',
  created_at timestamptz not null default now()
);

create index charity_contributions_user_idx on public.charity_contributions(user_id);
create index charity_contributions_charity_idx on public.charity_contributions(charity_id);

create table public.donations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  charity_id uuid not null references public.charities(id),
  stripe_payment_intent_id text unique,
  amount numeric(12,2) not null check (amount > 0),
  currency text not null default 'INR',
  status public.donation_status not null default 'pending',
  created_at timestamptz not null default now()
);