import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

export type Plan = Database['public']['Tables']['plans']['Row'];

/**
 * Retrieves active subscription plans for public pricing display.
 */
export async function getActivePlans(): Promise<Plan[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('active', true)
    .order('price_amount', { ascending: true });

  if (error) {
    console.error('Error fetching plans:', error.message);
    return [];
  }

  return data ?? [];
}