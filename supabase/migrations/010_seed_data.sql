-- Default Subscription Plans (30% Prize Pool Assumption documented)
insert into public.plans (name, billing_interval, price_amount, currency, discount_percentage, prize_pool_percentage, active)
values 
  ('Monthly Plan', 'monthly', 999.00, 'INR', 0, 30.00, true),
  ('Yearly Plan', 'yearly', 9990.00, 'INR', 16.67, 30.00, true);

-- Default Sample Charities for Landing Directory
insert into public.charities (name, slug, description, website_url, active, featured, upcoming_events)
values
  (
    'Junior Golf Initiative',
    'junior-golf-initiative',
    'Providing coaching, equipment, and tournament access to underprivileged junior athletes.',
    'https://example.org/junior-golf',
    true,
    true,
    '[{"title": "Youth Charity Open", "date": "2026-10-15", "location": "Royal Springs"}]'::jsonb
  ),
  (
    'Fairway Green Foundation',
    'fairway-green-foundation',
    'Protecting regional biodiversity and restoring native ecosystems surrounding public golf lands.',
    'https://example.org/green-foundation',
    true,
    false,
    '[{"title": "Community Planting Day", "date": "2026-11-02", "location": "Green Valley"}]'::jsonb
  );