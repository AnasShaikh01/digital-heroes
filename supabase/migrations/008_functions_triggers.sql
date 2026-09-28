-- 1. Sync Profile Creation with Auth
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    'user'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Timestamp Updater
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger plans_updated_at before update on public.plans for each row execute procedure public.set_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions for each row execute procedure public.set_updated_at();
create trigger scores_updated_at before update on public.scores for each row execute procedure public.set_updated_at();
create trigger draws_updated_at before update on public.draws for each row execute procedure public.set_updated_at();
create trigger payouts_updated_at before update on public.payouts for each row execute procedure public.set_updated_at();

-- 3. Automatic 5-Score Retention Rule
create or replace function public.enforce_five_scores()
returns trigger language plpgsql as $$
begin
  delete from public.scores
  where id in (
    select id
    from public.scores
    where user_id = new.user_id
    order by score_date desc, created_at desc
    offset 5
  );
  return new;
end;
$$;

create trigger keep_latest_five_scores
  after insert on public.scores
  for each row execute procedure public.enforce_five_scores();

-- 4. Admin Checker (Stable & Security Definer)
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public stable as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;