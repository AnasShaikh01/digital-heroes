import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

export type ScoreRow = Database['public']['Tables']['scores']['Row'];

export async function getUserScores(userId: string): Promise<ScoreRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', userId)
    .order('score_date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching user scores:', error.message);
    return [];
  }

  return data ?? [];
}