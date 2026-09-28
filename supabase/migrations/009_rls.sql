-- Enable RLS across all 15 public tables
alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.subscription_payments enable row level security;
alter table public.charities enable row level security;
alter table public.user_charity_preferences enable row level security;
alter table public.charity_contributions enable row level security;
alter table public.donations enable row level security;
alter table public.scores enable row level security;
alter table public.draws enable row level security;
alter table public.draw_entries enable row level security;
alter table public.draw_prize_tiers enable row level security;
alter table public.winners enable row level security;
alter table public.winner_proofs enable row level security;
alter table public.payouts enable row level security;
alter table public.admin_audit_logs enable row level security;

-- Profiles
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

-- Plans
create policy "Active plans are viewable by anyone" on public.plans for select using (active = true or public.is_admin());
create policy "Admins manage plans" on public.plans for all using (public.is_admin()) with check (public.is_admin());

-- Subscriptions
create policy "Users can view own subscription" on public.subscriptions for select using (auth.uid() = user_id or public.is_admin());
create policy "Admins manage subscriptions" on public.subscriptions for all using (public.is_admin()) with check (public.is_admin());

-- Subscription Payments
create policy "Users can view own payments" on public.subscription_payments for select using (
  exists (select 1 from public.subscriptions s where s.id = subscription_id and s.user_id = auth.uid()) or public.is_admin()
);
create policy "Admins manage payments" on public.subscription_payments for all using (public.is_admin()) with check (public.is_admin());

-- Charities
create policy "Anyone can view active charities" on public.charities for select using (active = true or public.is_admin());
create policy "Admins manage charities" on public.charities for all using (public.is_admin()) with check (public.is_admin());

-- Charity Preferences
create policy "Users view own preference" on public.user_charity_preferences for select using (auth.uid() = user_id or public.is_admin());
create policy "Users insert own preference" on public.user_charity_preferences for insert with check (auth.uid() = user_id);
create policy "Users update own preference" on public.user_charity_preferences for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Admins manage preferences" on public.user_charity_preferences for all using (public.is_admin()) with check (public.is_admin());

-- Charity Contributions
create policy "Users view own contributions" on public.charity_contributions for select using (auth.uid() = user_id or public.is_admin());
create policy "Admins manage contributions" on public.charity_contributions for all using (public.is_admin()) with check (public.is_admin());

-- Donations
create policy "Users view own donations" on public.donations for select using (auth.uid() = user_id or public.is_admin());
create policy "Admins manage donations" on public.donations for all using (public.is_admin()) with check (public.is_admin());

-- Scores
create policy "Users view own scores" on public.scores for select using (auth.uid() = user_id or public.is_admin());
create policy "Users insert own scores" on public.scores for insert with check (auth.uid() = user_id);
create policy "Users update own scores" on public.scores for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users delete own scores" on public.scores for delete using (auth.uid() = user_id);
create policy "Admins manage scores" on public.scores for all using (public.is_admin()) with check (public.is_admin());

-- Draws
create policy "Users view published draws" on public.draws for select using (status = 'published' or public.is_admin());
create policy "Admins manage draws" on public.draws for all using (public.is_admin()) with check (public.is_admin());

-- Draw Entries
create policy "Users view own draw entries" on public.draw_entries for select using (auth.uid() = user_id or public.is_admin());
create policy "Admins manage draw entries" on public.draw_entries for all using (public.is_admin()) with check (public.is_admin());

-- Draw Prize Tiers
create policy "Users view published prize tiers" on public.draw_prize_tiers for select using (
  exists (select 1 from public.draws d where d.id = draw_id and d.status = 'published') or public.is_admin()
);
create policy "Admins manage prize tiers" on public.draw_prize_tiers for all using (public.is_admin()) with check (public.is_admin());

-- Winners
create policy "Users view own winnings" on public.winners for select using (auth.uid() = user_id or public.is_admin());
create policy "Admins manage winners" on public.winners for all using (public.is_admin()) with check (public.is_admin());

-- Winner Proofs
create policy "Users view own proof" on public.winner_proofs for select using (
  exists (select 1 from public.winners w where w.id = winner_id and w.user_id = auth.uid()) or public.is_admin()
);
create policy "Users submit own proof" on public.winner_proofs for insert with check (
  exists (select 1 from public.winners w where w.id = winner_id and w.user_id = auth.uid())
);
create policy "Admins manage proofs" on public.winner_proofs for all using (public.is_admin()) with check (public.is_admin());

-- Payouts
create policy "Users view own payouts" on public.payouts for select using (
  exists (select 1 from public.winners w where w.id = winner_id and w.user_id = auth.uid()) or public.is_admin()
);
create policy "Admins manage payouts" on public.payouts for all using (public.is_admin()) with check (public.is_admin());

-- Admin Audit Logs
create policy "Admins view audit logs" on public.admin_audit_logs for select using (public.is_admin());
create policy "Admins insert audit logs" on public.admin_audit_logs for insert with check (public.is_admin());