create table public.scores (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  score smallint not null check (score >= 1 and score <= 45),
  score_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, score_date)
);

create index scores_user_date_idx on public.scores(user_id, score_date desc);