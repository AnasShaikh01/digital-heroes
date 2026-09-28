create table public.draws (
  id uuid primary key default uuid_generate_v4(),
  draw_month date not null unique,
  draw_type public.draw_type not null,
  status public.draw_status not null default 'draft',
  cutoff_at timestamptz not null,
  winning_numbers integer[],
  prize_pool_percentage numeric(5,2) not null check (prize_pool_percentage >= 0 and prize_pool_percentage <= 100),
  total_prize_pool numeric(12,2) not null default 0,
  jackpot_rollover_amount numeric(12,2) not null default 0,
  algorithm_version text,
  simulated_at timestamptz,
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  published_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (winning_numbers is null or cardinality(winning_numbers) = 5)
);

create table public.draw_entries (
  id uuid primary key default uuid_generate_v4(),
  draw_id uuid not null references public.draws(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  score_values integer[] not null default '{}',
  score_dates date[] not null default '{}',
  is_eligible boolean not null default false,
  match_count smallint check (match_count >= 0 and match_count <= 5),
  created_at timestamptz not null default now(),
  unique(draw_id, user_id),
  check (cardinality(score_values) between 0 and 5),
  check (cardinality(score_dates) between 0 and 5),
  check (not is_eligible or (cardinality(score_values) = 5 and cardinality(score_dates) = 5))
);

create index draw_entries_draw_idx on public.draw_entries(draw_id);
create index draw_entries_user_idx on public.draw_entries(user_id);
create index draw_entries_eligible_idx on public.draw_entries(draw_id, is_eligible);

create table public.draw_prize_tiers (
  id uuid primary key default uuid_generate_v4(),
  draw_id uuid not null references public.draws(id) on delete cascade,
  match_count smallint not null check (match_count in (3, 4, 5)),
  pool_share_percentage numeric(5,2) not null check (pool_share_percentage >= 0 and pool_share_percentage <= 100),
  allocated_amount numeric(12,2) not null default 0,
  rollover boolean not null default false,
  created_at timestamptz not null default now(),
  unique(draw_id, match_count)
);