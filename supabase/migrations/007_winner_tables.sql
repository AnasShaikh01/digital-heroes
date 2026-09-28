create table public.winners (
  id uuid primary key default uuid_generate_v4(),
  draw_id uuid not null references public.draws(id) on delete cascade,
  draw_entry_id uuid not null references public.draw_entries(id),
  prize_tier_id uuid not null references public.draw_prize_tiers(id),
  user_id uuid not null references public.profiles(id) on delete cascade,
  match_count smallint not null check (match_count in (3, 4, 5)),
  prize_amount numeric(12,2) not null check (prize_amount >= 0),
  verification_status public.winner_verification_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique(draw_id, draw_entry_id)
);

create table public.winner_proofs (
  id uuid primary key default uuid_generate_v4(),
  winner_id uuid not null unique references public.winners(id) on delete cascade,
  storage_path text not null,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles(id),
  rejection_reason text
);

create table public.payouts (
  id uuid primary key default uuid_generate_v4(),
  winner_id uuid not null unique references public.winners(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'INR',
  status public.payout_status not null default 'pending',
  paid_at timestamptz,
  payment_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);