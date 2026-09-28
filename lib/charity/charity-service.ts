import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

export type Charity = Database['public']['Tables']['charities']['Row'];
export type CharityPreference = Database['public']['Tables']['user_charity_preferences']['Row'];

export async function getActiveCharities(): Promise<Charity[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('charities')
    .select('*')
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching charities:', error.message);
    return [];
  }

  return data ?? [];
}

export async function getCharityBySlug(slug: string): Promise<Charity | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('charities')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getFeaturedCharity(): Promise<Charity | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('charities')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function getUserCharityPreference(userId: string): Promise<{
  preference: CharityPreference | null;
  charity: Charity | null;
}> {
  const supabase = await createClient();

  const { data: preference, error: prefError } = await supabase
    .from('user_charity_preferences')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (prefError || !preference) {
    return { preference: null, charity: null };
  }

  const { data: charity } = await supabase
    .from('charities')
    .select('*')
    .eq('id', preference.charity_id)
    .maybeSingle();

  return { preference, charity: charity ?? null };
}